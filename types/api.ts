import { StringMap, OnlyStrings, TypeResult, Primitive } from "@strapi/typed";

declare module "@strapi/strapi" {
  type SendStrapiContextFunction = (...args: unknown[]) => void;

  type ThrowStrapiContextFunction = (...args: unknown[]) => void;

  type StrapiHTTPErrorConstructor<T = StringMap<unknown>> = (
    message?: string,
    details?: T
  ) => any;

  export type StrapiRequestContext<
    TBody extends {} = StringMap<string | number>,
    TQuery extends {} = StringMap<string | number>,
    TParams extends {} = StringMap<string | number>
  > = {
    request: StrapiRequest<TBody>;
    query: TQuery;
    params: TParams;
    pagination: StrapiPagination;
    sort: StringMap<string | number>;
    state: StrapiRequestContextState;

    send: SendStrapiContextFunction;
    throw: ThrowStrapiContextFunction;

    // @see {https://github.com/jshttp/http-errors#list-of-all-constructors}
    notFound: StrapiHTTPErrorConstructor;
    badRequest: StrapiHTTPErrorConstructor;
    unauthorized: StrapiHTTPErrorConstructor;
    methodNotAllowed: StrapiHTTPErrorConstructor;
    internalServerError: StrapiHTTPErrorConstructor;
    notImplemented: StrapiHTTPErrorConstructor;
  };

  export type StrapiRequest<TBody extends {}> = {
    body?: TBody;
  };

  export type StrapiRequestContextState = {
    user?: StrapiUser;
  };

  export type StrapiRequestQuery<T, TFields = keyof T> = {
    filters?: {
      threadOf?: number | string | null;
      [key: string]: any;
    } & {};
    populate?: StrapiRequestQueryPopulateClause<OnlyStrings<TFields>>;
    sort?: StringMap<any>;
    fields?: StrapiRequestQueryFieldsClause<OnlyStrings<TFields>>;
    pagination?: StrapiPagination;
  };

  export type StrapiRequestQueryFieldsClause<TKeys extends string = string> =
    | Array<TKeys>
    | "*";

  export type StrapiRequestQueryPopulateClause<TKeys extends string = string> =
    PopulateClause<TKeys>;
  interface ISendStrapiContextFunction {
    (...args: unknown[]): void;
  }

  interface IThrowStrapiContextFunction {
    (...args: unknown[]): void;
  }

  export interface IStrapiRequestContext<
    TBody extends {} = StringMap<string | number>,
    TQuery extends {} = StringMap<string | number>,
    TParams extends {} = StringMap<string | number>
  > {
    request: StrapiRequest<TBody>;
    query: TQuery;
    params: TParams;
    pagination: StrapiPagination;
    sort: StringMap<string | number>;
    state: StrapiRequestContextState;

    send: ISendStrapiContextFunction;
    throw: IThrowStrapiContextFunction;
  }

  export interface IStrapiController<
    TBody extends {} = StringMap<string | number>,
    TQuery extends {} = StringMap<string | number>,
    TParams extends {} = StringMap<string | number>,
    TResult = unknown
  > {
    (ctx: IStrapiRequestContext<TBody, TQuery, TParams>): TResult;
  }

  export interface IStrapiRequestQueryFiltersExtra {}

  export interface IStrapiRequestQuery<T, TFields = keyof T> {
    filters?: {
      [key: string]: any;
    } & IStrapiRequestQueryFiltersExtra;
    populate?: StrapiRequestQueryPopulateClause<OnlyStrings<TFields>>;
    sort?: StringMap<any>;
    fields?: StrapiRequestQueryFieldsClause<OnlyStrings<TFields>>;
    pagination?: StrapiPagination;
  }

  export type StrapiPagination = {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
    withCount?: boolean | string;
  };

  export type StrapiResponseMetaPagination = TypeResult<
    Pick<StrapiPagination, "page" | "pageSize" | "start" | "limit"> & {
      pageCount?: number;
      total?: number;
    }
  >;

  export type StrapiResponseMeta = {
    pagination: StrapiResponseMetaPagination;
  };

  export type StrapiPaginatedResponse<T> = {
    data: Array<T>;
    meta?: StrapiResponseMeta;
  };

  export type StrapiQueryParams = StringMap<string>;

  export type StrapiQueryParamsParsed = StringMap<Primitive>;

  export type StrapiQueryParamsParsedOrderBy = string | Array<string>;

  type StrapiQueryParamsParsedFilterValue<TKeys extends string = string> =
    | Primitive
    | Partial<Record<TKeys, unknown>>;

  export type StrapiQueryParamsParsedFilters<
    TValue,
    TKeys = keyof TValue
  > = Partial<
    Record<
      OnlyStrings<TKeys>,
      StrapiQueryParamsParsedFilterValue<OnlyStrings<TKeys>>
    >
  >;
}
