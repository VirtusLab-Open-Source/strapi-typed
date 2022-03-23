import { Primitive } from "./common";

export type StrapiPagination = {
    page?: number
    pageSize?: number
    start?: number
    limit?: number
    withCount?: boolean | string
};

export type StrapiResponseMeta = {
    pagination: Pick<StrapiPagination, 'page' | 'pageSize' |'start' | 'limit'> & { 
        pageCount?: number
        total?: number
    }
};

export type StrapiPaginatedResponse<T> = {
    data: Array<T>
    meta?: StrapiResponseMeta
};


export type StrapiQueryParams = {
    [key: string]: string
};

export type StrapiQueryParamsParsed = {
    [key: string]: Primitive
};

export type StrapiQueryParamsParsedOrderBy = string | Array<string>;

type StrapiQueryParamsParsedFilterValue = Primitive | {
    [key: string]: StrapiQueryParamsParsedFilterValue;
};

export type StrapiQueryParamsParsedFilters = {
    [key: string]: StrapiQueryParamsParsedFilterValue;
};