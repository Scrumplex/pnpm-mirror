// SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, test } from "vitest";
import { urlToCachePath } from "./util.js";

describe("util", function () {
  describe("#urlToCachePath()", function () {
    test("should handle @types/node@24.10.1", function () {
      expect(
        urlToCachePath(
          "https://registry.npmjs.org/@types/node/-/node-24.10.1.tgz",
        ),
      ).toBe("https/registry.npmjs.org/@types/node/-/node-24.10.1.tgz");
      expect(
        urlToCachePath(
          new URL("https://registry.npmjs.org/@types/node/-/node-24.10.1.tgz"),
        ),
      ).toBe("https/registry.npmjs.org/@types/node/-/node-24.10.1.tgz");
    });
  });
});
