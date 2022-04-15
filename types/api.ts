import { StringMap, Primitive, TypeResult } from "./common";
import { PopulateClause, StrapiUser } from "./core";
import { OnlyStrings } from "./utils";

type SendStrapiContextFunction = (...args: unknown[]) => void;

type ThrowStrapiContextFunction = (...args: unknown[]) => void;

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
};

export type StrapiRequest<TBody extends {}> = {
  body?: TBody;
};

export type StrapiRequestContextState = {
    user?: StrapiUser
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
}

export type StrapiRequestQueryFieldsClause<TKeys extends string = string> = Array<TKeys> | '*';

export type StrapiRequestQueryPopulateClause<TKeys extends string = string> = PopulateClause<TKeys>;

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

export type StrapiQueryParamsParsedFilters<TValue, TKeys = keyof TValue> = 
Partial<Record<OnlyStrings<TKeys>, StrapiQueryParamsParsedFilterValue<OnlyStrings<TKeys>>>>;
