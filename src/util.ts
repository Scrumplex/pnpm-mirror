// SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { pino } from "pino";

export const getGlobalLogger = () => {
  return pino({
    name: "pnpm-mirror",
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    timestamp: false,
    transport: {
      target: "pino-pretty",
      options: {
        ignore: "pid,hostname",
      },
    },
  });
};

export const urlToCachePath = (url: string | URL) => {
  if (!(url instanceof URL)) {
    url = new URL(url);
  }

  // url.protocol includes the colon. We just need the scheme name
  const scheme = url.protocol.substring(0, url.protocol.length - 1);

  return `${scheme}/${url.hostname}${url.pathname}`;
};
