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
import { z } from 'zod';

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

declare const blocksCodec: z.ZodArray<z.ZodObject<{
    workchain: z.ZodNumber;
    seqno: z.ZodNumber;
    shard: z.ZodString;
    rootHash: z.ZodString;
    fileHash: z.ZodString;
}, "strip", z.ZodTypeAny, {
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

declare const parsedTransactionCodec: z.ZodObject<{
    address: z.ZodString;
    lt: z.ZodString;
    hash: z.ZodString;
    prevTransaction: z.ZodObject<{
        lt: z.ZodString;
        hash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        lt: string;
        hash: string;
    }, {
        lt: string;
        hash: string;
    }>;
    time: z.ZodNumber;
    outMessagesCount: z.ZodNumber;
    oldStatus: z.ZodUnion<[z.ZodLiteral<"uninitialized">, z.ZodLiteral<"frozen">, z.ZodLiteral<"active">, z.ZodLiteral<"non-existing">]>;
    newStatus: z.ZodUnion<[z.ZodLiteral<"uninitialized">, z.ZodLiteral<"frozen">, z.ZodLiteral<"active">, z.ZodLiteral<"non-existing">]>;
    fees: z.ZodString;
    update: z.ZodObject<{
        oldHash: z.ZodString;
        newHash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        oldHash: string;
        newHash: string;
    }, {
        oldHash: string;
        newHash: string;
    }>;
    inMessage: z.ZodUnion<[z.ZodObject<{
        body: z.ZodString;
        info: z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<"internal">;
            value: z.ZodString;
            dest: z.ZodString;
            src: z.ZodString;
            bounced: z.ZodBoolean;
            bounce: z.ZodBoolean;
            ihrDisabled: z.ZodBoolean;
            createdAt: z.ZodNumber;
            createdLt: z.ZodString;
            fwdFee: z.ZodString;
            ihrFee: z.ZodString;
        }, "strip", z.ZodTypeAny, {
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
        }>, z.ZodObject<{
            type: z.ZodLiteral<"external-in">;
            dest: z.ZodString;
            src: z.ZodUnion<[z.ZodObject<{
                bits: z.ZodNumber;
                data: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                data: string;
                bits: number;
            }, {
                data: string;
                bits: number;
            }>, z.ZodNull]>;
            importFee: z.ZodString;
        }, "strip", z.ZodTypeAny, {
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
        }>, z.ZodObject<{
            type: z.ZodLiteral<"external-out">;
            dest: z.ZodUnion<[z.ZodObject<{
                bits: z.ZodNumber;
                data: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                data: string;
                bits: number;
            }, {
                data: string;
                bits: number;
            }>, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
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
        init: z.ZodUnion<[z.ZodObject<{
            splitDepth: z.ZodUnion<[z.ZodNumber, z.ZodNull]>;
            code: z.ZodUnion<[z.ZodString, z.ZodNull]>;
            data: z.ZodUnion<[z.ZodString, z.ZodNull]>;
            special: z.ZodUnion<[z.ZodObject<{
                tick: z.ZodBoolean;
                tock: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                tick: boolean;
                tock: boolean;
            }, {
                tick: boolean;
                tock: boolean;
            }>, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
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
        }>, z.ZodNull]>;
    }, "strip", z.ZodTypeAny, {
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
    }>, z.ZodNull]>;
    outMessages: z.ZodArray<z.ZodObject<{
        body: z.ZodString;
        info: z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<"internal">;
            value: z.ZodString;
            dest: z.ZodString;
            src: z.ZodString;
            bounced: z.ZodBoolean;
            bounce: z.ZodBoolean;
            ihrDisabled: z.ZodBoolean;
            createdAt: z.ZodNumber;
            createdLt: z.ZodString;
            fwdFee: z.ZodString;
            ihrFee: z.ZodString;
        }, "strip", z.ZodTypeAny, {
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
        }>, z.ZodObject<{
            type: z.ZodLiteral<"external-in">;
            dest: z.ZodString;
            src: z.ZodUnion<[z.ZodObject<{
                bits: z.ZodNumber;
                data: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                data: string;
                bits: number;
            }, {
                data: string;
                bits: number;
            }>, z.ZodNull]>;
            importFee: z.ZodString;
        }, "strip", z.ZodTypeAny, {
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
        }>, z.ZodObject<{
            type: z.ZodLiteral<"external-out">;
            dest: z.ZodUnion<[z.ZodObject<{
                bits: z.ZodNumber;
                data: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                data: string;
                bits: number;
            }, {
                data: string;
                bits: number;
            }>, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
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
        init: z.ZodUnion<[z.ZodObject<{
            splitDepth: z.ZodUnion<[z.ZodNumber, z.ZodNull]>;
            code: z.ZodUnion<[z.ZodString, z.ZodNull]>;
            data: z.ZodUnion<[z.ZodString, z.ZodNull]>;
            special: z.ZodUnion<[z.ZodObject<{
                tick: z.ZodBoolean;
                tock: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                tick: boolean;
                tock: boolean;
            }, {
                tick: boolean;
                tock: boolean;
            }>, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
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
        }>, z.ZodNull]>;
    }, "strip", z.ZodTypeAny, {
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
    parsed: z.ZodObject<{
        seqno: z.ZodUnion<[z.ZodNumber, z.ZodNull]>;
        body: z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<"comment">;
            comment: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "comment";
            comment: string;
        }, {
            type: "comment";
            comment: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"payload">;
            cell: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "payload";
            cell: string;
        }, {
            type: "payload";
            cell: string;
        }>]>, z.ZodNull]>;
        status: z.ZodUnion<[z.ZodLiteral<"success">, z.ZodLiteral<"failed">, z.ZodLiteral<"pending">]>;
        dest: z.ZodUnion<[z.ZodString, z.ZodNull]>;
        kind: z.ZodUnion<[z.ZodLiteral<"out">, z.ZodLiteral<"in">]>;
        amount: z.ZodString;
        resolvedAddress: z.ZodString;
        bounced: z.ZodBoolean;
        mentioned: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
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
    operation: z.ZodObject<{
        address: z.ZodString;
        comment: z.ZodOptional<z.ZodString>;
        items: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"ton">;
            amount: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            amount: string;
            kind: "ton";
        }, {
            amount: string;
            kind: "ton";
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"token">;
            amount: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            amount: string;
            kind: "token";
        }, {
            amount: string;
            kind: "token";
        }>]>, "many">;
        op: z.ZodOptional<z.ZodObject<{
            type: z.ZodUnion<[z.ZodLiteral<"jetton::excesses">, z.ZodLiteral<"jetton::transfer">, z.ZodLiteral<"jetton::transfer_notification">, z.ZodLiteral<"deposit">, z.ZodLiteral<"deposit::ok">, z.ZodLiteral<"withdraw">, z.ZodLiteral<"withdraw::all">, z.ZodLiteral<"withdraw::delayed">, z.ZodLiteral<"withdraw::ok">, z.ZodLiteral<"airdrop">]>;
            options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            type: "jetton::excesses" | "jetton::transfer" | "jetton::transfer_notification" | "deposit" | "deposit::ok" | "withdraw" | "withdraw::all" | "withdraw::delayed" | "withdraw::ok" | "airdrop";
            options?: Record<string, string> | undefined;
        }, {
            type: "jetton::excesses" | "jetton::transfer" | "jetton::transfer_notification" | "deposit" | "deposit::ok" | "withdraw" | "withdraw::all" | "withdraw::delayed" | "withdraw::ok" | "airdrop";
            options?: Record<string, string> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
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
}, "strip", z.ZodTypeAny, {
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


export * from "zod";

export { }
