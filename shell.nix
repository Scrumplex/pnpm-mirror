# SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
#
# SPDX-License-Identifier: GPL-3.0-or-later
# SPDX-License-Identifier: MIT

{
  pkgs ? import <nixpkgs> { },
  pnpm-mirror ? pkgs.callPackage ./. { },
}:
pkgs.mkShell {
  inputsFrom = [ pnpm-mirror ];
  packages = [
    pkgs.reuse
  ];
}
