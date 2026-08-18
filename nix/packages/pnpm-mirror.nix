# SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
#
# SPDX-License-Identifier: MIT

{
  perSystem = { config, pkgs, ... }: {
    packages = {
      default = config.packages.pnpm-mirror;
      pnpm-mirror = pkgs.callPackage ../../default.nix { };
    };
  };
}
