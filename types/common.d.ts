export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type Primitive = string | number | object | boolean | null | undefined;

export type KeyValueSet<T> = {
    [key: string]: T | any
};

export type Context = {
    strapi: IStrapi
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type Map<Type> = {
    [key: string]: Type
};

export type Id = number | string;