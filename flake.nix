# SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
#
# SPDX-License-Identifier: GPL-3.0-or-later
# SPDX-License-Identifier: MIT

{
  inputs = {
    flake-parts.inputs.nixpkgs-lib.follows = "nixpkgs";
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
      ];
      perSystem = { config, pkgs, ... }: {
        devShells.default = import ./shell.nix {
          inherit pkgs;
          inherit (config.packages) pnpm-mirror;
        };
        formatter = pkgs.nixfmt-tree;
        checks.reuse =
          pkgs.runCommandNoCC "reuse-lint"
            {
              nativeBuildInputs = [ pkgs.reuse ];
            }
            ''
              cd ${inputs.self}
              reuse lint
              touch $out
            '';
        packages = {
          default = config.packages.pnpm-mirror;
          pnpm-mirror = pkgs.callPackage ./. { };
        };
      };
    };
}
