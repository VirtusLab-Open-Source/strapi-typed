import { Primitive, StringMap } from "@strapi/typed";

declare module "@strapi/strapi" {
  export type ContentType = "collectionType" | "singleType";

  export interface IStrapiContentTypeInfo {
    singularName: string;
    pluralName: string;
    displayName: string;
    description: string;
  }

  export interface IStrapiContentTypeAttributeValidator {
    required?: boolean;
    max?: number;
    min?: number;
    minLength?: number;
    maxLength?: number;
    private?: boolean;
    configurable?: boolean;
    default?: Primitive;
  }

  export type SimpleStrapiContentTypeAttributeKeys =
    | "string"
    | "text"
    | "richtext"
    | "email"
    | "password"
    | "date"
    | "time"
    | "datetime"
    | "timestamp"
    | "boolean"
    | "integer"
    | "biginteger"
    | "float"
    | "decimal"
    | "json";

  export type SimpleStrapiContentTypeAttribute = {
    type: SimpleStrapiContentTypeAttributeKeys;
  } & IStrapiContentTypeAttributeValidator;

  export type StrapiContentTypeEnumerationAttribute = {
    type: "enumeration";
    enum: Array<string>;
  } & IStrapiContentTypeAttributeValidator;

  export type StrapiContentTypeComponentAttribute = {
    type: "component";
    component: string;
    repeatable?: boolean;
  };

  export type StrapiContentTypeDynamicZoneAttribute = {
    type: "dynamiczone";
    components: Array<string>;
  };

  export type StrapiContentTypeMediaAttribute = {
    type: "media";
    allowedTypes: Array<"images" | "videos" | "files">;
    required?: boolean;
  };

  export type StrapiContentTypeUIDAttribute<T extends string = string> = {
    type: "uid";
    targetField: T;
    options: string;
  };

  export type StrapiContentTypeRelationType =
    | "oneToOne"
    | "oneToMany"
    | "manyToOne"
    | "manyToMany";

  export type StrapiContentTypeRelationAttribute = {
    type: "relation";
    relation: StrapiContentTypeRelationType;
    target: string;
    mappedBy?: string;
    inversedBy?: string;
  };

  export type StrapiContentTypeAttributes<T extends string = string> = Record<
    T,
    | SimpleStrapiContentTypeAttribute
    | StrapiContentTypeEnumerationAttribute
    | StrapiContentTypeComponentAttribute
    | StrapiContentTypeDynamicZoneAttribute
    | StrapiContentTypeRelationAttribute
    | StrapiContentTypeMediaAttribute
  >;

  export type StrapiContentTypeFullSchema<TAttributes extends string = string> =
    {
      kind: ContentType;
      collectionName: string;
      info: IStrapiContentTypeInfo;
      options: StringMap<Primitive>;
      attributes: StrapiContentTypeAttributes<TAttributes>;
      actions: StringMap<unknown>;
      lifecycles: StringMap<unknown>;
      uid: string;
      apiName: string;
    };

  export type StrapiContentTypeSchema<TAttributes extends string = string> =
    Pick<
      StrapiContentTypeFullSchema<TAttributes>,
      "info" | "kind" | "attributes" | "options"
    >;
}
