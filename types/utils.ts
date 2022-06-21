declare module "@strapi/typed" {
  export type OnlyStrings<T> = T extends string ? T : never;
}
