// SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, test } from "vitest";
import { defaultRegistry, registryUrlForPackage } from "./registry.js";

describe("registry", function () {
  describe("registryUrlForPackage()", function () {
    test("should handle scoped packages", function () {
      expect(registryUrlForPackage("@types/node@24.10.1").toString()).toBe(
        `${defaultRegistry}/@types/node/-/node-24.10.1.tgz`,
      );
      expect(
        registryUrlForPackage("@pnpm/foo.bar@12.34.56-beta.1").toString(),
      ).toBe(`${defaultRegistry}/@pnpm/foo.bar/-/foo.bar-12.34.56-beta.1.tgz`);
    });
    test("should handle unscoped packages", function () {
      expect(registryUrlForPackage("typescript@1.2.3").toString()).toBe(
        `${defaultRegistry}/typescript/-/typescript-1.2.3.tgz`,
      );
      expect(registryUrlForPackage("date-fns@0.0.0-beta.0").toString()).toBe(
        `${defaultRegistry}/date-fns/-/date-fns-0.0.0-beta.0.tgz`,
      );
    });
    test("should handle pinned tarball", function () {
      expect(
        registryUrlForPackage(
          "foobar@https://example.com/foobar-1.2.3.tgz",
        ).toString(),
      ).toBe(`https://example.com/foobar-1.2.3.tgz`);
      expect(
        registryUrlForPackage(
          "foobar@https://user:pass@private.example.com/foobar-1.2.3.tgz",
        ).toString(),
      ).toBe(`https://user:pass@private.example.com/foobar-1.2.3.tgz`);
    });
  });
});
