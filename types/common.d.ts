declare module "@strapi/typed" {
  export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

  export type Primitive = string | number | object | boolean | null | undefined;

  export type KeyValueSet<T> = Record<string, T | any>;

  export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

  export type StringMap<Type> = Record<string, Type>;

  export type TypeResult<T> = {
    [K in keyof T]: T[K];
  };

  export type Id = number | string;
}
