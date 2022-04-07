import { StringMap, Primitive, TypeResult } from "./common";

type SendStrapiContextFunction = (...args: unknown[]) => void;

type ThrowStrapiContextFunction = (...args: unknown[]) => void;

export type StrapiRequestContext<
  TBody = StringMap<string | number>,
  TQuery = StringMap<string | number>,
  TParams = StringMap<string | number>
> = {
  request: StrapiRequest<TBody>;
  query: TQuery;
  params: TParams;
  send: SendStrapiContextFunction;
  throw: ThrowStrapiContextFunction;
};

export type StrapiRequest<TBody extends {}> = {
  body?: TBody;
};

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

type StrapiQueryParamsParsedFilterValue =
  | Primitive
  | {
      [key: string]: StrapiQueryParamsParsedFilterValue;
    };

export type StrapiQueryParamsParsedFilters = {
  [key: string]: StrapiQueryParamsParsedFilterValue;
};
