// SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { removeSuffix } from "@pnpm/deps.path";
import { getGlobalLogger } from "./util.js";

export const defaultRegistry = "https://registry.npmjs.org" as const;

const namePattern = /^(@?[^@/]+(?:\/([^@/]+))?)@(.+)$/;

export const registryUrlForPackage = (
  specifier: string,
  registry: string = defaultRegistry,
) => {
  const logger = getGlobalLogger().child({
    specifier,
  });
  const packageId = removeSuffix(specifier);

  const matches = packageId.match(namePattern);
  if (!matches || matches.length < 4) {
    throw new Error(`Package ${packageId} did not match pattern`);
  }

  logger.debug({
    msg: `Package ${packageId} has ${matches.length} matches`,
    packageId,
    matches,
  });

  const fullName = matches[1];
  // Scoped packages (e.g. @scope/name) need special treatment
  const packageName = matches[2] ?? fullName;
  const version = matches[3];

  // Crude way to check if dependency is pinned to a URL
  // TODO: parse URL instead!
  if (version.startsWith("http")) {
    logger.info({
      msg: `Using pinned URL ${version} for ${packageId}`,
      packageId,
      version,
    });
    return version;
  }

  const url = new URL(`${fullName}/-/${packageName}-${version}.tgz`, registry);
  logger.debug({
    msg: `Resolved URL ${url.toString()} for ${packageId}`,
    packageId,
    url,
  });
  return url;
};
