# SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
#
# SPDX-License-Identifier: MIT

{
  buildNpmPackage,
  lib,
  importNpmLock,
  nodejs-slim,

  parent,
  npmBuildScript ? "lint",
}:
buildNpmPackage (finalAttrs: {
  pname = "pnpm-mirror-${finalAttrs.npmBuildScript}";
  inherit (parent) version src npmDeps;

  nodejs = nodejs-slim;
  nativeBuildInputs = lib.optional (builtins.hasAttr "npm" nodejs-slim) nodejs-slim.npm;

  inherit (importNpmLock) npmConfigHook;

  inherit npmBuildScript;

  installPhase = ''
    runHook preInstall

    touch $out

    runHook postInstall
  '';

  __structuredAttrs = true;
})
