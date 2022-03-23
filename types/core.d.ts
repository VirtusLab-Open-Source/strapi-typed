import { Map } from "./common"
import { StrapiContentTypeSchema } from "./contentType"

export interface IStrapi {
    config: StrapiConfigContainer
    EE(): Function
    services(): Map<StrapiService>
    service(uid: string): StrapiService
    controllers(): Map<StrapiController>
    controller(uid: string): StrapiController
    contentTypes(): Map<StrapiContentType>
    contentType(name: string): StrapiContentType
    policies(): Map<StrapiPolicy>
    policy(name: string): StrapiPolicy
    middlewares(): Map<StrapiMiddleware>
    middleware(name: string): StrapiMiddleware
    plugins(): Map<StrapiPlugin>
    plugin(name: string): StrapiPlugin
    hooks(): Map<StrapiHook>
    hook(name: string): StrapiHook
    api(): Map<StrapiApi>
    api(name: string): StrapiApi
    auth(): StrapiAuth
    getModel<T>(uid: string): StrapiContentType<T>
    query<T>(uid: string): StrapiDBQuery<T>
    store(props: StrapiStoreQuery): StrapiStore

    start: Function
    destroy: Function
    sendStartupTelemetry: Function
    openAdmin: Function
    postListen: Function
    listen: Function
    stopWithError: Function
    stop: Function
    loadAdmin: Function
    loadPlugins: Function
    loadPolicies: Function
    loadAPIs: Function
    loadComponents: Function
    loadMiddlewares: Function
    loadApp: Function
    registerInternalHooks: Function
    register: Function
    bootstrap: Function
    load: Function
    startWebhooks: Function
    reload: Function
    runLifecyclesFunctions: Function

    db: StrapiDB
    admin: StrapiAdmin
    log: StrapiLog
}

export type StrapiService = any;
export type StrapiController = any;
export type StrapiMiddleware = Object;
export type StrapiContentType<T extends StrapiContentTypeSchema> = T | Object;
export type StrapiPolicy = Object;
export type StrapiHook = Object;
export type StrapiApi = Object;
export type StrapiAuth = Object;
export type StrapiPlugin = {
    service(name: string): StrapiService
    controller(name: string): StrapiController
    config: StrapiConfigContainer
    contentTypes: Map<any>
};

export type StrapiPluginConfig<Type> = {
    [Property in keyof Type]: Type[Property];
};

export type StrapiConfigContainer = Map<any> & {
    get: Function
}

export type StrapiStore = {
    get: Function
    set: Function
    delete: Function
}

export type StrapiStoreQuery = {
    type: string
    name?: string
};

export type StrapiDB = {
    query<T>(uid: string): StrapiDBQuery<T>
};

export type StrapiDBQuery<T> = {
    findOne(args: number | string | StrapiDBQueryArgs): Promise<T>
    findMany(args: StrapiDBQueryArgs): Promise<Array<T>>
    findWithCount(args: StrapiDBQueryArgs): Promise<[items: Array<T>, count: number]>
    create(args: StrapiDBQueryArgs): Promise<T>
    createMany(args: StrapiDBQueryArgs): Promise<Array<T>>
    update(args: StrapiDBQueryArgs): Promise<T>
    updateMany(args: StrapiDBQueryArgs): Promise<Array<T>>
    delete(args: StrapiDBQueryArgs): Promise<T>
    deleteMany(args: StrapiDBQueryArgs): Promise<Array<T>>
    count(args: StrapiDBQueryArgs): number
};

export type StrapiDBQueryArgs = {
    where?: Map<>
    data?: any
    offset?: number
    limit?: number
    populate?: any
    orderBy?: string | Array<any>
}

export type StrapiAdmin = any

export type StrapiLog = {
    log: Function
    error: Function
    warn: Function 
};

export type StrapiRoute = {
    method: Method
    path: string
    handler: string
    config: StrapiRouteConfig
};

export type StrapiRouteConfig = {
    policies: Array<string>
};

export type StrapiAdminUser = any;

export type StrapiUser = any;

export type StrapiContext = {
    strapi: IStrapi
}

