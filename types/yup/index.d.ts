// Type definitions for yup 0.26
// Project: https://github.com/jquense/yup
// Definitions by: Dominik Hardtke <https://github.com/dhardtke>,
//                 Vladyslav Tserman <https://github.com/vtserman>,
//                 Moreton Bay Regional Council <https://github.com/MoretonBayRC>,
//                 Sindre Seppola <https://github.com/sseppola>
//                 Yash Kulshrestha <https://github.com/YashdalfTheGray>
//                 Vincent Pizzo <https://github.com/vincentjames501>
//                 Robert Bullen <https://github.com/robertbullen>
//                 Yusuke Sato <https://github.com/sat0yu>
//                 Dan Rumney <https://github.com/dancrumb>
//                 Desmond Koh <https://github.com/deskoh>
//                 Maurice de Beijer <https://github.com/mauricedb>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

export function reach<T>(
    schema: Schema<T>,
    path: string,
    value?: any,
    context?: any
): Schema<T>;
export function addMethod<T extends Schema<any>>(
    schemaCtor: AnySchemaConstructor,
    name: string,
    method: (this: T, ...args: any[]) => T
): void;
export function ref(path: string, options?: { contextPrefix: string }): Ref;
export function lazy<T>(fn: (value: T) => Schema<T>): Lazy;
export function setLocale(customLocale: LocaleObject): void;
export function isSchema(obj: any): obj is Schema<any>;

export const mixed: MixedSchemaConstructor;
export const string: StringSchemaConstructor;
export const number: NumberSchemaConstructor;
export const boolean: BooleanSchemaConstructor;
export const bool: BooleanSchemaConstructor;
export const date: DateSchemaConstructor;
export const array: ArraySchemaConstructor;
export const object: ObjectSchemaConstructor;

export type AnySchemaConstructor =
    | MixedSchemaConstructor
    | StringSchemaConstructor
    | NumberSchemaConstructor
    | BooleanSchemaConstructor
    | DateSchemaConstructor
    | ArraySchemaConstructor
    | ObjectSchemaConstructor;

export type TestOptionsMessage =
    | string
    | ((params: object & Partial<TestMessageParams>) => string);

export interface Schema<T> {
    clone(): this;
    label(label: string): this;
    meta(metadata: any): this;
    meta(): any;
    describe(): SchemaDescription;
    concat(schema: this): this;
    validate(value: any, options?: ValidateOptions): Promise<T>;
    validateSync(value: any, options?: ValidateOptions): T;
    validateAt(path: string, value: T, options?: ValidateOptions): Promise<T>;
    validateSyncAt(path: string, value: T, options?: ValidateOptions): T;
    isValid(value: any, options?: any): Promise<boolean>;
    isValidSync(value: any, options?: any): value is T;
    cast(value: any, options?: any): T;
    isType(value: any): value is T;
    strict(isStrict: boolean): this;
    strip(strip: boolean): this;
    withMutation(fn: (current: this) => void): void;
    default(value: any): this;
    default(): T;
    typeError(message?: TestOptionsMessage): this;
    oneOf(arrayOfValues: any[], message?: TestOptionsMessage): this;
    notOneOf(arrayOfValues: any[], message?: TestOptionsMessage): this;
    when(keys: string | any[], builder: WhenOptions<this>): this;
    test(
        name: string,
        message:
            | string
            | ((params: object & Partial<TestMessageParams>) => string),
        test: (
            this: TestContext,
            value?: any
        ) => boolean | ValidationError | Promise<boolean | ValidationError>,
        callbackStyleAsync?: boolean
    ): this;
    test(options: TestOptions): this;
    transform(fn: TransformFunction<this>): this;
}

export interface MixedSchemaConstructor {
    (): MixedSchema;
    new (options?: { type?: string; [key: string]: any }): MixedSchema;
}

export interface MixedSchema<T = any> extends Schema<T> {
    nullable(isNullable?: true): MixedSchema<T | null>;
    nullable(isNullable: false): MixedSchema<Exclude<T, null>>;
    nullable(isNullable?: boolean): MixedSchema<T>;
    required(message?: TestOptionsMessage): MixedSchema<Exclude<T, undefined>>;
    notRequired(): MixedSchema<T | undefined>;
}

export interface StringSchemaConstructor {
    (): StringSchema;
    new (): StringSchema;
}

export interface StringSchema<T extends string | null | undefined = string>
    extends Schema<T> {
    length(limit: number | Ref, message?: TestOptionsMessage): StringSchema<T>;
    min(limit: number | Ref, message?: TestOptionsMessage): StringSchema<T>;
    max(limit: number | Ref, message?: TestOptionsMessage): StringSchema<T>;
    matches(
        regex: RegExp,
        messageOrOptions?:
            | TestOptionsMessage
            | { message?: TestOptionsMessage; excludeEmptyString?: boolean }
    ): StringSchema<T>;
    email(message?: TestOptionsMessage): StringSchema<T>;
    url(message?: TestOptionsMessage): StringSchema<T>;
    ensure(): StringSchema<T>;
    trim(message?: TestOptionsMessage): StringSchema<T>;
    lowercase(message?: TestOptionsMessage): StringSchema<T>;
    uppercase(message?: TestOptionsMessage): StringSchema<T>;
    nullable(isNullable?: true): StringSchema<T | null>;
    nullable(isNullable: false): StringSchema<Exclude<T, null>>;
    nullable(isNullable?: boolean): StringSchema<T>;
    required(message?: TestOptionsMessage): StringSchema<Exclude<T, undefined>>;
    notRequired(): StringSchema<T | undefined>;
}

export interface NumberSchemaConstructor {
    (): NumberSchema;
    new (): NumberSchema;
}

export interface NumberSchema<T extends number | null | undefined = number>
    extends Schema<T> {
    min(limit: number | Ref, message?: TestOptionsMessage): NumberSchema<T>;
    max(limit: number | Ref, message?: TestOptionsMessage): NumberSchema<T>;
    lessThan(
        limit: number | Ref,
        message?: TestOptionsMessage
    ): NumberSchema<T>;
    moreThan(
        limit: number | Ref,
        message?: TestOptionsMessage
    ): NumberSchema<T>;
    positive(message?: TestOptionsMessage): NumberSchema<T>;
    negative(message?: TestOptionsMessage): NumberSchema<T>;
    integer(message?: TestOptionsMessage): NumberSchema<T>;
    truncate(): NumberSchema<T>;
    round(type: "floor" | "ceil" | "trunc" | "round"): NumberSchema<T>;
    nullable(isNullable?: true): NumberSchema<T | null>;
    nullable(isNullable: false): NumberSchema<Exclude<T, null>>;
    nullable(isNullable?: boolean): NumberSchema<T>;
    required(message?: TestOptionsMessage): NumberSchema<Exclude<T, undefined>>;
    notRequired(): NumberSchema<T | undefined>;
}

export interface BooleanSchemaConstructor {
    (): BooleanSchema;
    new (): BooleanSchema;
}

export interface BooleanSchema<T extends boolean | null | undefined = boolean>
    extends Schema<T> {
    nullable(isNullable?: true): BooleanSchema<T | null>;
    nullable(isNullable: false): BooleanSchema<Exclude<T, null>>;
    nullable(isNullable?: boolean): BooleanSchema<T>;
    required(
        message?: TestOptionsMessage
    ): BooleanSchema<Exclude<T, undefined>>;
    notRequired(): BooleanSchema<T | undefined>;
}

export interface DateSchemaConstructor {
    (): DateSchema;
    new (): DateSchema;
}

export interface DateSchema<T extends Date | null | undefined = Date>
    extends Schema<T> {
    min(
        limit: Date | string | Ref,
        message?: TestOptionsMessage
    ): DateSchema<T>;
    max(
        limit: Date | string | Ref,
        message?: TestOptionsMessage
    ): DateSchema<T>;
    nullable(isNullable?: true): DateSchema<T | null>;
    nullable(isNullable: false): DateSchema<Exclude<T, null>>;
    nullable(isNullable?: boolean): DateSchema<T>;
    required(message?: TestOptionsMessage): DateSchema<Exclude<T, undefined>>;
    notRequired(): DateSchema<T | undefined>;
}

export interface ArraySchemaConstructor {
    <T>(schema?: Schema<T>): ArraySchema<T>;
    new (): ArraySchema<{}>;
}

interface BasicArraySchema<T extends any[] | null | undefined>
    extends Schema<T> {
    min(limit: number | Ref, message?: TestOptionsMessage): this;
    max(limit: number | Ref, message?: TestOptionsMessage): this;
    ensure(): this;
    compact(
        rejector?: (
            value: InferredArrayType<T>,
            index: number,
            array: Array<InferredArrayType<T>>
        ) => boolean
    ): this;
}

export interface NotRequiredNullableArraySchema<T>
    extends BasicArraySchema<T[] | null | undefined> {
    of<U>(type: Schema<U>): NotRequiredNullableArraySchema<U>;
    nullable(isNullable?: true): NotRequiredNullableArraySchema<T>;
    nullable(isNullable: false): NotRequiredArraySchema<T>;
    nullable(isNullable?: boolean): ArraySchema<T>;
    required(message?: TestOptionsMessage): NullableArraySchema<T>;
    notRequired(): NotRequiredNullableArraySchema<T>;
}

export interface NullableArraySchema<T> extends BasicArraySchema<T[] | null> {
    of<U>(type: Schema<U>): NullableArraySchema<U>;
    nullable(isNullable?: true): NullableArraySchema<T>;
    nullable(isNullable: false): ArraySchema<T>;
    nullable(isNullable?: boolean): ArraySchema<T>;
    required(message?: TestOptionsMessage): NullableArraySchema<T>;
    notRequired(): NotRequiredNullableArraySchema<T>;
}

export interface NotRequiredArraySchema<T>
    extends BasicArraySchema<T[] | undefined> {
    of<U>(type: Schema<U>): NotRequiredArraySchema<U>;
    nullable(isNullable?: true): NotRequiredNullableArraySchema<T>;
    nullable(isNullable: false): NotRequiredArraySchema<T>;
    nullable(isNullable: boolean): ArraySchema<T>;
    required(message?: TestOptionsMessage): ArraySchema<T>;
    notRequired(): NotRequiredArraySchema<T>;
}

export interface ArraySchema<T> extends BasicArraySchema<T[]> {
    of<U>(type: Schema<U>): ArraySchema<U>;
    nullable(isNullable?: true): NullableArraySchema<T>;
    nullable(isNullable: false | boolean): ArraySchema<T>;
    required(message?: TestOptionsMessage): ArraySchema<T>;
    notRequired(): NotRequiredArraySchema<T>;
}

export type ObjectSchemaDefinition<T extends object | null | undefined> = {
    [field in keyof T]: Schema<T[field]> | Ref
};

/**
 * Merges two interfaces. For properties in common, property types from `U` trump those of `T`.
 * This is conducive to the functionality of
 * [yup's `object.shape()` method](https://www.npmjs.com/package/yup#objectshapefields-object-nosortedges-arraystring-string-schema).
 */
export type Shape<T extends object | null | undefined, U extends object> = {
    [P in keyof T]: P extends keyof U ? U[P] : T[P]
} &
    U;

export interface ObjectSchemaConstructor {
    <T extends object>(fields?: ObjectSchemaDefinition<T>): ObjectSchema<T>;
    new (): ObjectSchema<{}>;
}

export interface ObjectSchema<T extends object | null | undefined = object>
    extends Schema<T> {
    shape<U extends object>(
        fields: ObjectSchemaDefinition<U>,
        noSortEdges?: Array<[string, string]>
    ): ObjectSchema<Shape<T, U>>;
    from(fromKey: string, toKey: string, alias?: boolean): ObjectSchema<T>;
    noUnknown(
        onlyKnownKeys?: boolean,
        message?: TestOptionsMessage
    ): ObjectSchema<T>;
    transformKeys(callback: (key: any) => any): void;
    camelCase(): ObjectSchema<T>;
    constantCase(): ObjectSchema<T>;
    nullable(isNullable?: true): ObjectSchema<T | null>;
    nullable(isNullable: false): ObjectSchema<Exclude<T, null>>;
    nullable(isNullable?: boolean): ObjectSchema<T>;
    required(message?: TestOptionsMessage): ObjectSchema<Exclude<T, undefined>>;
    notRequired(): ObjectSchema<T | undefined>;
}

export type TransformFunction<T> = (
    this: T,
    value: any,
    originalValue: any
) => any;

export interface WhenOptionsBuilderFunction<T> {
    (value: any, schema: T): T;
    (v1: any, v2: any, schema: T): T;
    (v1: any, v2: any, v3: any, schema: T): T;
    (v1: any, v2: any, v3: any, v4: any, schema: T): T;
}

export type WhenOptionsBuilderObjectIs =
    | ((...values: any[]) => boolean)
    | boolean
    | number
    | null
    | object
    | string;

export type WhenOptionsBuilderObject =
    | {
          is: WhenOptionsBuilderObjectIs;
          then: any;
          otherwise: any;
      }
    | object;

    export type WhenOptions<T> =
    | WhenOptionsBuilderFunction<T>
    | WhenOptionsBuilderObject;

export interface TestContext {
    path: string;
    options: ValidateOptions;
    parent: any;
    schema: Schema<any>;
    resolve: (value: any) => any;
    createError: (params?: {
        path?: string;
        message?: string;
    }) => ValidationError;
}

export interface ValidateOptions {
    /**
     * Only validate the input, and skip and coercion or transformation. Default - false
     */
    strict?: boolean;
    /**
     * Teturn from validation methods on the first error rather than after all validations run. Default - true
     */
    abortEarly?: boolean;
    /**
     * Remove unspecified keys from objects. Default - false
     */
    stripUnknown?: boolean;
    /**
     * When false validations will not descend into nested schema (relevant for objects or arrays). Default - true
     */
    recursive?: boolean;
    /**
     * Any context needed for validating schema conditions (see: when())
     */
    context?: object;
}

export interface TestMessageParams {
    path: string;
    value: any;
    originalValue: any;
    label: string;
}

export interface TestOptions {
    /**
     * Unique name identifying the test
     */
    name?: string;

    /**
     * Test function, determines schema validity
     */
    test: (
        this: TestContext,
        value: any
    ) => boolean | ValidationError | Promise<boolean | ValidationError>;

    /**
     * The validation error message
     */
    message?: TestOptionsMessage;

    /**
     * Values passed to message for interpolation
     */
    params?: object;

    /**
     * Mark the test as exclusive, meaning only one of the same can be active at once
     */
    exclusive?: boolean;
}

export interface SchemaDescription {
    type: string;
    label: string;
    meta: object;
    tests: Array<{ name: string; params: object }>;
    fields: object;
}

// ValidationError works a lot more like a class vs. a constructor
// function that returns an interface. It's also got a couple of
// static methods and it inherits from the generic Error class in
// the [yup codebase][1].
// [1]: (https://github.com/jquense/yup/blob/master/src/ValidationError.js)
export class ValidationError extends Error {
    name: string;
    message: string;
    value: any;
    /**
     * A string, indicating where there error was thrown. path is empty at the root level.
     */
    path: string;
    type: any;
    /**
     * array of error messages
     */
    errors: string[];

    /**
     * In the case of aggregate errors, inner is an array of ValidationErrors throw earlier in the validation chain.
     */
    inner: ValidationError[];
    params?: object;

    static isError(err: any): err is ValidationError;
    static formatError(
        message: string | ((params?: any) => string),
        params?: any
    ): string | ((params?: any) => string);

    constructor(
        errors: string | string[],
        value: any,
        path: string,
        type?: any
    );
}

// It is tempting to declare `Ref` very simply, but there are problems with these approaches:
//
// * `type Ref = Record<string, any>;` - This is essentially how it was originally declared, but
//    just about any object satisfies this contract, which makes the type declaration too loose to
//    be useful.
//
// * `type Ref = object;` - This is a variation on the previous bullet in that it is too loose.
//
// * `class Ref {}` - This is yet another variation that is too loose.
//
// * `type Ref = void;` - This works and the emitted JavaScript is just fine, but it results in some
//    confusing IntelliSense, e.g it looks like the `ref()` returns `void`, which is not the case.
//
// The solution is twofold. 1.) Declare it as a class with a private constructor to prevent it from
// being instantiated by anything but the `ref()` factory function, and; 2.) declare a private
// readonly property (that yup actually places on the prototype) to force it to be structurally
// incompatible with any other object type.

/**
 * `Ref` is an opaque type that is internal to yup. Creating a `Ref` instance is accomplished via the `ref()` factory
 * function.
 */
export class Ref {
    private constructor();
    private readonly __isYupRef: true;
}

// tslint:disable-next-line:no-empty-interface
export interface Lazy extends Schema<any> {}

export interface FormatErrorParams {
    path: string;
    type: string;
    value?: any;
    originalValue?: any;
}

export type LocaleValue = string | ((params: FormatErrorParams) => string);

export interface LocaleObject {
    mixed?: { [key in keyof MixedSchema]?: string } & { notType?: LocaleValue };
    string?: { [key in keyof StringSchema]?: string };
    number?: { [key in keyof NumberSchema]?: string };
    boolean?: { [key in keyof BooleanSchema]?: string };
    bool?: { [key in keyof BooleanSchema]?: string };
    date?: { [key in keyof DateSchema]?: string };
    array?: { [key in keyof ArraySchema<any>]?: string };
    object?: { [key in keyof ObjectSchema<any>]?: string };
}

export type InferType<T> = T extends Schema<infer P>
    ? InnerInferType<P>
    : never;

// Shut off automatic exporting after this statement
export {};

type KeyOfUndefined<T> = {
    [P in keyof T]-?: undefined extends T[P] ? P : never
}[keyof T];

type RequiredProps<T> = Pick<T, Exclude<keyof T, KeyOfUndefined<T>>>;
type NotRequiredProps<T> = Partial<Pick<T, KeyOfUndefined<T>>>;
type InnerInferType<T> = NotRequiredProps<T> & RequiredProps<T>;
type InferredArrayType<T> = T extends Array<infer U> ? U : T;
