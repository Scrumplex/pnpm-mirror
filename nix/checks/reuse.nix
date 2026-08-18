# SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
#
# SPDX-License-Identifier: MIT

{ inputs, ... }: {
  perSystem = { pkgs, ... }: {
    checks.reuse =
      pkgs.runCommand "reuse-lint"
        {
          nativeBuildInputs = [ pkgs.reuse ];
        }
        ''
          cd ${inputs.self}
          reuse lint
          touch $out
        '';
  };
}
