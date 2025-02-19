/// <amd-module name="@scom/ton-core" />
declare module "@scom/ton-core" {
  type Primitive = string | number | symbol | bigint | boolean | null | undefined;
type Scalars = Primitive | Primitive[];

declare namespace util {
  type AssertEqual<T, U> = (<V>() => V extends T ? 1 : 2) extends <
    V
  >() => V extends U ? 1 : 2
    ? true
    : false;
  export type isAny<T> = 0 extends 1 & T ? true : false;
  export const assertEqual: <A, B>(val: AssertEqual<A, B>) => AssertEqual<A, B>;
  export function assertIs<T>(_arg: T): void;
  export function assertNever(_x: never): never;
  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  export type OmitKeys<T, K extends string> = Pick<T, Exclude<keyof T, K>>;
  export type MakePartial<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;
  export type Exactly<T, X> = T & Record<Exclude<keyof X, keyof T>, never>;
  export const arrayToEnum: <T extends string, U extends [T, ...T[]]>(
    items: U
  ) => { [k in U[number]]: k };
  export const getValidEnumValues: (obj: any) => any[];
  export const objectValues: (obj: any) => any[];
  export const objectKeys: ObjectConstructor["keys"];
  export const find: <T>(arr: T[], checker: (arg: T) => any) => T | undefined;
  export type identity<T> = objectUtil.identity<T>;
  export type flatten<T> = objectUtil.flatten<T>;
  export type noUndefined<T> = T extends undefined ? never : T;
  export const isInteger: NumberConstructor["isInteger"];
  export function joinValues<T extends any[]>(
    array: T,
    separator?: string
  ): string;
  export const jsonStringifyReplacer: (_: string, value: any) => any;
  export {};
}
declare namespace objectUtil {
  export type MergeShapes<U, V> = {
    [k in Exclude<keyof U, keyof V>]: U[k];
  } & V;
  type optionalKeys<T extends object> = {
    [k in keyof T]: undefined extends T[k] ? k : never;
  }[keyof T];
  type requiredKeys<T extends object> = {
    [k in keyof T]: undefined extends T[k] ? never : k;
  }[keyof T];
  export type addQuestionMarks<T extends object, _O = any> = {
    [K in requiredKeys<T>]: T[K];
  } & {
    [K in optionalKeys<T>]?: T[K];
  } & {
    [k in keyof T]?: unknown;
  };
  export type identity<T> = T;
  export type flatten<T> = identity<{
    [k in keyof T]: T[k];
  }>;
  export type noNeverKeys<T> = {
    [k in keyof T]: [T[k]] extends [never] ? never : k;
  }[keyof T];
  export type noNever<T> = identity<{
    [k in noNeverKeys<T>]: k extends keyof T ? T[k] : never;
  }>;
  export const mergeShapes: <U, T>(first: U, second: T) => T & U;
  export type extendShape<A extends object, B extends object> = {
    [K in keyof A as K extends keyof B ? never : K]: A[K];
  } & {
    [K in keyof B]: B[K];
  };
  export {};
}
declare const ZodParsedType: {
  string: "string";
  number: "number";
  bigint: "bigint";
  boolean: "boolean";
  symbol: "symbol";
  undefined: "undefined";
  object: "object";
  function: "function";
  map: "map";
  nan: "nan";
  integer: "integer";
  float: "float";
  date: "date";
  null: "null";
  array: "array";
  unknown: "unknown";
  promise: "promise";
  void: "void";
  never: "never";
  set: "set";
};
type ZodParsedType = keyof typeof ZodParsedType;
declare const getParsedType: (data: any) => ZodParsedType;

type allKeys<T> = T extends any ? keyof T : never;
type inferFlattenedErrors<
  T extends ZodType<any, any, any>,
  U = string
> = typeToFlattenedError<TypeOf<T>, U>;
type typeToFlattenedError<T, U = string> = {
  formErrors: U[];
  fieldErrors: {
    [P in allKeys<T>]?: U[];
  };
};
declare const ZodIssueCode: {
  invalid_type: "invalid_type";
  invalid_literal: "invalid_literal";
  custom: "custom";
  invalid_union: "invalid_union";
  invalid_union_discriminator: "invalid_union_discriminator";
  invalid_enum_value: "invalid_enum_value";
  unrecognized_keys: "unrecognized_keys";
  invalid_arguments: "invalid_arguments";
  invalid_return_type: "invalid_return_type";
  invalid_date: "invalid_date";
  invalid_string: "invalid_string";
  too_small: "too_small";
  too_big: "too_big";
  invalid_intersection_types: "invalid_intersection_types";
  not_multiple_of: "not_multiple_of";
  not_finite: "not_finite";
};
type ZodIssueCode = keyof typeof ZodIssueCode;
type ZodIssueBase = {
  path: (string | number)[];
  message?: string;
};
interface ZodInvalidTypeIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_type;
  expected: ZodParsedType;
  received: ZodParsedType;
}
interface ZodInvalidLiteralIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_literal;
  expected: unknown;
  received: unknown;
}
interface ZodUnrecognizedKeysIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.unrecognized_keys;
  keys: string[];
}
interface ZodInvalidUnionIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_union;
  unionErrors: ZodError[];
}
interface ZodInvalidUnionDiscriminatorIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_union_discriminator;
  options: Primitive[];
}
interface ZodInvalidEnumValueIssue extends ZodIssueBase {
  received: string | number;
  code: typeof ZodIssueCode.invalid_enum_value;
  options: (string | number)[];
}
interface ZodInvalidArgumentsIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_arguments;
  argumentsError: ZodError;
}
interface ZodInvalidReturnTypeIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_return_type;
  returnTypeError: ZodError;
}
interface ZodInvalidDateIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_date;
}
type StringValidation =
  | "email"
  | "url"
  | "emoji"
  | "uuid"
  | "nanoid"
  | "regex"
  | "cuid"
  | "cuid2"
  | "ulid"
  | "datetime"
  | "date"
  | "time"
  | "duration"
  | "ip"
  | "cidr"
  | "base64"
  | "jwt"
  | "base64url"
  | {
      includes: string;
      position?: number;
    }
  | {
      startsWith: string;
    }
  | {
      endsWith: string;
    };
interface ZodInvalidStringIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_string;
  validation: StringValidation;
}
interface ZodTooSmallIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.too_small;
  minimum: number | bigint;
  inclusive: boolean;
  exact?: boolean;
  type: "array" | "string" | "number" | "set" | "date" | "bigint";
}
interface ZodTooBigIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.too_big;
  maximum: number | bigint;
  inclusive: boolean;
  exact?: boolean;
  type: "array" | "string" | "number" | "set" | "date" | "bigint";
}
interface ZodInvalidIntersectionTypesIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_intersection_types;
}
interface ZodNotMultipleOfIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.not_multiple_of;
  multipleOf: number | bigint;
}
interface ZodNotFiniteIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.not_finite;
}
interface ZodCustomIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.custom;
  params?: {
    [k: string]: any;
  };
}
type DenormalizedError = {
  [k: string]: DenormalizedError | string[];
};
type ZodIssueOptionalMessage =
  | ZodInvalidTypeIssue
  | ZodInvalidLiteralIssue
  | ZodUnrecognizedKeysIssue
  | ZodInvalidUnionIssue
  | ZodInvalidUnionDiscriminatorIssue
  | ZodInvalidEnumValueIssue
  | ZodInvalidArgumentsIssue
  | ZodInvalidReturnTypeIssue
  | ZodInvalidDateIssue
  | ZodInvalidStringIssue
  | ZodTooSmallIssue
  | ZodTooBigIssue
  | ZodInvalidIntersectionTypesIssue
  | ZodNotMultipleOfIssue
  | ZodNotFiniteIssue
  | ZodCustomIssue;
type ZodIssue = ZodIssueOptionalMessage & {
  fatal?: boolean;
  message: string;
};
declare const quotelessJson: (obj: any) => string;
type recursiveZodFormattedError<T> = T extends [any, ...any[]]
  ? {
      [K in keyof T]?: ZodFormattedError<T[K]>;
    }
  : T extends any[]
  ? {
      [k: number]: ZodFormattedError<T[number]>;
    }
  : T extends object
  ? {
      [K in keyof T]?: ZodFormattedError<T[K]>;
    }
  : unknown;
type ZodFormattedError<T, U = string> = {
  _errors: U[];
} & recursiveZodFormattedError<NonNullable<T>>;
type inferFormattedError<
  T extends ZodType<any, any, any>,
  U = string
> = ZodFormattedError<TypeOf<T>, U>;
declare class ZodError<T = any> extends Error {
  issues: ZodIssue[];
  get errors(): ZodIssue[];
  constructor(issues: ZodIssue[]);
  format(): ZodFormattedError<T>;
  format<U>(mapper: (issue: ZodIssue) => U): ZodFormattedError<T, U>;
  static create: (issues: ZodIssue[]) => ZodError<any>;
  static assert(value: unknown): asserts value is ZodError;
  toString(): string;
  get message(): string;
  get isEmpty(): boolean;
  addIssue: (sub: ZodIssue) => void;
  addIssues: (subs?: ZodIssue[]) => void;
  flatten(): typeToFlattenedError<T>;
  flatten<U>(mapper?: (issue: ZodIssue) => U): typeToFlattenedError<T, U>;
  get formErrors(): typeToFlattenedError<T, string>;
}
type stripPath<T extends object> = T extends any
  ? util.OmitKeys<T, "path">
  : never;
type IssueData = stripPath<ZodIssueOptionalMessage> & {
  path?: (string | number)[];
  fatal?: boolean;
};
type ErrorMapCtx = {
  defaultError: string;
  data: any;
};
type ZodErrorMap = (
  issue: ZodIssueOptionalMessage,
  _ctx: ErrorMapCtx
) => {
  message: string;
};

declare const errorMap: ZodErrorMap;

declare function setErrorMap(map: ZodErrorMap): void;
declare function getErrorMap(): ZodErrorMap;

declare const makeIssue: (params: {
  data: any;
  path: (string | number)[];
  errorMaps: ZodErrorMap[];
  issueData: IssueData;
}) => ZodIssue;
type ParseParams = {
  path: (string | number)[];
  errorMap: ZodErrorMap;
  async: boolean;
};
type ParsePathComponent = string | number;
type ParsePath = ParsePathComponent[];
declare const EMPTY_PATH: ParsePath;
interface ParseContext {
  readonly common: {
    readonly issues: ZodIssue[];
    readonly contextualErrorMap?: ZodErrorMap;
    readonly async: boolean;
  };
  readonly path: ParsePath;
  readonly schemaErrorMap?: ZodErrorMap;
  readonly parent: ParseContext | null;
  readonly data: any;
  readonly parsedType: ZodParsedType;
}
type ParseInput = {
  data: any;
  path: (string | number)[];
  parent: ParseContext;
};
declare function addIssueToContext(
  ctx: ParseContext,
  issueData: IssueData
): void;
type ObjectPair = {
  key: SyncParseReturnType<any>;
  value: SyncParseReturnType<any>;
};
declare class ParseStatus {
  value: "aborted" | "dirty" | "valid";
  dirty(): void;
  abort(): void;
  static mergeArray(
    status: ParseStatus,
    results: SyncParseReturnType<any>[]
  ): SyncParseReturnType;
  static mergeObjectAsync(
    status: ParseStatus,
    pairs: {
      key: ParseReturnType<any>;
      value: ParseReturnType<any>;
    }[]
  ): Promise<SyncParseReturnType<any>>;
  static mergeObjectSync(
    status: ParseStatus,
    pairs: {
      key: SyncParseReturnType<any>;
      value: SyncParseReturnType<any>;
      alwaysSet?: boolean;
    }[]
  ): SyncParseReturnType;
}
interface ParseResult {
  status: "aborted" | "dirty" | "valid";
  data: any;
}
type INVALID = {
  status: "aborted";
};
declare const INVALID: INVALID;
type DIRTY<T> = {
  status: "dirty";
  value: T;
};
declare const DIRTY: <T>(value: T) => DIRTY<T>;
type OK<T> = {
  status: "valid";
  value: T;
};
declare const OK: <T>(value: T) => OK<T>;
type SyncParseReturnType<T = any> = OK<T> | DIRTY<T> | INVALID;
type AsyncParseReturnType<T> = Promise<SyncParseReturnType<T>>;
type ParseReturnType<T> = SyncParseReturnType<T> | AsyncParseReturnType<T>;
declare const isAborted: (x: ParseReturnType<any>) => x is INVALID;
declare const isDirty: <T>(x: ParseReturnType<T>) => x is OK<T> | DIRTY<T>;
declare const isValid: <T>(x: ParseReturnType<T>) => x is OK<T>;
declare const isAsync: <T>(
  x: ParseReturnType<T>
) => x is AsyncParseReturnType<T>;

declare namespace enumUtil {
  type UnionToIntersectionFn<T> = (
    T extends unknown ? (k: () => T) => void : never
  ) extends (k: infer Intersection) => void
    ? Intersection
    : never;
  type GetUnionLast<T> = UnionToIntersectionFn<T> extends () => infer Last
    ? Last
    : never;
  type UnionToTuple<T, Tuple extends unknown[] = []> = [T] extends [never]
    ? Tuple
    : UnionToTuple<Exclude<T, GetUnionLast<T>>, [GetUnionLast<T>, ...Tuple]>;
  type CastToStringTuple<T> = T extends [string, ...string[]] ? T : never;
  export type UnionToTupleString<T> = CastToStringTuple<UnionToTuple<T>>;
  export {};
}

declare namespace errorUtil {
  type ErrMessage =
    | string
    | {
        message?: string;
      };
  const errToObj: (message?: ErrMessage) => {
    message?: string | undefined;
  };
  const toString: (message?: ErrMessage) => string | undefined;
}

declare namespace partialUtil {
  type DeepPartial<T extends ZodTypeAny> = T extends ZodObject<ZodRawShape>
    ? ZodObject<
        {
          [k in keyof T["shape"]]: ZodOptional<DeepPartial<T["shape"][k]>>;
        },
        T["_def"]["unknownKeys"],
        T["_def"]["catchall"]
      >
    : T extends ZodArray<infer Type, infer Card>
    ? ZodArray<DeepPartial<Type>, Card>
    : T extends ZodOptional<infer Type>
    ? ZodOptional<DeepPartial<Type>>
    : T extends ZodNullable<infer Type>
    ? ZodNullable<DeepPartial<Type>>
    : T extends ZodTuple<infer Items>
    ? {
        [k in keyof Items]: Items[k] extends ZodTypeAny
          ? DeepPartial<Items[k]>
          : never;
      } extends infer PI
      ? PI extends ZodTupleItems
        ? ZodTuple<PI>
        : never
      : never
    : T;
}

/**
 * The Standard Schema interface.
 */
type StandardSchemaV1<Input = unknown, Output = Input> = {
  /**
   * The Standard Schema properties.
   */
  readonly "~standard": StandardSchemaV1.Props<Input, Output>;
};
declare namespace StandardSchemaV1 {
  /**
   * The Standard Schema properties interface.
   */
  export interface Props<Input = unknown, Output = Input> {
    /**
     * The version number of the standard.
     */
    readonly version: 1;
    /**
     * The vendor name of the schema library.
     */
    readonly vendor: string;
    /**
     * Validates unknown input values.
     */
    readonly validate: (
      value: unknown
    ) => Result<Output> | Promise<Result<Output>>;
    /**
     * Inferred types associated with the schema.
     */
    readonly types?: Types<Input, Output> | undefined;
  }
  /**
   * The result interface of the validate function.
   */
  export type Result<Output> = SuccessResult<Output> | FailureResult;
  /**
   * The result interface if validation succeeds.
   */
  export interface SuccessResult<Output> {
    /**
     * The typed output value.
     */
    readonly value: Output;
    /**
     * The non-existent issues.
     */
    readonly issues?: undefined;
  }
  /**
   * The result interface if validation fails.
   */
  export interface FailureResult {
    /**
     * The issues of failed validation.
     */
    readonly issues: ReadonlyArray<Issue>;
  }
  /**
   * The issue interface of the failure output.
   */
  export interface Issue {
    /**
     * The error message of the issue.
     */
    readonly message: string;
    /**
     * The path of the issue, if any.
     */
    readonly path?: ReadonlyArray<PropertyKey | PathSegment> | undefined;
  }
  /**
   * The path segment interface of the issue.
   */
  export interface PathSegment {
    /**
     * The key representing a path segment.
     */
    readonly key: PropertyKey;
  }
  /**
   * The Standard Schema types interface.
   */
  export interface Types<Input = unknown, Output = Input> {
    /**
     * The input type of the schema.
     */
    readonly input: Input;
    /**
     * The output type of the schema.
     */
    readonly output: Output;
  }
  /**
   * Infers the input type of a Standard Schema.
   */
  export type InferInput<Schema extends StandardSchemaV1> = NonNullable<
    Schema["~standard"]["types"]
  >["input"];
  /**
   * Infers the output type of a Standard Schema.
   */
  export type InferOutput<Schema extends StandardSchemaV1> = NonNullable<
    Schema["~standard"]["types"]
  >["output"];
  export {};
}

interface RefinementCtx {
  addIssue: (arg: IssueData) => void;
  path: (string | number)[];
}
type ZodRawShape = {
  [k: string]: ZodTypeAny;
};
type ZodTypeAny = ZodType<any, any, any>;
type TypeOf<T extends ZodType<any, any, any>> = T["_output"];
type input<T extends ZodType<any, any, any>> = T["_input"];
type output<T extends ZodType<any, any, any>> = T["_output"];

type CustomErrorParams = Partial<util.Omit<ZodCustomIssue, "code">>;
interface ZodTypeDef {
  errorMap?: ZodErrorMap;
  description?: string;
}
type RawCreateParams =
  | {
      errorMap?: ZodErrorMap;
      invalid_type_error?: string;
      required_error?: string;
      message?: string;
      description?: string;
    }
  | undefined;
type ProcessedCreateParams = {
  errorMap?: ZodErrorMap;
  description?: string;
};
type SafeParseSuccess<Output> = {
  success: true;
  data: Output;
  error?: never;
};
type SafeParseError<Input> = {
  success: false;
  error: ZodError<Input>;
  data?: never;
};
type SafeParseReturnType<Input, Output> =
  | SafeParseSuccess<Output>
  | SafeParseError<Input>;
declare abstract class ZodType<
  Output = any,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output
> {
  readonly _type: Output;
  readonly _output: Output;
  readonly _input: Input;
  readonly _def: Def;
  get description(): string | undefined;
  "~standard": StandardSchemaV1.Props<Input, Output>;
  abstract _parse(input: ParseInput): ParseReturnType<Output>;
  _getType(input: ParseInput): string;
  _getOrReturnCtx(
    input: ParseInput,
    ctx?: ParseContext | undefined
  ): ParseContext;
  _processInputParams(input: ParseInput): {
    status: ParseStatus;
    ctx: ParseContext;
  };
  _parseSync(input: ParseInput): SyncParseReturnType<Output>;
  _parseAsync(input: ParseInput): AsyncParseReturnType<Output>;
  parse(data: unknown, params?: Partial<ParseParams>): Output;
  safeParse(
    data: unknown,
    params?: Partial<ParseParams>
  ): SafeParseReturnType<Input, Output>;
  "~validate"(
    data: unknown
  ): StandardSchemaV1.Result<Output> | Promise<StandardSchemaV1.Result<Output>>;
  parseAsync(data: unknown, params?: Partial<ParseParams>): Promise<Output>;
  safeParseAsync(
    data: unknown,
    params?: Partial<ParseParams>
  ): Promise<SafeParseReturnType<Input, Output>>;
  /** Alias of safeParseAsync */
  spa: (
    data: unknown,
    params?: Partial<ParseParams>
  ) => Promise<SafeParseReturnType<Input, Output>>;
  refine<RefinedOutput extends Output>(
    check: (arg: Output) => arg is RefinedOutput,
    message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)
  ): ZodEffects<this, RefinedOutput, Input>;
  refine(
    check: (arg: Output) => unknown | Promise<unknown>,
    message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)
  ): ZodEffects<this, Output, Input>;
  refinement<RefinedOutput extends Output>(
    check: (arg: Output) => arg is RefinedOutput,
    refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)
  ): ZodEffects<this, RefinedOutput, Input>;
  refinement(
    check: (arg: Output) => boolean,
    refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)
  ): ZodEffects<this, Output, Input>;
  _refinement(
    refinement: RefinementEffect<Output>["refinement"]
  ): ZodEffects<this, Output, Input>;
  superRefine<RefinedOutput extends Output>(
    refinement: (arg: Output, ctx: RefinementCtx) => arg is RefinedOutput
  ): ZodEffects<this, RefinedOutput, Input>;
  superRefine(
    refinement: (arg: Output, ctx: RefinementCtx) => void
  ): ZodEffects<this, Output, Input>;
  superRefine(
    refinement: (arg: Output, ctx: RefinementCtx) => Promise<void>
  ): ZodEffects<this, Output, Input>;
  constructor(def: Def);
  optional(): ZodOptional<this>;
  nullable(): ZodNullable<this>;
  nullish(): ZodOptional<ZodNullable<this>>;
  array(): ZodArray<this>;
  promise(): ZodPromise<this>;
  or<T extends ZodTypeAny>(option: T): ZodUnion<[this, T]>;
  and<T extends ZodTypeAny>(incoming: T): ZodIntersection<this, T>;
  transform<NewOut>(
    transform: (arg: Output, ctx: RefinementCtx) => NewOut | Promise<NewOut>
  ): ZodEffects<this, NewOut>;
  default(def: util.noUndefined<Input>): ZodDefault<this>;
  default(def: () => util.noUndefined<Input>): ZodDefault<this>;
  brand<B extends string | number | symbol>(brand?: B): ZodBranded<this, B>;
  catch(def: Output): ZodCatch<this>;
  catch(
    def: (ctx: { error: ZodError; input: Input }) => Output
  ): ZodCatch<this>;
  describe(description: string): this;
  pipe<T extends ZodTypeAny>(target: T): ZodPipeline<this, T>;
  readonly(): ZodReadonly<this>;
  isOptional(): boolean;
  isNullable(): boolean;
}
type IpVersion = "v4" | "v6";
type ZodStringCheck =
  | {
      kind: "min";
      value: number;
      message?: string;
    }
  | {
      kind: "max";
      value: number;
      message?: string;
    }
  | {
      kind: "length";
      value: number;
      message?: string;
    }
  | {
      kind: "email";
      message?: string;
    }
  | {
      kind: "url";
      message?: string;
    }
  | {
      kind: "emoji";
      message?: string;
    }
  | {
      kind: "uuid";
      message?: string;
    }
  | {
      kind: "nanoid";
      message?: string;
    }
  | {
      kind: "cuid";
      message?: string;
    }
  | {
      kind: "includes";
      value: string;
      position?: number;
      message?: string;
    }
  | {
      kind: "cuid2";
      message?: string;
    }
  | {
      kind: "ulid";
      message?: string;
    }
  | {
      kind: "startsWith";
      value: string;
      message?: string;
    }
  | {
      kind: "endsWith";
      value: string;
      message?: string;
    }
  | {
      kind: "regex";
      regex: RegExp;
      message?: string;
    }
  | {
      kind: "trim";
      message?: string;
    }
  | {
      kind: "toLowerCase";
      message?: string;
    }
  | {
      kind: "toUpperCase";
      message?: string;
    }
  | {
      kind: "jwt";
      alg?: string;
      message?: string;
    }
  | {
      kind: "datetime";
      offset: boolean;
      local: boolean;
      precision: number | null;
      message?: string;
    }
  | {
      kind: "date";
      message?: string;
    }
  | {
      kind: "time";
      precision: number | null;
      message?: string;
    }
  | {
      kind: "duration";
      message?: string;
    }
  | {
      kind: "ip";
      version?: IpVersion;
      message?: string;
    }
  | {
      kind: "cidr";
      version?: IpVersion;
      message?: string;
    }
  | {
      kind: "base64";
      message?: string;
    }
  | {
      kind: "base64url";
      message?: string;
    };
interface ZodStringDef extends ZodTypeDef {
  checks: ZodStringCheck[];
  typeName: ZodFirstPartyTypeKind.ZodString;
  coerce: boolean;
}
declare function datetimeRegex(args: {
  precision?: number | null;
  offset?: boolean;
  local?: boolean;
}): RegExp;
declare class ZodString extends ZodType<string, ZodStringDef, string> {
  _parse(input: ParseInput): ParseReturnType<string>;
  protected _regex(
    regex: RegExp,
    validation: StringValidation,
    message?: errorUtil.ErrMessage
  ): ZodEffects<this, string, string>;
  _addCheck(check: ZodStringCheck): ZodString;
  email(message?: errorUtil.ErrMessage): ZodString;
  url(message?: errorUtil.ErrMessage): ZodString;
  emoji(message?: errorUtil.ErrMessage): ZodString;
  uuid(message?: errorUtil.ErrMessage): ZodString;
  nanoid(message?: errorUtil.ErrMessage): ZodString;
  cuid(message?: errorUtil.ErrMessage): ZodString;
  cuid2(message?: errorUtil.ErrMessage): ZodString;
  ulid(message?: errorUtil.ErrMessage): ZodString;
  base64(message?: errorUtil.ErrMessage): ZodString;
  base64url(message?: errorUtil.ErrMessage): ZodString;
  jwt(options?: { alg?: string; message?: string }): ZodString;
  ip(
    options?:
      | string
      | {
          version?: IpVersion;
          message?: string;
        }
  ): ZodString;
  cidr(
    options?:
      | string
      | {
          version?: IpVersion;
          message?: string;
        }
  ): ZodString;
  datetime(
    options?:
      | string
      | {
          message?: string | undefined;
          precision?: number | null;
          offset?: boolean;
          local?: boolean;
        }
  ): ZodString;
  date(message?: string): ZodString;
  time(
    options?:
      | string
      | {
          message?: string | undefined;
          precision?: number | null;
        }
  ): ZodString;
  duration(message?: errorUtil.ErrMessage): ZodString;
  regex(regex: RegExp, message?: errorUtil.ErrMessage): ZodString;
  includes(
    value: string,
    options?: {
      message?: string;
      position?: number;
    }
  ): ZodString;
  startsWith(value: string, message?: errorUtil.ErrMessage): ZodString;
  endsWith(value: string, message?: errorUtil.ErrMessage): ZodString;
  min(minLength: number, message?: errorUtil.ErrMessage): ZodString;
  max(maxLength: number, message?: errorUtil.ErrMessage): ZodString;
  length(len: number, message?: errorUtil.ErrMessage): ZodString;
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message?: errorUtil.ErrMessage): ZodString;
  trim(): ZodString;
  toLowerCase(): ZodString;
  toUpperCase(): ZodString;
  get isDatetime(): boolean;
  get isDate(): boolean;
  get isTime(): boolean;
  get isDuration(): boolean;
  get isEmail(): boolean;
  get isURL(): boolean;
  get isEmoji(): boolean;
  get isUUID(): boolean;
  get isNANOID(): boolean;
  get isCUID(): boolean;
  get isCUID2(): boolean;
  get isULID(): boolean;
  get isIP(): boolean;
  get isCIDR(): boolean;
  get isBase64(): boolean;
  get isBase64url(): boolean;
  get minLength(): number | null;
  get maxLength(): number | null;
  static create: (
    params?: RawCreateParams & {
      coerce?: true;
    }
  ) => ZodString;
}
type ZodNumberCheck =
  | {
      kind: "min";
      value: number;
      inclusive: boolean;
      message?: string;
    }
  | {
      kind: "max";
      value: number;
      inclusive: boolean;
      message?: string;
    }
  | {
      kind: "int";
      message?: string;
    }
  | {
      kind: "multipleOf";
      value: number;
      message?: string;
    }
  | {
      kind: "finite";
      message?: string;
    };
interface ZodNumberDef extends ZodTypeDef {
  checks: ZodNumberCheck[];
  typeName: ZodFirstPartyTypeKind.ZodNumber;
  coerce: boolean;
}
declare class ZodNumber extends ZodType<number, ZodNumberDef, number> {
  _parse(input: ParseInput): ParseReturnType<number>;
  static create: (
    params?: RawCreateParams & {
      coerce?: boolean;
    }
  ) => ZodNumber;
  gte(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  min: (value: number, message?: errorUtil.ErrMessage) => ZodNumber;
  gt(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  lte(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  max: (value: number, message?: errorUtil.ErrMessage) => ZodNumber;
  lt(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  protected setLimit(
    kind: "min" | "max",
    value: number,
    inclusive: boolean,
    message?: string
  ): ZodNumber;
  _addCheck(check: ZodNumberCheck): ZodNumber;
  int(message?: errorUtil.ErrMessage): ZodNumber;
  positive(message?: errorUtil.ErrMessage): ZodNumber;
  negative(message?: errorUtil.ErrMessage): ZodNumber;
  nonpositive(message?: errorUtil.ErrMessage): ZodNumber;
  nonnegative(message?: errorUtil.ErrMessage): ZodNumber;
  multipleOf(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  step: (value: number, message?: errorUtil.ErrMessage) => ZodNumber;
  finite(message?: errorUtil.ErrMessage): ZodNumber;
  safe(message?: errorUtil.ErrMessage): ZodNumber;
  get minValue(): number | null;
  get maxValue(): number | null;
  get isInt(): boolean;
  get isFinite(): boolean;
}
type ZodBigIntCheck =
  | {
      kind: "min";
      value: bigint;
      inclusive: boolean;
      message?: string;
    }
  | {
      kind: "max";
      value: bigint;
      inclusive: boolean;
      message?: string;
    }
  | {
      kind: "multipleOf";
      value: bigint;
      message?: string;
    };
interface ZodBigIntDef extends ZodTypeDef {
  checks: ZodBigIntCheck[];
  typeName: ZodFirstPartyTypeKind.ZodBigInt;
  coerce: boolean;
}
declare class ZodBigInt extends ZodType<bigint, ZodBigIntDef, bigint> {
  _parse(input: ParseInput): ParseReturnType<bigint>;
  _getInvalidInput(input: ParseInput): INVALID;
  static create: (
    params?: RawCreateParams & {
      coerce?: boolean;
    }
  ) => ZodBigInt;
  gte(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt;
  min: (value: bigint, message?: errorUtil.ErrMessage) => ZodBigInt;
  gt(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt;
  lte(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt;
  max: (value: bigint, message?: errorUtil.ErrMessage) => ZodBigInt;
  lt(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt;
  protected setLimit(
    kind: "min" | "max",
    value: bigint,
    inclusive: boolean,
    message?: string
  ): ZodBigInt;
  _addCheck(check: ZodBigIntCheck): ZodBigInt;
  positive(message?: errorUtil.ErrMessage): ZodBigInt;
  negative(message?: errorUtil.ErrMessage): ZodBigInt;
  nonpositive(message?: errorUtil.ErrMessage): ZodBigInt;
  nonnegative(message?: errorUtil.ErrMessage): ZodBigInt;
  multipleOf(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt;
  get minValue(): bigint | null;
  get maxValue(): bigint | null;
}
interface ZodBooleanDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodBoolean;
  coerce: boolean;
}
declare class ZodBoolean extends ZodType<boolean, ZodBooleanDef, boolean> {
  _parse(input: ParseInput): ParseReturnType<boolean>;
  static create: (
    params?: RawCreateParams & {
      coerce?: boolean;
    }
  ) => ZodBoolean;
}
type ZodDateCheck =
  | {
      kind: "min";
      value: number;
      message?: string;
    }
  | {
      kind: "max";
      value: number;
      message?: string;
    };
interface ZodDateDef extends ZodTypeDef {
  checks: ZodDateCheck[];
  coerce: boolean;
  typeName: ZodFirstPartyTypeKind.ZodDate;
}
declare class ZodDate extends ZodType<Date, ZodDateDef, Date> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  _addCheck(check: ZodDateCheck): ZodDate;
  min(minDate: Date, message?: errorUtil.ErrMessage): ZodDate;
  max(maxDate: Date, message?: errorUtil.ErrMessage): ZodDate;
  get minDate(): Date | null;
  get maxDate(): Date | null;
  static create: (
    params?: RawCreateParams & {
      coerce?: boolean;
    }
  ) => ZodDate;
}
interface ZodSymbolDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodSymbol;
}
declare class ZodSymbol extends ZodType<symbol, ZodSymbolDef, symbol> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: (params?: RawCreateParams) => ZodSymbol;
}
interface ZodUndefinedDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodUndefined;
}
declare class ZodUndefined extends ZodType<
  undefined,
  ZodUndefinedDef,
  undefined
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  params?: RawCreateParams;
  static create: (params?: RawCreateParams) => ZodUndefined;
}
interface ZodNullDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodNull;
}
declare class ZodNull extends ZodType<null, ZodNullDef, null> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: (params?: RawCreateParams) => ZodNull;
}
interface ZodAnyDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodAny;
}
declare class ZodAny extends ZodType<any, ZodAnyDef, any> {
  _any: true;
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: (params?: RawCreateParams) => ZodAny;
}
interface ZodUnknownDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodUnknown;
}
declare class ZodUnknown extends ZodType<unknown, ZodUnknownDef, unknown> {
  _unknown: true;
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: (params?: RawCreateParams) => ZodUnknown;
}
interface ZodNeverDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodNever;
}
declare class ZodNever extends ZodType<never, ZodNeverDef, never> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: (params?: RawCreateParams) => ZodNever;
}
interface ZodVoidDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodVoid;
}
declare class ZodVoid extends ZodType<void, ZodVoidDef, void> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: (params?: RawCreateParams) => ZodVoid;
}
interface ZodArrayDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  type: T;
  typeName: ZodFirstPartyTypeKind.ZodArray;
  exactLength: {
    value: number;
    message?: string;
  } | null;
  minLength: {
    value: number;
    message?: string;
  } | null;
  maxLength: {
    value: number;
    message?: string;
  } | null;
}
type ArrayCardinality = "many" | "atleastone";
type arrayOutputType<
  T extends ZodTypeAny,
  Cardinality extends ArrayCardinality = "many"
> = Cardinality extends "atleastone"
  ? [T["_output"], ...T["_output"][]]
  : T["_output"][];
declare class ZodArray<
  T extends ZodTypeAny,
  Cardinality extends ArrayCardinality = "many"
> extends ZodType<
  arrayOutputType<T, Cardinality>,
  ZodArrayDef<T>,
  Cardinality extends "atleastone"
    ? [T["_input"], ...T["_input"][]]
    : T["_input"][]
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get element(): T;
  min(minLength: number, message?: errorUtil.ErrMessage): this;
  max(maxLength: number, message?: errorUtil.ErrMessage): this;
  length(len: number, message?: errorUtil.ErrMessage): this;
  nonempty(message?: errorUtil.ErrMessage): ZodArray<T, "atleastone">;
  static create: <T_1 extends ZodTypeAny>(
    schema: T_1,
    params?: RawCreateParams
  ) => ZodArray<T_1, "many">;
}
type ZodNonEmptyArray<T extends ZodTypeAny> = ZodArray<T, "atleastone">;
type UnknownKeysParam = "passthrough" | "strict" | "strip";
interface ZodObjectDef<
  T extends ZodRawShape = ZodRawShape,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
  Catchall extends ZodTypeAny = ZodTypeAny
> extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodObject;
  shape: () => T;
  catchall: Catchall;
  unknownKeys: UnknownKeys;
}
type mergeTypes<A, B> = {
  [k in keyof A | keyof B]: k extends keyof B
    ? B[k]
    : k extends keyof A
    ? A[k]
    : never;
};
type objectOutputType<
  Shape extends ZodRawShape,
  Catchall extends ZodTypeAny,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam
> = objectUtil.flatten<
  objectUtil.addQuestionMarks<baseObjectOutputType<Shape>>
> &
  CatchallOutput<Catchall> &
  PassthroughType<UnknownKeys>;
type baseObjectOutputType<Shape extends ZodRawShape> = {
  [k in keyof Shape]: Shape[k]["_output"];
};
type objectInputType<
  Shape extends ZodRawShape,
  Catchall extends ZodTypeAny,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam
> = objectUtil.flatten<baseObjectInputType<Shape>> &
  CatchallInput<Catchall> &
  PassthroughType<UnknownKeys>;
type baseObjectInputType<Shape extends ZodRawShape> =
  objectUtil.addQuestionMarks<{
    [k in keyof Shape]: Shape[k]["_input"];
  }>;
type CatchallOutput<T extends ZodType> = ZodType extends T
  ? unknown
  : {
      [k: string]: T["_output"];
    };
type CatchallInput<T extends ZodType> = ZodType extends T
  ? unknown
  : {
      [k: string]: T["_input"];
    };
type PassthroughType<T extends UnknownKeysParam> = T extends "passthrough"
  ? {
      [k: string]: unknown;
    }
  : unknown;
type deoptional<T extends ZodTypeAny> = T extends ZodOptional<infer U>
  ? deoptional<U>
  : T extends ZodNullable<infer U>
  ? ZodNullable<deoptional<U>>
  : T;
type SomeZodObject = ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny>;
type noUnrecognized<Obj extends object, Shape extends object> = {
  [k in keyof Obj]: k extends keyof Shape ? Obj[k] : never;
};
declare class ZodObject<
  T extends ZodRawShape,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
  Catchall extends ZodTypeAny = ZodTypeAny,
  Output = objectOutputType<T, Catchall, UnknownKeys>,
  Input = objectInputType<T, Catchall, UnknownKeys>
> extends ZodType<Output, ZodObjectDef<T, UnknownKeys, Catchall>, Input> {
  private _cached;
  _getCached(): {
    shape: T;
    keys: string[];
  };
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get shape(): T;
  strict(message?: errorUtil.ErrMessage): ZodObject<T, "strict", Catchall>;
  strip(): ZodObject<T, "strip", Catchall>;
  passthrough(): ZodObject<T, "passthrough", Catchall>;
  /**
   * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
   * If you want to pass through unknown properties, use `.passthrough()` instead.
   */
  nonstrict: () => ZodObject<T, "passthrough", Catchall>;
  extend<Augmentation extends ZodRawShape>(
    augmentation: Augmentation
  ): ZodObject<objectUtil.extendShape<T, Augmentation>, UnknownKeys, Catchall>;
  /**
   * @deprecated Use `.extend` instead
   *  */
  augment: <Augmentation extends ZodRawShape>(
    augmentation: Augmentation
  ) => ZodObject<
    objectUtil.extendShape<T, Augmentation>,
    UnknownKeys,
    Catchall
  >;
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge<Incoming extends AnyZodObject, Augmentation extends Incoming["shape"]>(
    merging: Incoming
  ): ZodObject<
    objectUtil.extendShape<T, Augmentation>,
    Incoming["_def"]["unknownKeys"],
    Incoming["_def"]["catchall"]
  >;
  setKey<Key extends string, Schema extends ZodTypeAny>(
    key: Key,
    schema: Schema
  ): ZodObject<
    T & {
      [k in Key]: Schema;
    },
    UnknownKeys,
    Catchall
  >;
  catchall<Index extends ZodTypeAny>(
    index: Index
  ): ZodObject<T, UnknownKeys, Index>;
  pick<
    Mask extends util.Exactly<
      {
        [k in keyof T]?: true;
      },
      Mask
    >
  >(
    mask: Mask
  ): ZodObject<Pick<T, Extract<keyof T, keyof Mask>>, UnknownKeys, Catchall>;
  omit<
    Mask extends util.Exactly<
      {
        [k in keyof T]?: true;
      },
      Mask
    >
  >(mask: Mask): ZodObject<Omit<T, keyof Mask>, UnknownKeys, Catchall>;
  /**
   * @deprecated
   */
  deepPartial(): partialUtil.DeepPartial<this>;
  partial(): ZodObject<
    {
      [k in keyof T]: ZodOptional<T[k]>;
    },
    UnknownKeys,
    Catchall
  >;
  partial<
    Mask extends util.Exactly<
      {
        [k in keyof T]?: true;
      },
      Mask
    >
  >(
    mask: Mask
  ): ZodObject<
    objectUtil.noNever<{
      [k in keyof T]: k extends keyof Mask ? ZodOptional<T[k]> : T[k];
    }>,
    UnknownKeys,
    Catchall
  >;
  required(): ZodObject<
    {
      [k in keyof T]: deoptional<T[k]>;
    },
    UnknownKeys,
    Catchall
  >;
  required<
    Mask extends util.Exactly<
      {
        [k in keyof T]?: true;
      },
      Mask
    >
  >(
    mask: Mask
  ): ZodObject<
    objectUtil.noNever<{
      [k in keyof T]: k extends keyof Mask ? deoptional<T[k]> : T[k];
    }>,
    UnknownKeys,
    Catchall
  >;
  keyof(): ZodEnum<enumUtil.UnionToTupleString<keyof T>>;
  static create: <T_1 extends ZodRawShape>(
    shape: T_1,
    params?: RawCreateParams
  ) => ZodObject<
    T_1,
    "strip",
    ZodTypeAny,
    objectUtil.addQuestionMarks<
      baseObjectOutputType<T_1>,
      any
    > extends infer T_2
      ? {
          [k in keyof T_2]: objectUtil.addQuestionMarks<
            baseObjectOutputType<T_1>,
            any
          >[k];
        }
      : never,
    baseObjectInputType<T_1> extends infer T_3
      ? { [k_1 in keyof T_3]: baseObjectInputType<T_1>[k_1] }
      : never
  >;
  static strictCreate: <T_1 extends ZodRawShape>(
    shape: T_1,
    params?: RawCreateParams
  ) => ZodObject<
    T_1,
    "strict",
    ZodTypeAny,
    objectUtil.addQuestionMarks<
      baseObjectOutputType<T_1>,
      any
    > extends infer T_2
      ? {
          [k in keyof T_2]: objectUtil.addQuestionMarks<
            baseObjectOutputType<T_1>,
            any
          >[k];
        }
      : never,
    baseObjectInputType<T_1> extends infer T_3
      ? { [k_1 in keyof T_3]: baseObjectInputType<T_1>[k_1] }
      : never
  >;
  static lazycreate: <T_1 extends ZodRawShape>(
    shape: () => T_1,
    params?: RawCreateParams
  ) => ZodObject<
    T_1,
    "strip",
    ZodTypeAny,
    objectUtil.addQuestionMarks<
      baseObjectOutputType<T_1>,
      any
    > extends infer T_2
      ? {
          [k in keyof T_2]: objectUtil.addQuestionMarks<
            baseObjectOutputType<T_1>,
            any
          >[k];
        }
      : never,
    baseObjectInputType<T_1> extends infer T_3
      ? { [k_1 in keyof T_3]: baseObjectInputType<T_1>[k_1] }
      : never
  >;
}
type AnyZodObject = ZodObject<any, any, any>;
type ZodUnionOptions = Readonly<[ZodTypeAny, ...ZodTypeAny[]]>;
interface ZodUnionDef<
  T extends ZodUnionOptions = Readonly<
    [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]
  >
> extends ZodTypeDef {
  options: T;
  typeName: ZodFirstPartyTypeKind.ZodUnion;
}
declare class ZodUnion<T extends ZodUnionOptions> extends ZodType<
  T[number]["_output"],
  ZodUnionDef<T>,
  T[number]["_input"]
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get options(): T;
  static create: <
    T_1 extends readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]
  >(
    types: T_1,
    params?: RawCreateParams
  ) => ZodUnion<T_1>;
}
type ZodDiscriminatedUnionOption<Discriminator extends string> = ZodObject<
  {
    [key in Discriminator]: ZodTypeAny;
  } & ZodRawShape,
  UnknownKeysParam,
  ZodTypeAny
>;
interface ZodDiscriminatedUnionDef<
  Discriminator extends string,
  Options extends readonly ZodDiscriminatedUnionOption<string>[] = ZodDiscriminatedUnionOption<string>[]
> extends ZodTypeDef {
  discriminator: Discriminator;
  options: Options;
  optionsMap: Map<Primitive, ZodDiscriminatedUnionOption<any>>;
  typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion;
}
declare class ZodDiscriminatedUnion<
  Discriminator extends string,
  Options extends readonly ZodDiscriminatedUnionOption<Discriminator>[]
> extends ZodType<
  output<Options[number]>,
  ZodDiscriminatedUnionDef<Discriminator, Options>,
  input<Options[number]>
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get discriminator(): Discriminator;
  get options(): Options;
  get optionsMap(): Map<Primitive, ZodDiscriminatedUnionOption<any>>;
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create<
    Discriminator extends string,
    Types extends readonly [
      ZodDiscriminatedUnionOption<Discriminator>,
      ...ZodDiscriminatedUnionOption<Discriminator>[]
    ]
  >(
    discriminator: Discriminator,
    options: Types,
    params?: RawCreateParams
  ): ZodDiscriminatedUnion<Discriminator, Types>;
}
interface ZodIntersectionDef<
  T extends ZodTypeAny = ZodTypeAny,
  U extends ZodTypeAny = ZodTypeAny
> extends ZodTypeDef {
  left: T;
  right: U;
  typeName: ZodFirstPartyTypeKind.ZodIntersection;
}
declare class ZodIntersection<
  T extends ZodTypeAny,
  U extends ZodTypeAny
> extends ZodType<
  T["_output"] & U["_output"],
  ZodIntersectionDef<T, U>,
  T["_input"] & U["_input"]
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: <T_1 extends ZodTypeAny, U_1 extends ZodTypeAny>(
    left: T_1,
    right: U_1,
    params?: RawCreateParams
  ) => ZodIntersection<T_1, U_1>;
}
type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];
type AssertArray<T> = T extends any[] ? T : never;
type OutputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
  [k in keyof T]: T[k] extends ZodType<any, any, any> ? T[k]["_output"] : never;
}>;
type OutputTypeOfTupleWithRest<
  T extends ZodTupleItems | [],
  Rest extends ZodTypeAny | null = null
> = Rest extends ZodTypeAny
  ? [...OutputTypeOfTuple<T>, ...Rest["_output"][]]
  : OutputTypeOfTuple<T>;
type InputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
  [k in keyof T]: T[k] extends ZodType<any, any, any> ? T[k]["_input"] : never;
}>;
type InputTypeOfTupleWithRest<
  T extends ZodTupleItems | [],
  Rest extends ZodTypeAny | null = null
> = Rest extends ZodTypeAny
  ? [...InputTypeOfTuple<T>, ...Rest["_input"][]]
  : InputTypeOfTuple<T>;
interface ZodTupleDef<
  T extends ZodTupleItems | [] = ZodTupleItems,
  Rest extends ZodTypeAny | null = null
> extends ZodTypeDef {
  items: T;
  rest: Rest;
  typeName: ZodFirstPartyTypeKind.ZodTuple;
}
type AnyZodTuple = ZodTuple<
  [ZodTypeAny, ...ZodTypeAny[]] | [],
  ZodTypeAny | null
>;
declare class ZodTuple<
  T extends [ZodTypeAny, ...ZodTypeAny[]] | [] = [ZodTypeAny, ...ZodTypeAny[]],
  Rest extends ZodTypeAny | null = null
> extends ZodType<
  OutputTypeOfTupleWithRest<T, Rest>,
  ZodTupleDef<T, Rest>,
  InputTypeOfTupleWithRest<T, Rest>
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get items(): T;
  rest<Rest extends ZodTypeAny>(rest: Rest): ZodTuple<T, Rest>;
  static create: <T_1 extends [] | [ZodTypeAny, ...ZodTypeAny[]]>(
    schemas: T_1,
    params?: RawCreateParams
  ) => ZodTuple<T_1, null>;
}
interface ZodRecordDef<
  Key extends KeySchema = ZodString,
  Value extends ZodTypeAny = ZodTypeAny
> extends ZodTypeDef {
  valueType: Value;
  keyType: Key;
  typeName: ZodFirstPartyTypeKind.ZodRecord;
}
type KeySchema = ZodType<string | number | symbol, any, any>;
type RecordType<K extends string | number | symbol, V> = [string] extends [K]
  ? Record<K, V>
  : [number] extends [K]
  ? Record<K, V>
  : [symbol] extends [K]
  ? Record<K, V>
  : [BRAND<string | number | symbol>] extends [K]
  ? Record<K, V>
  : Partial<Record<K, V>>;
declare class ZodRecord<
  Key extends KeySchema = ZodString,
  Value extends ZodTypeAny = ZodTypeAny
> extends ZodType<
  RecordType<Key["_output"], Value["_output"]>,
  ZodRecordDef<Key, Value>,
  RecordType<Key["_input"], Value["_input"]>
> {
  get keySchema(): Key;
  get valueSchema(): Value;
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get element(): Value;
  static create<Value extends ZodTypeAny>(
    valueType: Value,
    params?: RawCreateParams
  ): ZodRecord<ZodString, Value>;
  static create<Keys extends KeySchema, Value extends ZodTypeAny>(
    keySchema: Keys,
    valueType: Value,
    params?: RawCreateParams
  ): ZodRecord<Keys, Value>;
}
interface ZodMapDef<
  Key extends ZodTypeAny = ZodTypeAny,
  Value extends ZodTypeAny = ZodTypeAny
> extends ZodTypeDef {
  valueType: Value;
  keyType: Key;
  typeName: ZodFirstPartyTypeKind.ZodMap;
}
declare class ZodMap<
  Key extends ZodTypeAny = ZodTypeAny,
  Value extends ZodTypeAny = ZodTypeAny
> extends ZodType<
  Map<Key["_output"], Value["_output"]>,
  ZodMapDef<Key, Value>,
  Map<Key["_input"], Value["_input"]>
> {
  get keySchema(): Key;
  get valueSchema(): Value;
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: <
    Key_1 extends ZodTypeAny = ZodTypeAny,
    Value_1 extends ZodTypeAny = ZodTypeAny
  >(
    keyType: Key_1,
    valueType: Value_1,
    params?: RawCreateParams
  ) => ZodMap<Key_1, Value_1>;
}
interface ZodSetDef<Value extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  valueType: Value;
  typeName: ZodFirstPartyTypeKind.ZodSet;
  minSize: {
    value: number;
    message?: string;
  } | null;
  maxSize: {
    value: number;
    message?: string;
  } | null;
}
declare class ZodSet<Value extends ZodTypeAny = ZodTypeAny> extends ZodType<
  Set<Value["_output"]>,
  ZodSetDef<Value>,
  Set<Value["_input"]>
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  min(minSize: number, message?: errorUtil.ErrMessage): this;
  max(maxSize: number, message?: errorUtil.ErrMessage): this;
  size(size: number, message?: errorUtil.ErrMessage): this;
  nonempty(message?: errorUtil.ErrMessage): ZodSet<Value>;
  static create: <Value_1 extends ZodTypeAny = ZodTypeAny>(
    valueType: Value_1,
    params?: RawCreateParams
  ) => ZodSet<Value_1>;
}
interface ZodFunctionDef<
  Args extends ZodTuple<any, any> = ZodTuple<any, any>,
  Returns extends ZodTypeAny = ZodTypeAny
> extends ZodTypeDef {
  args: Args;
  returns: Returns;
  typeName: ZodFirstPartyTypeKind.ZodFunction;
}
type OuterTypeOfFunction<
  Args extends ZodTuple<any, any>,
  Returns extends ZodTypeAny
> = Args["_input"] extends Array<any>
  ? (...args: Args["_input"]) => Returns["_output"]
  : never;
type InnerTypeOfFunction<
  Args extends ZodTuple<any, any>,
  Returns extends ZodTypeAny
> = Args["_output"] extends Array<any>
  ? (...args: Args["_output"]) => Returns["_input"]
  : never;
declare class ZodFunction<
  Args extends ZodTuple<any, any>,
  Returns extends ZodTypeAny
> extends ZodType<
  OuterTypeOfFunction<Args, Returns>,
  ZodFunctionDef<Args, Returns>,
  InnerTypeOfFunction<Args, Returns>
> {
  _parse(input: ParseInput): ParseReturnType<any>;
  parameters(): Args;
  returnType(): Returns;
  args<Items extends Parameters<(typeof ZodTuple)["create"]>[0]>(
    ...items: Items
  ): ZodFunction<ZodTuple<Items, ZodUnknown>, Returns>;
  returns<NewReturnType extends ZodType<any, any, any>>(
    returnType: NewReturnType
  ): ZodFunction<Args, NewReturnType>;
  implement<F extends InnerTypeOfFunction<Args, Returns>>(
    func: F
  ): ReturnType<F> extends Returns["_output"]
    ? (...args: Args["_input"]) => ReturnType<F>
    : OuterTypeOfFunction<Args, Returns>;
  strictImplement(
    func: InnerTypeOfFunction<Args, Returns>
  ): InnerTypeOfFunction<Args, Returns>;
  validate: <F extends InnerTypeOfFunction<Args, Returns>>(
    func: F
  ) => ReturnType<F> extends Returns["_output"]
    ? (...args: Args["_input"]) => ReturnType<F>
    : OuterTypeOfFunction<Args, Returns>;
  static create(): ZodFunction<ZodTuple<[], ZodUnknown>, ZodUnknown>;
  static create<T extends AnyZodTuple = ZodTuple<[], ZodUnknown>>(
    args: T
  ): ZodFunction<T, ZodUnknown>;
  static create<T extends AnyZodTuple, U extends ZodTypeAny>(
    args: T,
    returns: U
  ): ZodFunction<T, U>;
  static create<
    T extends AnyZodTuple = ZodTuple<[], ZodUnknown>,
    U extends ZodTypeAny = ZodUnknown
  >(args: T, returns: U, params?: RawCreateParams): ZodFunction<T, U>;
}
interface ZodLazyDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  getter: () => T;
  typeName: ZodFirstPartyTypeKind.ZodLazy;
}
declare class ZodLazy<T extends ZodTypeAny> extends ZodType<
  output<T>,
  ZodLazyDef<T>,
  input<T>
> {
  get schema(): T;
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: <T_1 extends ZodTypeAny>(
    getter: () => T_1,
    params?: RawCreateParams
  ) => ZodLazy<T_1>;
}
interface ZodLiteralDef<T = any> extends ZodTypeDef {
  value: T;
  typeName: ZodFirstPartyTypeKind.ZodLiteral;
}
declare class ZodLiteral<T> extends ZodType<T, ZodLiteralDef<T>, T> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get value(): T;
  static create: <T_1 extends Primitive>(
    value: T_1,
    params?: RawCreateParams
  ) => ZodLiteral<T_1>;
}
type ArrayKeys = keyof any[];
type Indices<T> = Exclude<keyof T, ArrayKeys>;
type EnumValues<T extends string = string> = readonly [T, ...T[]];
type Values<T extends EnumValues> = {
  [k in T[number]]: k;
};
interface ZodEnumDef<T extends EnumValues = EnumValues> extends ZodTypeDef {
  values: T;
  typeName: ZodFirstPartyTypeKind.ZodEnum;
}
type Writeable<T> = {
  -readonly [P in keyof T]: T[P];
};
type FilterEnum<Values, ToExclude> = Values extends []
  ? []
  : Values extends [infer Head, ...infer Rest]
  ? Head extends ToExclude
    ? FilterEnum<Rest, ToExclude>
    : [Head, ...FilterEnum<Rest, ToExclude>]
  : never;
type typecast<A, T> = A extends T ? A : never;
declare function createZodEnum<
  U extends string,
  T extends Readonly<[U, ...U[]]>
>(values: T, params?: RawCreateParams): ZodEnum<Writeable<T>>;
declare function createZodEnum<U extends string, T extends [U, ...U[]]>(
  values: T,
  params?: RawCreateParams
): ZodEnum<T>;
declare class ZodEnum<T extends [string, ...string[]]> extends ZodType<
  T[number],
  ZodEnumDef<T>,
  T[number]
> {
  #private;
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get options(): T;
  get enum(): Values<T>;
  get Values(): Values<T>;
  get Enum(): Values<T>;
  extract<ToExtract extends readonly [T[number], ...T[number][]]>(
    values: ToExtract,
    newDef?: RawCreateParams
  ): ZodEnum<Writeable<ToExtract>>;
  exclude<ToExclude extends readonly [T[number], ...T[number][]]>(
    values: ToExclude,
    newDef?: RawCreateParams
  ): ZodEnum<
    typecast<Writeable<FilterEnum<T, ToExclude[number]>>, [string, ...string[]]>
  >;
  static create: typeof createZodEnum;
}
interface ZodNativeEnumDef<T extends EnumLike = EnumLike> extends ZodTypeDef {
  values: T;
  typeName: ZodFirstPartyTypeKind.ZodNativeEnum;
}
type EnumLike = {
  [k: string]: string | number;
  [nu: number]: string;
};
declare class ZodNativeEnum<T extends EnumLike> extends ZodType<
  T[keyof T],
  ZodNativeEnumDef<T>,
  T[keyof T]
> {
  #private;
  _parse(input: ParseInput): ParseReturnType<T[keyof T]>;
  get enum(): T;
  static create: <T_1 extends EnumLike>(
    values: T_1,
    params?: RawCreateParams
  ) => ZodNativeEnum<T_1>;
}
interface ZodPromiseDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  type: T;
  typeName: ZodFirstPartyTypeKind.ZodPromise;
}
declare class ZodPromise<T extends ZodTypeAny> extends ZodType<
  Promise<T["_output"]>,
  ZodPromiseDef<T>,
  Promise<T["_input"]>
> {
  unwrap(): T;
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: <T_1 extends ZodTypeAny>(
    schema: T_1,
    params?: RawCreateParams
  ) => ZodPromise<T_1>;
}
type Refinement<T> = (arg: T, ctx: RefinementCtx) => any;
type SuperRefinement<T> = (arg: T, ctx: RefinementCtx) => void | Promise<void>;
type RefinementEffect<T> = {
  type: "refinement";
  refinement: (arg: T, ctx: RefinementCtx) => any;
};
type TransformEffect<T> = {
  type: "transform";
  transform: (arg: T, ctx: RefinementCtx) => any;
};
type PreprocessEffect<T> = {
  type: "preprocess";
  transform: (arg: T, ctx: RefinementCtx) => any;
};
type Effect<T> = RefinementEffect<T> | TransformEffect<T> | PreprocessEffect<T>;
interface ZodEffectsDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  schema: T;
  typeName: ZodFirstPartyTypeKind.ZodEffects;
  effect: Effect<any>;
}
declare class ZodEffects<
  T extends ZodTypeAny,
  Output = output<T>,
  Input = input<T>
> extends ZodType<Output, ZodEffectsDef<T>, Input> {
  innerType(): T;
  sourceType(): T;
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: <I extends ZodTypeAny>(
    schema: I,
    effect: Effect<I["_output"]>,
    params?: RawCreateParams
  ) => ZodEffects<I, I["_output"]>;
  static createWithPreprocess: <I extends ZodTypeAny>(
    preprocess: (arg: unknown, ctx: RefinementCtx) => unknown,
    schema: I,
    params?: RawCreateParams
  ) => ZodEffects<I, I["_output"], unknown>;
}

interface ZodOptionalDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  typeName: ZodFirstPartyTypeKind.ZodOptional;
}
type ZodOptionalType<T extends ZodTypeAny> = ZodOptional<T>;
declare class ZodOptional<T extends ZodTypeAny> extends ZodType<
  T["_output"] | undefined,
  ZodOptionalDef<T>,
  T["_input"] | undefined
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  unwrap(): T;
  static create: <T_1 extends ZodTypeAny>(
    type: T_1,
    params?: RawCreateParams
  ) => ZodOptional<T_1>;
}
interface ZodNullableDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  typeName: ZodFirstPartyTypeKind.ZodNullable;
}
type ZodNullableType<T extends ZodTypeAny> = ZodNullable<T>;
declare class ZodNullable<T extends ZodTypeAny> extends ZodType<
  T["_output"] | null,
  ZodNullableDef<T>,
  T["_input"] | null
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  unwrap(): T;
  static create: <T_1 extends ZodTypeAny>(
    type: T_1,
    params?: RawCreateParams
  ) => ZodNullable<T_1>;
}
interface ZodDefaultDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  defaultValue: () => util.noUndefined<T["_input"]>;
  typeName: ZodFirstPartyTypeKind.ZodDefault;
}
declare class ZodDefault<T extends ZodTypeAny> extends ZodType<
  util.noUndefined<T["_output"]>,
  ZodDefaultDef<T>,
  T["_input"] | undefined
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  removeDefault(): T;
  static create: <T_1 extends ZodTypeAny>(
    type: T_1,
    params: {
      errorMap?: ZodErrorMap | undefined;
      invalid_type_error?: string | undefined;
      required_error?: string | undefined;
      message?: string | undefined;
      description?: string | undefined;
    } & {
      default: T_1["_input"] | (() => util.noUndefined<T_1["_input"]>);
    }
  ) => ZodDefault<T_1>;
}
interface ZodCatchDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  catchValue: (ctx: { error: ZodError; input: unknown }) => T["_input"];
  typeName: ZodFirstPartyTypeKind.ZodCatch;
}
declare class ZodCatch<T extends ZodTypeAny> extends ZodType<
  T["_output"],
  ZodCatchDef<T>,
  unknown
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  removeCatch(): T;
  static create: <T_1 extends ZodTypeAny>(
    type: T_1,
    params: {
      errorMap?: ZodErrorMap | undefined;
      invalid_type_error?: string | undefined;
      required_error?: string | undefined;
      message?: string | undefined;
      description?: string | undefined;
    } & {
      catch: T_1["_output"] | (() => T_1["_output"]);
    }
  ) => ZodCatch<T_1>;
}
interface ZodNaNDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodNaN;
}
declare class ZodNaN extends ZodType<number, ZodNaNDef, number> {
  _parse(input: ParseInput): ParseReturnType<any>;
  static create: (params?: RawCreateParams) => ZodNaN;
}
interface ZodBrandedDef<T extends ZodTypeAny> extends ZodTypeDef {
  type: T;
  typeName: ZodFirstPartyTypeKind.ZodBranded;
}
declare const BRAND: unique symbol;
type BRAND<T extends string | number | symbol> = {
  [BRAND]: {
    [k in T]: true;
  };
};
declare class ZodBranded<
  T extends ZodTypeAny,
  B extends string | number | symbol
> extends ZodType<T["_output"] & BRAND<B>, ZodBrandedDef<T>, T["_input"]> {
  _parse(input: ParseInput): ParseReturnType<any>;
  unwrap(): T;
}
interface ZodPipelineDef<A extends ZodTypeAny, B extends ZodTypeAny>
  extends ZodTypeDef {
  in: A;
  out: B;
  typeName: ZodFirstPartyTypeKind.ZodPipeline;
}
declare class ZodPipeline<
  A extends ZodTypeAny,
  B extends ZodTypeAny
> extends ZodType<B["_output"], ZodPipelineDef<A, B>, A["_input"]> {
  _parse(input: ParseInput): ParseReturnType<any>;
  static create<A extends ZodTypeAny, B extends ZodTypeAny>(
    a: A,
    b: B
  ): ZodPipeline<A, B>;
}
type BuiltIn =
  | (((...args: any[]) => any) | (new (...args: any[]) => any))
  | {
      readonly [Symbol.toStringTag]: string;
    }
  | Date
  | Error
  | Generator
  | Promise<unknown>
  | RegExp;
type MakeReadonly<T> = T extends Map<infer K, infer V>
  ? ReadonlyMap<K, V>
  : T extends Set<infer V>
  ? ReadonlySet<V>
  : T extends [infer Head, ...infer Tail]
  ? readonly [Head, ...Tail]
  : T extends Array<infer V>
  ? ReadonlyArray<V>
  : T extends BuiltIn
  ? T
  : Readonly<T>;
interface ZodReadonlyDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  typeName: ZodFirstPartyTypeKind.ZodReadonly;
}
declare class ZodReadonly<T extends ZodTypeAny> extends ZodType<
  MakeReadonly<T["_output"]>,
  ZodReadonlyDef<T>,
  MakeReadonly<T["_input"]>
> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: <T_1 extends ZodTypeAny>(
    type: T_1,
    params?: RawCreateParams
  ) => ZodReadonly<T_1>;
  unwrap(): T;
}
type CustomParams = CustomErrorParams & {
  fatal?: boolean;
};
declare function custom<T>(
  check?: (data: any) => any,
  _params?: string | CustomParams | ((input: any) => CustomParams),
  /**
   * @deprecated
   *
   * Pass `fatal` into the params object instead:
   *
   * ```ts
   * z.string().custom((val) => val.length > 5, { fatal: false })
   * ```
   *
   */
  fatal?: boolean
): ZodType<T, ZodTypeDef, T>;

declare const late: {
  object: <T extends ZodRawShape>(
    shape: () => T,
    params?: RawCreateParams
  ) => ZodObject<T, "strip">;
};
declare enum ZodFirstPartyTypeKind {
  ZodString = "ZodString",
  ZodNumber = "ZodNumber",
  ZodNaN = "ZodNaN",
  ZodBigInt = "ZodBigInt",
  ZodBoolean = "ZodBoolean",
  ZodDate = "ZodDate",
  ZodSymbol = "ZodSymbol",
  ZodUndefined = "ZodUndefined",
  ZodNull = "ZodNull",
  ZodAny = "ZodAny",
  ZodUnknown = "ZodUnknown",
  ZodNever = "ZodNever",
  ZodVoid = "ZodVoid",
  ZodArray = "ZodArray",
  ZodObject = "ZodObject",
  ZodUnion = "ZodUnion",
  ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
  ZodIntersection = "ZodIntersection",
  ZodTuple = "ZodTuple",
  ZodRecord = "ZodRecord",
  ZodMap = "ZodMap",
  ZodSet = "ZodSet",
  ZodFunction = "ZodFunction",
  ZodLazy = "ZodLazy",
  ZodLiteral = "ZodLiteral",
  ZodEnum = "ZodEnum",
  ZodEffects = "ZodEffects",
  ZodNativeEnum = "ZodNativeEnum",
  ZodOptional = "ZodOptional",
  ZodNullable = "ZodNullable",
  ZodDefault = "ZodDefault",
  ZodCatch = "ZodCatch",
  ZodPromise = "ZodPromise",
  ZodBranded = "ZodBranded",
  ZodPipeline = "ZodPipeline",
  ZodReadonly = "ZodReadonly",
}
type ZodFirstPartySchemaTypes =
  | ZodString
  | ZodNumber
  | ZodNaN
  | ZodBigInt
  | ZodBoolean
  | ZodDate
  | ZodUndefined
  | ZodNull
  | ZodAny
  | ZodUnknown
  | ZodNever
  | ZodVoid
  | ZodArray<any, any>
  | ZodObject<any, any, any>
  | ZodUnion<any>
  | ZodDiscriminatedUnion<any, any>
  | ZodIntersection<any, any>
  | ZodTuple<any, any>
  | ZodRecord<any, any>
  | ZodMap<any>
  | ZodSet<any>
  | ZodFunction<any, any>
  | ZodLazy<any>
  | ZodLiteral<any>
  | ZodEnum<any>
  | ZodEffects<any, any, any>
  | ZodNativeEnum<any>
  | ZodOptional<any>
  | ZodNullable<any>
  | ZodDefault<any>
  | ZodCatch<any>
  | ZodPromise<any>
  | ZodBranded<any, any>
  | ZodPipeline<any, any>
  | ZodReadonly<any>
  | ZodSymbol;
declare abstract class Class {
  constructor(..._: any[]);
}
declare const instanceOfType: <T extends typeof Class>(
  cls: T,
  params?: CustomParams
) => ZodType<InstanceType<T>, ZodTypeDef, InstanceType<T>>;
declare const stringType: (
  params?: RawCreateParams & {
    coerce?: true;
  }
) => ZodString;
declare const numberType: (
  params?: RawCreateParams & {
    coerce?: boolean;
  }
) => ZodNumber;
declare const nanType: (params?: RawCreateParams) => ZodNaN;
declare const bigIntType: (
  params?: RawCreateParams & {
    coerce?: boolean;
  }
) => ZodBigInt;
declare const booleanType: (
  params?: RawCreateParams & {
    coerce?: boolean;
  }
) => ZodBoolean;
declare const dateType: (
  params?: RawCreateParams & {
    coerce?: boolean;
  }
) => ZodDate;
declare const symbolType: (params?: RawCreateParams) => ZodSymbol;
declare const undefinedType: (params?: RawCreateParams) => ZodUndefined;
declare const nullType: (params?: RawCreateParams) => ZodNull;
declare const anyType: (params?: RawCreateParams) => ZodAny;
declare const unknownType: (params?: RawCreateParams) => ZodUnknown;
declare const neverType: (params?: RawCreateParams) => ZodNever;
declare const voidType: (params?: RawCreateParams) => ZodVoid;
declare const arrayType: <T extends ZodTypeAny>(
  schema: T,
  params?: RawCreateParams
) => ZodArray<T>;
declare const objectType: <T extends ZodRawShape>(
  shape: T,
  params?: RawCreateParams
) => ZodObject<
  T,
  "strip",
  ZodTypeAny,
  objectOutputType<T, ZodTypeAny, "strip">,
  objectInputType<T, ZodTypeAny, "strip">
>;
declare const strictObjectType: <T extends ZodRawShape>(
  shape: T,
  params?: RawCreateParams
) => ZodObject<T, "strict">;
declare const unionType: <
  T extends readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]
>(
  types: T,
  params?: RawCreateParams
) => ZodUnion<T>;
declare const discriminatedUnionType: typeof ZodDiscriminatedUnion.create;
declare const intersectionType: <T extends ZodTypeAny, U extends ZodTypeAny>(
  left: T,
  right: U,
  params?: RawCreateParams
) => ZodIntersection<T, U>;
declare const tupleType: <T extends [] | [ZodTypeAny, ...ZodTypeAny[]]>(
  schemas: T,
  params?: RawCreateParams
) => ZodTuple<T, null>;
declare const recordType: typeof ZodRecord.create;
declare const mapType: <
  Key extends ZodTypeAny = ZodTypeAny,
  Value extends ZodTypeAny = ZodTypeAny
>(
  keyType: Key,
  valueType: Value,
  params?: RawCreateParams
) => ZodMap<Key, Value>;
declare const setType: <Value extends ZodTypeAny = ZodTypeAny>(
  valueType: Value,
  params?: RawCreateParams
) => ZodSet<Value>;
declare const functionType: typeof ZodFunction.create;
declare const lazyType: <T extends ZodTypeAny>(
  getter: () => T,
  params?: RawCreateParams
) => ZodLazy<T>;
declare const literalType: <T extends Primitive>(
  value: T,
  params?: RawCreateParams
) => ZodLiteral<T>;
declare const enumType: typeof createZodEnum;
declare const nativeEnumType: <T extends EnumLike>(
  values: T,
  params?: RawCreateParams
) => ZodNativeEnum<T>;
declare const promiseType: <T extends ZodTypeAny>(
  schema: T,
  params?: RawCreateParams
) => ZodPromise<T>;
declare const effectsType: <I extends ZodTypeAny>(
  schema: I,
  effect: Effect<I["_output"]>,
  params?: RawCreateParams
) => ZodEffects<I, I["_output"]>;
declare const optionalType: <T extends ZodTypeAny>(
  type: T,
  params?: RawCreateParams
) => ZodOptional<T>;
declare const nullableType: <T extends ZodTypeAny>(
  type: T,
  params?: RawCreateParams
) => ZodNullable<T>;
declare const preprocessType: <I extends ZodTypeAny>(
  preprocess: (arg: unknown, ctx: RefinementCtx) => unknown,
  schema: I,
  params?: RawCreateParams
) => ZodEffects<I, I["_output"], unknown>;
declare const pipelineType: typeof ZodPipeline.create;
declare const ostring: () => ZodOptional<ZodString>;
declare const onumber: () => ZodOptional<ZodNumber>;
declare const oboolean: () => ZodOptional<ZodBoolean>;
declare const coerce: {
  string: (
    params?: RawCreateParams & {
      coerce?: true;
    }
  ) => ZodString;
  number: (
    params?: RawCreateParams & {
      coerce?: boolean;
    }
  ) => ZodNumber;
  boolean: (
    params?: RawCreateParams & {
      coerce?: boolean;
    }
  ) => ZodBoolean;
  bigint: (
    params?: RawCreateParams & {
      coerce?: boolean;
    }
  ) => ZodBigInt;
  date: (
    params?: RawCreateParams & {
      coerce?: boolean;
    }
  ) => ZodDate;
};

declare const NEVER: never;

declare const z_setErrorMap: typeof setErrorMap;
declare const z_getErrorMap: typeof getErrorMap;
declare const z_makeIssue: typeof makeIssue;
type z_ParseParams = ParseParams;
type z_ParsePathComponent = ParsePathComponent;
type z_ParsePath = ParsePath;
declare const z_EMPTY_PATH: typeof EMPTY_PATH;
type z_ParseContext = ParseContext;
type z_ParseInput = ParseInput;
declare const z_addIssueToContext: typeof addIssueToContext;
type z_ObjectPair = ObjectPair;
type z_ParseStatus = ParseStatus;
declare const z_ParseStatus: typeof ParseStatus;
type z_ParseResult = ParseResult;
declare const z_INVALID: typeof INVALID;
declare const z_DIRTY: typeof DIRTY;
declare const z_OK: typeof OK;
type z_SyncParseReturnType<T = any> = SyncParseReturnType<T>;
type z_AsyncParseReturnType<T> = AsyncParseReturnType<T>;
type z_ParseReturnType<T> = ParseReturnType<T>;
declare const z_isAborted: typeof isAborted;
declare const z_isDirty: typeof isDirty;
declare const z_isValid: typeof isValid;
declare const z_isAsync: typeof isAsync;
type z_Primitive = Primitive;
type z_Scalars = Scalars;
declare const z_util: typeof util;
declare const z_objectUtil: typeof objectUtil;
type z_ZodParsedType = ZodParsedType;
declare const z_getParsedType: typeof getParsedType;
declare const z_oboolean: typeof oboolean;
declare const z_onumber: typeof onumber;
declare const z_ostring: typeof ostring;
type z_RefinementCtx = RefinementCtx;
type z_ZodRawShape = ZodRawShape;
type z_ZodTypeAny = ZodTypeAny;
type z_TypeOf<T extends ZodType<any, any, any>> = TypeOf<T>;
type z_input<T extends ZodType<any, any, any>> = input<T>;
type z_output<T extends ZodType<any, any, any>> = output<T>;
type z_CustomErrorParams = CustomErrorParams;
type z_ZodTypeDef = ZodTypeDef;
type z_RawCreateParams = RawCreateParams;
type z_ProcessedCreateParams = ProcessedCreateParams;
type z_SafeParseSuccess<Output> = SafeParseSuccess<Output>;
type z_SafeParseError<Input> = SafeParseError<Input>;
type z_SafeParseReturnType<Input, Output> = SafeParseReturnType<Input, Output>;
type z_ZodType<
  Output = any,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output
> = ZodType<Output, Def, Input>;
declare const z_ZodType: typeof ZodType;
type z_IpVersion = IpVersion;
type z_ZodStringCheck = ZodStringCheck;
type z_ZodStringDef = ZodStringDef;
declare const z_datetimeRegex: typeof datetimeRegex;
type z_ZodString = ZodString;
declare const z_ZodString: typeof ZodString;
type z_ZodNumberCheck = ZodNumberCheck;
type z_ZodNumberDef = ZodNumberDef;
type z_ZodNumber = ZodNumber;
declare const z_ZodNumber: typeof ZodNumber;
type z_ZodBigIntCheck = ZodBigIntCheck;
type z_ZodBigIntDef = ZodBigIntDef;
type z_ZodBigInt = ZodBigInt;
declare const z_ZodBigInt: typeof ZodBigInt;
type z_ZodBooleanDef = ZodBooleanDef;
type z_ZodBoolean = ZodBoolean;
declare const z_ZodBoolean: typeof ZodBoolean;
type z_ZodDateCheck = ZodDateCheck;
type z_ZodDateDef = ZodDateDef;
type z_ZodDate = ZodDate;
declare const z_ZodDate: typeof ZodDate;
type z_ZodSymbolDef = ZodSymbolDef;
type z_ZodSymbol = ZodSymbol;
declare const z_ZodSymbol: typeof ZodSymbol;
type z_ZodUndefinedDef = ZodUndefinedDef;
type z_ZodUndefined = ZodUndefined;
declare const z_ZodUndefined: typeof ZodUndefined;
type z_ZodNullDef = ZodNullDef;
type z_ZodNull = ZodNull;
declare const z_ZodNull: typeof ZodNull;
type z_ZodAnyDef = ZodAnyDef;
type z_ZodAny = ZodAny;
declare const z_ZodAny: typeof ZodAny;
type z_ZodUnknownDef = ZodUnknownDef;
type z_ZodUnknown = ZodUnknown;
declare const z_ZodUnknown: typeof ZodUnknown;
type z_ZodNeverDef = ZodNeverDef;
type z_ZodNever = ZodNever;
declare const z_ZodNever: typeof ZodNever;
type z_ZodVoidDef = ZodVoidDef;
type z_ZodVoid = ZodVoid;
declare const z_ZodVoid: typeof ZodVoid;
type z_ZodArrayDef<T extends ZodTypeAny = ZodTypeAny> = ZodArrayDef<T>;
type z_ArrayCardinality = ArrayCardinality;
type z_arrayOutputType<
  T extends ZodTypeAny,
  Cardinality extends ArrayCardinality = "many"
> = arrayOutputType<T, Cardinality>;
type z_ZodArray<
  T extends ZodTypeAny,
  Cardinality extends ArrayCardinality = "many"
> = ZodArray<T, Cardinality>;
declare const z_ZodArray: typeof ZodArray;
type z_ZodNonEmptyArray<T extends ZodTypeAny> = ZodNonEmptyArray<T>;
type z_UnknownKeysParam = UnknownKeysParam;
type z_ZodObjectDef<
  T extends ZodRawShape = ZodRawShape,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
  Catchall extends ZodTypeAny = ZodTypeAny
> = ZodObjectDef<T, UnknownKeys, Catchall>;
type z_mergeTypes<A, B> = mergeTypes<A, B>;
type z_objectOutputType<
  Shape extends ZodRawShape,
  Catchall extends ZodTypeAny,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam
> = objectOutputType<Shape, Catchall, UnknownKeys>;
type z_baseObjectOutputType<Shape extends ZodRawShape> =
  baseObjectOutputType<Shape>;
type z_objectInputType<
  Shape extends ZodRawShape,
  Catchall extends ZodTypeAny,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam
> = objectInputType<Shape, Catchall, UnknownKeys>;
type z_baseObjectInputType<Shape extends ZodRawShape> =
  baseObjectInputType<Shape>;
type z_CatchallOutput<T extends ZodType> = CatchallOutput<T>;
type z_CatchallInput<T extends ZodType> = CatchallInput<T>;
type z_PassthroughType<T extends UnknownKeysParam> = PassthroughType<T>;
type z_deoptional<T extends ZodTypeAny> = deoptional<T>;
type z_SomeZodObject = SomeZodObject;
type z_noUnrecognized<
  Obj extends object,
  Shape extends object
> = noUnrecognized<Obj, Shape>;
type z_ZodObject<
  T extends ZodRawShape,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
  Catchall extends ZodTypeAny = ZodTypeAny,
  Output = objectOutputType<T, Catchall, UnknownKeys>,
  Input = objectInputType<T, Catchall, UnknownKeys>
> = ZodObject<T, UnknownKeys, Catchall, Output, Input>;
declare const z_ZodObject: typeof ZodObject;
type z_AnyZodObject = AnyZodObject;
type z_ZodUnionOptions = ZodUnionOptions;
type z_ZodUnionDef<
  T extends ZodUnionOptions = Readonly<
    [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]
  >
> = ZodUnionDef<T>;
type z_ZodUnion<T extends ZodUnionOptions> = ZodUnion<T>;
declare const z_ZodUnion: typeof ZodUnion;
type z_ZodDiscriminatedUnionOption<Discriminator extends string> =
  ZodDiscriminatedUnionOption<Discriminator>;
type z_ZodDiscriminatedUnionDef<
  Discriminator extends string,
  Options extends readonly ZodDiscriminatedUnionOption<string>[] = ZodDiscriminatedUnionOption<string>[]
> = ZodDiscriminatedUnionDef<Discriminator, Options>;
type z_ZodDiscriminatedUnion<
  Discriminator extends string,
  Options extends readonly ZodDiscriminatedUnionOption<Discriminator>[]
> = ZodDiscriminatedUnion<Discriminator, Options>;
declare const z_ZodDiscriminatedUnion: typeof ZodDiscriminatedUnion;
type z_ZodIntersectionDef<
  T extends ZodTypeAny = ZodTypeAny,
  U extends ZodTypeAny = ZodTypeAny
> = ZodIntersectionDef<T, U>;
type z_ZodIntersection<
  T extends ZodTypeAny,
  U extends ZodTypeAny
> = ZodIntersection<T, U>;
declare const z_ZodIntersection: typeof ZodIntersection;
type z_ZodTupleItems = ZodTupleItems;
type z_AssertArray<T> = AssertArray<T>;
type z_OutputTypeOfTuple<T extends ZodTupleItems | []> = OutputTypeOfTuple<T>;
type z_OutputTypeOfTupleWithRest<
  T extends ZodTupleItems | [],
  Rest extends ZodTypeAny | null = null
> = OutputTypeOfTupleWithRest<T, Rest>;
type z_InputTypeOfTuple<T extends ZodTupleItems | []> = InputTypeOfTuple<T>;
type z_InputTypeOfTupleWithRest<
  T extends ZodTupleItems | [],
  Rest extends ZodTypeAny | null = null
> = InputTypeOfTupleWithRest<T, Rest>;
type z_ZodTupleDef<
  T extends ZodTupleItems | [] = ZodTupleItems,
  Rest extends ZodTypeAny | null = null
> = ZodTupleDef<T, Rest>;
type z_AnyZodTuple = AnyZodTuple;
type z_ZodTuple<
  T extends [ZodTypeAny, ...ZodTypeAny[]] | [] = [ZodTypeAny, ...ZodTypeAny[]],
  Rest extends ZodTypeAny | null = null
> = ZodTuple<T, Rest>;
declare const z_ZodTuple: typeof ZodTuple;
type z_ZodRecordDef<
  Key extends KeySchema = ZodString,
  Value extends ZodTypeAny = ZodTypeAny
> = ZodRecordDef<Key, Value>;
type z_KeySchema = KeySchema;
type z_RecordType<K extends string | number | symbol, V> = RecordType<K, V>;
type z_ZodRecord<
  Key extends KeySchema = ZodString,
  Value extends ZodTypeAny = ZodTypeAny
> = ZodRecord<Key, Value>;
declare const z_ZodRecord: typeof ZodRecord;
type z_ZodMapDef<
  Key extends ZodTypeAny = ZodTypeAny,
  Value extends ZodTypeAny = ZodTypeAny
> = ZodMapDef<Key, Value>;
type z_ZodMap<
  Key extends ZodTypeAny = ZodTypeAny,
  Value extends ZodTypeAny = ZodTypeAny
> = ZodMap<Key, Value>;
declare const z_ZodMap: typeof ZodMap;
type z_ZodSetDef<Value extends ZodTypeAny = ZodTypeAny> = ZodSetDef<Value>;
type z_ZodSet<Value extends ZodTypeAny = ZodTypeAny> = ZodSet<Value>;
declare const z_ZodSet: typeof ZodSet;
type z_ZodFunctionDef<
  Args extends ZodTuple<any, any> = ZodTuple<any, any>,
  Returns extends ZodTypeAny = ZodTypeAny
> = ZodFunctionDef<Args, Returns>;
type z_OuterTypeOfFunction<
  Args extends ZodTuple<any, any>,
  Returns extends ZodTypeAny
> = OuterTypeOfFunction<Args, Returns>;
type z_InnerTypeOfFunction<
  Args extends ZodTuple<any, any>,
  Returns extends ZodTypeAny
> = InnerTypeOfFunction<Args, Returns>;
type z_ZodFunction<
  Args extends ZodTuple<any, any>,
  Returns extends ZodTypeAny
> = ZodFunction<Args, Returns>;
declare const z_ZodFunction: typeof ZodFunction;
type z_ZodLazyDef<T extends ZodTypeAny = ZodTypeAny> = ZodLazyDef<T>;
type z_ZodLazy<T extends ZodTypeAny> = ZodLazy<T>;
declare const z_ZodLazy: typeof ZodLazy;
type z_ZodLiteralDef<T = any> = ZodLiteralDef<T>;
type z_ZodLiteral<T> = ZodLiteral<T>;
declare const z_ZodLiteral: typeof ZodLiteral;
type z_ArrayKeys = ArrayKeys;
type z_Indices<T> = Indices<T>;
type z_EnumValues<T extends string = string> = EnumValues<T>;
type z_Values<T extends EnumValues> = Values<T>;
type z_ZodEnumDef<T extends EnumValues = EnumValues> = ZodEnumDef<T>;
type z_Writeable<T> = Writeable<T>;
type z_FilterEnum<Values, ToExclude> = FilterEnum<Values, ToExclude>;
type z_typecast<A, T> = typecast<A, T>;
type z_ZodEnum<T extends [string, ...string[]]> = ZodEnum<T>;
declare const z_ZodEnum: typeof ZodEnum;
type z_ZodNativeEnumDef<T extends EnumLike = EnumLike> = ZodNativeEnumDef<T>;
type z_EnumLike = EnumLike;
type z_ZodNativeEnum<T extends EnumLike> = ZodNativeEnum<T>;
declare const z_ZodNativeEnum: typeof ZodNativeEnum;
type z_ZodPromiseDef<T extends ZodTypeAny = ZodTypeAny> = ZodPromiseDef<T>;
type z_ZodPromise<T extends ZodTypeAny> = ZodPromise<T>;
declare const z_ZodPromise: typeof ZodPromise;
type z_Refinement<T> = Refinement<T>;
type z_SuperRefinement<T> = SuperRefinement<T>;
type z_RefinementEffect<T> = RefinementEffect<T>;
type z_TransformEffect<T> = TransformEffect<T>;
type z_PreprocessEffect<T> = PreprocessEffect<T>;
type z_Effect<T> = Effect<T>;
type z_ZodEffectsDef<T extends ZodTypeAny = ZodTypeAny> = ZodEffectsDef<T>;
type z_ZodEffects<
  T extends ZodTypeAny,
  Output = output<T>,
  Input = input<T>
> = ZodEffects<T, Output, Input>;
declare const z_ZodEffects: typeof ZodEffects;
type z_ZodOptionalDef<T extends ZodTypeAny = ZodTypeAny> = ZodOptionalDef<T>;
type z_ZodOptionalType<T extends ZodTypeAny> = ZodOptionalType<T>;
type z_ZodOptional<T extends ZodTypeAny> = ZodOptional<T>;
declare const z_ZodOptional: typeof ZodOptional;
type z_ZodNullableDef<T extends ZodTypeAny = ZodTypeAny> = ZodNullableDef<T>;
type z_ZodNullableType<T extends ZodTypeAny> = ZodNullableType<T>;
type z_ZodNullable<T extends ZodTypeAny> = ZodNullable<T>;
declare const z_ZodNullable: typeof ZodNullable;
type z_ZodDefaultDef<T extends ZodTypeAny = ZodTypeAny> = ZodDefaultDef<T>;
type z_ZodDefault<T extends ZodTypeAny> = ZodDefault<T>;
declare const z_ZodDefault: typeof ZodDefault;
type z_ZodCatchDef<T extends ZodTypeAny = ZodTypeAny> = ZodCatchDef<T>;
type z_ZodCatch<T extends ZodTypeAny> = ZodCatch<T>;
declare const z_ZodCatch: typeof ZodCatch;
type z_ZodNaNDef = ZodNaNDef;
type z_ZodNaN = ZodNaN;
declare const z_ZodNaN: typeof ZodNaN;
type z_ZodBrandedDef<T extends ZodTypeAny> = ZodBrandedDef<T>;
type z_BRAND<T extends string | number | symbol> = BRAND<T>;
type z_ZodBranded<
  T extends ZodTypeAny,
  B extends string | number | symbol
> = ZodBranded<T, B>;
declare const z_ZodBranded: typeof ZodBranded;
type z_ZodPipelineDef<
  A extends ZodTypeAny,
  B extends ZodTypeAny
> = ZodPipelineDef<A, B>;
type z_ZodPipeline<A extends ZodTypeAny, B extends ZodTypeAny> = ZodPipeline<
  A,
  B
>;
declare const z_ZodPipeline: typeof ZodPipeline;
type z_ZodReadonlyDef<T extends ZodTypeAny = ZodTypeAny> = ZodReadonlyDef<T>;
type z_ZodReadonly<T extends ZodTypeAny> = ZodReadonly<T>;
declare const z_ZodReadonly: typeof ZodReadonly;
declare const z_custom: typeof custom;
declare const z_late: typeof late;
type z_ZodFirstPartyTypeKind = ZodFirstPartyTypeKind;
declare const z_ZodFirstPartyTypeKind: typeof ZodFirstPartyTypeKind;
type z_ZodFirstPartySchemaTypes = ZodFirstPartySchemaTypes;
declare const z_coerce: typeof coerce;
declare const z_NEVER: typeof NEVER;
type z_inferFlattenedErrors<
  T extends ZodType<any, any, any>,
  U = string
> = inferFlattenedErrors<T, U>;
type z_typeToFlattenedError<T, U = string> = typeToFlattenedError<T, U>;
type z_ZodIssueCode = ZodIssueCode;
type z_ZodIssueBase = ZodIssueBase;
type z_ZodInvalidTypeIssue = ZodInvalidTypeIssue;
type z_ZodInvalidLiteralIssue = ZodInvalidLiteralIssue;
type z_ZodUnrecognizedKeysIssue = ZodUnrecognizedKeysIssue;
type z_ZodInvalidUnionIssue = ZodInvalidUnionIssue;
type z_ZodInvalidUnionDiscriminatorIssue = ZodInvalidUnionDiscriminatorIssue;
type z_ZodInvalidEnumValueIssue = ZodInvalidEnumValueIssue;
type z_ZodInvalidArgumentsIssue = ZodInvalidArgumentsIssue;
type z_ZodInvalidReturnTypeIssue = ZodInvalidReturnTypeIssue;
type z_ZodInvalidDateIssue = ZodInvalidDateIssue;
type z_StringValidation = StringValidation;
type z_ZodInvalidStringIssue = ZodInvalidStringIssue;
type z_ZodTooSmallIssue = ZodTooSmallIssue;
type z_ZodTooBigIssue = ZodTooBigIssue;
type z_ZodInvalidIntersectionTypesIssue = ZodInvalidIntersectionTypesIssue;
type z_ZodNotMultipleOfIssue = ZodNotMultipleOfIssue;
type z_ZodNotFiniteIssue = ZodNotFiniteIssue;
type z_ZodCustomIssue = ZodCustomIssue;
type z_DenormalizedError = DenormalizedError;
type z_ZodIssueOptionalMessage = ZodIssueOptionalMessage;
type z_ZodIssue = ZodIssue;
declare const z_quotelessJson: typeof quotelessJson;
type z_ZodFormattedError<T, U = string> = ZodFormattedError<T, U>;
type z_inferFormattedError<
  T extends ZodType<any, any, any>,
  U = string
> = inferFormattedError<T, U>;
type z_ZodError<T = any> = ZodError<T>;
declare const z_ZodError: typeof ZodError;
type z_IssueData = IssueData;
type z_ErrorMapCtx = ErrorMapCtx;
type z_ZodErrorMap = ZodErrorMap;
declare namespace z {
  export {
    errorMap as defaultErrorMap,
    z_setErrorMap as setErrorMap,
    z_getErrorMap as getErrorMap,
    z_makeIssue as makeIssue,
    type z_ParseParams as ParseParams,
    type z_ParsePathComponent as ParsePathComponent,
    type z_ParsePath as ParsePath,
    z_EMPTY_PATH as EMPTY_PATH,
    type z_ParseContext as ParseContext,
    type z_ParseInput as ParseInput,
    z_addIssueToContext as addIssueToContext,
    type z_ObjectPair as ObjectPair,
    z_ParseStatus as ParseStatus,
    type z_ParseResult as ParseResult,
    z_INVALID as INVALID,
    z_DIRTY as DIRTY,
    z_OK as OK,
    type z_SyncParseReturnType as SyncParseReturnType,
    type z_AsyncParseReturnType as AsyncParseReturnType,
    type z_ParseReturnType as ParseReturnType,
    z_isAborted as isAborted,
    z_isDirty as isDirty,
    z_isValid as isValid,
    z_isAsync as isAsync,
    type z_Primitive as Primitive,
    type z_Scalars as Scalars,
    z_util as util,
    z_objectUtil as objectUtil,
    type z_ZodParsedType as ZodParsedType,
    z_getParsedType as getParsedType,
    type TypeOf as infer,
    ZodEffects as ZodTransformer,
    ZodType as Schema,
    ZodType as ZodSchema,
    anyType as any,
    arrayType as array,
    bigIntType as bigint,
    booleanType as boolean,
    dateType as date,
    discriminatedUnionType as discriminatedUnion,
    effectsType as effect,
    enumType as enum,
    functionType as function,
    instanceOfType as instanceof,
    intersectionType as intersection,
    lazyType as lazy,
    literalType as literal,
    mapType as map,
    nanType as nan,
    nativeEnumType as nativeEnum,
    neverType as never,
    nullType as null,
    nullableType as nullable,
    numberType as number,
    objectType as object,
    z_oboolean as oboolean,
    z_onumber as onumber,
    optionalType as optional,
    z_ostring as ostring,
    pipelineType as pipeline,
    preprocessType as preprocess,
    promiseType as promise,
    recordType as record,
    setType as set,
    strictObjectType as strictObject,
    stringType as string,
    symbolType as symbol,
    effectsType as transformer,
    tupleType as tuple,
    undefinedType as undefined,
    unionType as union,
    unknownType as unknown,
    voidType as void,
    type z_RefinementCtx as RefinementCtx,
    type z_ZodRawShape as ZodRawShape,
    type z_ZodTypeAny as ZodTypeAny,
    type z_TypeOf as TypeOf,
    type z_input as input,
    type z_output as output,
    type z_CustomErrorParams as CustomErrorParams,
    type z_ZodTypeDef as ZodTypeDef,
    type z_RawCreateParams as RawCreateParams,
    type z_ProcessedCreateParams as ProcessedCreateParams,
    type z_SafeParseSuccess as SafeParseSuccess,
    type z_SafeParseError as SafeParseError,
    type z_SafeParseReturnType as SafeParseReturnType,
    z_ZodType as ZodType,
    type z_IpVersion as IpVersion,
    type z_ZodStringCheck as ZodStringCheck,
    type z_ZodStringDef as ZodStringDef,
    z_datetimeRegex as datetimeRegex,
    z_ZodString as ZodString,
    type z_ZodNumberCheck as ZodNumberCheck,
    type z_ZodNumberDef as ZodNumberDef,
    z_ZodNumber as ZodNumber,
    type z_ZodBigIntCheck as ZodBigIntCheck,
    type z_ZodBigIntDef as ZodBigIntDef,
    z_ZodBigInt as ZodBigInt,
    type z_ZodBooleanDef as ZodBooleanDef,
    z_ZodBoolean as ZodBoolean,
    type z_ZodDateCheck as ZodDateCheck,
    type z_ZodDateDef as ZodDateDef,
    z_ZodDate as ZodDate,
    type z_ZodSymbolDef as ZodSymbolDef,
    z_ZodSymbol as ZodSymbol,
    type z_ZodUndefinedDef as ZodUndefinedDef,
    z_ZodUndefined as ZodUndefined,
    type z_ZodNullDef as ZodNullDef,
    z_ZodNull as ZodNull,
    type z_ZodAnyDef as ZodAnyDef,
    z_ZodAny as ZodAny,
    type z_ZodUnknownDef as ZodUnknownDef,
    z_ZodUnknown as ZodUnknown,
    type z_ZodNeverDef as ZodNeverDef,
    z_ZodNever as ZodNever,
    type z_ZodVoidDef as ZodVoidDef,
    z_ZodVoid as ZodVoid,
    type z_ZodArrayDef as ZodArrayDef,
    type z_ArrayCardinality as ArrayCardinality,
    type z_arrayOutputType as arrayOutputType,
    z_ZodArray as ZodArray,
    type z_ZodNonEmptyArray as ZodNonEmptyArray,
    type z_UnknownKeysParam as UnknownKeysParam,
    type z_ZodObjectDef as ZodObjectDef,
    type z_mergeTypes as mergeTypes,
    type z_objectOutputType as objectOutputType,
    type z_baseObjectOutputType as baseObjectOutputType,
    type z_objectInputType as objectInputType,
    type z_baseObjectInputType as baseObjectInputType,
    type z_CatchallOutput as CatchallOutput,
    type z_CatchallInput as CatchallInput,
    type z_PassthroughType as PassthroughType,
    type z_deoptional as deoptional,
    type z_SomeZodObject as SomeZodObject,
    type z_noUnrecognized as noUnrecognized,
    z_ZodObject as ZodObject,
    type z_AnyZodObject as AnyZodObject,
    type z_ZodUnionOptions as ZodUnionOptions,
    type z_ZodUnionDef as ZodUnionDef,
    z_ZodUnion as ZodUnion,
    type z_ZodDiscriminatedUnionOption as ZodDiscriminatedUnionOption,
    type z_ZodDiscriminatedUnionDef as ZodDiscriminatedUnionDef,
    z_ZodDiscriminatedUnion as ZodDiscriminatedUnion,
    type z_ZodIntersectionDef as ZodIntersectionDef,
    z_ZodIntersection as ZodIntersection,
    type z_ZodTupleItems as ZodTupleItems,
    type z_AssertArray as AssertArray,
    type z_OutputTypeOfTuple as OutputTypeOfTuple,
    type z_OutputTypeOfTupleWithRest as OutputTypeOfTupleWithRest,
    type z_InputTypeOfTuple as InputTypeOfTuple,
    type z_InputTypeOfTupleWithRest as InputTypeOfTupleWithRest,
    type z_ZodTupleDef as ZodTupleDef,
    type z_AnyZodTuple as AnyZodTuple,
    z_ZodTuple as ZodTuple,
    type z_ZodRecordDef as ZodRecordDef,
    type z_KeySchema as KeySchema,
    type z_RecordType as RecordType,
    z_ZodRecord as ZodRecord,
    type z_ZodMapDef as ZodMapDef,
    z_ZodMap as ZodMap,
    type z_ZodSetDef as ZodSetDef,
    z_ZodSet as ZodSet,
    type z_ZodFunctionDef as ZodFunctionDef,
    type z_OuterTypeOfFunction as OuterTypeOfFunction,
    type z_InnerTypeOfFunction as InnerTypeOfFunction,
    z_ZodFunction as ZodFunction,
    type z_ZodLazyDef as ZodLazyDef,
    z_ZodLazy as ZodLazy,
    type z_ZodLiteralDef as ZodLiteralDef,
    z_ZodLiteral as ZodLiteral,
    type z_ArrayKeys as ArrayKeys,
    type z_Indices as Indices,
    type z_EnumValues as EnumValues,
    type z_Values as Values,
    type z_ZodEnumDef as ZodEnumDef,
    type z_Writeable as Writeable,
    type z_FilterEnum as FilterEnum,
    type z_typecast as typecast,
    z_ZodEnum as ZodEnum,
    type z_ZodNativeEnumDef as ZodNativeEnumDef,
    type z_EnumLike as EnumLike,
    z_ZodNativeEnum as ZodNativeEnum,
    type z_ZodPromiseDef as ZodPromiseDef,
    z_ZodPromise as ZodPromise,
    type z_Refinement as Refinement,
    type z_SuperRefinement as SuperRefinement,
    type z_RefinementEffect as RefinementEffect,
    type z_TransformEffect as TransformEffect,
    type z_PreprocessEffect as PreprocessEffect,
    type z_Effect as Effect,
    type z_ZodEffectsDef as ZodEffectsDef,
    z_ZodEffects as ZodEffects,
    type z_ZodOptionalDef as ZodOptionalDef,
    type z_ZodOptionalType as ZodOptionalType,
    z_ZodOptional as ZodOptional,
    type z_ZodNullableDef as ZodNullableDef,
    type z_ZodNullableType as ZodNullableType,
    z_ZodNullable as ZodNullable,
    type z_ZodDefaultDef as ZodDefaultDef,
    z_ZodDefault as ZodDefault,
    type z_ZodCatchDef as ZodCatchDef,
    z_ZodCatch as ZodCatch,
    type z_ZodNaNDef as ZodNaNDef,
    z_ZodNaN as ZodNaN,
    type z_ZodBrandedDef as ZodBrandedDef,
    type z_BRAND as BRAND,
    z_ZodBranded as ZodBranded,
    type z_ZodPipelineDef as ZodPipelineDef,
    z_ZodPipeline as ZodPipeline,
    type z_ZodReadonlyDef as ZodReadonlyDef,
    z_ZodReadonly as ZodReadonly,
    z_custom as custom,
    z_late as late,
    z_ZodFirstPartyTypeKind as ZodFirstPartyTypeKind,
    type z_ZodFirstPartySchemaTypes as ZodFirstPartySchemaTypes,
    z_coerce as coerce,
    z_NEVER as NEVER,
    type z_inferFlattenedErrors as inferFlattenedErrors,
    type z_typeToFlattenedError as typeToFlattenedError,
    type z_ZodIssueCode as ZodIssueCode,
    type z_ZodIssueBase as ZodIssueBase,
    type z_ZodInvalidTypeIssue as ZodInvalidTypeIssue,
    type z_ZodInvalidLiteralIssue as ZodInvalidLiteralIssue,
    type z_ZodUnrecognizedKeysIssue as ZodUnrecognizedKeysIssue,
    type z_ZodInvalidUnionIssue as ZodInvalidUnionIssue,
    type z_ZodInvalidUnionDiscriminatorIssue as ZodInvalidUnionDiscriminatorIssue,
    type z_ZodInvalidEnumValueIssue as ZodInvalidEnumValueIssue,
    type z_ZodInvalidArgumentsIssue as ZodInvalidArgumentsIssue,
    type z_ZodInvalidReturnTypeIssue as ZodInvalidReturnTypeIssue,
    type z_ZodInvalidDateIssue as ZodInvalidDateIssue,
    type z_StringValidation as StringValidation,
    type z_ZodInvalidStringIssue as ZodInvalidStringIssue,
    type z_ZodTooSmallIssue as ZodTooSmallIssue,
    type z_ZodTooBigIssue as ZodTooBigIssue,
    type z_ZodInvalidIntersectionTypesIssue as ZodInvalidIntersectionTypesIssue,
    type z_ZodNotMultipleOfIssue as ZodNotMultipleOfIssue,
    type z_ZodNotFiniteIssue as ZodNotFiniteIssue,
    type z_ZodCustomIssue as ZodCustomIssue,
    type z_DenormalizedError as DenormalizedError,
    type z_ZodIssueOptionalMessage as ZodIssueOptionalMessage,
    type z_ZodIssue as ZodIssue,
    z_quotelessJson as quotelessJson,
    type z_ZodFormattedError as ZodFormattedError,
    type z_inferFormattedError as inferFormattedError,
    z_ZodError as ZodError,
    type z_IssueData as IssueData,
    type z_ErrorMapCtx as ErrorMapCtx,
    type z_ZodErrorMap as ZodErrorMap,
  };
}

export {
  type AnyZodObject,
  type AnyZodTuple,
  type ArrayCardinality,
  type ArrayKeys,
  type AssertArray,
  type AsyncParseReturnType,
  BRAND,
  type CatchallInput,
  type CatchallOutput,
  type CustomErrorParams,
  DIRTY,
  type DenormalizedError,
  EMPTY_PATH,
  type Effect,
  type EnumLike,
  type EnumValues,
  type ErrorMapCtx,
  type FilterEnum,
  INVALID,
  type Indices,
  type InnerTypeOfFunction,
  type InputTypeOfTuple,
  type InputTypeOfTupleWithRest,
  type IpVersion,
  type IssueData,
  type KeySchema,
  NEVER,
  OK,
  type ObjectPair,
  type OuterTypeOfFunction,
  type OutputTypeOfTuple,
  type OutputTypeOfTupleWithRest,
  type ParseContext,
  type ParseInput,
  type ParseParams,
  type ParsePath,
  type ParsePathComponent,
  type ParseResult,
  type ParseReturnType,
  ParseStatus,
  type PassthroughType,
  type PreprocessEffect,
  type Primitive,
  type ProcessedCreateParams,
  type RawCreateParams,
  type RecordType,
  type Refinement,
  type RefinementCtx,
  type RefinementEffect,
  type SafeParseError,
  type SafeParseReturnType,
  type SafeParseSuccess,
  type Scalars,
  ZodType as Schema,
  type SomeZodObject,
  type StringValidation,
  type SuperRefinement,
  type SyncParseReturnType,
  type TransformEffect,
  type TypeOf,
  type UnknownKeysParam,
  type Values,
  type Writeable,
  ZodAny,
  type ZodAnyDef,
  ZodArray,
  type ZodArrayDef,
  ZodBigInt,
  type ZodBigIntCheck,
  type ZodBigIntDef,
  ZodBoolean,
  type ZodBooleanDef,
  ZodBranded,
  type ZodBrandedDef,
  ZodCatch,
  type ZodCatchDef,
  type ZodCustomIssue,
  ZodDate,
  type ZodDateCheck,
  type ZodDateDef,
  ZodDefault,
  type ZodDefaultDef,
  ZodDiscriminatedUnion,
  type ZodDiscriminatedUnionDef,
  type ZodDiscriminatedUnionOption,
  ZodEffects,
  type ZodEffectsDef,
  ZodEnum,
  type ZodEnumDef,
  ZodError,
  type ZodErrorMap,
  type ZodFirstPartySchemaTypes,
  ZodFirstPartyTypeKind,
  type ZodFormattedError,
  ZodFunction,
  type ZodFunctionDef,
  ZodIntersection,
  type ZodIntersectionDef,
  type ZodInvalidArgumentsIssue,
  type ZodInvalidDateIssue,
  type ZodInvalidEnumValueIssue,
  type ZodInvalidIntersectionTypesIssue,
  type ZodInvalidLiteralIssue,
  type ZodInvalidReturnTypeIssue,
  type ZodInvalidStringIssue,
  type ZodInvalidTypeIssue,
  type ZodInvalidUnionDiscriminatorIssue,
  type ZodInvalidUnionIssue,
  type ZodIssue,
  type ZodIssueBase,
  ZodIssueCode,
  type ZodIssueOptionalMessage,
  ZodLazy,
  type ZodLazyDef,
  ZodLiteral,
  type ZodLiteralDef,
  ZodMap,
  type ZodMapDef,
  ZodNaN,
  type ZodNaNDef,
  ZodNativeEnum,
  type ZodNativeEnumDef,
  ZodNever,
  type ZodNeverDef,
  type ZodNonEmptyArray,
  type ZodNotFiniteIssue,
  type ZodNotMultipleOfIssue,
  ZodNull,
  type ZodNullDef,
  ZodNullable,
  type ZodNullableDef,
  type ZodNullableType,
  ZodNumber,
  type ZodNumberCheck,
  type ZodNumberDef,
  ZodObject,
  type ZodObjectDef,
  ZodOptional,
  type ZodOptionalDef,
  type ZodOptionalType,
  ZodParsedType,
  ZodPipeline,
  type ZodPipelineDef,
  ZodPromise,
  type ZodPromiseDef,
  type ZodRawShape,
  ZodReadonly,
  type ZodReadonlyDef,
  ZodRecord,
  type ZodRecordDef,
  ZodType as ZodSchema,
  ZodSet,
  type ZodSetDef,
  ZodString,
  type ZodStringCheck,
  type ZodStringDef,
  ZodSymbol,
  type ZodSymbolDef,
  type ZodTooBigIssue,
  type ZodTooSmallIssue,
  ZodEffects as ZodTransformer,
  ZodTuple,
  type ZodTupleDef,
  type ZodTupleItems,
  ZodType,
  type ZodTypeAny,
  type ZodTypeDef,
  ZodUndefined,
  type ZodUndefinedDef,
  ZodUnion,
  type ZodUnionDef,
  type ZodUnionOptions,
  ZodUnknown,
  type ZodUnknownDef,
  type ZodUnrecognizedKeysIssue,
  ZodVoid,
  type ZodVoidDef,
  addIssueToContext,
  anyType as any,
  arrayType as array,
  type arrayOutputType,
  type baseObjectInputType,
  type baseObjectOutputType,
  bigIntType as bigint,
  booleanType as boolean,
  coerce,
  custom,
  dateType as date,
  datetimeRegex,
  z as default,
  errorMap as defaultErrorMap,
  type deoptional,
  discriminatedUnionType as discriminatedUnion,
  effectsType as effect,
  enumType as enum,
  functionType as function,
  getErrorMap,
  getParsedType,
  type TypeOf as infer,
  type inferFlattenedErrors,
  type inferFormattedError,
  type input,
  instanceOfType as instanceof,
  intersectionType as intersection,
  isAborted,
  isAsync,
  isDirty,
  isValid,
  late,
  lazyType as lazy,
  literalType as literal,
  makeIssue,
  mapType as map,
  type mergeTypes,
  nanType as nan,
  nativeEnumType as nativeEnum,
  neverType as never,
  type noUnrecognized,
  nullType as null,
  nullableType as nullable,
  numberType as number,
  objectType as object,
  type objectInputType,
  type objectOutputType,
  objectUtil,
  oboolean,
  onumber,
  optionalType as optional,
  ostring,
  type output,
  pipelineType as pipeline,
  preprocessType as preprocess,
  promiseType as promise,
  quotelessJson,
  recordType as record,
  setType as set,
  setErrorMap,
  strictObjectType as strictObject,
  stringType as string,
  symbolType as symbol,
  effectsType as transformer,
  tupleType as tuple,
  type typeToFlattenedError,
  type typecast,
  undefinedType as undefined,
  unionType as union,
  unknownType as unknown,
  util,
  voidType as void,
  z,
};

  /// <reference types="@ijstech/ton-core" />


import { ABIArgument } from '@ijstech/ton-core';
import { ABIError } from '@ijstech/ton-core';
import { ABIField } from '@ijstech/ton-core';
import { ABIGetter } from '@ijstech/ton-core';
import { ABIReceiver } from '@ijstech/ton-core';
import { ABIReceiverMessage } from '@ijstech/ton-core';
import { ABIType } from '@ijstech/ton-core';
import { ABITypeRef } from '@ijstech/ton-core';
import { Account } from '@ijstech/ton-core';
import { AccountState } from '@ijstech/ton-core';
import { AccountStatus } from '@ijstech/ton-core';
import { AccountStatusChange } from '@ijstech/ton-core';
import { AccountStorage } from '@ijstech/ton-core';
import { Address } from '@ijstech/ton-core';
import { address } from '@ijstech/ton-core';
import { ADNLAddress } from '@ijstech/ton-core';
import { base32Decode } from '@ijstech/ton-core';
import { base32Encode } from '@ijstech/ton-core';
import { beginCell } from '@ijstech/ton-core';
import { BitBuilder } from '@ijstech/ton-core';
import { BitReader } from '@ijstech/ton-core';
import { BitString } from '@ijstech/ton-core';
import { Builder } from '@ijstech/ton-core';
import { Cell } from '@ijstech/ton-core';
import { Cell as Cell_2 } from '@ijstech/ton-core';
import { CellType } from '@ijstech/ton-core';
import { comment } from '@ijstech/ton-core';
import { CommonMessageInfo } from '@ijstech/ton-core';
import { CommonMessageInfoExternalIn } from '@ijstech/ton-core';
import { CommonMessageInfoExternalOut } from '@ijstech/ton-core';
import { CommonMessageInfoInternal } from '@ijstech/ton-core';
import { CommonMessageInfoRelaxed } from '@ijstech/ton-core';
import { CommonMessageInfoRelaxedExternalOut } from '@ijstech/ton-core';
import { CommonMessageInfoRelaxedInternal } from '@ijstech/ton-core';
import { ComputeError } from '@ijstech/ton-core';
import { ComputeSkipReason } from '@ijstech/ton-core';
import { Contract } from '@ijstech/ton-core';
import { ContractABI } from '@ijstech/ton-core';
import { contractAddress } from '@ijstech/ton-core';
import { ContractGetMethodResult } from '@ijstech/ton-core';
import { ContractProvider } from '@ijstech/ton-core';
import { ContractState } from '@ijstech/ton-core';
import { convertToMerkleProof } from '@ijstech/ton-core';
import { crc16 } from '@ijstech/ton-core';
import { crc32c } from '@ijstech/ton-core';
import { CurrencyCollection } from '@ijstech/ton-core';
import { DepthBalanceInfo } from '@ijstech/ton-core';
import { Dictionary } from '@ijstech/ton-core';
import { DictionaryKey } from '@ijstech/ton-core';
import { DictionaryKeyTypes } from '@ijstech/ton-core';
import { DictionaryValue } from '@ijstech/ton-core';
import { exoticMerkleProof } from '@ijstech/ton-core';
import { exoticMerkleUpdate } from '@ijstech/ton-core';
import { exoticPruned } from '@ijstech/ton-core';
import { external as external_2 } from '@ijstech/ton-core';
import { ExternalAddress } from '@ijstech/ton-core';
import { ExtraCurrency } from '@ijstech/ton-core';
import { fromNano } from '@ijstech/ton-core';
import { generateMerkleProof } from '@ijstech/ton-core';
import { generateMerkleProofDirect } from '@ijstech/ton-core';
import { generateMerkleUpdate } from '@ijstech/ton-core';
import { getMethodId } from '@ijstech/ton-core';
import { HashUpdate } from '@ijstech/ton-core';
import { internal } from '@ijstech/ton-core';
import { LibRef } from '@ijstech/ton-core';
import { loadAccount } from '@ijstech/ton-core';
import { loadAccountState } from '@ijstech/ton-core';
import { loadAccountStatus } from '@ijstech/ton-core';
import { loadAccountStatusChange } from '@ijstech/ton-core';
import { loadAccountStorage } from '@ijstech/ton-core';
import { loadCommonMessageInfo } from '@ijstech/ton-core';
import { loadCommonMessageInfoRelaxed } from '@ijstech/ton-core';
import { loadComputeSkipReason } from '@ijstech/ton-core';
import { loadCurrencyCollection } from '@ijstech/ton-core';
import { loadDepthBalanceInfo } from '@ijstech/ton-core';
import { loadExtraCurrency } from '@ijstech/ton-core';
import { loadHashUpdate } from '@ijstech/ton-core';
import { loadLibRef } from '@ijstech/ton-core';
import { loadMasterchainStateExtra } from '@ijstech/ton-core';
import { loadMaybeExtraCurrency } from '@ijstech/ton-core';
import { loadMessage } from '@ijstech/ton-core';
import { loadMessageRelaxed } from '@ijstech/ton-core';
import { loadOutAction } from '@ijstech/ton-core';
import { loadOutList } from '@ijstech/ton-core';
import { loadShardAccount } from '@ijstech/ton-core';
import { loadShardAccounts } from '@ijstech/ton-core';
import { loadShardIdent } from '@ijstech/ton-core';
import { loadShardStateUnsplit } from '@ijstech/ton-core';
import { loadSimpleLibrary } from '@ijstech/ton-core';
import { loadSplitMergeInfo } from '@ijstech/ton-core';
import { loadStateInit } from '@ijstech/ton-core';
import { loadStorageInfo } from '@ijstech/ton-core';
import { loadStorageUsed } from '@ijstech/ton-core';
import { loadStorageUsedShort } from '@ijstech/ton-core';
import { loadTickTock } from '@ijstech/ton-core';
import { loadTransaction } from '@ijstech/ton-core';
import { loadTransactionActionPhase } from '@ijstech/ton-core';
import { loadTransactionBouncePhase } from '@ijstech/ton-core';
import { loadTransactionComputePhase } from '@ijstech/ton-core';
import { loadTransactionCreditPhase } from '@ijstech/ton-core';
import { loadTransactionDescription } from '@ijstech/ton-core';
import { loadTransactionStoragePhase } from '@ijstech/ton-core';
import { MasterchainStateExtra } from '@ijstech/ton-core';
import { Maybe } from '@ijstech/ton-core';
import { Message } from '@ijstech/ton-core';
import { MessageRelaxed } from '@ijstech/ton-core';
import { openContract } from '@ijstech/ton-core';
import { OpenedContract } from '@ijstech/ton-core';
import { OutAction } from '@ijstech/ton-core';
import { OutActionChangeLibrary } from '@ijstech/ton-core';
import { OutActionReserve } from '@ijstech/ton-core';
import { OutActionSendMsg } from '@ijstech/ton-core';
import { OutActionSetCode } from '@ijstech/ton-core';
import { packExtraCurrencyCell } from '@ijstech/ton-core';
import { packExtraCurrencyDict } from '@ijstech/ton-core';
import { paddedBufferToBits } from '@ijstech/ton-core';
import { parseTuple } from '@ijstech/ton-core';
import { ReserveMode } from '@ijstech/ton-core';
import { safeSign } from '@ijstech/ton-core';
import { safeSignVerify } from '@ijstech/ton-core';
import { Sender } from '@ijstech/ton-core';
import { SenderArguments } from '@ijstech/ton-core';
import { SendMode } from '@ijstech/ton-core';
import { serializeTuple } from '@ijstech/ton-core';
import { ShardAccount } from '@ijstech/ton-core';
import { ShardAccountRef } from '@ijstech/ton-core';
import { ShardAccountRefValue } from '@ijstech/ton-core';
import { ShardIdent } from '@ijstech/ton-core';
import { ShardStateUnsplit } from '@ijstech/ton-core';
import { SimpleLibrary } from '@ijstech/ton-core';
import { Slice } from '@ijstech/ton-core';
import { SplitMergeInfo } from '@ijstech/ton-core';
import { StateInit } from '@ijstech/ton-core';
import { StorageInfo } from '@ijstech/ton-core';
import { StorageUsed } from '@ijstech/ton-core';
import { StorageUsedShort } from '@ijstech/ton-core';
import { storeAccount } from '@ijstech/ton-core';
import { storeAccountState } from '@ijstech/ton-core';
import { storeAccountStatus } from '@ijstech/ton-core';
import { storeAccountStatusChange } from '@ijstech/ton-core';
import { storeAccountStorage } from '@ijstech/ton-core';
import { storeCommonMessageInfo } from '@ijstech/ton-core';
import { storeCommonMessageInfoRelaxed } from '@ijstech/ton-core';
import { storeComputeSkipReason } from '@ijstech/ton-core';
import { storeCurrencyCollection } from '@ijstech/ton-core';
import { storeDepthBalanceInfo } from '@ijstech/ton-core';
import { storeExtraCurrency } from '@ijstech/ton-core';
import { storeHashUpdate } from '@ijstech/ton-core';
import { storeLibRef } from '@ijstech/ton-core';
import { storeMessage } from '@ijstech/ton-core';
import { storeMessageRelaxed } from '@ijstech/ton-core';
import { storeOutAction } from '@ijstech/ton-core';
import { storeOutList } from '@ijstech/ton-core';
import { storeShardAccount } from '@ijstech/ton-core';
import { storeShardAccounts } from '@ijstech/ton-core';
import { storeShardIdent } from '@ijstech/ton-core';
import { storeSimpleLibrary } from '@ijstech/ton-core';
import { storeSplitMergeInfo } from '@ijstech/ton-core';
import { storeStateInit } from '@ijstech/ton-core';
import { storeStorageInfo } from '@ijstech/ton-core';
import { storeStorageUsed } from '@ijstech/ton-core';
import { storeStorageUsedShort } from '@ijstech/ton-core';
import { storeTickTock } from '@ijstech/ton-core';
import { storeTransaction } from '@ijstech/ton-core';
import { storeTransactionActionPhase } from '@ijstech/ton-core';
import { storeTransactionBouncePhase } from '@ijstech/ton-core';
import { storeTransactionComputePhase } from '@ijstech/ton-core';
import { storeTransactionCreditPhase } from '@ijstech/ton-core';
import { storeTransactionDescription } from '@ijstech/ton-core';
import { storeTransactionsStoragePhase } from '@ijstech/ton-core';
import { TickTock } from '@ijstech/ton-core';
import { toNano } from '@ijstech/ton-core';
import { Transaction } from '@ijstech/ton-core';
import { TransactionActionPhase } from '@ijstech/ton-core';
import { TransactionBounceNegativeFunds } from '@ijstech/ton-core';
import { TransactionBounceNoFunds } from '@ijstech/ton-core';
import { TransactionBounceOk } from '@ijstech/ton-core';
import { TransactionBouncePhase } from '@ijstech/ton-core';
import { TransactionComputePhase } from '@ijstech/ton-core';
import { TransactionComputeSkipped } from '@ijstech/ton-core';
import { TransactionComputeVm } from '@ijstech/ton-core';
import { TransactionCreditPhase } from '@ijstech/ton-core';
import { TransactionDescription } from '@ijstech/ton-core';
import { TransactionDescriptionGeneric } from '@ijstech/ton-core';
import { TransactionDescriptionMergeInstall } from '@ijstech/ton-core';
import { TransactionDescriptionMergePrepare } from '@ijstech/ton-core';
import { TransactionDescriptionSplitInstall } from '@ijstech/ton-core';
import { TransactionDescriptionSplitPrepare } from '@ijstech/ton-core';
import { TransactionDescriptionStorage } from '@ijstech/ton-core';
import { TransactionDescriptionTickTock } from '@ijstech/ton-core';
import { TransactionStoragePhase } from '@ijstech/ton-core';
import { Tuple } from '@ijstech/ton-core';
import { TupleBuilder } from '@ijstech/ton-core';
import { TupleItem } from '@ijstech/ton-core';
import { TupleItemBuilder } from '@ijstech/ton-core';
import { TupleItemCell } from '@ijstech/ton-core';
import { TupleItemInt } from '@ijstech/ton-core';
import { TupleItemNaN } from '@ijstech/ton-core';
import { TupleItemNull } from '@ijstech/ton-core';
import { TupleItemSlice } from '@ijstech/ton-core';
import { TupleReader } from '@ijstech/ton-core';
import { Writable } from '@ijstech/ton-core';
export { ABIArgument }

export { ABIError }

export { ABIField }

export { ABIGetter }

export { ABIReceiver }

export { ABIReceiverMessage }

export { ABIType }

export { ABITypeRef }

export { Account }

declare interface Account_2 {
    /**
     * User's address in "hex" format: "<wc>:<hex>".
     */
    address: string;
    /**
     * User's selected chain.
     */
    chain: CHAIN;
    /**
     * Base64 (not url safe) encoded wallet contract stateInit.
     * Can be used to get user's public key from the stateInit if the wallet contract doesn't support corresponding get method.
     */
    walletStateInit: string;
    /**
     * Hex string without 0x prefix.
     */
    publicKey?: string;
}

export { AccountState }

export { AccountStatus }

export { AccountStatusChange }

export { AccountStorage }

export { Address }

export { address }

declare type AddressFamily = 4 | 6 | undefined;

declare type AddTonConnectPrefix<T extends string> = `ton-connect-${T}` | `ton-connect-ui-${T}`;

export { ADNLAddress }

/**
 * Requested authentication type: 'ton_addr' or 'ton_proof'.
 */
declare type AuthType = ConnectItem['name'];

declare interface AxiosAdapter {
    (config: InternalAxiosRequestConfig): AxiosPromise;
}

declare type AxiosAdapterConfig = AxiosAdapter | AxiosAdapterName;

declare type AxiosAdapterName = 'fetch' | 'xhr' | 'http' | string;

declare interface AxiosBasicCredentials {
    username: string;
    password: string;
}

declare type AxiosHeaderMatcher = string | RegExp | ((this: AxiosHeaders, value: string, name: string) => boolean);

declare type AxiosHeaderParser = (this: AxiosHeaders, value: AxiosHeaderValue, header: string) => any;

declare class AxiosHeaders {
    constructor(
    headers?: RawAxiosHeaders | AxiosHeaders | string
    );

    [key: string]: any;

    set(headerName?: string, value?: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
    set(headers?: RawAxiosHeaders | AxiosHeaders | string, rewrite?: boolean): AxiosHeaders;

    get(headerName: string, parser: RegExp): RegExpExecArray | null;
    get(headerName: string, matcher?: true | AxiosHeaderParser): AxiosHeaderValue;

    has(header: string, matcher?: AxiosHeaderMatcher): boolean;

    delete(header: string | string[], matcher?: AxiosHeaderMatcher): boolean;

    clear(matcher?: AxiosHeaderMatcher): boolean;

    normalize(format: boolean): AxiosHeaders;

    concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string | undefined | null>): AxiosHeaders;

    toJSON(asStrings?: boolean): RawAxiosHeaders;

    static from(thing?: AxiosHeaders | RawAxiosHeaders | string): AxiosHeaders;

    static accessor(header: string | string[]): AxiosHeaders;

    static concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string | undefined | null>): AxiosHeaders;

    setContentType(value: ContentType, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
    getContentType(parser?: RegExp): RegExpExecArray | null;
    getContentType(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
    hasContentType(matcher?: AxiosHeaderMatcher): boolean;

    setContentLength(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
    getContentLength(parser?: RegExp): RegExpExecArray | null;
    getContentLength(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
    hasContentLength(matcher?: AxiosHeaderMatcher): boolean;

    setAccept(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
    getAccept(parser?: RegExp): RegExpExecArray | null;
    getAccept(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
    hasAccept(matcher?: AxiosHeaderMatcher): boolean;

    setUserAgent(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
    getUserAgent(parser?: RegExp): RegExpExecArray | null;
    getUserAgent(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
    hasUserAgent(matcher?: AxiosHeaderMatcher): boolean;

    setContentEncoding(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
    getContentEncoding(parser?: RegExp): RegExpExecArray | null;
    getContentEncoding(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
    hasContentEncoding(matcher?: AxiosHeaderMatcher): boolean;

    setAuthorization(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
    getAuthorization(parser?: RegExp): RegExpExecArray | null;
    getAuthorization(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
    hasAuthorization(matcher?: AxiosHeaderMatcher): boolean;

    [Symbol.iterator](): IterableIterator<[string, AxiosHeaderValue]>;
}

declare type AxiosHeaderValue = AxiosHeaders | string | string[] | number | boolean | null;

declare interface AxiosProgressEvent {
    loaded: number;
    total?: number;
    progress?: number;
    bytes: number;
    rate?: number;
    estimated?: number;
    upload?: boolean;
    download?: boolean;
    event?: BrowserProgressEvent;
    lengthComputable: boolean;
}

declare type AxiosPromise<T = any> = Promise<AxiosResponse<T>>;

declare interface AxiosProxyConfig {
    host: string;
    port: number;
    auth?: AxiosBasicCredentials;
    protocol?: string;
}

declare interface AxiosRequestConfig<D = any> {
    url?: string;
    method?: Method | string;
    baseURL?: string;
    transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
    transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
    headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
    params?: any;
    paramsSerializer?: ParamsSerializerOptions | CustomParamsSerializer;
    data?: D;
    timeout?: Milliseconds;
    timeoutErrorMessage?: string;
    withCredentials?: boolean;
    adapter?: AxiosAdapterConfig | AxiosAdapterConfig[];
    auth?: AxiosBasicCredentials;
    responseType?: ResponseType_2;
    responseEncoding?: responseEncoding | string;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
    maxContentLength?: number;
    validateStatus?: ((status: number) => boolean) | null;
    maxBodyLength?: number;
    maxRedirects?: number;
    maxRate?: number | [MaxUploadRate, MaxDownloadRate];
    beforeRedirect?: (options: Record<string, any>, responseDetails: {headers: Record<string, string>, statusCode: HttpStatusCode}) => void;
    socketPath?: string | null;
    transport?: any;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: AxiosProxyConfig | false;
    cancelToken?: CancelToken;
    decompress?: boolean;
    transitional?: TransitionalOptions;
    signal?: GenericAbortSignal;
    insecureHTTPParser?: boolean;
    env?: {
        FormData?: new (...args: any[]) => object;
    };
    formSerializer?: FormSerializerOptions;
    family?: AddressFamily;
    lookup?: ((hostname: string, options: object, cb: (err: Error | null, address: LookupAddress | LookupAddress[], family?: AddressFamily) => void) => void) |
    ((hostname: string, options: object) => Promise<[address: LookupAddressEntry | LookupAddressEntry[], family?: AddressFamily] | LookupAddress>);
    withXSRFToken?: boolean | ((config: InternalAxiosRequestConfig) => boolean | undefined);
    fetchOptions?: Record<string, any>;
}

declare type AxiosRequestHeaders = RawAxiosRequestHeaders & AxiosHeaders;

declare interface AxiosRequestTransformer {
    (this: InternalAxiosRequestConfig, data: any, headers: AxiosRequestHeaders): any;
}

declare interface AxiosResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: InternalAxiosRequestConfig<D>;
    request?: any;
}

declare type AxiosResponseHeaders = RawAxiosResponseHeaders & AxiosHeaders;

declare interface AxiosResponseTransformer {
    (this: InternalAxiosRequestConfig, data: any, headers: AxiosResponseHeaders, status?: number): any;
}

/**
 * Thrown when request to the wallet contains errors.
 */
declare class BadRequestError extends TonConnectError {
    protected get info(): string;
    constructor(...args: ConstructorParameters<typeof TonConnectError>);
}

export { base32Decode }

export { base32Encode }

export { beginCell }

export { BitBuilder }

export { BitReader }

export { BitString }

declare const blocksCodec: ZodArray<ZodObject<    {
workchain: ZodNumber;
seqno: ZodNumber;
shard: ZodString;
rootHash: ZodString;
fileHash: ZodString;
}, "strip", ZodTypeAny, {
workchain: number;
shard: string;
seqno: number;
fileHash: string;
rootHash: string;
}, {
workchain: number;
shard: string;
seqno: number;
fileHash: string;
rootHash: string;
}>, "many">;

/**
 * A concrete implementation of EventDispatcher that dispatches events to the browser window.
 */
declare class BrowserEventDispatcher<T extends {
    type: string;
}> implements EventDispatcher<T> {
    /**
     * The window object, possibly undefined in a server environment.
     * @private
     */
    private readonly window;
    /**
     * Dispatches an event with the given name and details to the browser window.
     * @param eventName - The name of the event to dispatch.
     * @param eventDetails - The details of the event to dispatch.
     * @returns A promise that resolves when the event has been dispatched.
     */
    dispatchEvent<P extends AddTonConnectPrefix<T['type']>>(eventName: P, eventDetails: T & {
        type: RemoveTonConnectPrefix<P>;
    }): Promise<void>;
    /**
     * Adds an event listener to the browser window.
     * @param eventName - The name of the event to listen for.
     * @param listener - The listener to add.
     * @param options - The options for the listener.
     * @returns A function that removes the listener.
     */
    addEventListener<P extends AddTonConnectPrefix<T['type']>>(eventName: P, listener: (event: CustomEvent<T & {
        type: RemoveTonConnectPrefix<P>;
    }>) => void, options?: AddEventListenerOptions): Promise<() => void>;
}

declare type BrowserProgressEvent = any;

export { Builder }

declare interface Cancel {
    message: string | undefined;
}

declare interface CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    throwIfRequested(): void;
}

export { Cell }

export { CellType }

declare enum CHAIN {
    MAINNET = "-239",
    TESTNET = "-3"
}

export { comment }

export { CommonMessageInfo }

export { CommonMessageInfoExternalIn }

export { CommonMessageInfoExternalOut }

export { CommonMessageInfoInternal }

export { CommonMessageInfoRelaxed }

export { CommonMessageInfoRelaxedExternalOut }

export { CommonMessageInfoRelaxedInternal }

declare type CommonRequestHeadersList = 'Accept' | 'Content-Length' | 'User-Agent' | 'Content-Encoding' | 'Authorization';

declare type CommonResponseHeadersList = 'Server' | 'Content-Type' | 'Content-Length' | 'Cache-Control'| 'Content-Encoding';

export { ComputeError }

export declare function computeExternalMessageFees(msgPrices: MsgPrices, cell: Cell): bigint;

export declare function computeFwdFees(msgPrices: MsgPrices, cells: bigint, bits: bigint): bigint;

export declare function computeGasPrices(gasUsed: bigint, prices: {
    flatLimit: bigint;
    flatPrice: bigint;
    price: bigint;
}): bigint;

export declare function computeMessageForwardFees(msgPrices: MsgPrices, cell: Cell): {
    fees: bigint;
    remaining: bigint;
};

export { ComputeSkipReason }

export declare function computeStorageFees(data: {
    now: number;
    lastPaid: number;
    storagePrices: StoragePrices[];
    storageStat: {
        cells: number;
        bits: number;
        publicCells: number;
    };
    special: boolean;
    masterchain: boolean;
}): bigint;

export declare function configParse12(slice: Slice | null | undefined): Dictionary<number, WorkchainDescriptor>;

export declare function configParse13(slice: Slice | null | undefined): {
    deposit: bigint;
    bitPrice: bigint;
    cellPrice: bigint;
};

export declare function configParse15(slice: Slice | null | undefined): {
    validatorsElectedFor: number;
    electorsStartBefore: number;
    electorsEndBefore: number;
    stakeHeldFor: number;
};

export declare function configParse16(slice: Slice | null | undefined): {
    maxValidators: number;
    maxMainValidators: number;
    minValidators: number;
};

export declare function configParse17(slice: Slice | null | undefined): {
    minStake: bigint;
    maxStake: bigint;
    minTotalStake: bigint;
    maxStakeFactor: number;
};

export declare function configParse18(slice: Slice | null | undefined): StoragePrices[];

export declare function configParse28(slice: Slice | null | undefined): {
    masterCatchainLifetime: number;
    shardCatchainLifetime: number;
    shardValidatorsLifetime: number;
    shardValidatorsCount: number;
    flags?: undefined;
    suffleMasterValidators?: undefined;
} | {
    flags: number;
    suffleMasterValidators: boolean;
    masterCatchainLifetime: number;
    shardCatchainLifetime: number;
    shardValidatorsLifetime: number;
    shardValidatorsCount: number;
};

export declare function configParse29(slice: Slice | null | undefined): {
    roundCandidates: number;
    nextCandidateDelay: number;
    consensusTimeout: number;
    fastAttempts: number;
    attemptDuration: number;
    catchainMaxDeps: number;
    maxBlockBytes: number;
    maxColaltedBytes: number;
    flags?: undefined;
    newCatchainIds?: undefined;
    protoVersion?: undefined;
    catchainMaxBlocksCoeff?: undefined;
} | {
    flags: number;
    newCatchainIds: boolean;
    roundCandidates: number;
    nextCandidateDelay: number;
    consensusTimeout: number;
    fastAttempts: number;
    attemptDuration: number;
    catchainMaxDeps: number;
    maxBlockBytes: number;
    maxColaltedBytes: number;
    protoVersion?: undefined;
    catchainMaxBlocksCoeff?: undefined;
} | {
    flags: number;
    newCatchainIds: boolean;
    roundCandidates: number;
    nextCandidateDelay: number;
    consensusTimeout: number;
    fastAttempts: number;
    attemptDuration: number;
    catchainMaxDeps: number;
    maxBlockBytes: number;
    maxColaltedBytes: number;
    protoVersion: number;
    catchainMaxBlocksCoeff?: undefined;
} | {
    flags: number;
    newCatchainIds: boolean;
    roundCandidates: number;
    nextCandidateDelay: number;
    consensusTimeout: number;
    fastAttempts: number;
    attemptDuration: number;
    catchainMaxDeps: number;
    maxBlockBytes: number;
    maxColaltedBytes: number;
    protoVersion: number;
    catchainMaxBlocksCoeff: number;
};

export declare function configParse40(slice: Slice | null | undefined): {
    defaultFlatFine: bigint;
    defaultProportionaFine: bigint;
    severityFlatMult: number;
    severityProportionalMult: number;
    unfunishableInterval: number;
    longInterval: number;
    longFlatMult: number;
    longProportionalMult: number;
    mediumInterval: number;
    mediumFlatMult: number;
    mediumProportionalMult: number;
} | null;

export declare function configParse5(slice: Slice | null | undefined): {
    blackholeAddr: Address | null;
    feeBurnNominator: number;
    feeBurnDenominator: number;
};

export declare function configParse8(slice: Slice | null | undefined): {
    version: number;
    capabilities: bigint;
};

export declare function configParseBridge(slice: Slice | null | undefined): {
    bridgeAddress: Address;
    oracleMultisigAddress: Address;
    oracles: Map<string, Buffer>;
    externalChainAddress: Buffer;
} | null;

export declare function configParseGasLimitsPrices(slice: Slice | null | undefined): {
    flatLimit: bigint;
    flatGasPrice: bigint;
    other: {
        gasPrice: bigint;
        gasLimit: bigint;
        specialGasLimit: bigint;
        gasCredit: bigint;
        blockGasLimit: bigint;
        freezeDueLimit: bigint;
        deleteDueLimit: bigint;
    } | {
        gasPrice: bigint;
        gasLimit: bigint;
        gasCredit: bigint;
        blockGasLimit: bigint;
        freezeDueLimit: bigint;
        deleteDueLimit: bigint;
        specialGasLimit?: undefined;
    };
};

export declare function configParseMasterAddress(slice: Slice | null | undefined): Address | null;

export declare function configParseMasterAddressRequired(slice: Slice | null | undefined): Address;

export declare function configParseMsgPrices(slice: Slice | null | undefined): {
    lumpPrice: bigint;
    bitPrice: bigint;
    cellPrice: bigint;
    ihrPriceFactor: number;
    firstFrac: number;
    nextFrac: number;
};

export declare function configParseValidatorSet(slice: Slice | null | undefined): {
    timeSince: number;
    timeUntil: number;
    total: number;
    main: number;
    totalWeight: null;
    list: Dictionary<number, {
        publicKey: Buffer;
        weight: bigint;
        adnlAddress: Buffer | null;
    }>;
} | {
    timeSince: number;
    timeUntil: number;
    total: number;
    main: number;
    totalWeight: bigint;
    list: Dictionary<number, {
        publicKey: Buffer;
        weight: bigint;
        adnlAddress: Buffer | null;
    }>;
} | null | undefined;

export declare function configParseWorkchainDescriptor(slice: Slice): WorkchainDescriptor;

declare enum CONNECT_EVENT_ERROR_CODES {
    UNKNOWN_ERROR = 0,
    BAD_REQUEST_ERROR = 1,
    MANIFEST_NOT_FOUND_ERROR = 2,
    MANIFEST_CONTENT_ERROR = 3,
    UNKNOWN_APP_ERROR = 100,
    USER_REJECTS_ERROR = 300,
    METHOD_NOT_SUPPORTED = 400
}

declare enum CONNECT_ITEM_ERROR_CODES {
    UNKNOWN_ERROR = 0,
    METHOD_NOT_SUPPORTED = 400
}

declare interface ConnectAdditionalRequest {
    /**
     * Payload for ton_proof
     */
    tonProof?: string;
}

/**
 * Successful connection event when a user successfully connected a wallet.
 */
declare type ConnectionCompletedEvent = {
    /**
     * Event type.
     */
    type: 'connection-completed';
    /**
     * Connection success flag.
     */
    is_success: true;
} & ConnectionInfo;

/**
 * Connection error event when a user cancels a connection or there is an error during the connection process.
 */
declare type ConnectionErrorEvent = {
    /**
     * Event type.
     */
    type: 'connection-error';
    /**
     * Connection success flag.
     */
    is_success: false;
    /**
     * Reason for the error.
     */
    error_message: string;
    /**
     * Error code.
     */
    error_code: CONNECT_EVENT_ERROR_CODES | null;
    /**
     * Custom data for the connection.
     */
    custom_data: Version;
};

/**
 * Connection events.
 */
declare type ConnectionEvent = ConnectionStartedEvent | ConnectionCompletedEvent | ConnectionErrorEvent;

/**
 * Information about a connected wallet.
 */
declare type ConnectionInfo = {
    /**
     * Connected wallet address.
     */
    wallet_address: string | null;
    /**
     * Wallet type: 'tonkeeper', 'tonhub', etc.
     */
    wallet_type: string | null;
    /**
     * Wallet version.
     */
    wallet_version: string | null;
    /**
     * Requested authentication types.
     */
    auth_type: AuthType;
    /**
     * Custom data for the connection.
     */
    custom_data: {
        /**
         * Connected chain ID.
         */
        chain_id: string | null;
        /**
         * Wallet provider.
         */
        provider: 'http' | 'injected' | null;
    } & Version;
};

/**
 * Connection restoring completed event when successfully restored a connection.
 */
declare type ConnectionRestoringCompletedEvent = {
    /**
     * Event type.
     */
    type: 'connection-restoring-completed';
    /**
     * Connection success flag.
     */
    is_success: true;
} & ConnectionInfo;

/**
 * Connection restoring error event when there is an error during the connection restoring process.
 */
declare type ConnectionRestoringErrorEvent = {
    /**
     * Event type.
     */
    type: 'connection-restoring-error';
    /**
     * Connection success flag.
     */
    is_success: false;
    /**
     * Reason for the error.
     */
    error_message: string;
    /**
     * Custom data for the connection.
     */
    custom_data: Version;
};

/**
 * Connection restoring events.
 */
declare type ConnectionRestoringEvent = ConnectionRestoringStartedEvent | ConnectionRestoringCompletedEvent | ConnectionRestoringErrorEvent;

/**
 * Connection restoring started event when initiates a connection restoring process.
 */
declare type ConnectionRestoringStartedEvent = {
    /**
     * Event type.
     */
    type: 'connection-restoring-started';
    /**
     * Custom data for the connection.
     */
    custom_data: Version;
};

/**
 * Initial connection event when a user initiates a connection.
 */
declare type ConnectionStartedEvent = {
    /**
     * Event type.
     */
    type: 'connection-started';
    /**
     * Custom data for the connection.
     */
    custom_data: Version;
};

declare type ConnectItem = TonAddressItem | TonProofItem;

declare type ConnectItemReplyError<T> = {
    name: T;
    error: {
        code: CONNECT_ITEM_ERROR_CODES;
        message?: string;
    };
};

declare type ContentType = AxiosHeaderValue | 'text/html' | 'text/plain' | 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded' | 'application/octet-stream';

export { Contract }

export { ContractABI }

export { contractAddress }

export { ContractGetMethodResult }

export { ContractProvider }

export { ContractState }

export { convertToMerkleProof }

export { crc16 }

export { crc32c }

/**
 * Create a connection completed event.
 * @param version
 * @param wallet
 */
declare function createConnectionCompletedEvent(version: Version, wallet: Wallet | null): ConnectionCompletedEvent;

/**
 * Create a connection error event.
 * @param version
 * @param error_message
 * @param errorCode
 */
declare function createConnectionErrorEvent(version: Version, error_message: string, errorCode: CONNECT_EVENT_ERROR_CODES | void): ConnectionErrorEvent;

/**
 * Create a connection restoring completed event.
 * @param version
 * @param wallet
 */
declare function createConnectionRestoringCompletedEvent(version: Version, wallet: Wallet | null): ConnectionRestoringCompletedEvent;

/**
 * Create a connection restoring error event.
 * @param version
 * @param errorMessage
 */
declare function createConnectionRestoringErrorEvent(version: Version, errorMessage: string): ConnectionRestoringErrorEvent;

/**
 * Create a connection restoring started event.
 */
declare function createConnectionRestoringStartedEvent(version: Version): ConnectionRestoringStartedEvent;

/**
 * Create a connection init event.
 */
declare function createConnectionStartedEvent(version: Version): ConnectionStartedEvent;

/**
 * Create a disconnect event.
 * @param version
 * @param wallet
 * @param scope
 * @returns
 */
declare function createDisconnectionEvent(version: Version, wallet: Wallet | null, scope: 'dapp' | 'wallet'): DisconnectionEvent;

/**
 * Create a request version event.
 */
declare function createRequestVersionEvent(): RequestVersionEvent;

/**
 * Create a response version event.
 * @param version
 */
declare function createResponseVersionEvent(version: string): ResponseVersionEvent;

/**
 * Create a transaction init event.
 * @param version
 * @param wallet
 * @param transaction
 */
declare function createTransactionSentForSignatureEvent(version: Version, wallet: Wallet | null, transaction: SendTransactionRequest): TransactionSentForSignatureEvent;

/**
 * Create a transaction signed event.
 * @param version
 * @param wallet
 * @param transaction
 * @param signedTransaction
 */
declare function createTransactionSignedEvent(version: Version, wallet: Wallet | null, transaction: SendTransactionRequest, signedTransaction: SendTransactionResponse): TransactionSignedEvent;

/**
 * Create a transaction error event.
 * @param version
 * @param wallet
 * @param transaction
 * @param errorMessage
 * @param errorCode
 */
declare function createTransactionSigningFailedEvent(version: Version, wallet: Wallet | null, transaction: SendTransactionRequest, errorMessage: string, errorCode: SEND_TRANSACTION_ERROR_CODES | void): TransactionSigningFailedEvent;

/**
 * Create a version info.
 * @param version
 */
declare function createVersionInfo(version: Version): Version;

export { CurrencyCollection }

declare interface CustomParamsSerializer {
    (params: Record<string, any>, options?: ParamsSerializerOptions): string;
}

declare interface DappMetadata {
    /**
     * Dapp name. Might be simple, will not be used as identifier.
     * @default `document.title` if exists, 'Unknown dapp' overwise
     */
    name: string;
    /**
     * URL to the dapp icon. Must be PNG, ICO, ... . SVG icons are not supported.
     * @default best quality favicon declared via <link> in the document or '' if there are no any icons in the document.
     */
    icon: string;
    /**
     * Dapp URL. Will be used as the dapp identifier. Will be used to open the dapp after click to its icon in the wallet.
     * It is recommended to pass url without closing slash, e.g. 'https://mydapp.com' instead of 'https://mydapp.com/'.
     * @default `window.location.origin` if exists, otherwise (if not explicitly specified) an error will be thrown.
     */
    url: string;
}

export { DepthBalanceInfo }

declare function deriveED25519HardenedKey(parent: HDKeysState, index: number): Promise<HDKeysState>;

declare function deriveEd25519Path(seed: Buffer, path: number[]): Promise<Buffer>;

declare function deriveMnemonicHardenedKey(parent: HDKeysState, index: number): Promise<HDKeysState>;

declare function deriveMnemonicsPath(seed: Buffer, path: number[], wordsCount?: number, password?: string | null | undefined): Promise<string[]>;

declare function deriveSymmetricHardenedKey(parent: HDKeysState, offset: string): Promise<HDKeysState>;

declare function deriveSymmetricPath(seed: Buffer, path: string[]): Promise<Buffer>;

declare interface DeviceInfo {
    platform: 'iphone' | 'ipad' | 'android' | 'windows' | 'mac' | 'linux' | 'browser';
    appName: string;
    appVersion: string;
    maxProtocolVersion: number;
    features: Feature[];
}

export { Dictionary }

export { DictionaryKey }

export { DictionaryKeyTypes }

export { DictionaryValue }

/**
 * Disconnect event when a user initiates a disconnection.
 */
declare type DisconnectionEvent = {
    /**
     * Event type.
     */
    type: 'disconnection';
    /**
     * Disconnect scope: 'dapp' or 'wallet'.
     */
    scope: 'dapp' | 'wallet';
} & ConnectionInfo;

export declare class ElectorContract implements Contract {
    readonly address: Address;
    static create(): ElectorContract;
    constructor();
    getReturnedStake(provider: ContractProvider, address: Address): Promise<bigint>;
    getPastElectionsList(provider: ContractProvider): Promise<{
        id: number;
        unfreezeAt: number;
        stakeHeld: number;
    }[]>;
    getPastElections(provider: ContractProvider): Promise<{
        id: number;
        unfreezeAt: number;
        stakeHeld: number;
        totalStake: bigint;
        bonuses: bigint;
        frozen: Map<string, {
            address: Address;
            weight: bigint;
            stake: bigint;
        }>;
    }[]>;
    getElectionEntities(provider: ContractProvider): Promise<{
        minStake: bigint;
        allStakes: bigint;
        endElectionsTime: number;
        startWorkTime: number;
        entities: {
            pubkey: Buffer;
            stake: bigint;
            address: Address;
            adnl: Buffer;
        }[];
    } | null>;
    getActiveElectionId(provider: ContractProvider): Promise<number | null>;
    getComplaints(provider: ContractProvider, electionId: number): Promise<{
        id: bigint;
        publicKey: Buffer;
        createdAt: number;
        severity: number;
        paid: bigint;
        suggestedFine: bigint;
        suggestedFinePart: bigint;
        rewardAddress: Address;
        votes: number[];
        remainingWeight: bigint;
        vsetId: bigint;
    }[]>;
}

declare function encodeTelegramUrlParameters(parameters: string): string;

/**
 * Interface for an event dispatcher that sends events.
 */
declare interface EventDispatcher<T extends {
    type: string;
}> {
    /**
     * Dispatches an event with the given name and details.
     * @param eventName - The name of the event to dispatch.
     * @param eventDetails - The details of the event to dispatch.
     */
    dispatchEvent<P extends AddTonConnectPrefix<T['type']>>(eventName: P, eventDetails: T & {
        type: RemoveTonConnectPrefix<P>;
    }): Promise<void>;
    /**
     * Adds an event listener.
     * @param eventName - The name of the event to listen for.
     * @param listener - The listener to add.
     * @param options - The options for the listener.
     * @returns A function that removes the listener.
     */
    addEventListener<P extends AddTonConnectPrefix<T['type']>>(eventName: P, listener: (event: CustomEvent<T & {
        type: RemoveTonConnectPrefix<P>;
    }>) => void, options?: AddEventListenerOptions): Promise<() => void>;
}

export { exoticMerkleProof }

export { exoticMerkleUpdate }

export { exoticPruned }

export { external_2 as external }

export { ExternalAddress }

export { ExtraCurrency }

declare type Feature = SendTransactionFeatureDeprecated | SendTransactionFeature | SignDataFeature;

/**
 * Thrown when an error occurred while fetching the wallets list.
 */
declare class FetchWalletsError extends TonConnectError {
    protected get info(): string;
    constructor(...args: ConstructorParameters<typeof TonConnectError>);
}

declare interface FormDataVisitorHelpers {
    defaultVisitor: SerializerVisitor;
    convertValue: (value: any) => any;
    isVisitable: (value: any) => boolean;
}

declare interface FormSerializerOptions extends SerializerOptions {
}

export { fromNano }

export declare type GasLimitsPrices = ReturnType<typeof configParseGasLimitsPrices>;

export { generateMerkleProof }

export { generateMerkleProofDirect }

export { generateMerkleUpdate }

declare interface GenericAbortSignal {
    readonly aborted: boolean;
    onabort?: ((...args: any) => any) | null;
    addEventListener?: (...args: any) => any;
    removeEventListener?: (...args: any) => any;
}

declare interface GenericFormData {
    append(name: string, value: any, options?: any): any;
}

declare function getED25519MasterKeyFromSeed(seed: Buffer): Promise<HDKeysState>;

export { getMethodId }

declare function getMnemonicsMasterKeyFromSeed(seed: Buffer): Promise<HDKeysState>;

/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
declare function getSecureRandomBytes(size: number): Promise<Buffer>;

declare function getSecureRandomNumber(min: number, max: number): Promise<number>;

declare function getSecureRandomWords(size: number): Promise<Uint16Array>;

declare function getSymmetricMasterKeyFromSeed(seed: Buffer): Promise<HDKeysState>;

export { HashUpdate }

/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
declare type HDKeysState = {
    key: Buffer;
    chainCode: Buffer;
};

declare function hmac_sha512(key: string | Buffer, data: string | Buffer): Promise<Buffer>;

export declare class HttpApi {
    readonly endpoint: string;
    readonly cache: TonCache;
    private readonly parameters;
    private shardCache;
    private shardLoader;
    private shardTransactionsCache;
    private shardTransactionsLoader;
    constructor(endpoint: string, parameters?: HttpApiParameters);
    getAddressInformation(address: Address): Promise<{
        code: string;
        balance: string | number;
        extra_currencies: {
            '@type': "extraCurrency";
            id: number;
            amount: string;
        }[];
        state: "active" | "uninitialized" | "frozen";
        data: string;
        last_transaction_id: {
            '@type': "internal.transactionId";
            lt: string;
            hash: string;
        };
        block_id: {
            '@type': "ton.blockIdExt";
            workchain: number;
            shard: string;
            seqno: number;
            root_hash: string;
            file_hash: string;
        };
        sync_utime: number;
    }>;
    getTransactions(address: Address, opts: {
        limit: number;
        lt?: string;
        hash?: string;
        to_lt?: string;
        inclusive?: boolean;
        archival?: boolean;
    }): Promise<{
        data: string;
        storage_fee: string;
        utime: number;
        transaction_id: {
            lt: string;
            hash: string;
        };
        fee: string;
        other_fee: string;
        out_msgs: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        }[];
        in_msg?: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        } | undefined;
    }[]>;
    getMasterchainInfo(): Promise<{
        state_root_hash: string;
        last: {
            '@type': "ton.blockIdExt";
            workchain: number;
            shard: string;
            seqno: number;
            root_hash: string;
            file_hash: string;
        };
        init: {
            '@type': "ton.blockIdExt";
            workchain: number;
            shard: string;
            seqno: number;
            root_hash: string;
            file_hash: string;
        };
    }>;
    getShards(seqno: number): Promise<{
        '@type': "ton.blockIdExt";
        workchain: number;
        shard: string;
        seqno: number;
        root_hash: string;
        file_hash: string;
    }[]>;
    getBlockTransactions(workchain: number, seqno: number, shard: string): Promise<{
        id: {
            '@type': "ton.blockIdExt";
            workchain: number;
            shard: string;
            seqno: number;
            root_hash: string;
            file_hash: string;
        };
        req_count: number;
        incomplete: boolean;
        transactions: {
            '@type': "blocks.shortTxId";
            lt: string;
            hash: string;
            mode: number;
            account: string;
        }[];
    }>;
    getTransaction(address: Address, lt: string, hash: string): Promise<{
        data: string;
        storage_fee: string;
        utime: number;
        transaction_id: {
            lt: string;
            hash: string;
        };
        fee: string;
        other_fee: string;
        out_msgs: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        }[];
        in_msg?: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        } | undefined;
    } | null>;
    callGetMethod(address: Address, method: string, stack: TupleItem[]): Promise<{
        gas_used: number;
        exit_code: number;
        stack: unknown[];
    }>;
    sendBoc(body: Buffer): Promise<void>;
    estimateFee(address: Address, args: {
        body: Cell;
        initCode: Cell | null;
        initData: Cell | null;
        ignoreSignature: boolean;
    }): Promise<{
        '@type': "query.fees";
        source_fees: {
            '@type': "fees";
            in_fwd_fee: number;
            storage_fee: number;
            gas_fee: number;
            fwd_fee: number;
        };
    }>;
    tryLocateResultTx(source: Address, destination: Address, created_lt: string): Promise<{
        data: string;
        storage_fee: string;
        utime: number;
        transaction_id: {
            lt: string;
            hash: string;
        };
        fee: string;
        other_fee: string;
        out_msgs: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        }[];
        in_msg?: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        } | undefined;
    }>;
    tryLocateSourceTx(source: Address, destination: Address, created_lt: string): Promise<{
        data: string;
        storage_fee: string;
        utime: number;
        transaction_id: {
            lt: string;
            hash: string;
        };
        fee: string;
        other_fee: string;
        out_msgs: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        }[];
        in_msg?: {
            value: string;
            fwd_fee: string;
            source: string;
            destination: string;
            ihr_fee: string;
            created_lt: string;
            body_hash: string;
            msg_data: {
                '@type': "msg.dataRaw";
                body: string;
            } | {
                '@type': "msg.dataText";
                text: string;
            } | {
                '@type': "msg.dataDecryptedText";
                text: string;
            } | {
                '@type': "msg.dataEncryptedText";
                text: string;
            };
            message?: string | undefined;
        } | undefined;
    }>;
    private doCall;
}

export declare interface HttpApiParameters {
    /**
     * HTTP request timeout in milliseconds.
     */
    timeout?: number;
    /**
     * API Key
     */
    apiKey?: string;
    /**
     * Adapter for Axios
     */
    adapter?: AxiosAdapter;
}

declare enum HttpStatusCode {
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,
    EarlyHints = 103,
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    MultiStatus = 207,
    AlreadyReported = 208,
    ImUsed = 226,
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    Unused = 306,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    PayloadTooLarge = 413,
    UriTooLong = 414,
    UnsupportedMediaType = 415,
    RangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    ImATeapot = 418,
    MisdirectedRequest = 421,
    UnprocessableEntity = 422,
    Locked = 423,
    FailedDependency = 424,
    TooEarly = 425,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequests = 429,
    RequestHeaderFieldsTooLarge = 431,
    UnavailableForLegalReasons = 451,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
    VariantAlsoNegotiates = 506,
    InsufficientStorage = 507,
    LoopDetected = 508,
    NotExtended = 510,
    NetworkAuthenticationRequired = 511,
}

export { internal }

declare interface InternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    headers: AxiosRequestHeaders;
}

declare function isTelegramUrl(link: string | undefined): link is string;

/**
 * Imitation of the localStorage.
 */
declare interface IStorage {
    /**
     * Saves the `value` to the storage. Value can be accessed later by the `key`. Implementation may use backend as a storage due to the fact that the function returns a promise.
     * @param key key to access to the value later.
     * @param value value to save.
     */
    setItem(key: string, value: string): Promise<void>;
    /**
     * Reads the `value` from the storage. Implementation may use backend as a storage due to the fact that the function returns a promise.
     * @param key key to access the value.
     */
    getItem(key: string): Promise<string | null>;
    /**
     * Removes the `value` from the storage. Implementation may use backend as a storage due to the fact that the function returns a promise.
     * @param key key to access the value.
     */
    removeItem(key: string): Promise<void>;
}

/**
 * Checks if `WalletInfo` is `WalletInfoInjectable` and dApp is opened inside this wallet's browser.
 * @param value WalletInfo to check.
 */
declare function isWalletInfoCurrentlyEmbedded(value: WalletInfo): value is WalletInfoCurrentlyEmbedded;

/**
 * Checks if `WalletInfo` is `WalletInfoInjectable` and `WalletInfo` is injected to the current webpage (`walletInfo.injected === true`).
 * @param value WalletInfo to check.
 */
declare function isWalletInfoCurrentlyInjected(value: WalletInfo): value is WalletInfoCurrentlyInjected;

/**
 * Checks if `WalletInfo` is `WalletInfoInjected`, but doesn't check if it is injected to the page or not.
 * @param value WalletInfo to check.
 */
declare function isWalletInfoInjectable(value: WalletInfo): value is WalletInfoInjectable;

/**
 * @deprecated use `isWalletInfoInjectable` or `isWalletInfoCurrentlyInjected` instead.
 * @param value WalletInfo to check.
 */
declare function isWalletInfoInjected(value: WalletInfo): value is WalletInfoInjected;

/**
 * Checks if `WalletInfo` is `WalletInfoRemote`.
 * @param value WalletInfo to check.
 */
declare function isWalletInfoRemote(value: WalletInfo): value is WalletInfoRemote;

declare interface ITonConnect {
    /**
     * Shows if the wallet is connected right now.
     */
    connected: boolean;
    /**
     * Current connected account or null if no account is connected.
     */
    account: Account_2 | null;
    /**
     * Current connected wallet or null if no account is connected.
     */
    wallet: Wallet | null;
    /**
     * Returns available wallets list.
     */
    getWallets(): Promise<WalletInfo[]>;
    /**
     * Allows to subscribe to connection status changes and handle connection errors.
     * @param callback will be called after connections status changes with actual wallet or null.
     * @param errorsHandler (optional) will be called with some instance of TonConnectError when connect error is received.
     * @returns unsubscribe callback.
     */
    onStatusChange(callback: (walletInfo: Wallet | null) => void, errorsHandler?: (err: TonConnectError) => void): () => void;
    /**
     * Generates universal link for an external wallet and subscribes to the wallet's bridge, or sends connect request to the injected wallet.
     * @param wallet wallet's bridge url and universal link for an external wallet or jsBridge key for the injected wallet, or list of bridges urls for creating an universal connection request for the corresponding wallets.
     * @param request (optional) additional request to pass to the wallet while connect (currently only ton_proof is available).
     * @returns universal link if external wallet was passed or void for the injected wallet.
     */
    connect<T extends WalletConnectionSource | Pick<WalletConnectionSourceHTTP, 'bridgeUrl'>[]>(wallet: T, request?: ConnectAdditionalRequest): T extends WalletConnectionSourceJS ? void : string;
    /**
     * Try to restore existing session and reconnect to the corresponding wallet. Call it immediately when your app is loaded.
     */
    restoreConnection(options?: {
        openingDeadlineMS?: number;
        signal?: AbortSignal;
    }): Promise<void>;
    /**
     * Pause bridge HTTP connection. Might be helpful, if you want to pause connections while browser tab is unfocused,
     * or if you use SDK with NodeJS and want to save server resources.
     */
    pauseConnection(): void;
    /**
     * Unpause bridge HTTP connection if it is paused.
     */
    unPauseConnection(): Promise<void>;
    /**
     * Disconnect form thw connected wallet and drop current session.
     */
    disconnect(options?: {
        signal?: AbortSignal;
    }): Promise<void>;
    /**
     * Asks connected wallet to sign and send the transaction.
     * @param transaction transaction to send.
     * @param options (optional) onRequestSent callback will be called after the transaction is sent and signal to abort the request.
     * @returns signed transaction boc that allows you to find the transaction in the blockchain.
     * If user rejects transaction, method will throw the corresponding error.
     */
    sendTransaction(transaction: SendTransactionRequest, options?: {
        onRequestSent?: () => void;
        signal?: AbortSignal;
    }): Promise<SendTransactionResponse>;
    /** @deprecated use sendTransaction(transaction, options) instead */
    sendTransaction(transaction: SendTransactionRequest, onRequestSent?: () => void): Promise<SendTransactionResponse>;
}

export declare class JettonMaster implements Contract {
    static create(address: Address): JettonMaster;
    readonly address: Address;
    constructor(address: Address);
    getWalletAddress(provider: ContractProvider, owner: Address): Promise<Address>;
    getJettonData(provider: ContractProvider): Promise<{
        totalSupply: bigint;
        mintable: boolean;
        adminAddress: Address;
        content: Cell_2;
        walletCode: Cell_2;
    }>;
}

export declare class JettonWallet implements Contract {
    static create(address: Address): JettonWallet;
    readonly address: Address;
    private constructor();
    getBalance(provider: ContractProvider): Promise<bigint>;
}

/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
declare type KeyPair = {
    publicKey: Buffer;
    secretKey: Buffer;
};

declare function keyPairFromSecretKey(secretKey: Buffer): KeyPair;

declare function keyPairFromSeed(secretKey: Buffer): KeyPair;

export { LibRef }

export { loadAccount }

export { loadAccountState }

export { loadAccountStatus }

export { loadAccountStatusChange }

export { loadAccountStorage }

export { loadCommonMessageInfo }

export { loadCommonMessageInfoRelaxed }

export { loadComputeSkipReason }

export declare function loadConfigParamById(configBase64: string, id: number): Cell;

export declare function loadConfigParamsAsSlice(configBase64: string): Map<number, Slice>;

export { loadCurrencyCollection }

export { loadDepthBalanceInfo }

export { loadExtraCurrency }

export { loadHashUpdate }

export { loadLibRef }

export { loadMasterchainStateExtra }

export { loadMaybeExtraCurrency }

export { loadMessage }

export { loadMessageRelaxed }

export { loadOutAction }

export { loadOutList }

export { loadShardAccount }

export { loadShardAccounts }

export { loadShardIdent }

export { loadShardStateUnsplit }

export { loadSimpleLibrary }

export { loadSplitMergeInfo }

export { loadStateInit }

export { loadStorageInfo }

export { loadStorageUsed }

export { loadStorageUsedShort }

export { loadTickTock }

export { loadTransaction }

export { loadTransactionActionPhase }

export { loadTransactionBouncePhase }

export { loadTransactionComputePhase }

export { loadTransactionCreditPhase }

export { loadTransactionDescription }

export { loadTransactionStoragePhase }

/**
 * Thrown when `Storage` was not specified in the `DappMetadata` and default `localStorage` was not detected in the Node.js environment.
 */
declare class LocalstorageNotFoundError extends TonConnectError {
    protected get info(): string;
    constructor(...args: ConstructorParameters<typeof TonConnectError>);
}

declare type LookupAddress = string | LookupAddressEntry;

declare interface LookupAddressEntry {
    address: string;
    family?: AddressFamily;
}

export { MasterchainStateExtra }

declare type MaxDownloadRate = number;

declare type MaxUploadRate = number;

export { Maybe }

/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare type Maybe_2<T> = T | null | undefined;

export { Message }

export { MessageRelaxed }

declare type Method =
| 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'
| 'purge' | 'PURGE'
| 'link' | 'LINK'
| 'unlink' | 'UNLINK';

declare type MethodsHeaders = Partial<{
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
} & {common: AxiosHeaders}>;

declare type Milliseconds = number;

/**
 * Generate new Mnemonic
 * @param wordsCount number of words to generate
 * @param password mnemonic password
 * @returns
 */
declare function mnemonicNew(wordsCount?: number, password?: string | null | undefined): Promise<string[]>;

/**
 * Convert mnemonics to HD seed
 * @param mnemonicArray mnemonic array
 * @param password mnemonic password
 * @returns 64 byte seed
 */
declare function mnemonicToHDSeed(mnemonicArray: string[], password?: string | null | undefined): Promise<Buffer>;

/**
 * Extract private key from mnemonic
 * @param mnemonicArray mnemonic array
 * @param password mnemonic password
 * @returns Key Pair
 */
declare function mnemonicToPrivateKey(mnemonicArray: string[], password?: string | null | undefined): Promise<KeyPair>;

declare function mnemonicToSeed(mnemonicArray: string[], seed: string, password?: string | null | undefined): Promise<Buffer>;

/**
 * Convert mnemonic to wallet key pair
 * @param mnemonicArray mnemonic array
 * @param password mnemonic password
 * @returns Key Pair
 */
declare function mnemonicToWalletKey(mnemonicArray: string[], password?: string | null | undefined): Promise<KeyPair>;

/**
 * Validate Mnemonic
 * @param mnemonicArray mnemonic array
 * @param password mnemonic password
 * @returns true for valid mnemonic
 */
declare function mnemonicValidate(mnemonicArray: string[], password?: string | null | undefined): Promise<boolean>;

export declare type MsgPrices = ReturnType<typeof configParseMsgPrices>;

export declare class MultisigOrder {
    readonly payload: Cell;
    signatures: {
        [key: number]: Buffer;
    };
    private constructor();
    static fromCell(cell: Cell): MultisigOrder;
    static fromPayload(payload: Cell): MultisigOrder;
    addSignature(ownerId: number, signature: Buffer, multisig: MultisigWallet): void;
    sign(ownerId: number, secretKey: Buffer): Buffer;
    unionSignatures(other: MultisigOrder): void;
    clearSignatures(): void;
    toCell(ownerId: number): Cell;
}

export declare class MultisigOrderBuilder {
    messages: Builder;
    queryId: bigint;
    private walletId;
    private queryOffset;
    constructor(walletId: number, offset?: number);
    addMessage(message: MessageRelaxed, mode: number): void;
    clearMessages(): void;
    build(): MultisigOrder;
    private updateQueryId;
}

export declare class MultisigWallet {
    owners: Dictionary<number, Buffer>;
    workchain: number;
    walletId: number;
    k: number;
    address: Address;
    provider: ContractProvider | null;
    init: StateInit;
    constructor(publicKeys: Buffer[], workchain: number, walletId: number, k: number, opts?: {
        address?: Address;
        provider?: ContractProvider;
        client?: TonClient;
    });
    static fromAddress(address: Address, opts: {
        provider?: ContractProvider;
        client?: TonClient;
    }): Promise<MultisigWallet>;
    deployExternal(provider?: ContractProvider): Promise<void>;
    deployInternal(sender: Sender, value?: bigint): Promise<void>;
    sendOrder(order: MultisigOrder, secretKey: Buffer, provider?: ContractProvider): Promise<void>;
    sendOrderWithoutSecretKey(order: MultisigOrder, signature: Buffer, ownerId: number, provider?: ContractProvider): Promise<void>;
    getOwnerIdByPubkey(publicKey: Buffer): number;
}

/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare function newSecurePassphrase(size?: number): Promise<string>;

/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare function newSecureWords(size?: number): Promise<string[]>;

declare function openBox(data: Buffer, nonce: Buffer, key: Buffer): Buffer | null;

export { openContract }

export { OpenedContract }

export { OutAction }

declare interface OutActionAddExtension {
    type: 'addExtension';
    address: Address;
}

export { OutActionChangeLibrary }

declare type OutActionExtended = OutActionSetIsPublicKeyEnabled | OutActionAddExtension | OutActionRemoveExtension;

declare interface OutActionRemoveExtension {
    type: 'removeExtension';
    address: Address;
}

export { OutActionReserve }

export { OutActionSendMsg }

export { OutActionSetCode }

declare interface OutActionSetIsPublicKeyEnabled {
    type: 'setIsPublicKeyEnabled';
    isEnabled: boolean;
}

declare type OutActionWalletV5 = OutActionExtended | OutActionSendMsg;

export { packExtraCurrencyCell }

export { packExtraCurrencyDict }

export { paddedBufferToBits }

declare interface ParamEncoder {
    (value: any, defaultEncoder: (value: any) => any): any;
}

declare interface ParamsSerializerOptions extends SerializerOptions {
    encode?: ParamEncoder;
    serialize?: CustomParamsSerializer;
}

export declare function parseBridge(slice: Slice): {
    bridgeAddress: Address;
    oracleMultisigAddress: Address;
    oracles: Map<string, Buffer>;
    externalChainAddress: Buffer;
};

declare type ParsedTransaction = z.infer<typeof parsedTransactionCodec>;

declare const parsedTransactionCodec: ZodObject<    {
address: ZodString;
lt: ZodString;
hash: ZodString;
prevTransaction: ZodObject<    {
lt: ZodString;
hash: ZodString;
}, "strip", ZodTypeAny, {
lt: string;
hash: string;
}, {
lt: string;
hash: string;
}>;
time: ZodNumber;
outMessagesCount: ZodNumber;
oldStatus: ZodUnion<[ZodLiteral<"uninitialized">, ZodLiteral<"frozen">, ZodLiteral<"active">, ZodLiteral<"non-existing">]>;
newStatus: ZodUnion<[ZodLiteral<"uninitialized">, ZodLiteral<"frozen">, ZodLiteral<"active">, ZodLiteral<"non-existing">]>;
fees: ZodString;
update: ZodObject<    {
oldHash: ZodString;
newHash: ZodString;
}, "strip", ZodTypeAny, {
oldHash: string;
newHash: string;
}, {
oldHash: string;
newHash: string;
}>;
inMessage: ZodUnion<[ZodObject<    {
body: ZodString;
info: ZodUnion<[ZodObject<    {
type: ZodLiteral<"internal">;
value: ZodString;
dest: ZodString;
src: ZodString;
bounced: ZodBoolean;
bounce: ZodBoolean;
ihrDisabled: ZodBoolean;
createdAt: ZodNumber;
createdLt: ZodString;
fwdFee: ZodString;
ihrFee: ZodString;
}, "strip", ZodTypeAny, {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
}, {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
}>, ZodObject<    {
type: ZodLiteral<"external-in">;
dest: ZodString;
src: ZodUnion<[ZodObject<    {
bits: ZodNumber;
data: ZodString;
}, "strip", ZodTypeAny, {
data: string;
bits: number;
}, {
data: string;
bits: number;
}>, ZodNull]>;
importFee: ZodString;
}, "strip", ZodTypeAny, {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
}, {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
}>, ZodObject<    {
type: ZodLiteral<"external-out">;
dest: ZodUnion<[ZodObject<    {
bits: ZodNumber;
data: ZodString;
}, "strip", ZodTypeAny, {
data: string;
bits: number;
}, {
data: string;
bits: number;
}>, ZodNull]>;
}, "strip", ZodTypeAny, {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
}, {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
}>]>;
init: ZodUnion<[ZodObject<    {
splitDepth: ZodUnion<[ZodNumber, ZodNull]>;
code: ZodUnion<[ZodString, ZodNull]>;
data: ZodUnion<[ZodString, ZodNull]>;
special: ZodUnion<[ZodObject<    {
tick: ZodBoolean;
tock: ZodBoolean;
}, "strip", ZodTypeAny, {
tick: boolean;
tock: boolean;
}, {
tick: boolean;
tock: boolean;
}>, ZodNull]>;
}, "strip", ZodTypeAny, {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
}, {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
}>, ZodNull]>;
}, "strip", ZodTypeAny, {
body: string;
init: {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
} | null;
info: {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
} | {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
} | {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
};
}, {
body: string;
init: {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
} | null;
info: {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
} | {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
} | {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
};
}>, ZodNull]>;
outMessages: ZodArray<ZodObject<    {
body: ZodString;
info: ZodUnion<[ZodObject<    {
type: ZodLiteral<"internal">;
value: ZodString;
dest: ZodString;
src: ZodString;
bounced: ZodBoolean;
bounce: ZodBoolean;
ihrDisabled: ZodBoolean;
createdAt: ZodNumber;
createdLt: ZodString;
fwdFee: ZodString;
ihrFee: ZodString;
}, "strip", ZodTypeAny, {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
}, {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
}>, ZodObject<    {
type: ZodLiteral<"external-in">;
dest: ZodString;
src: ZodUnion<[ZodObject<    {
bits: ZodNumber;
data: ZodString;
}, "strip", ZodTypeAny, {
data: string;
bits: number;
}, {
data: string;
bits: number;
}>, ZodNull]>;
importFee: ZodString;
}, "strip", ZodTypeAny, {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
}, {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
}>, ZodObject<    {
type: ZodLiteral<"external-out">;
dest: ZodUnion<[ZodObject<    {
bits: ZodNumber;
data: ZodString;
}, "strip", ZodTypeAny, {
data: string;
bits: number;
}, {
data: string;
bits: number;
}>, ZodNull]>;
}, "strip", ZodTypeAny, {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
}, {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
}>]>;
init: ZodUnion<[ZodObject<    {
splitDepth: ZodUnion<[ZodNumber, ZodNull]>;
code: ZodUnion<[ZodString, ZodNull]>;
data: ZodUnion<[ZodString, ZodNull]>;
special: ZodUnion<[ZodObject<    {
tick: ZodBoolean;
tock: ZodBoolean;
}, "strip", ZodTypeAny, {
tick: boolean;
tock: boolean;
}, {
tick: boolean;
tock: boolean;
}>, ZodNull]>;
}, "strip", ZodTypeAny, {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
}, {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
}>, ZodNull]>;
}, "strip", ZodTypeAny, {
body: string;
init: {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
} | null;
info: {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
} | {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
} | {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
};
}, {
body: string;
init: {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
} | null;
info: {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
} | {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
} | {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
};
}>, "many">;
parsed: ZodObject<    {
seqno: ZodUnion<[ZodNumber, ZodNull]>;
body: ZodUnion<[ZodUnion<[ZodObject<    {
type: ZodLiteral<"comment">;
comment: ZodString;
}, "strip", ZodTypeAny, {
type: "comment";
comment: string;
}, {
type: "comment";
comment: string;
}>, ZodObject<    {
type: ZodLiteral<"payload">;
cell: ZodString;
}, "strip", ZodTypeAny, {
type: "payload";
cell: string;
}, {
type: "payload";
cell: string;
}>]>, ZodNull]>;
status: ZodUnion<[ZodLiteral<"success">, ZodLiteral<"failed">, ZodLiteral<"pending">]>;
dest: ZodUnion<[ZodString, ZodNull]>;
kind: ZodUnion<[ZodLiteral<"out">, ZodLiteral<"in">]>;
amount: ZodString;
resolvedAddress: ZodString;
bounced: ZodBoolean;
mentioned: ZodArray<ZodString, "many">;
}, "strip", ZodTypeAny, {
status: "success" | "failed" | "pending";
seqno: number | null;
amount: string;
body: {
type: "comment";
comment: string;
} | {
type: "payload";
cell: string;
} | null;
dest: string | null;
bounced: boolean;
kind: "out" | "in";
resolvedAddress: string;
mentioned: string[];
}, {
status: "success" | "failed" | "pending";
seqno: number | null;
amount: string;
body: {
type: "comment";
comment: string;
} | {
type: "payload";
cell: string;
} | null;
dest: string | null;
bounced: boolean;
kind: "out" | "in";
resolvedAddress: string;
mentioned: string[];
}>;
operation: ZodObject<    {
address: ZodString;
comment: ZodOptional<ZodString>;
items: ZodArray<ZodUnion<[ZodObject<    {
kind: ZodLiteral<"ton">;
amount: ZodString;
}, "strip", ZodTypeAny, {
amount: string;
kind: "ton";
}, {
amount: string;
kind: "ton";
}>, ZodObject<    {
kind: ZodLiteral<"token">;
amount: ZodString;
}, "strip", ZodTypeAny, {
amount: string;
kind: "token";
}, {
amount: string;
kind: "token";
}>]>, "many">;
op: ZodOptional<ZodObject<    {
type: ZodUnion<[ZodLiteral<"jetton::excesses">, ZodLiteral<"jetton::transfer">, ZodLiteral<"jetton::transfer_notification">, ZodLiteral<"deposit">, ZodLiteral<"deposit::ok">, ZodLiteral<"withdraw">, ZodLiteral<"withdraw::all">, ZodLiteral<"withdraw::delayed">, ZodLiteral<"withdraw::ok">, ZodLiteral<"airdrop">]>;
options: ZodOptional<ZodRecord<ZodString, ZodString>>;
}, "strip", ZodTypeAny, {
type: "jetton::excesses" | "jetton::transfer" | "jetton::transfer_notification" | "deposit" | "deposit::ok" | "withdraw" | "withdraw::all" | "withdraw::delayed" | "withdraw::ok" | "airdrop";
options?: Record<string, string> | undefined;
}, {
type: "jetton::excesses" | "jetton::transfer" | "jetton::transfer_notification" | "deposit" | "deposit::ok" | "withdraw" | "withdraw::all" | "withdraw::delayed" | "withdraw::ok" | "airdrop";
options?: Record<string, string> | undefined;
}>>;
}, "strip", ZodTypeAny, {
items: ({
amount: string;
kind: "ton";
} | {
amount: string;
kind: "token";
})[];
address: string;
comment?: string | undefined;
op?: {
type: "jetton::excesses" | "jetton::transfer" | "jetton::transfer_notification" | "deposit" | "deposit::ok" | "withdraw" | "withdraw::all" | "withdraw::delayed" | "withdraw::ok" | "airdrop";
options?: Record<string, string> | undefined;
} | undefined;
}, {
items: ({
amount: string;
kind: "ton";
} | {
amount: string;
kind: "token";
})[];
address: string;
comment?: string | undefined;
op?: {
type: "jetton::excesses" | "jetton::transfer" | "jetton::transfer_notification" | "deposit" | "deposit::ok" | "withdraw" | "withdraw::all" | "withdraw::delayed" | "withdraw::ok" | "airdrop";
options?: Record<string, string> | undefined;
} | undefined;
}>;
}, "strip", ZodTypeAny, {
lt: string;
hash: string;
fees: string;
time: number;
address: string;
prevTransaction: {
lt: string;
hash: string;
};
outMessagesCount: number;
oldStatus: "active" | "uninitialized" | "frozen" | "non-existing";
newStatus: "active" | "uninitialized" | "frozen" | "non-existing";
update: {
oldHash: string;
newHash: string;
};
inMessage: {
body: string;
init: {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
} | null;
info: {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
} | {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
} | {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
};
} | null;
outMessages: {
body: string;
init: {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
} | null;
info: {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
} | {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
} | {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
};
}[];
parsed: {
status: "success" | "failed" | "pending";
seqno: number | null;
amount: string;
body: {
type: "comment";
comment: string;
} | {
type: "payload";
cell: string;
} | null;
dest: string | null;
bounced: boolean;
kind: "out" | "in";
resolvedAddress: string;
mentioned: string[];
};
operation: {
items: ({
amount: string;
kind: "ton";
} | {
amount: string;
kind: "token";
})[];
address: string;
comment?: string | undefined;
op?: {
type: "jetton::excesses" | "jetton::transfer" | "jetton::transfer_notification" | "deposit" | "deposit::ok" | "withdraw" | "withdraw::all" | "withdraw::delayed" | "withdraw::ok" | "airdrop";
options?: Record<string, string> | undefined;
} | undefined;
};
}, {
lt: string;
hash: string;
fees: string;
time: number;
address: string;
prevTransaction: {
lt: string;
hash: string;
};
outMessagesCount: number;
oldStatus: "active" | "uninitialized" | "frozen" | "non-existing";
newStatus: "active" | "uninitialized" | "frozen" | "non-existing";
update: {
oldHash: string;
newHash: string;
};
inMessage: {
body: string;
init: {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
} | null;
info: {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
} | {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
} | {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
};
} | null;
outMessages: {
body: string;
init: {
code: string | null;
data: string | null;
splitDepth: number | null;
special: {
tick: boolean;
tock: boolean;
} | null;
} | null;
info: {
value: string;
type: "internal";
dest: string;
src: string;
bounced: boolean;
bounce: boolean;
ihrDisabled: boolean;
createdAt: number;
createdLt: string;
fwdFee: string;
ihrFee: string;
} | {
type: "external-in";
dest: string;
src: {
data: string;
bits: number;
} | null;
importFee: string;
} | {
type: "external-out";
dest: {
data: string;
bits: number;
} | null;
};
}[];
parsed: {
status: "success" | "failed" | "pending";
seqno: number | null;
amount: string;
body: {
type: "comment";
comment: string;
} | {
type: "payload";
cell: string;
} | null;
dest: string | null;
bounced: boolean;
kind: "out" | "in";
resolvedAddress: string;
mentioned: string[];
};
operation: {
items: ({
amount: string;
kind: "ton";
} | {
amount: string;
kind: "token";
})[];
address: string;
comment?: string | undefined;
op?: {
type: "jetton::excesses" | "jetton::transfer" | "jetton::transfer_notification" | "deposit" | "deposit::ok" | "withdraw" | "withdraw::all" | "withdraw::delayed" | "withdraw::ok" | "airdrop";
options?: Record<string, string> | undefined;
} | undefined;
};
}>;

declare type ParsedTransactions = {
    blocks: z.infer<typeof blocksCodec>;
    transactions: ParsedTransaction[];
};

export declare function parseFullConfig(configs: Map<number, Slice>): {
    configAddress: Address;
    electorAddress: Address;
    minterAddress: Address | null;
    feeCollectorAddress: Address | null;
    dnsRootAddress: Address | null;
    burningConfig: {
        blackholeAddr: Address | null;
        feeBurnNominator: number;
        feeBurnDenominator: number;
    };
    globalVersion: {
        version: number;
        capabilities: bigint;
    };
    workchains: Dictionary<number, WorkchainDescriptor>;
    voting: {
        normalParams: {
            minTotalRounds: number;
            maxTotalRounds: number;
            minWins: number;
            maxLoses: number;
            minStoreSec: number;
            maxStoreSec: number;
            bitPrice: number;
            cellPrice: number;
        };
        criticalParams: {
            minTotalRounds: number;
            maxTotalRounds: number;
            minWins: number;
            maxLoses: number;
            minStoreSec: number;
            maxStoreSec: number;
            bitPrice: number;
            cellPrice: number;
        };
    };
    validators: {
        minStake: bigint;
        maxStake: bigint;
        minTotalStake: bigint;
        maxStakeFactor: number;
        maxValidators: number;
        maxMainValidators: number;
        minValidators: number;
        validatorsElectedFor: number;
        electorsStartBefore: number;
        electorsEndBefore: number;
        stakeHeldFor: number;
    };
    storagePrices: StoragePrices[];
    gasPrices: {
        masterchain: {
            flatLimit: bigint;
            flatGasPrice: bigint;
            other: {
                gasPrice: bigint;
                gasLimit: bigint;
                specialGasLimit: bigint;
                gasCredit: bigint;
                blockGasLimit: bigint;
                freezeDueLimit: bigint;
                deleteDueLimit: bigint;
            } | {
                gasPrice: bigint;
                gasLimit: bigint;
                gasCredit: bigint;
                blockGasLimit: bigint;
                freezeDueLimit: bigint;
                deleteDueLimit: bigint;
                specialGasLimit?: undefined;
            };
        };
        workchain: {
            flatLimit: bigint;
            flatGasPrice: bigint;
            other: {
                gasPrice: bigint;
                gasLimit: bigint;
                specialGasLimit: bigint;
                gasCredit: bigint;
                blockGasLimit: bigint;
                freezeDueLimit: bigint;
                deleteDueLimit: bigint;
            } | {
                gasPrice: bigint;
                gasLimit: bigint;
                gasCredit: bigint;
                blockGasLimit: bigint;
                freezeDueLimit: bigint;
                deleteDueLimit: bigint;
                specialGasLimit?: undefined;
            };
        };
    };
    msgPrices: {
        masterchain: {
            lumpPrice: bigint;
            bitPrice: bigint;
            cellPrice: bigint;
            ihrPriceFactor: number;
            firstFrac: number;
            nextFrac: number;
        };
        workchain: {
            lumpPrice: bigint;
            bitPrice: bigint;
            cellPrice: bigint;
            ihrPriceFactor: number;
            firstFrac: number;
            nextFrac: number;
        };
    };
    validatorSets: {
        prevValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
        prevTempValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
        currentValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
        currentTempValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
        nextValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
        nextTempValidators: {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: null;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | {
            timeSince: number;
            timeUntil: number;
            total: number;
            main: number;
            totalWeight: bigint;
            list: Dictionary<number, {
                publicKey: Buffer;
                weight: bigint;
                adnlAddress: Buffer | null;
            }>;
        } | null | undefined;
    };
    validatorsPunish: {
        defaultFlatFine: bigint;
        defaultProportionaFine: bigint;
        severityFlatMult: number;
        severityProportionalMult: number;
        unfunishableInterval: number;
        longInterval: number;
        longFlatMult: number;
        longProportionalMult: number;
        mediumInterval: number;
        mediumFlatMult: number;
        mediumProportionalMult: number;
    } | null;
    bridges: {
        ethereum: {
            bridgeAddress: Address;
            oracleMultisigAddress: Address;
            oracles: Map<string, Buffer>;
            externalChainAddress: Buffer;
        } | null;
        binance: {
            bridgeAddress: Address;
            oracleMultisigAddress: Address;
            oracles: Map<string, Buffer>;
            externalChainAddress: Buffer;
        } | null;
        polygon: {
            bridgeAddress: Address;
            oracleMultisigAddress: Address;
            oracles: Map<string, Buffer>;
            externalChainAddress: Buffer;
        } | null;
    };
    catchain: {
        masterCatchainLifetime: number;
        shardCatchainLifetime: number;
        shardValidatorsLifetime: number;
        shardValidatorsCount: number;
        flags?: undefined;
        suffleMasterValidators?: undefined;
    } | {
        flags: number;
        suffleMasterValidators: boolean;
        masterCatchainLifetime: number;
        shardCatchainLifetime: number;
        shardValidatorsLifetime: number;
        shardValidatorsCount: number;
    };
    consensus: {
        roundCandidates: number;
        nextCandidateDelay: number;
        consensusTimeout: number;
        fastAttempts: number;
        attemptDuration: number;
        catchainMaxDeps: number;
        maxBlockBytes: number;
        maxColaltedBytes: number;
        flags?: undefined;
        newCatchainIds?: undefined;
        protoVersion?: undefined;
        catchainMaxBlocksCoeff?: undefined;
    } | {
        flags: number;
        newCatchainIds: boolean;
        roundCandidates: number;
        nextCandidateDelay: number;
        consensusTimeout: number;
        fastAttempts: number;
        attemptDuration: number;
        catchainMaxDeps: number;
        maxBlockBytes: number;
        maxColaltedBytes: number;
        protoVersion?: undefined;
        catchainMaxBlocksCoeff?: undefined;
    } | {
        flags: number;
        newCatchainIds: boolean;
        roundCandidates: number;
        nextCandidateDelay: number;
        consensusTimeout: number;
        fastAttempts: number;
        attemptDuration: number;
        catchainMaxDeps: number;
        maxBlockBytes: number;
        maxColaltedBytes: number;
        protoVersion: number;
        catchainMaxBlocksCoeff?: undefined;
    } | {
        flags: number;
        newCatchainIds: boolean;
        roundCandidates: number;
        nextCandidateDelay: number;
        consensusTimeout: number;
        fastAttempts: number;
        attemptDuration: number;
        catchainMaxDeps: number;
        maxBlockBytes: number;
        maxColaltedBytes: number;
        protoVersion: number;
        catchainMaxBlocksCoeff: number;
    };
};

/**
 * Thrown when passed hex is in incorrect format.
 */
declare class ParseHexError extends TonConnectError {
    protected get info(): string;
    constructor(...args: ConstructorParameters<typeof TonConnectError>);
}

export declare function parseProposalSetup(slice: Slice): {
    minTotalRounds: number;
    maxTotalRounds: number;
    minWins: number;
    maxLoses: number;
    minStoreSec: number;
    maxStoreSec: number;
    bitPrice: number;
    cellPrice: number;
};

export { parseTuple }

export declare function parseValidatorSet(slice: Slice): {
    timeSince: number;
    timeUntil: number;
    total: number;
    main: number;
    totalWeight: null;
    list: Dictionary<number, {
        publicKey: Buffer;
        weight: bigint;
        adnlAddress: Buffer | null;
    }>;
} | {
    timeSince: number;
    timeUntil: number;
    total: number;
    main: number;
    totalWeight: bigint;
    list: Dictionary<number, {
        publicKey: Buffer;
        weight: bigint;
        adnlAddress: Buffer | null;
    }>;
} | undefined;

export declare function parseVotingSetup(slice: Slice | null | undefined): {
    normalParams: {
        minTotalRounds: number;
        maxTotalRounds: number;
        minWins: number;
        maxLoses: number;
        minStoreSec: number;
        maxStoreSec: number;
        bitPrice: number;
        cellPrice: number;
    };
    criticalParams: {
        minTotalRounds: number;
        maxTotalRounds: number;
        minWins: number;
        maxLoses: number;
        minStoreSec: number;
        maxStoreSec: number;
        bitPrice: number;
        cellPrice: number;
    };
};

/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
declare function pbkdf2_sha512(key: string | Buffer, salt: string | Buffer, iterations: number, keyLen: number): Promise<Buffer>;

declare interface RawAxiosHeaders {
    [key: string]: AxiosHeaderValue;
}

declare type RawAxiosRequestHeaders = Partial<RawAxiosHeaders & {
    [Key in CommonRequestHeadersList]: AxiosHeaderValue;
} & {
    'Content-Type': ContentType
}>;

declare type RawAxiosResponseHeaders = Partial<RawAxiosHeaders & RawCommonResponseHeaders>;

declare type RawCommonResponseHeaders = {
    [Key in CommonResponseHeadersList]: AxiosHeaderValue;
} & {
    "set-cookie": string[];
};

/**
 * Removes the `ton-connect-` and `ton-connect-ui-` prefixes from the given string.
 */
declare type RemoveTonConnectPrefix<T> = T extends `ton-connect-ui-${infer Rest}` ? Rest : T extends `ton-connect-${infer Rest}` ? Rest : T;

/**
 * Request TON Connect UI version.
 */
declare type RequestVersionEvent = {
    /**
     * Event type.
     */
    type: 'request-version';
};

export { ReserveMode }

declare type responseEncoding =
| 'ascii' | 'ASCII'
| 'ansi' | 'ANSI'
| 'binary' | 'BINARY'
| 'base64' | 'BASE64'
| 'base64url' | 'BASE64URL'
| 'hex' | 'HEX'
| 'latin1' | 'LATIN1'
| 'ucs-2' | 'UCS-2'
| 'ucs2' | 'UCS2'
| 'utf-8' | 'UTF-8'
| 'utf8' | 'UTF8'
| 'utf16le' | 'UTF16LE';

declare type ResponseType_2 =
| 'arraybuffer'
| 'blob'
| 'document'
| 'json'
| 'text'
| 'stream'
| 'formdata';

/**
 * Response TON Connect UI version.
 */
declare type ResponseVersionEvent = {
    /**
     * Event type.
     */
    type: 'response-version';
    /**
     * TON Connect UI version.
     */
    version: string;
};

export { safeSign }

export { safeSignVerify }

/**
 * User action events.
 */
declare type SdkActionEvent = VersionEvent | ConnectionEvent | ConnectionRestoringEvent | DisconnectionEvent | TransactionSigningEvent;

declare function sealBox(data: Buffer, nonce: Buffer, key: Buffer): Buffer;

declare enum SEND_TRANSACTION_ERROR_CODES {
    UNKNOWN_ERROR = 0,
    BAD_REQUEST_ERROR = 1,
    UNKNOWN_APP_ERROR = 100,
    USER_REJECTS_ERROR = 300,
    METHOD_NOT_SUPPORTED = 400
}

declare type SendArgsSignable = {
    signer: (message: Cell) => Promise<Buffer>;
};

declare type SendArgsSigned = {
    secretKey: Buffer;
};

export { Sender }

export { SenderArguments }

export { SendMode }

declare type SendTransactionFeature = {
    name: 'SendTransaction';
    maxMessages: number;
};

declare type SendTransactionFeatureDeprecated = 'SendTransaction';

declare interface SendTransactionRequest {
    /**
     * Sending transaction deadline in unix epoch seconds.
     */
    validUntil: number;
    /**
     * The network (mainnet or testnet) where DApp intends to send the transaction. If not set, the transaction is sent to the network currently set in the wallet, but this is not safe and DApp should always strive to set the network. If the network parameter is set, but the wallet has a different network set, the wallet should show an alert and DO NOT ALLOW TO SEND this transaction.
     */
    network?: CHAIN;
    /**
     * The sender address in '<wc>:<hex>' format from which DApp intends to send the transaction. Current account.address by default.
     */
    from?: string;
    /**
     * Messages to send: min is 1, max is 4.
     */
    messages: {
        /**
         * Receiver's address.
         */
        address: string;
        /**
         * Amount to send in nanoTon.
         */
        amount: string;
        /**
         * Contract specific data to add to the transaction.
         */
        stateInit?: string;
        /**
         * Contract specific data to add to the transaction.
         */
        payload?: string;
    }[];
}

declare interface SendTransactionResponse {
    /**
     * Signed boc
     */
    boc: string;
}

declare interface SerializerOptions {
    visitor?: SerializerVisitor;
    dots?: boolean;
    metaTokens?: boolean;
    indexes?: boolean | null;
}

declare interface SerializerVisitor {
    (
    this: GenericFormData,
    value: any,
    key: string | number,
    path: null | Array<string | number>,
    helpers: FormDataVisitorHelpers
    ): boolean;
}

export { serializeTuple }

declare function sha256(source: Buffer | string): Promise<Buffer>;

/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
declare function sha256_sync(source: Buffer | string): Buffer;

declare function sha512(source: Buffer | string): Promise<Buffer>;

/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
declare function sha512_sync(source: Buffer | string): Buffer;

export { ShardAccount }

export { ShardAccountRef }

export { ShardAccountRefValue }

export { ShardIdent }

export { ShardStateUnsplit }

declare function sign(data: Buffer, secretKey: Buffer): Buffer;

declare type SignDataFeature = {
    name: 'SignData';
};

declare function signVerify(data: Buffer, signature: Buffer, publicKey: Buffer): boolean;

export { SimpleLibrary }

export { Slice }

export { SplitMergeInfo }

export { StateInit }

export { StorageInfo }

export declare type StoragePrices = {
    utime_since: number;
    bit_price_ps: bigint;
    cell_price_ps: bigint;
    mc_bit_price_ps: bigint;
    mc_cell_price_ps: bigint;
};

export { StorageUsed }

export { StorageUsedShort }

export { storeAccount }

export { storeAccountState }

export { storeAccountStatus }

export { storeAccountStatusChange }

export { storeAccountStorage }

export { storeCommonMessageInfo }

export { storeCommonMessageInfoRelaxed }

export { storeComputeSkipReason }

export { storeCurrencyCollection }

export { storeDepthBalanceInfo }

export { storeExtraCurrency }

export { storeHashUpdate }

export { storeLibRef }

export { storeMessage }

export { storeMessageRelaxed }

export { storeOutAction }

export { storeOutList }

export { storeShardAccount }

export { storeShardAccounts }

export { storeShardIdent }

export { storeSimpleLibrary }

export { storeSplitMergeInfo }

export { storeStateInit }

export { storeStorageInfo }

export { storeStorageUsed }

export { storeStorageUsedShort }

export { storeTickTock }

export { storeTransaction }

export { storeTransactionActionPhase }

export { storeTransactionBouncePhase }

export { storeTransactionComputePhase }

export { storeTransactionCreditPhase }

export { storeTransactionDescription }

export { storeTransactionsStoragePhase }

export { TickTock }

declare interface TonAddressItem {
    name: 'ton_addr';
}

export { toNano }

/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare interface TonCache {
    set(namespace: string, key: string, value: string | null): Promise<void>;
    get(namespace: string, key: string): Promise<string | null>;
}

export declare class TonClient {
    readonly parameters: TonClientParameters;
    protected api: HttpApi;
    constructor(parameters: TonClientParameters);
    /**
     * Get Address Balance
     * @param address address for balance check
     * @returns balance
     */
    getBalance(address: Address): Promise<bigint>;
    /**
     * Invoke get method
     * @param address contract address
     * @param name name of method
     * @param params optional parameters
     * @returns stack and gas_used field
     */
    runMethod(address: Address, name: string, stack?: TupleItem[]): Promise<{
        gas_used: number;
        stack: TupleReader;
    }>;
    /**
     * Invoke get method
     * @param address contract address
     * @param name name of method
     * @param params optional parameters
     * @returns stack and gas_used field
     * @deprecated use runMethod instead
     */
    callGetMethod(address: Address, name: string, stack?: TupleItem[]): Promise<{
        gas_used: number;
        stack: TupleReader;
    }>;
    /**
     * Invoke get method that returns error code instead of throwing error
     * @param address contract address
     * @param name name of method
     * @param params optional parameters
     * @returns stack and gas_used field
     */
    runMethodWithError(address: Address, name: string, params?: any[]): Promise<{
        gas_used: number;
        stack: TupleReader;
        exit_code: number;
    }>;
    /**
     * Invoke get method that returns error code instead of throwing error
     * @param address contract address
     * @param name name of method
     * @param params optional parameters
     * @returns stack and gas_used field
     * @deprecated use runMethodWithError instead
     */
    callGetMethodWithError(address: Address, name: string, stack?: TupleItem[]): Promise<{
        gas_used: number;
        stack: TupleReader;
    }>;
    /**
     * Get transactions
     * @param address address
     */
    getTransactions(address: Address, opts: {
        limit: number;
        lt?: string;
        hash?: string;
        to_lt?: string;
        inclusive?: boolean;
        archival?: boolean;
    }): Promise<Transaction[]>;
    /**
     * Get transaction by it's id
     * @param address address
     * @param lt logical time
     * @param hash transaction hash
     * @returns transaction or null if not exist
     */
    getTransaction(address: Address, lt: string, hash: string): Promise<Transaction | null>;
    /**
     * Locate outcoming transaction of destination address by incoming message
     * @param source message source address
     * @param destination message destination address
     * @param created_lt message's created lt
     * @returns transaction
     */
    tryLocateResultTx(source: Address, destination: Address, created_lt: string): Promise<Transaction>;
    /**
     * Locate incoming transaction of source address by outcoming message
     * @param source message source address
     * @param destination message destination address
     * @param created_lt message's created lt
     * @returns transaction
     */
    tryLocateSourceTx(source: Address, destination: Address, created_lt: string): Promise<Transaction>;
    /**
     * Fetch latest masterchain info
     * @returns masterchain info
     */
    getMasterchainInfo(): Promise<{
        workchain: number;
        shard: string;
        initSeqno: number;
        latestSeqno: number;
    }>;
    /**
     * Fetch latest workchain shards
     * @param seqno masterchain seqno
     */
    getWorkchainShards(seqno: number): Promise<{
        workchain: number;
        shard: string;
        seqno: number;
    }[]>;
    /**
     * Fetch transactions inf shards
     * @param workchain
     * @param seqno
     * @param shard
     */
    getShardTransactions(workchain: number, seqno: number, shard: string): Promise<{
        account: Address;
        lt: string;
        hash: string;
    }[]>;
    /**
     * Send message to a network
     * @param src source message
     */
    sendMessage(src: Message): Promise<void>;
    /**
     * Send file to a network
     * @param src source file
     */
    sendFile(src: Buffer): Promise<void>;
    /**
     * Estimate fees for external message
     * @param address target address
     * @returns
     */
    estimateExternalMessageFee(address: Address, args: {
        body: Cell;
        initCode: Cell | null;
        initData: Cell | null;
        ignoreSignature: boolean;
    }): Promise<{
        '@type': "query.fees";
        source_fees: {
            '@type': "fees";
            in_fwd_fee: number;
            storage_fee: number;
            gas_fee: number;
            fwd_fee: number;
        };
    }>;
    /**
     * Send external message to contract
     * @param contract contract to send message
     * @param src message body
     */
    sendExternalMessage(contract: Contract, src: Cell): Promise<void>;
    /**
     * Check if contract is deployed
     * @param address addres to check
     * @returns true if contract is in active state
     */
    isContractDeployed(address: Address): Promise<boolean>;
    /**
     * Resolves contract state
     * @param address contract address
     */
    getContractState(address: Address): Promise<{
        balance: bigint;
        extra_currencies: {
            '@type': "extraCurrency";
            id: number;
            amount: string;
        }[];
        state: "active" | "uninitialized" | "frozen";
        code: Buffer | null;
        data: Buffer | null;
        lastTransaction: {
            lt: string;
            hash: string;
        } | null;
        blockId: {
            workchain: number;
            shard: string;
            seqno: number;
        };
        timestampt: number;
    }>;
    /**
     * Open contract
     * @param src source contract
     * @returns contract
     */
    open<T extends Contract>(src: T): OpenedContract<T>;
    /**
     * Create a provider
     * @param address address
     * @param init optional init
     * @returns provider
     */
    provider(address: Address, init?: StateInit | null): ContractProvider;
}

export declare class TonClient4 {
    #private;
    constructor(args: TonClient4Parameters);
    /**
     * Get Last Block
     * @returns last block info
     */
    getLastBlock(): Promise<{
        last: {
            workchain: number;
            shard: string;
            seqno: number;
            fileHash: string;
            rootHash: string;
        };
        init: {
            fileHash: string;
            rootHash: string;
        };
        stateRootHash: string;
        now: number;
    }>;
    /**
     * Get block info
     * @param seqno block sequence number
     * @returns block info
     */
    getBlock(seqno: number): Promise<{
        shards: {
            workchain: number;
            shard: string;
            seqno: number;
            transactions: {
                lt: string;
                hash: string;
                account: string;
            }[];
            fileHash: string;
            rootHash: string;
        }[];
    }>;
    /**
     * Get block info by unix timestamp
     * @param ts unix timestamp
     * @returns block info
     */
    getBlockByUtime(ts: number): Promise<{
        shards: {
            workchain: number;
            shard: string;
            seqno: number;
            transactions: {
                lt: string;
                hash: string;
                account: string;
            }[];
            fileHash: string;
            rootHash: string;
        }[];
    }>;
    /**
     * Get block info by unix timestamp
     * @param seqno block sequence number
     * @param address account address
     * @returns account info
     */
    getAccount(seqno: number, address: Address): Promise<{
        account: {
            balance: {
                coins: string;
                currencies: Record<string, string>;
            };
            state: {
                type: "uninit";
            } | {
                code: string | null;
                type: "active";
                data: string | null;
            } | {
                type: "frozen";
                stateHash: string;
            };
            last: {
                lt: string;
                hash: string;
            } | null;
            storageStat: {
                lastPaid: number;
                duePayment: string | null;
                used: {
                    bits: number;
                    cells: number;
                    publicCells: number;
                };
            } | null;
        };
        block: {
            workchain: number;
            shard: string;
            seqno: number;
            fileHash: string;
            rootHash: string;
        };
    }>;
    /**
     * Get account lite info (without code and data)
     * @param seqno block sequence number
     * @param address account address
     * @returns account lite info
     */
    getAccountLite(seqno: number, address: Address): Promise<{
        account: {
            balance: {
                coins: string;
                currencies: Record<string, string>;
            };
            state: {
                type: "uninit";
            } | {
                type: "active";
                codeHash: string;
                dataHash: string;
            } | {
                type: "frozen";
                stateHash: string;
            };
            last: {
                lt: string;
                hash: string;
            } | null;
            storageStat: {
                lastPaid: number;
                duePayment: string | null;
                used: {
                    bits: number;
                    cells: number;
                    publicCells: number;
                };
            } | null;
        };
    }>;
    /**
     * Check if contract is deployed
     * @param address addres to check
     * @returns true if contract is in active state
     */
    isContractDeployed(seqno: number, address: Address): Promise<boolean>;
    /**
     * Check if account was updated since
     * @param seqno block sequence number
     * @param address account address
     * @param lt account last transaction lt
     * @returns account change info
     */
    isAccountChanged(seqno: number, address: Address, lt: bigint): Promise<{
        block: {
            workchain: number;
            shard: string;
            seqno: number;
            fileHash: string;
            rootHash: string;
        };
        changed: boolean;
    }>;
    /**
     * Load unparsed account transactions
     * @param address address
     * @param lt last transaction lt
     * @param hash last transaction hash
     * @returns unparsed transactions
     */
    getAccountTransactions(address: Address, lt: bigint, hash: Buffer): Promise<{
        block: {
            workchain: number;
            seqno: number;
            shard: string;
            rootHash: string;
            fileHash: string;
        };
        tx: Transaction;
    }[]>;
    /**
     * Load parsed account transactions
     * @param address address
     * @param lt last transaction lt
     * @param hash last transaction hash
     * @param count number of transactions to load
     * @returns parsed transactions
     */
    getAccountTransactionsParsed(address: Address, lt: bigint, hash: Buffer, count?: number): Promise<ParsedTransactions>;
    /**
     * Get network config
     * @param seqno block sequence number
     * @param ids optional config ids
     * @returns network config
     */
    getConfig(seqno: number, ids?: number[]): Promise<{
        config: {
            cell: string;
            address: string;
            globalBalance: {
                coins: string;
            };
        };
    }>;
    /**
     * Execute run method
     * @param seqno block sequence number
     * @param address account address
     * @param name method name
     * @param args method arguments
     * @returns method result
     */
    runMethod(seqno: number, address: Address, name: string, args?: TupleItem[]): Promise<{
        exitCode: number;
        result: TupleItem[];
        resultRaw: string | null;
        block: {
            workchain: number;
            shard: string;
            seqno: number;
            fileHash: string;
            rootHash: string;
        };
        shardBlock: {
            workchain: number;
            shard: string;
            seqno: number;
            fileHash: string;
            rootHash: string;
        };
        reader: TupleReader;
    }>;
    /**
     * Send external message
     * @param message message boc
     * @returns message status
     */
    sendMessage(message: Buffer): Promise<{
        status: any;
    }>;
    /**
     * Open smart contract
     * @param contract contract
     * @returns opened contract
     */
    open<T extends Contract>(contract: T): OpenedContract<T>;
    /**
     * Open smart contract
     * @param block block number
     * @param contract contract
     * @returns opened contract
     */
    openAt<T extends Contract>(block: number, contract: T): OpenedContract<T>;
    /**
     * Create provider
     * @param address address
     * @param init optional init data
     * @returns provider
     */
    provider(address: Address, init?: StateInit | null): ContractProvider;
    /**
     * Create provider at specified block number
     * @param block block number
     * @param address address
     * @param init optional init data
     * @returns provider
     */
    providerAt(block: number, address: Address, init?: StateInit | null): ContractProvider;
}

export declare type TonClient4Parameters = {
    /**
     * API endpoint
     */
    endpoint: string;
    /**
     * HTTP request timeout in milliseconds.
     */
    timeout?: number;
    /**
     * HTTP Adapter for axios
     */
    httpAdapter?: AxiosAdapter;
    /**
     * HTTP request interceptor for axios
     */
    requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
};

export declare type TonClientParameters = {
    /**
     * API Endpoint
     */
    endpoint: string;
    /**
     * HTTP request timeout in milliseconds.
     */
    timeout?: number;
    /**
     * API Key
     */
    apiKey?: string;
    /**
     * HTTP Adapter for axios
     */
    httpAdapter?: AxiosAdapter;
};

declare class TonConnect implements ITonConnect {
    private static readonly walletsList;
    /**
     * Check if specified wallet is injected and available to use with the app.
     * @param walletJSKey target wallet's js bridge key.
     */
    static isWalletInjected: (walletJSKey: string) => boolean;
    /**
     * Check if the app is opened inside specified wallet's browser.
     * @param walletJSKey target wallet's js bridge key.
     */
    static isInsideWalletBrowser: (walletJSKey: string) => boolean;
    /**
     * Returns available wallets list.
     */
    static getWallets(): Promise<WalletInfo[]>;
    /**
     * Emits user action event to the EventDispatcher. By default, it uses `window.dispatchEvent` for browser environment.
     * @private
     */
    private readonly tracker;
    private readonly walletsList;
    private readonly dappSettings;
    private readonly bridgeConnectionStorage;
    private _wallet;
    private provider;
    private statusChangeSubscriptions;
    private statusChangeErrorSubscriptions;
    private abortController?;
    /**
     * Shows if the wallet is connected right now.
     */
    get connected(): boolean;
    /**
     * Current connected account or null if no account is connected.
     */
    get account(): Account_2 | null;
    /**
     * Current connected wallet or null if no account is connected.
     */
    get wallet(): Wallet | null;
    private set wallet(value);
    constructor(options?: TonConnectOptions);
    /**
     * Returns available wallets list.
     */
    getWallets(): Promise<WalletInfo[]>;
    /**
     * Allows to subscribe to connection status changes and handle connection errors.
     * @param callback will be called after connections status changes with actual wallet or null.
     * @param errorsHandler (optional) will be called with some instance of TonConnectError when connect error is received.
     * @returns unsubscribe callback.
     */
    onStatusChange(callback: (wallet: Wallet | null) => void, errorsHandler?: (err: TonConnectError) => void): () => void;
    /**
     * Generates universal link for an external wallet and subscribes to the wallet's bridge, or sends connect request to the injected wallet.
     * @param wallet wallet's bridge url and universal link for an external wallet or jsBridge key for the injected wallet.
     * @param request (optional) additional request to pass to the wallet while connect (currently only ton_proof is available).
     * @param options (optional) openingDeadlineMS for the connection opening deadline and signal for the connection abort.
     * @returns universal link if external wallet was passed or void for the injected wallet.
     */
    connect<T extends WalletConnectionSource | Pick<WalletConnectionSourceHTTP, 'bridgeUrl'>[]>(wallet: T, options?: {
        request?: ConnectAdditionalRequest;
        openingDeadlineMS?: number;
        signal?: AbortSignal;
    }): T extends WalletConnectionSourceJS ? void : string;
    /** @deprecated use connect(wallet, options) instead */
    connect<T extends WalletConnectionSource | Pick<WalletConnectionSourceHTTP, 'bridgeUrl'>[]>(wallet: T, request?: ConnectAdditionalRequest, options?: {
        openingDeadlineMS?: number;
        signal?: AbortSignal;
    }): T extends WalletConnectionSourceJS ? void : string;
    /**
     * Try to restore existing session and reconnect to the corresponding wallet. Call it immediately when your app is loaded.
     */
    restoreConnection(options?: {
        openingDeadlineMS?: number;
        signal?: AbortSignal;
    }): Promise<void>;
    /**
     * Asks connected wallet to sign and send the transaction.
     * @param transaction transaction to send.
     * @param options (optional) onRequestSent will be called after the request was sent to the wallet and signal for the transaction abort.
     * @returns signed transaction boc that allows you to find the transaction in the blockchain.
     * If user rejects transaction, method will throw the corresponding error.
     */
    sendTransaction(transaction: SendTransactionRequest, options?: {
        onRequestSent?: () => void;
        signal?: AbortSignal;
    }): Promise<SendTransactionResponse>;
    /** @deprecated use sendTransaction(transaction, options) instead */
    sendTransaction(transaction: SendTransactionRequest, onRequestSent?: () => void): Promise<SendTransactionResponse>;
    /**
     * Disconnect form thw connected wallet and drop current session.
     */
    disconnect(options?: {
        signal?: AbortSignal;
    }): Promise<void>;
    /**
     * Pause bridge HTTP connection. Might be helpful, if you want to pause connections while browser tab is unfocused,
     * or if you use SDK with NodeJS and want to save server resources.
     */
    pauseConnection(): void;
    /**
     * Unpause bridge HTTP connection if it is paused.
     */
    unPauseConnection(): Promise<void>;
    private addWindowFocusAndBlurSubscriptions;
    private createProvider;
    private walletEventsListener;
    private onWalletConnected;
    private onWalletConnectError;
    private onWalletDisconnected;
    private checkConnection;
    private createConnectRequest;
}

/**
 * Base class for TonConnect errors. You can check if the error was triggered by the @tonconnect/sdk using `err instanceof TonConnectError`.
 */
declare class TonConnectError extends Error {
    private static prefix;
    protected get info(): string;
    constructor(message?: string, options?: {
        cause?: unknown;
    });
}

/**
 * TonConnect constructor options
 */
declare interface TonConnectOptions {
    /**
     * Url to the [manifest]{@link https://github.com/ton-connect/docs/blob/main/requests-responses.md#app-manifest} with the Dapp metadata that will be displayed in the user's wallet.
     * If not passed, manifest from `${window.location.origin}/tonconnect-manifest.json` will be taken.
     */
    manifestUrl?: string;
    /**
     * Storage to save protocol data. For browser default is `localStorage`. If you use SDK with nodeJS, you have to specify this field.
     */
    storage?: IStorage;
    /**
     * Event dispatcher to track user actions. By default, it uses `window.dispatchEvent` for browser environment.
     */
    eventDispatcher?: EventDispatcher<SdkActionEvent>;
    /**
     * Redefine wallets list source URL. Must be a link to a json file with [following structure]{@link https://github.com/ton-connect/wallets-list}
     * @default https://raw.githubusercontent.com/ton-connect/wallets-list/main/wallets.json
     * @
     */
    walletsListSource?: string;
    /**
     * Wallets list cache time to live
     * @default Infinity
     */
    walletsListCacheTTLMs?: number;
    /**
     * Allows to disable auto pause/unpause SSE connection on 'document.visibilitychange' event. It is not recommended to change default behaviour.
     */
    disableAutoPauseConnection?: boolean;
}

export declare namespace TonConnector {
    export {
        createConnectionCompletedEvent,
        createConnectionErrorEvent,
        createConnectionRestoringCompletedEvent,
        createConnectionRestoringErrorEvent,
        createConnectionRestoringStartedEvent,
        createConnectionStartedEvent,
        createDisconnectionEvent,
        createRequestVersionEvent,
        createResponseVersionEvent,
        createTransactionSentForSignatureEvent,
        createTransactionSignedEvent,
        createTransactionSigningFailedEvent,
        createVersionInfo,
        encodeTelegramUrlParameters,
        isTelegramUrl,
        isWalletInfoCurrentlyEmbedded,
        isWalletInfoCurrentlyInjected,
        isWalletInfoInjectable,
        isWalletInfoInjected,
        isWalletInfoRemote,
        toUserFriendlyAddress,
        Account_2 as Account,
        AddTonConnectPrefix,
        AuthType,
        BadRequestError,
        BrowserEventDispatcher,
        CHAIN,
        CONNECT_EVENT_ERROR_CODES,
        CONNECT_ITEM_ERROR_CODES,
        ConnectAdditionalRequest,
        ConnectionCompletedEvent,
        ConnectionErrorEvent,
        ConnectionEvent,
        ConnectionInfo,
        ConnectionRestoringCompletedEvent,
        ConnectionRestoringErrorEvent,
        ConnectionRestoringEvent,
        ConnectionRestoringStartedEvent,
        ConnectionStartedEvent,
        ConnectItem,
        ConnectItemReplyError,
        DappMetadata,
        DeviceInfo,
        DisconnectionEvent,
        EventDispatcher,
        Feature,
        FetchWalletsError,
        IStorage,
        ITonConnect,
        LocalstorageNotFoundError,
        ParseHexError,
        RemoveTonConnectPrefix,
        RequestVersionEvent,
        ResponseVersionEvent,
        SdkActionEvent,
        SEND_TRANSACTION_ERROR_CODES,
        SendTransactionFeature,
        SendTransactionFeatureDeprecated,
        SendTransactionRequest,
        SendTransactionResponse,
        SignDataFeature,
        TonAddressItem,
        TonConnect,
        TonConnect as default,
        TonConnectError,
        TonConnectOptions,
        TonProofItem,
        TonProofItemReply,
        TonProofItemReplyError,
        TonProofItemReplySuccess,
        TransactionInfo,
        TransactionMessage,
        TransactionSentForSignatureEvent,
        TransactionSignedEvent,
        TransactionSigningEvent,
        TransactionSigningFailedEvent,
        UnknownAppError,
        UnknownError,
        UserRejectsError,
        Version,
        VersionEvent,
        Wallet,
        WalletAlreadyConnectedError,
        WalletConnectionSource,
        WalletConnectionSourceHTTP,
        WalletConnectionSourceJS,
        WalletInfo,
        WalletInfoBase,
        WalletInfoCurrentlyEmbedded,
        WalletInfoCurrentlyInjected,
        WalletInfoInjectable,
        WalletInfoInjected,
        WalletInfoRemote,
        WalletNotConnectedError,
        WalletNotInjectedError,
        WalletsListManager,
        WithoutVersion,
        WrongAddressError
    }
}

export declare namespace TonCrypto {
    export {
        sha256,
        sha256_sync,
        sha512,
        sha512_sync,
        pbkdf2_sha512,
        hmac_sha512,
        getSecureRandomBytes,
        getSecureRandomWords,
        getSecureRandomNumber,
        newSecureWords,
        newSecurePassphrase,
        KeyPair,
        mnemonicNew,
        mnemonicValidate,
        mnemonicToPrivateKey,
        mnemonicToWalletKey,
        mnemonicToSeed,
        mnemonicToHDSeed,
        wordlist as mnemonicWordList,
        sealBox,
        openBox,
        keyPairFromSeed,
        keyPairFromSecretKey,
        sign,
        signVerify,
        HDKeysState,
        getED25519MasterKeyFromSeed,
        deriveED25519HardenedKey,
        deriveEd25519Path,
        getSymmetricMasterKeyFromSeed,
        deriveSymmetricHardenedKey,
        deriveSymmetricPath,
        deriveMnemonicsPath,
        deriveMnemonicHardenedKey,
        getMnemonicsMasterKeyFromSeed
    }
}

declare interface TonProofItem {
    name: 'ton_proof';
    payload: string;
}

declare type TonProofItemReply = TonProofItemReplySuccess | TonProofItemReplyError;

declare type TonProofItemReplyError = ConnectItemReplyError<TonProofItemReplySuccess['name']>;

declare interface TonProofItemReplySuccess {
    name: 'ton_proof';
    proof: {
        timestamp: number;
        domain: {
            lengthBytes: number;
            value: string;
        };
        payload: string;
        signature: string;
    };
}

/**
 * Converts raw TON address to no-bounceable user-friendly format. [See details]{@link https://ton.org/docs/learn/overviews/addresses#user-friendly-address}
 * @param hexAddress raw TON address formatted as "0:<hex string without 0x>".
 * @param [testOnly=false] convert address to test-only form. [See details]{@link https://ton.org/docs/learn/overviews/addresses#user-friendly-address}
 */
declare function toUserFriendlyAddress(hexAddress: string, testOnly?: boolean): string;

export { Transaction }

export { TransactionActionPhase }

export { TransactionBounceNegativeFunds }

export { TransactionBounceNoFunds }

export { TransactionBounceOk }

export { TransactionBouncePhase }

export { TransactionComputePhase }

export { TransactionComputeSkipped }

export { TransactionComputeVm }

export { TransactionCreditPhase }

export { TransactionDescription }

export { TransactionDescriptionGeneric }

export { TransactionDescriptionMergeInstall }

export { TransactionDescriptionMergePrepare }

export { TransactionDescriptionSplitInstall }

export { TransactionDescriptionSplitPrepare }

export { TransactionDescriptionStorage }

export { TransactionDescriptionTickTock }

/**
 * Transaction information.
 */
declare type TransactionInfo = {
    /**
     * Transaction validity time in unix timestamp.
     */
    valid_until: string | null;
    /**
     * Sender address.
     */
    from: string | null;
    /**
     * Transaction messages.
     */
    messages: TransactionMessage[];
};

/**
 * Transaction message.
 */
declare type TransactionMessage = {
    /**
     * Recipient address.
     */
    address: string | null;
    /**
     * Transfer amount.
     */
    amount: string | null;
};

/**
 * Initial transaction event when a user initiates a transaction.
 */
declare type TransactionSentForSignatureEvent = {
    /**
     * Event type.
     */
    type: 'transaction-sent-for-signature';
} & ConnectionInfo & TransactionInfo;

/**
 * Transaction signed event when a user successfully signed a transaction.
 */
declare type TransactionSignedEvent = {
    /**
     * Event type.
     */
    type: 'transaction-signed';
    /**
     * Connection success flag.
     */
    is_success: true;
    /**
     * Signed transaction.
     */
    signed_transaction: string;
} & ConnectionInfo & TransactionInfo;

/**
 * Transaction events.
 */
declare type TransactionSigningEvent = TransactionSentForSignatureEvent | TransactionSignedEvent | TransactionSigningFailedEvent;

/**
 * Transaction error event when a user cancels a transaction or there is an error during the transaction process.
 */
declare type TransactionSigningFailedEvent = {
    /**
     * Event type.
     */
    type: 'transaction-signing-failed';
    /**
     * Connection success flag.
     */
    is_success: false;
    /**
     * Reason for the error.
     */
    error_message: string;
    /**
     * Error code.
     */
    error_code: SEND_TRANSACTION_ERROR_CODES | null;
} & ConnectionInfo & TransactionInfo;

export { TransactionStoragePhase }

declare interface TransitionalOptions {
    silentJSONParsing?: boolean;
    forcedJSONParsing?: boolean;
    clarifyTimeoutError?: boolean;
}

export { Tuple }

export { TupleBuilder }

export { TupleItem }

export { TupleItemBuilder }

export { TupleItemCell }

export { TupleItemInt }

export { TupleItemNaN }

export { TupleItemNull }

export { TupleItemSlice }

export { TupleReader }

/**
 * Thrown when app tries to send rpc request to the injected wallet while not connected.
 */
declare class UnknownAppError extends TonConnectError {
    protected get info(): string;
    constructor(...args: ConstructorParameters<typeof TonConnectError>);
}

/**
 * Unhanded unknown error.
 */
declare class UnknownError extends TonConnectError {
    constructor(...args: ConstructorParameters<typeof TonConnectError>);
}

/**
 * Thrown when user rejects the action in the wallet.
 */
declare class UserRejectsError extends TonConnectError {
    protected get info(): string;
    constructor(...args: ConstructorParameters<typeof TonConnectError>);
}

/**
 * Version of the TON Connect SDK and TON Connect UI.
 */
declare type Version = {
    /**
     * TON Connect SDK version.
     */
    ton_connect_sdk_lib: string | null;
    /**
     * TON Connect UI version.
     */
    ton_connect_ui_lib: string | null;
};

/**
 * Version events.
 */
declare type VersionEvent = RequestVersionEvent | ResponseVersionEvent;

declare interface Wallet {
    /**
     * Information about user's wallet's device.
     */
    device: DeviceInfo;
    /**
     * Provider type: http bridge or injected js.
     */
    provider: 'http' | 'injected';
    /**
     * Selected account.
     */
    account: Account_2;
    /**
     * Response for connect items request.
     */
    connectItems?: {
        tonProof?: TonProofItemReply;
    };
}

declare type Wallet4SendArgsSignable = WalletV4BasicSendArgs & SendArgsSignable;

declare type Wallet4SendArgsSigned = WalletV4BasicSendArgs & SendArgsSigned;

declare type Wallet5VR1SendArgsExtensionAuth = WalletV5R1BasicSendArgs & {
    authType: 'extension';
    queryId?: bigint;
};

/**
 * Thrown when wallet connection called but wallet already connected. To avoid the error, disconnect the wallet before doing a new connection.
 */
declare class WalletAlreadyConnectedError extends TonConnectError {
    protected get info(): string;
    constructor(...args: ConstructorParameters<typeof TonConnectError>);
}

declare type WalletConnectionSource = WalletConnectionSourceHTTP | WalletConnectionSourceJS;

declare interface WalletConnectionSourceHTTP {
    /**
     * Base part of the wallet universal url. The link should support [Ton Connect parameters]{@link https://github.com/ton-connect/docs/blob/main/bridge.md#universal-link}.
     */
    universalLink: string;
    /**
     * Url of the wallet's implementation of the [HTTP bridge]{@link https://github.com/ton-connect/docs/blob/main/bridge.md#http-bridge}.
     */
    bridgeUrl: string;
}

declare interface WalletConnectionSourceJS {
    /**
     * If the wallet handles JS Bridge connection, specifies the binding for the bridge object accessible through window. Example: the key "tonkeeper" means the bridge can be accessed as window.tonkeeper.
     */
    jsBridgeKey: string;
}

export declare class WalletContractV1R1 implements Contract {
    static create(args: {
        workchain: number;
        publicKey: Buffer;
    }): WalletContractV1R1;
    readonly workchain: number;
    readonly publicKey: Buffer;
    readonly address: Address;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get Wallet Balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    /**
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: {
        seqno: number;
        secretKey: Buffer;
        message?: Maybe_2<MessageRelaxed>;
        sendMode?: Maybe_2<SendMode>;
    }): Promise<void>;
    /**
     * Create signed transfer
     */
    createTransfer(args: {
        seqno: number;
        secretKey: Buffer;
        message?: Maybe_2<MessageRelaxed>;
        sendMode?: Maybe_2<SendMode>;
    }): Cell;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}

export declare class WalletContractV1R2 implements Contract {
    static create(args: {
        workchain: number;
        publicKey: Buffer;
    }): WalletContractV1R2;
    readonly workchain: number;
    readonly publicKey: Buffer;
    readonly address: Address;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get Wallet Balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    /**
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: {
        seqno: number;
        secretKey: Buffer;
        message?: Maybe_2<MessageRelaxed>;
        sendMode?: Maybe_2<SendMode>;
    }): Promise<void>;
    /**
     * Create signed transfer
     */
    createTransfer(args: {
        seqno: number;
        secretKey: Buffer;
        message?: Maybe_2<MessageRelaxed>;
        sendMode?: Maybe_2<SendMode>;
    }): Cell;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}

export declare class WalletContractV1R3 implements Contract {
    static create(args: {
        workchain: number;
        publicKey: Buffer;
    }): WalletContractV1R3;
    readonly workchain: number;
    readonly publicKey: Buffer;
    readonly address: Address;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get Wallet Balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    /**
     * Send signed transfer
     */
    send(executor: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: {
        seqno: number;
        secretKey: Buffer;
        message?: Maybe_2<MessageRelaxed>;
        sendMode?: Maybe_2<SendMode>;
    }): Promise<void>;
    /**
     * Create signed transfer
     */
    createTransfer(args: {
        seqno: number;
        secretKey: Buffer;
        message?: Maybe_2<MessageRelaxed>;
        sendMode?: Maybe_2<SendMode>;
    }): Cell;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}

export declare class WalletContractV2R1 implements Contract {
    static create(args: {
        workchain: number;
        publicKey: Buffer;
    }): WalletContractV2R1;
    readonly workchain: number;
    readonly publicKey: Buffer;
    readonly address: Address;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get Wallet Balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    /**
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: {
        seqno: number;
        secretKey: Buffer;
        messages: MessageRelaxed[];
        sendMode?: Maybe_2<SendMode>;
        timeout?: Maybe_2<number>;
    }): Promise<void>;
    /**
     * Create signed transfer
     */
    createTransfer(args: {
        seqno: number;
        secretKey: Buffer;
        messages: MessageRelaxed[];
        sendMode?: Maybe_2<SendMode>;
        timeout?: Maybe_2<number>;
    }): Cell;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}

export declare class WalletContractV2R2 implements Contract {
    static create(args: {
        workchain: number;
        publicKey: Buffer;
    }): WalletContractV2R2;
    readonly workchain: number;
    readonly publicKey: Buffer;
    readonly address: Address;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get Wallet Balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    /**
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: {
        seqno: number;
        secretKey: Buffer;
        messages: MessageRelaxed[];
        sendMode?: Maybe_2<SendMode>;
        timeout?: Maybe_2<number>;
    }): Promise<void>;
    /**
     * Create signed transfer
     */
    createTransfer(args: {
        seqno: number;
        secretKey: Buffer;
        messages: MessageRelaxed[];
        sendMode?: Maybe_2<SendMode>;
        timeout?: Maybe_2<number>;
    }): Cell;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}

export declare class WalletContractV3R1 implements Contract {
    static create(args: {
        workchain: number;
        publicKey: Buffer;
        walletId?: Maybe_2<number>;
    }): WalletContractV3R1;
    readonly workchain: number;
    readonly publicKey: Buffer;
    readonly address: Address;
    readonly walletId: number;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get wallet balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    /**
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: {
        seqno: number;
        secretKey: Buffer;
        messages: MessageRelaxed[];
        sendMode?: Maybe_2<SendMode>;
        timeout?: Maybe_2<number>;
    }): Promise<void>;
    /**
     * Create transfer
     */
    createTransfer<T extends WalletV3SendArgsSigned | WalletV3SendArgsSignable>(args: T): T extends WalletV3SendArgsSignable ? Promise<Cell> : Cell;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}

export declare class WalletContractV3R2 implements Contract {
    static create(args: {
        workchain: number;
        publicKey: Buffer;
        walletId?: Maybe_2<number>;
    }): WalletContractV3R2;
    readonly workchain: number;
    readonly publicKey: Buffer;
    readonly address: Address;
    readonly walletId: number;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get wallet balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    /**
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: {
        seqno: number;
        secretKey: Buffer;
        messages: MessageRelaxed[];
        sendMode?: Maybe_2<SendMode>;
        timeout?: Maybe_2<number>;
    }): Promise<void>;
    /**
     * Create transfer
     */
    createTransfer<T extends WalletV3SendArgsSigned | WalletV3SendArgsSignable>(args: T): T extends WalletV3SendArgsSignable ? Promise<Cell> : Cell;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}

export declare class WalletContractV4 implements Contract {
    static create(args: {
        workchain: number;
        publicKey: Buffer;
        walletId?: Maybe_2<number>;
    }): WalletContractV4;
    readonly workchain: number;
    readonly publicKey: Buffer;
    readonly address: Address;
    readonly walletId: number;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get Wallet Balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    /**
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: {
        seqno: number;
        secretKey: Buffer;
        messages: MessageRelaxed[];
        sendMode?: Maybe_2<SendMode>;
        timeout?: Maybe_2<number>;
    }): Promise<void>;
    /**
     * Create signed transfer
     */
    createTransfer<T extends Wallet4SendArgsSigned | Wallet4SendArgsSignable>(args: T): T extends Wallet4SendArgsSignable ? Promise<Cell> : Cell;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}

/**
 * @deprecated
 * use WalletContractV5R1 instead
 */
export declare class WalletContractV5Beta implements Contract {
    readonly walletId: WalletIdV5Beta;
    readonly publicKey: Buffer;
    static OpCodes: {
        auth_extension: number;
        auth_signed_external: number;
        auth_signed_internal: number;
    };
    static create(args: {
        walletId?: Partial<WalletIdV5Beta>;
        publicKey: Buffer;
    }): WalletContractV5Beta;
    readonly address: Address;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get Wallet Balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    /**
     * Get Wallet Extensions
     */
    getExtensions(provider: ContractProvider): Promise<Cell | null>;
    /**
     * Get Wallet Extensions
     */
    getExtensionsArray(provider: ContractProvider): Promise<Address[]>;
    /**
     * Get is secret-key authentication enabled
     */
    getIsSecretKeyAuthEnabled(provider: ContractProvider): Promise<boolean>;
    /**
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: WalletV5BetaSendArgs & {
        messages: MessageRelaxed[];
        sendMode: SendMode;
    }): Promise<void>;
    /**
     * Sign and send add extension request
     */
    sendAddExtension(provider: ContractProvider, args: WalletV5BetaSendArgs & {
        extensionAddress: Address;
    }): Promise<void>;
    /**
     * Sign and send remove extension request
     */
    sendRemoveExtension(provider: ContractProvider, args: WalletV5BetaSendArgs & {
        extensionAddress: Address;
    }): Promise<void>;
    /**
     * Sign and send actions batch
     */
    sendActionsBatch(provider: ContractProvider, args: WalletV5BetaSendArgs & {
        actions: OutActionWalletV5[];
    }): Promise<void>;
    private createActions;
    /**
     * Create signed transfer
     */
    createTransfer<T extends WalletV5BetaSendArgs>(args: T & {
        messages: MessageRelaxed[];
        sendMode: SendMode;
    }): WalletV5BetaPackedCell<T>;
    /**
     * Create signed add extension request
     */
    createAddExtension<T extends WalletV5BetaSendArgs>(args: T & {
        extensionAddress: Address;
    }): WalletV5BetaPackedCell<T>;
    /**
     * Create signed remove extension request
     */
    createRemoveExtension<T extends WalletV5BetaSendArgs>(args: T & {
        extensionAddress: Address;
    }): WalletV5BetaPackedCell<T>;
    /**
     * Create signed request or extension auth request
     */
    createRequest<T extends WalletV5BetaSendArgs>(args: T & {
        actions: OutActionWalletV5[];
    }): WalletV5BetaPackedCell<T>;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}

export declare class WalletContractV5R1 implements Contract {
    readonly publicKey: Buffer;
    readonly walletId: WalletIdV5R1<WalletIdV5R1ClientContext | WalletIdV5R1CustomContext>;
    static OpCodes: {
        auth_extension: number;
        auth_signed_external: number;
        auth_signed_internal: number;
    };
    static create<C extends WalletIdV5R1ClientContext | WalletIdV5R1CustomContext>(args: C extends WalletIdV5R1ClientContext ? {
        walletId?: Maybe_2<WalletIdV5R1<C>>;
        publicKey: Buffer;
    } : {
        workchain?: number;
        publicKey: Buffer;
        walletId?: Maybe_2<Partial<WalletIdV5R1<C>>>;
    }): WalletContractV5R1;
    readonly address: Address;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get Wallet Balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    /**
     * Get Wallet Extensions
     */
    getExtensions(provider: ContractProvider): Promise<Cell | null>;
    /**
     * Get Wallet Extensions
     */
    getExtensionsArray(provider: ContractProvider): Promise<Address[]>;
    /**
     * Get is secret-key authentication enabled
     */
    getIsSecretKeyAuthEnabled(provider: ContractProvider): Promise<boolean>;
    /**
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: WalletV5R1SendArgs & {
        messages: MessageRelaxed[];
        sendMode: SendMode;
    }): Promise<void>;
    /**
     * Sign and send add extension request
     */
    sendAddExtension(provider: ContractProvider, args: WalletV5R1SendArgs & {
        extensionAddress: Address;
    }): Promise<void>;
    /**
     * Sign and send remove extension request
     */
    sendRemoveExtension(provider: ContractProvider, args: WalletV5R1SendArgs & {
        extensionAddress: Address;
    }): Promise<void>;
    private createActions;
    /**
     * Create signed transfer
     */
    createTransfer<T extends WalletV5R1SendArgs>(args: T & {
        messages: MessageRelaxed[];
        sendMode: SendMode;
    }): WalletV5R1PackedCell<T>;
    /**
     * Create signed add extension request
     */
    createAddExtension<T extends WalletV5R1SendArgs>(args: T & {
        extensionAddress: Address;
    }): WalletV5R1PackedCell<T>;
    /**
     * Create signed remove extension request
     */
    createRemoveExtension<T extends WalletV5R1SendArgs>(args: T & {
        extensionAddress: Address;
    }): WalletV5R1PackedCell<T>;
    /**
     * Create signed request or extension auth request
     */
    createRequest<T extends WalletV5R1SendArgs>(args: T & {
        actions: OutActionWalletV5[];
    }): WalletV5R1PackedCell<T>;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
}

declare interface WalletIdV5Beta {
    readonly walletVersion: 'v5';
    /**
     * -239 is mainnet, -3 is testnet
     */
    readonly networkGlobalId: number;
    readonly workchain: number;
    readonly subwalletNumber: number;
}

/**
 * schema:
 * wallet_id -- int32
 * wallet_id = global_id ^ context_id
 * context_id_client$1 = wc:int8 wallet_version:uint8 counter:uint15
 * context_id_backoffice$0 = counter:uint31
 *
 *
 * calculated default values serialisation:
 *
 * global_id = -239, workchain = 0, wallet_version = 0', subwallet_number = 0 (client context)
 * gives wallet_id = 2147483409
 *
 * global_id = -239, workchain = -1, wallet_version = 0', subwallet_number = 0 (client context)
 * gives wallet_id = 8388369
 *
 * global_id = -3, workchain = 0, wallet_version = 0', subwallet_number = 0 (client context)
 * gives wallet_id = 2147483645
 *
 * global_id = -3, workchain = -1, wallet_version = 0', subwallet_number = 0 (client context)
 * gives wallet_id = 8388605
 */
declare interface WalletIdV5R1<C extends WalletIdV5R1ClientContext | WalletIdV5R1CustomContext = WalletIdV5R1ClientContext | WalletIdV5R1CustomContext> {
    /**
     * -239 is mainnet, -3 is testnet
     */
    readonly networkGlobalId: number;
    readonly context: C;
}

declare interface WalletIdV5R1ClientContext {
    readonly walletVersion: 'v5r1';
    readonly workchain: number;
    readonly subwalletNumber: number;
}

/**
 * 31-bit unsigned integer
 */
declare type WalletIdV5R1CustomContext = number;

declare type WalletInfo = WalletInfoRemote | WalletInfoInjectable | (WalletInfoRemote & WalletInfoInjectable);

/**
 * Common information for injectable and http-compatible wallets.
 */
declare interface WalletInfoBase {
    /**
     * Human-readable name of the wallet.
     */
    name: string;
    /**
     * ID of the wallet, equals to the `appName` property into {@link Wallet.device}.
     */
    appName: string;
    /**
     * Url to the icon of the wallet. Resolution 288×288px. On non-transparent background, without rounded corners. PNG format.
     */
    imageUrl: string;
    /**
     * Will be used in the protocol later.
     */
    tondns?: string;
    /**
     * Info or landing page of your wallet. May be useful for TON newcomers.
     */
    aboutUrl: string;
    /**
     * OS and browsers where the wallet could be installed
     */
    platforms: ('ios' | 'android' | 'macos' | 'windows' | 'linux' | 'chrome' | 'firefox' | 'safari')[];
}

/**
 * Information about the JS-injectable wallet in the browser of which the dApp is opened.
 */
declare interface WalletInfoCurrentlyEmbedded extends WalletInfoCurrentlyInjected {
    injected: true;
    embedded: true;
}

/**
 * Information about the JS-injectable wallet that is injected to the current webpage.
 */
declare interface WalletInfoCurrentlyInjected extends WalletInfoInjectable {
    injected: true;
}

/**
 * JS-injectable wallet information.
 */
declare interface WalletInfoInjectable extends WalletInfoBase {
    /**
     * If the wallet handles JS Bridge connection, specifies the binding for the bridge object accessible through window. Example: the key "tonkeeper" means the bridge can be accessed as window.tonkeeper.
     */
    jsBridgeKey: string;
    /**
     * Indicates if the wallet currently is injected to the webpage.
     */
    injected: boolean;
    /**
     * Indicates if the dapp is opened inside this wallet's browser.
     */
    embedded: boolean;
}

/**
 * @deprecated Use `WalletInfoInjectable` or `WalletInfoCurrentlyInjected` instead.
 */
declare interface WalletInfoInjected extends WalletInfoBase {
    jsBridgeKey: string;
    injected: boolean;
    embedded: boolean;
}

/**
 * Http-compatible wallet information.
 */
declare interface WalletInfoRemote extends WalletInfoBase {
    /**
     * Base part of the wallet universal url. The link should support [Ton Connect parameters]{@link https://github.com/ton-connect/docs/blob/main/bridge.md#universal-link}.
     */
    universalLink: string;
    /**
     * Native wallet app deepLink. The link should support [Ton Connect parameters]{@link https://github.com/ton-connect/docs/blob/main/bridge.md#universal-link}.
     */
    deepLink?: string;
    /**
     * Url of the wallet's implementation of the [HTTP bridge]{@link https://github.com/ton-connect/docs/blob/main/bridge.md#http-bridge}.
     */
    bridgeUrl: string;
}

/**
 * Thrown when send transaction or other protocol methods called while wallet is not connected.
 */
declare class WalletNotConnectedError extends TonConnectError {
    protected get info(): string;
    constructor(...args: ConstructorParameters<typeof TonConnectError>);
}

/**
 * Thrown when there is an attempt to connect to the injected wallet while it is not exists in the webpage.
 */
declare class WalletNotInjectedError extends TonConnectError {
    protected get info(): string;
    constructor(...args: ConstructorParameters<typeof TonConnectError>);
}

declare class WalletsListManager {
    private walletsListCache;
    private walletsListCacheCreationTimestamp;
    private readonly cacheTTLMs;
    private readonly walletsListSource;
    constructor(options?: {
        walletsListSource?: string;
        cacheTTLMs?: number;
    });
    getWallets(): Promise<WalletInfo[]>;
    getEmbeddedWallet(): Promise<WalletInfoCurrentlyEmbedded | null>;
    private fetchWalletsList;
    private walletConfigDTOListToWalletConfigList;
    private mergeWalletsLists;
    private isCorrectWalletConfigDTO;
}

declare type WalletV3BasicSendArgs = {
    seqno: number;
    messages: MessageRelaxed[];
    sendMode?: Maybe_2<SendMode>;
    timeout?: Maybe_2<number>;
};

declare type WalletV3SendArgsSignable = WalletV3BasicSendArgs & SendArgsSignable;

declare type WalletV3SendArgsSigned = WalletV3BasicSendArgs & SendArgsSigned;

declare type WalletV4BasicSendArgs = {
    seqno: number;
    messages: MessageRelaxed[];
    sendMode?: Maybe_2<SendMode>;
    timeout?: Maybe_2<number>;
};

declare type WalletV5BetaBasicSendArgs = {
    seqno: number;
    timeout?: Maybe_2<number>;
};

declare type WalletV5BetaPackedCell<T> = T extends WalletV5BetaSendArgsSignable ? Promise<Cell> : Cell;

declare type WalletV5BetaSendArgs = WalletV5BetaSendArgsSigned | WalletV5BetaSendArgsSignable | WalletV5BetaSendArgsExtensionAuth;

declare type WalletV5BetaSendArgsExtensionAuth = WalletV5BetaBasicSendArgs & {
    authType: 'extension';
};

declare type WalletV5BetaSendArgsSignable = WalletV5BetaBasicSendArgs & SendArgsSignable & {
    authType?: 'external' | 'internal';
};

declare type WalletV5BetaSendArgsSigned = WalletV5BetaBasicSendArgs & SendArgsSigned & {
    authType?: 'external' | 'internal';
};

declare type WalletV5R1BasicSendArgs = {
    seqno: number;
    timeout?: Maybe_2<number>;
};

declare type WalletV5R1PackedCell<T> = T extends WalletV5R1SendArgsSignable ? Promise<Cell> : Cell;

declare type WalletV5R1SendArgs = WalletV5R1SendArgsSinged | WalletV5R1SendArgsSignable | Wallet5VR1SendArgsExtensionAuth;

declare type WalletV5R1SendArgsSignable = WalletV5R1BasicSendArgs & SendArgsSignable & {
    authType?: 'external' | 'internal';
};

declare type WalletV5R1SendArgsSinged = WalletV5R1BasicSendArgs & SendArgsSigned & {
    authType?: 'external' | 'internal';
};

/**
 * Parameters without version field.
 */
declare type WithoutVersion<T> = T extends [Version, ...infer Rest] ? [...Rest] : never;

/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare const wordlist: string[];

export declare type WorkchainDescriptor = {
    enabledSince: number;
    actialMinSplit: number;
    min_split: number;
    max_split: number;
    basic: boolean;
    active: boolean;
    accept_msgs: boolean;
    flags: number;
    zerostateRootHash: Buffer;
    zerostateFileHash: Buffer;
    version: number;
    format: {
        vmVersion: number;
        vmMode: bigint;
    };
};

export { Writable }

/**
 * Thrown when passed address is in incorrect format.
 */
declare class WrongAddressError extends TonConnectError {
    protected get info(): string;
    constructor(...args: ConstructorParameters<typeof TonConnectError>);
}



export { }

}
  