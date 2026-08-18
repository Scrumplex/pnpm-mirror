# SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
#
# SPDX-License-Identifier: MIT

{ ... }: {
  perSystem = { config, pkgs, ... }: {
    checks.eslint = pkgs.callPackage ./_run-npm-task.nix { parent = config.packages.default; };
    checks.prettier = pkgs.callPackage ./_run-npm-task.nix {
      parent = config.packages.default;
      npmBuildScript = "format";
    };
  };
}
