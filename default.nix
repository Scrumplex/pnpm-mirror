# SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
#
# SPDX-License-Identifier: GPL-3.0-or-later
# SPDX-License-Identifier: MIT

{
  buildNpmPackage,
  importNpmLock,
  lib,
  nodejs-slim,
  pnpm,
  tests,
}:
let
  packageJson = lib.importJSON ./package.json;
in
buildNpmPackage (finalAttrs: {
  pname = "pnpm-mirror";
  inherit (packageJson) version;

  src = ./.;

  nodejs = nodejs-slim;
  nativeBuildInputs = lib.optional (builtins.hasAttr "npm" nodejs-slim) nodejs-slim.npm;

  npmDeps = importNpmLock {
    npmRoot = finalAttrs.src;
  };

  inherit (importNpmLock) npmConfigHook;

  postInstall = ''
    makeWrapper ${lib.getExe nodejs-slim} $out/bin/pnpm-mirror \
      --add-flags "$out/lib/node_modules/pnpm-mirror"
  '';

  passthru.tests = {
    inherit (tests) pnpm;
  };

  __structuredAttrs = true;
  doCheck = true;

  meta = {
    license = lib.licenses.mit;
    mainProgram = "pnpm-fetch-deps";
    inherit (pnpm.meta) maintainers;
  };
})
