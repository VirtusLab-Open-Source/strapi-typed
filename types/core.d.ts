import { EventEmitter } from "events";
import { HTTPMethod, Primitive, Id, StringMap, TypeResult } from "./common";
import { StrapiContentTypeSchema } from "./contentType";
import { OnlyStrings } from "./utils";

export interface IStrapi {
    config: StrapiConfigContainer;
    EE(): Function;
    get services(): StringMap<StrapiService>;
    service(uid: string): StrapiService;
    get controllers(): StringMap<StrapiController>;
    controller(uid: string): StrapiController;
    get contentTypes(): StringMap<StrapiContentType>;
    contentType(name: string): StrapiContentType;
    get policies(): StringMap<StrapiPolicy>;
    policy(name: string): StrapiPolicy;
    get middlewares(): StringMap<StrapiMiddleware>;
    middleware(name: string): StrapiMiddleware;
    get plugins(): StringMap<StrapiPlugin>;
    plugin(name: string): StrapiPlugin;
    get hooks(): StringMap<StrapiHook>;
    hook(name: string): StrapiHook;
    api(): StringMap<StrapiApi>;
    api(name: string): StrapiApi;
    auth(): StrapiAuth;
    getModel<T>(uid: string): StrapiContentType<T>;
    query<T>(uid: string): StrapiDBQuery<T>;
    store(props: StrapiStoreQuery): StrapiStore;
    get components(): StringMap<any>;

    start: Function;
    destroy: Function;
    sendStartupTelemetry: Function;
    openAdmin: Function;
    postListen: Function;
    listen: Function;
    stopWithError: Function;
    stop: Function;
    loadAdmin: Function;
    loadPlugins: Function;
    loadPolicies: Function;
    loadAPIs: Function;
    loadComponents: Function;
    loadMiddlewares: Function;
    loadApp: Function;
    registerInternalHooks: Function;
    register: Function;
    bootstrap: Function;
    load: Function;
    startWebhooks: Function;
    webhookRunner: StrapiWebhookRunner;
    webhookStore: StrapiWebhookStore;
    reload: Function;
    runLifecyclesFunctions: Function;

    db: StrapiDB;
    admin: StrapiAdmin;
    log: StrapiLog;
}

export type StrapiEvents = `${'entry' | 'media'}.${StrapiEventsCrudFlow}` | `entry.${StrapiEventsPublishFlow}`;
type StrapiEventsCrudFlow = 'create' | 'update' | 'delete';
type StrapiEventsPublishFlow = 'publish' | 'unpublish';

export type StrapiService = any;
export type StrapiController = any;
export type StrapiMiddleware = Object;
export type StrapiContentType<T extends StrapiContentTypeSchema> = T | Object;
export type StrapiPolicy = Object;
export type StrapiHook = Object;

export type StrapiWebhook = {
  id?: Id,
  name: string,
  type: string,
  url: string,
  headers: StringMap<string>,
  events: StrapiEvents[],
  enabled: boolean,
} 
export type StrapiWebhookRunner = {
  config: StringMap<unknown>,
  eventHub: EventEmitter,
  listeners: Map<StrapiEvents, Function>,
  logger: unknown,
  queue: unknown,
  webhooksMap: Map<StrapiEvents, StrapiWebhook[]>,
};
export type StrapiWebhookStore = {
  createWebhook: (data: StrapiWebhook) => any
  deleteWebhook: (id) => any
  findWebhook: (id) => StrapiWebhook
  findWebhooks: () => StrapiWebhook[]
  updateWebhook: (data: StrapiWebhook) => any
}

export type StrapiApi = Object;
export type StrapiAuth = Object;
export type StrapiPlugin = {
    get services(): StringMap<StrapiService>;
    service(uid: string): StrapiService;
    get controllers(): StringMap<StrapiController>;
    controller(name: string): StrapiController;
    get contentTypes(): StringMap<any>;
    contentType(name: string): StrapiContentType;
    config(name: string): any;
};

export type StrapiPluginConfig<T> = TypeResult<T>;

export type StrapiConfigContainer = StringMap<any> & {
    get: Function;
};

export type StrapiStore = {
    get: Function;
    set: Function;
    delete: Function;
};

export type StrapiStoreQuery = {
    type: string;
    name?: string;
};

export type StrapiDB = {
    query<T>(uid: string): StrapiDBQuery<T>;
};

export type StrapiDBQuery<TValue, TKeys = keyof TValue> = {
    findOne(args: number | string | StrapiDBQueryArgs<TKeys>): Promise<TValue>;
    findMany(args?: StrapiDBQueryArgs<TKeys>): Promise<Array<TValue>>;
    findWithCount(
        args: StrapiDBQueryArgs<TKeys>
    ): Promise<[items: Array<TValue>, count: number]>;
    create(args: StrapiDBQueryArgs<TKeys>): Promise<TValue>;
    createMany(args: StrapiDBQueryArgs<TKeys>): Promise<Array<TValue>>;
    update(args: StrapiDBQueryArgs<TKeys>): Promise<TValue>;
    updateMany(args: StrapiDBQueryArgs<TKeys>): Promise<Array<TValue>>;
    delete(args: StrapiDBQueryArgs<TKeys>): Promise<TValue>;
    deleteMany(args: StrapiDBQueryArgs<TKeys>): Promise<Array<TValue>>;
    count(args?: StrapiDBQueryArgs<TKeys>): number;
};

// https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html#logical-operators

type EqualWhereOperator<T = unknown> = { $eq: T };
type NotEqualWhereOperator<T = unknown> = { $ne: T };
type InWhereOperator<T = string> = { $in: Array<T> };
type NotInWhereOperator<T = string> = { $notIn: Array<T> };
type LessThanWhereOperator = { $lt: number };
type LessThanEqualWhereOperator = { $lte: number };
type GreaterThanWhereOperator = { $gt: number };
type GreaterThanEqualWhereOperator = { $gte: number };
type BetweenWhereOperator = { $between: Array<number> };
type ContainsWhereOperator = { $contains: string };
type NotContainsWhereOperator = { $notContains: string };
type ContainsCaseInsensitiveWhereOperator = { $containsi: string };
type NotContainsCaseInsensitiveWhereOperator = { $notContainsi: string };
type StartsWithWhereOperator = { $startsWith: string };
type EndsWithWhereOperator = { $endsWith: string };
type EndsWithWhereOperator = { $endsWith: string };
type IsNullWhereOperator = { $null: boolean };
type IsNotNullWhereOperator = { $notNull: boolean };
type NotWhereOperator<TKey extends string, TValue> = {
    $not: {
        [TKey]: [TValue];
    };
};
type AndWhereOperator<T> = { $and: T[] };
type OrWhereOperator<T> = { $or: T[] };

type WhereOperator<T = unknown> =
    | T
    | EqualWhereOperator<T>
    | NotEqualWhereOperator<T>
    | InWhereOperator<T>
    | NotInWhereOperator<T>
    | LessThanWhereOperator
    | LessThanEqualWhereOperator
    | GreaterThanWhereOperator
    | GreaterThanEqualWhereOperator
    | BetweenWhereOperator
    | ContainsWhereOperator
    | NotContainsWhereOperator
    | ContainsCaseInsensitiveWhereOperator
    | NotContainsCaseInsensitiveWhereOperator
    | StartsWithWhereOperator
    | EndsWithWhereOperator
    | EndsWithWhereOperator
    | IsNullWhereOperator
    | IsNotNullWhereOperator;

type WhereClause<TKeys extends string = string, TValues = Primitive> = Partial<
    Record<TKeys, WhereOperator<TValues>> &
    OrWhereOperator<Record<TKeys, WhereOperator<TValues>>> &
    AndWhereOperator<Record<TKeys, WhereOperator<TValues>>>
>;

type PopulateClause<TKeys extends string = string> = 
    Partial<Record<TKeys, boolean | Array<string> | StringMap<unknown>>> |
    Array<TKeys> | 
    boolean;


type SelectClause<TKeys extends string = string> = TKeys | Array<TKeys> | '*';

export type StrapiDBQueryArgs<TFields extends string = string, TData = unknown> = {
    select?: SelectClause<OnlyStrings<TFields>>;
    where?: WhereClause<OnlyStrings<TFields>>;
    data?: TData;
    offset?: number;
    limit?: number;
    populate?: PopulateClause<OnlyStrings<TFields>>;
    orderBy?: string | Array<unknown>;
};

export type StrapiAdmin = any;

export type StrapiLog = {
    log: Function;
    error: Function;
    warn: Function;
};

export type StrapiRoute = {
    method: HTTPMethod;
    path: string;
    handler: string;
    config: StrapiRouteConfig;
};

export type StrapiRouteConfig = {
    policies: Array<string>;
};

export type StrapiAdminUser = any;

export type StrapiUser = any;

export type StrapiContext = {
    strapi: IStrapi;
};
