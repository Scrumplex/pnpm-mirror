# SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
#
# SPDX-License-Identifier: MIT

{
  perSystem = { config, pkgs, ... }: {
    devShells.default = import ../shell.nix {
      inherit pkgs;
      inherit (config.packages) pnpm-mirror;
    };
  };
}
