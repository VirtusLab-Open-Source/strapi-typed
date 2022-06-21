<div align="center">
  <h1>Strapi v4 - Types &amp; utilities</h1>
  <p>Basic set of types and utilities for Strapi v4 and plugins creators</p>
  <a href="https://www.npmjs.org/package/strapi-typed">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/VirtusLab-Open-Source/strapi-typed?label=npm&logo=npm">
  </a>
  <a href="https://www.npmjs.org/package/strapi-typed">
    <img src="https://img.shields.io/npm/dm/strapi-typed.svg" alt="Monthly download on NPM" />
  </a>
</div>

---

A developers goodie for [Strapi Headless CMS](https://github.com/strapi/strapi) which provides a basic core set of types &amp; interfaces and generic utilities useful for every plugin creator or team which is extending the core implementation.

## ✨ What's included?

- **Strapi Core:** Basic set of types &amp; interfaces which include `Strapi`, `DB`, `ContentType` and more.
- **Generic utility types:** Useful for plugin creators and teams which are extending Strapi.

## ⏳ Installation

(Use **yarn** to install this dependency within your Strapi project (recommended). [Install yarn with these docs](https://yarnpkg.com/lang/en/docs/install/).)

```bash
yarn add -D strapi-typed@latest
```

After install typings should be automatically available if you import from `@strapi/strapi`.

If you want to use are internal utility types then use

```typescript
import { StringMap, OnlyStrings } from "@strapi/typed";
```

In few place plugin creator or Strapi consumer can extend couple of interfaces to add custom typings

For example

```typescript
declare module '@strapi/strapi' {
  export interface IStrapiRequestQueryFiltersExtra {
    threadOf?: number | string | null;
  }
}
```

Enjoy 🎉

## 🤝 Contributing

Feel free to fork and make a Pull Request to this project. All the input is warmly welcome!

## 👨‍💻 Community support

For general help using Strapi, please refer to [the official Strapi documentation](https://strapi.io/documentation/). For additional help, you can use one of these channels to ask a question:

- [Discord](https://discord.strapi.io/) We're present on official Strapi Discord workspace. Find us by `[VirtusLab]` prefix and DM.
- [Slack - VirtusLab Open Source](https://virtuslab-oss.slack.com) We're present on a public channel #strapi-molecules
- [GitHub](https://github.com/VirtusLab-Open-Source/strapi-typed/issues) (Bug reports, Contributions, Questions and Discussions)
- [E-mail](mailto:strapi@virtuslab.com) - we will respond back as soon as possible

## 📝 License

[MIT License](LICENSE.md) Copyright (c) [VirtusLab Sp. z o.o.](https://virtuslab.com/) &amp; [Strapi Solutions](https://strapi.io/).
