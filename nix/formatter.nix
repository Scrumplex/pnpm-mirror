# SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
#
# SPDX-License-Identifier: MIT

{
  perSystem = { pkgs, ... }: {
    formatter = pkgs.nixfmt-tree;
  };
}
