<!--
SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>

SPDX-License-Identifier: MIT
-->

# pnpm-mirror

Tool to generate local mirrors/caches of dependencies references in
`pnpm-lock.yaml` files. These mirrors/caches can be served by [mitm-cache][].

## Build

Note: This project uses npm for its own packaging in order to allow use of this
tool in ecosystems, such as [nixpkgs][nixpkgs] without needing any
bootstrapping tooling for pnpm packages.

```shell
$ npm ci
$ npm run build
```

## Usage

```shell
$ node dist/index.js [OPTION]...

Required options:
  -p, --path       Path to pnpm-lock.yaml file [required]
  -o, --outputPath Output directory of mirror [required]
```

## License

This project is REUSE compliant. Check file headers!

[mitm-cache]: https://github.com/chayleaf/mitm-cache
[nixpkgs]: https://github.com/NixOS/nixpkgs
