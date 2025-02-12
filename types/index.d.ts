/// <reference types="node" />
declare module "client/api/TonCache" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    export interface TonCache {
        set(namespace: string, key: string, value: string | null): Promise<void>;
        get(namespace: string, key: string): Promise<string | null>;
    }
    export class InMemoryCache implements TonCache {
        private cache;
        set: (namespace: string, key: string, value: string | null) => Promise<void>;
        get: (namespace: string, key: string) => Promise<string | null>;
    }
}
declare module "client/api/HttpApi" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { TonCache } from "client/api/TonCache";
    import { AxiosAdapter } from 'axios';
    import { Address, Cell, TupleItem } from '@ijstech/ton-core';
    import { z } from 'zod';
    const message: z.ZodObject<{
        source: z.ZodString;
        destination: z.ZodString;
        value: z.ZodString;
        fwd_fee: z.ZodString;
        ihr_fee: z.ZodString;
        created_lt: z.ZodString;
        body_hash: z.ZodString;
        msg_data: z.ZodUnion<[z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataRaw">;
            body: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataRaw";
            body: string;
        }, {
            '@type': "msg.dataRaw";
            body: string;
        }>, z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataText">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataText";
            text: string;
        }, {
            '@type': "msg.dataText";
            text: string;
        }>, z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataDecryptedText">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataDecryptedText";
            text: string;
        }, {
            '@type': "msg.dataDecryptedText";
            text: string;
        }>, z.ZodObject<{
            '@type': z.ZodLiteral<"msg.dataEncryptedText">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            '@type': "msg.dataEncryptedText";
            text: string;
        }, {
            '@type': "msg.dataEncryptedText";
            text: string;
        }>]>;
        message: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
    const getTransactions: z.ZodArray<z.ZodObject<{
        data: z.ZodString;
        utime: z.ZodNumber;
        transaction_id: z.ZodObject<{
            lt: z.ZodString;
            hash: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            lt: string;
            hash: string;
        }, {
            lt: string;
            hash: string;
        }>;
        fee: z.ZodString;
        storage_fee: z.ZodString;
        other_fee: z.ZodString;
        in_msg: z.ZodUnion<[z.ZodUndefined, z.ZodObject<{
            source: z.ZodString;
            destination: z.ZodString;
            value: z.ZodString;
            fwd_fee: z.ZodString;
            ihr_fee: z.ZodString;
            created_lt: z.ZodString;
            body_hash: z.ZodString;
            msg_data: z.ZodUnion<[z.ZodObject<{
                '@type': z.ZodLiteral<"msg.dataRaw">;
                body: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                '@type': "msg.dataRaw";
                body: string;
            }, {
                '@type': "msg.dataRaw";
                body: string;
            }>, z.ZodObject<{
                '@type': z.ZodLiteral<"msg.dataText">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                '@type': "msg.dataText";
                text: string;
            }, {
                '@type': "msg.dataText";
                text: string;
            }>, z.ZodObject<{
                '@type': z.ZodLiteral<"msg.dataDecryptedText">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                '@type': "msg.dataDecryptedText";
                text: string;
            }, {
                '@type': "msg.dataDecryptedText";
                text: string;
            }>, z.ZodObject<{
                '@type': z.ZodLiteral<"msg.dataEncryptedText">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                '@type': "msg.dataEncryptedText";
                text: string;
            }, {
                '@type': "msg.dataEncryptedText";
                text: string;
            }>]>;
            message: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
        }>]>;
        out_msgs: z.ZodArray<z.ZodObject<{
            source: z.ZodString;
            destination: z.ZodString;
            value: z.ZodString;
            fwd_fee: z.ZodString;
            ihr_fee: z.ZodString;
            created_lt: z.ZodString;
            body_hash: z.ZodString;
            msg_data: z.ZodUnion<[z.ZodObject<{
                '@type': z.ZodLiteral<"msg.dataRaw">;
                body: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                '@type': "msg.dataRaw";
                body: string;
            }, {
                '@type': "msg.dataRaw";
                body: string;
            }>, z.ZodObject<{
                '@type': z.ZodLiteral<"msg.dataText">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                '@type': "msg.dataText";
                text: string;
            }, {
                '@type': "msg.dataText";
                text: string;
            }>, z.ZodObject<{
                '@type': z.ZodLiteral<"msg.dataDecryptedText">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                '@type': "msg.dataDecryptedText";
                text: string;
            }, {
                '@type': "msg.dataDecryptedText";
                text: string;
            }>, z.ZodObject<{
                '@type': z.ZodLiteral<"msg.dataEncryptedText">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                '@type': "msg.dataEncryptedText";
                text: string;
            }, {
                '@type': "msg.dataEncryptedText";
                text: string;
            }>]>;
            message: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">;
    export type HTTPTransaction = z.TypeOf<typeof getTransactions>[number];
    export type HTTPMessage = z.TypeOf<typeof message>;
    export interface HttpApiParameters {
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
    export class HttpApi {
        readonly endpoint: string;
        readonly cache: TonCache;
        private readonly parameters;
        private shardCache;
        private shardLoader;
        private shardTransactionsCache;
        private shardTransactionsLoader;
        constructor(endpoint: string, parameters?: HttpApiParameters);
        getAddressInformation(address: Address): Promise<{
            data: string;
            code: string;
            balance: string | number;
            extra_currencies: {
                '@type': "extraCurrency";
                id: number;
                amount: string;
            }[];
            state: "active" | "uninitialized" | "frozen";
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
}
declare module "utils/maybe" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    export type Maybe<T> = T | null | undefined;
}
declare module "client/TonClient" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { HttpApi } from "client/api/HttpApi";
    import { AxiosAdapter } from 'axios';
    import { Address, Cell, Contract, ContractProvider, Message, Transaction, TupleItem, TupleReader, StateInit, OpenedContract } from '@ijstech/ton-core';
    export type TonClientParameters = {
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
    export class TonClient {
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
}
declare module "utils/toUrlSafe" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    export function toUrlSafe(src: string): string;
}
declare module "client/TonClient4" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { AxiosAdapter, InternalAxiosRequestConfig } from "axios";
    import { Address, Contract, ContractProvider, OpenedContract, StateInit, Transaction, TupleItem, TupleReader } from "@ijstech/ton-core";
    import { z } from 'zod';
    export type TonClient4Parameters = {
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
    export class TonClient4 {
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
                    data: string | null;
                    code: string | null;
                    type: "active";
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
    const blocksCodec: z.ZodArray<z.ZodObject<{
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
    const parsedTransactionCodec: z.ZodObject<{
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
                data: string | null;
                code: string | null;
                splitDepth: number | null;
                special: {
                    tick: boolean;
                    tock: boolean;
                } | null;
            }, {
                data: string | null;
                code: string | null;
                splitDepth: number | null;
                special: {
                    tick: boolean;
                    tock: boolean;
                } | null;
            }>, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
            body: string;
            init: {
                data: string | null;
                code: string | null;
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
                data: string | null;
                code: string | null;
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
                data: string | null;
                code: string | null;
                splitDepth: number | null;
                special: {
                    tick: boolean;
                    tock: boolean;
                } | null;
            }, {
                data: string | null;
                code: string | null;
                splitDepth: number | null;
                special: {
                    tick: boolean;
                    tock: boolean;
                } | null;
            }>, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
            body: string;
            init: {
                data: string | null;
                code: string | null;
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
                data: string | null;
                code: string | null;
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
        address: string;
        prevTransaction: {
            lt: string;
            hash: string;
        };
        time: number;
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
                data: string | null;
                code: string | null;
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
                data: string | null;
                code: string | null;
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
        address: string;
        prevTransaction: {
            lt: string;
            hash: string;
        };
        time: number;
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
                data: string | null;
                code: string | null;
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
                data: string | null;
                code: string | null;
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
    export type ParsedTransaction = z.infer<typeof parsedTransactionCodec>;
    export type ParsedTransactions = {
        blocks: z.infer<typeof blocksCodec>;
        transactions: ParsedTransaction[];
    };
}
declare module "wallets/signing/singer" {
    import { Builder, Cell } from "@ijstech/ton-core";
    export type SendArgsSigned = {
        secretKey: Buffer;
    };
    export type SendArgsSignable = {
        signer: (message: Cell) => Promise<Buffer>;
    };
    export function signPayload<T extends SendArgsSigned | SendArgsSignable>(args: T, signingMessage: Builder, packMessage: (signature: Buffer, signingMessage: Builder) => Cell): T extends SendArgsSignable ? Promise<Cell> : Cell;
}
declare module "wallets/v5beta/WalletV5OutActions" {
    import { Address, OutActionSendMsg } from '@ijstech/ton-core';
    export interface OutActionAddExtension {
        type: 'addExtension';
        address: Address;
    }
    export interface OutActionRemoveExtension {
        type: 'removeExtension';
        address: Address;
    }
    export interface OutActionSetIsPublicKeyEnabled {
        type: 'setIsPublicKeyEnabled';
        isEnabled: boolean;
    }
    export type OutActionExtended = OutActionSetIsPublicKeyEnabled | OutActionAddExtension | OutActionRemoveExtension;
    export type OutActionWalletV5 = OutActionExtended | OutActionSendMsg;
    export function isOutActionExtended(action: OutActionSendMsg | OutActionExtended): action is OutActionExtended;
    export function isOutActionBasic(action: OutActionSendMsg | OutActionExtended): action is OutActionSendMsg;
}
declare module "wallets/v5beta/WalletV5BetaWalletId" {
    import { Builder, Slice } from '@ijstech/ton-core';
    export interface WalletIdV5Beta {
        readonly walletVersion: 'v5';
        /**
         * -239 is mainnet, -3 is testnet
         */
        readonly networkGlobalId: number;
        readonly workchain: number;
        readonly subwalletNumber: number;
    }
    export function loadWalletIdV5Beta(value: bigint | Buffer | Slice): WalletIdV5Beta;
    export function storeWalletIdV5Beta(walletId: WalletIdV5Beta): (builder: Builder) => void;
}
declare module "wallets/v5beta/WalletContractV5Beta" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    import { SendArgsSignable, SendArgsSigned } from "wallets/signing/singer";
    import { OutActionWalletV5 } from "wallets/v5beta/WalletV5OutActions";
    import { WalletIdV5Beta } from "wallets/v5beta/WalletV5BetaWalletId";
    export type WalletV5BetaBasicSendArgs = {
        seqno: number;
        timeout?: Maybe<number>;
    };
    export type WalletV5BetaSendArgsSigned = WalletV5BetaBasicSendArgs & SendArgsSigned & {
        authType?: 'external' | 'internal';
    };
    export type WalletV5BetaSendArgsSignable = WalletV5BetaBasicSendArgs & SendArgsSignable & {
        authType?: 'external' | 'internal';
    };
    export type WalletV5BetaSendArgsExtensionAuth = WalletV5BetaBasicSendArgs & {
        authType: 'extension';
    };
    export type WalletV5BetaSendArgs = WalletV5BetaSendArgsSigned | WalletV5BetaSendArgsSignable | WalletV5BetaSendArgsExtensionAuth;
    export type WalletV5BetaPackedCell<T> = T extends WalletV5BetaSendArgsSignable ? Promise<Cell> : Cell;
    /**
     * @deprecated
     * use WalletContractV5R1 instead
     */
    export class WalletContractV5Beta implements Contract {
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
}
declare module "wallets/v5beta/WalletV5BetaActions" {
    import { Builder, OutActionSendMsg, Slice } from '@ijstech/ton-core';
    import { OutActionExtended } from "wallets/v5beta/WalletV5OutActions";
    export function storeOutActionExtendedV5Beta(action: OutActionExtended): (builder: Builder) => void;
    export function loadOutActionV5BetaExtended(slice: Slice): OutActionExtended;
    export function storeOutListExtendedV5Beta(actions: (OutActionExtended | OutActionSendMsg)[]): (builder: Builder) => void;
    export function loadOutListExtendedV5Beta(slice: Slice): (OutActionExtended | OutActionSendMsg)[];
}
declare module "wallets/WalletContractV4" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    import { SendArgsSignable, SendArgsSigned } from "wallets/signing/singer";
    export type WalletV4BasicSendArgs = {
        seqno: number;
        messages: MessageRelaxed[];
        sendMode?: Maybe<SendMode>;
        timeout?: Maybe<number>;
    };
    export type Wallet4SendArgsSigned = WalletV4BasicSendArgs & SendArgsSigned;
    export type Wallet4SendArgsSignable = WalletV4BasicSendArgs & SendArgsSignable;
    export class WalletContractV4 implements Contract {
        static create(args: {
            workchain: number;
            publicKey: Buffer;
            walletId?: Maybe<number>;
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
            sendMode?: Maybe<SendMode>;
            timeout?: Maybe<number>;
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
}
declare module "wallets/WalletContractV3Types" {
    import { MessageRelaxed, SendMode } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    import { SendArgsSignable } from "wallets/signing/singer";
    import { SendArgsSigned } from "wallets/signing/singer";
    export type WalletV3BasicSendArgs = {
        seqno: number;
        messages: MessageRelaxed[];
        sendMode?: Maybe<SendMode>;
        timeout?: Maybe<number>;
    };
    export type WalletV3SendArgsSigned = WalletV3BasicSendArgs & SendArgsSigned;
    export type WalletV3SendArgsSignable = WalletV3BasicSendArgs & SendArgsSignable;
}
declare module "wallets/v5r1/WalletV5R1WalletId" {
    import { Builder, Slice } from '@ijstech/ton-core';
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
    export interface WalletIdV5R1<C extends WalletIdV5R1ClientContext | WalletIdV5R1CustomContext = WalletIdV5R1ClientContext | WalletIdV5R1CustomContext> {
        /**
         * -239 is mainnet, -3 is testnet
         */
        readonly networkGlobalId: number;
        readonly context: C;
    }
    export interface WalletIdV5R1ClientContext {
        readonly walletVersion: 'v5r1';
        readonly workchain: number;
        readonly subwalletNumber: number;
    }
    /**
     * 31-bit unsigned integer
     */
    export type WalletIdV5R1CustomContext = number;
    export function isWalletIdV5R1ClientContext(context: WalletIdV5R1ClientContext | WalletIdV5R1CustomContext): context is WalletIdV5R1ClientContext;
    /**
     * @param value serialized wallet id
     * @param networkGlobalId -239 is mainnet, -3 is testnet
     */
    export function loadWalletIdV5R1(value: bigint | Buffer | Slice, networkGlobalId: number): WalletIdV5R1;
    export function storeWalletIdV5R1(walletId: WalletIdV5R1): (builder: Builder) => Builder;
}
declare module "wallets/v5r1/WalletContractV5R1" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    import { SendArgsSignable, SendArgsSigned } from "wallets/signing/singer";
    import { OutActionWalletV5 } from "wallets/v5beta/WalletV5OutActions";
    import { WalletIdV5R1, WalletIdV5R1ClientContext, WalletIdV5R1CustomContext } from "wallets/v5r1/WalletV5R1WalletId";
    export type WalletV5R1BasicSendArgs = {
        seqno: number;
        timeout?: Maybe<number>;
    };
    export type WalletV5R1SendArgsSinged = WalletV5R1BasicSendArgs & SendArgsSigned & {
        authType?: 'external' | 'internal';
    };
    export type WalletV5R1SendArgsSignable = WalletV5R1BasicSendArgs & SendArgsSignable & {
        authType?: 'external' | 'internal';
    };
    export type Wallet5VR1SendArgsExtensionAuth = WalletV5R1BasicSendArgs & {
        authType: 'extension';
        queryId?: bigint;
    };
    export type WalletV5R1SendArgs = WalletV5R1SendArgsSinged | WalletV5R1SendArgsSignable | Wallet5VR1SendArgsExtensionAuth;
    export type WalletV5R1PackedCell<T> = T extends WalletV5R1SendArgsSignable ? Promise<Cell> : Cell;
    export class WalletContractV5R1 implements Contract {
        readonly publicKey: Buffer;
        readonly walletId: WalletIdV5R1<WalletIdV5R1ClientContext | WalletIdV5R1CustomContext>;
        static OpCodes: {
            auth_extension: number;
            auth_signed_external: number;
            auth_signed_internal: number;
        };
        static create<C extends WalletIdV5R1ClientContext | WalletIdV5R1CustomContext>(args: C extends WalletIdV5R1ClientContext ? {
            walletId?: Maybe<WalletIdV5R1<C>>;
            publicKey: Buffer;
        } : {
            workchain?: number;
            publicKey: Buffer;
            walletId?: Maybe<Partial<WalletIdV5R1<C>>>;
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
}
declare module "wallets/v5r1/WalletV5R1Actions" {
    import { Builder, OutActionSendMsg, SendMode, Slice } from '@ijstech/ton-core';
    import { OutActionExtended, OutActionWalletV5 } from "wallets/v5beta/WalletV5OutActions";
    import { WalletV5R1SendArgs } from "wallets/v5r1/WalletContractV5R1";
    export function storeOutActionExtendedV5R1(action: OutActionExtended): (builder: Builder) => void;
    export function loadOutActionExtendedV5R1(slice: Slice): OutActionExtended;
    export function storeOutListExtendedV5R1(actions: (OutActionExtended | OutActionSendMsg)[]): (builder: Builder) => void;
    export function loadOutListExtendedV5R1(slice: Slice): (OutActionExtended | OutActionSendMsg)[];
    /**
     * Safety rules -- actions of external messages must have +2 in the SendMode. Internal messages actions may have arbitrary SendMode.
     */
    export function toSafeV5R1SendMode(sendMode: SendMode, authType: WalletV5R1SendArgs['authType']): number;
    export function patchV5R1ActionsSendMode(actions: OutActionWalletV5[], authType: WalletV5R1SendArgs['authType']): OutActionWalletV5[];
}
declare module "wallets/signing/createWalletTransfer" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Builder, Cell, MessageRelaxed, OutActionSendMsg } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    import { WalletV5BetaPackedCell, WalletV5BetaSendArgs, WalletV5BetaSendArgsExtensionAuth } from "wallets/v5beta/WalletContractV5Beta";
    import { Wallet4SendArgsSignable, Wallet4SendArgsSigned } from "wallets/WalletContractV4";
    import { WalletV3SendArgsSignable, WalletV3SendArgsSigned } from "wallets/WalletContractV3Types";
    import { OutActionExtended } from "wallets/v5beta/WalletV5OutActions";
    import { Wallet5VR1SendArgsExtensionAuth, WalletV5R1PackedCell, WalletV5R1SendArgs } from "wallets/v5r1/WalletContractV5R1";
    export function createWalletTransferV1(args: {
        seqno: number;
        sendMode: number;
        message: Maybe<MessageRelaxed>;
        secretKey: Buffer;
    }): Cell;
    export function createWalletTransferV2(args: {
        seqno: number;
        sendMode: number;
        messages: MessageRelaxed[];
        secretKey: Buffer;
        timeout?: Maybe<number>;
    }): Cell;
    export function createWalletTransferV3<T extends WalletV3SendArgsSignable | WalletV3SendArgsSigned>(args: T & {
        sendMode: number;
        walletId: number;
    }): T extends WalletV3SendArgsSignable ? Promise<Cell> : Cell;
    export function createWalletTransferV4<T extends Wallet4SendArgsSignable | Wallet4SendArgsSigned>(args: T & {
        sendMode: number;
        walletId: number;
    }): T extends Wallet4SendArgsSignable ? Promise<Cell> : Cell;
    export function createWalletTransferV5Beta<T extends WalletV5BetaSendArgs>(args: T extends WalletV5BetaSendArgsExtensionAuth ? T & {
        actions: (OutActionSendMsg | OutActionExtended)[];
    } : T & {
        actions: (OutActionSendMsg | OutActionExtended)[];
        walletId: (builder: Builder) => void;
    }): WalletV5BetaPackedCell<T>;
    export function createWalletTransferV5R1<T extends WalletV5R1SendArgs>(args: T extends Wallet5VR1SendArgsExtensionAuth ? T & {
        actions: (OutActionSendMsg | OutActionExtended)[];
    } : T & {
        actions: (OutActionSendMsg | OutActionExtended)[];
        walletId: (builder: Builder) => void;
    }): WalletV5R1PackedCell<T>;
}
declare module "wallets/WalletContractV1R1" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    export class WalletContractV1R1 implements Contract {
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
            message?: Maybe<MessageRelaxed>;
            sendMode?: Maybe<SendMode>;
        }): Promise<void>;
        /**
         * Create signed transfer
         */
        createTransfer(args: {
            seqno: number;
            secretKey: Buffer;
            message?: Maybe<MessageRelaxed>;
            sendMode?: Maybe<SendMode>;
        }): Cell;
        /**
         * Create sender
         */
        sender(provider: ContractProvider, secretKey: Buffer): Sender;
    }
}
declare module "wallets/WalletContractV1R2" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    export class WalletContractV1R2 implements Contract {
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
            message?: Maybe<MessageRelaxed>;
            sendMode?: Maybe<SendMode>;
        }): Promise<void>;
        /**
         * Create signed transfer
         */
        createTransfer(args: {
            seqno: number;
            secretKey: Buffer;
            message?: Maybe<MessageRelaxed>;
            sendMode?: Maybe<SendMode>;
        }): Cell;
        /**
         * Create sender
         */
        sender(provider: ContractProvider, secretKey: Buffer): Sender;
    }
}
declare module "wallets/WalletContractV1R3" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    export class WalletContractV1R3 implements Contract {
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
            message?: Maybe<MessageRelaxed>;
            sendMode?: Maybe<SendMode>;
        }): Promise<void>;
        /**
         * Create signed transfer
         */
        createTransfer(args: {
            seqno: number;
            secretKey: Buffer;
            message?: Maybe<MessageRelaxed>;
            sendMode?: Maybe<SendMode>;
        }): Cell;
        /**
         * Create sender
         */
        sender(provider: ContractProvider, secretKey: Buffer): Sender;
    }
}
declare module "wallets/WalletContractV2R1" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    export class WalletContractV2R1 implements Contract {
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
            sendMode?: Maybe<SendMode>;
            timeout?: Maybe<number>;
        }): Promise<void>;
        /**
         * Create signed transfer
         */
        createTransfer(args: {
            seqno: number;
            secretKey: Buffer;
            messages: MessageRelaxed[];
            sendMode?: Maybe<SendMode>;
            timeout?: Maybe<number>;
        }): Cell;
        /**
         * Create sender
         */
        sender(provider: ContractProvider, secretKey: Buffer): Sender;
    }
}
declare module "wallets/WalletContractV2R2" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    export class WalletContractV2R2 implements Contract {
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
            sendMode?: Maybe<SendMode>;
            timeout?: Maybe<number>;
        }): Promise<void>;
        /**
         * Create signed transfer
         */
        createTransfer(args: {
            seqno: number;
            secretKey: Buffer;
            messages: MessageRelaxed[];
            sendMode?: Maybe<SendMode>;
            timeout?: Maybe<number>;
        }): Cell;
        /**
         * Create sender
         */
        sender(provider: ContractProvider, secretKey: Buffer): Sender;
    }
}
declare module "wallets/WalletContractV3R1" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    import { WalletV3SendArgsSignable, WalletV3SendArgsSigned } from "wallets/WalletContractV3Types";
    export class WalletContractV3R1 implements Contract {
        static create(args: {
            workchain: number;
            publicKey: Buffer;
            walletId?: Maybe<number>;
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
            sendMode?: Maybe<SendMode>;
            timeout?: Maybe<number>;
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
}
declare module "wallets/WalletContractV3R2" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ijstech/ton-core";
    import { Maybe } from "utils/maybe";
    import { WalletV3SendArgsSignable, WalletV3SendArgsSigned } from "wallets/WalletContractV3Types";
    export class WalletContractV3R2 implements Contract {
        static create(args: {
            workchain: number;
            publicKey: Buffer;
            walletId?: Maybe<number>;
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
            sendMode?: Maybe<SendMode>;
            timeout?: Maybe<number>;
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
}
declare module "wallets/WalletContractV5Beta" {
    export * from "wallets/v5beta/WalletContractV5Beta";
    export * from "wallets/v5beta/WalletV5BetaActions";
    export * from "wallets/v5beta/WalletV5BetaWalletId";
}
declare module "wallets/WalletContractV5R1" {
    export * from "wallets/v5r1/WalletContractV5R1";
    export * from "wallets/v5r1/WalletV5R1Actions";
    export * from "wallets/v5r1/WalletV5R1WalletId";
}
declare module "jetton/JettonMaster" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Contract, ContractProvider } from "@ijstech/ton-core";
    export class JettonMaster implements Contract {
        static create(address: Address): JettonMaster;
        readonly address: Address;
        constructor(address: Address);
        getWalletAddress(provider: ContractProvider, owner: Address): Promise<Address>;
        getJettonData(provider: ContractProvider): Promise<{
            totalSupply: bigint;
            mintable: boolean;
            adminAddress: Address;
            content: import("@ijstech/ton-core").Cell;
            walletCode: import("@ijstech/ton-core").Cell;
        }>;
    }
}
declare module "jetton/JettonWallet" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { Address, Contract, ContractProvider } from "@ijstech/ton-core";
    export class JettonWallet implements Contract {
        static create(address: Address): JettonWallet;
        readonly address: Address;
        private constructor();
        getBalance(provider: ContractProvider): Promise<bigint>;
    }
}
declare module "multisig/MultisigWallet" {
    import { TonClient } from "client/TonClient";
    import { Address, ContractProvider, Dictionary, Sender, StateInit } from '@ijstech/ton-core';
    import { MultisigOrder } from "multisig/MultisigOrder";
    export class MultisigWallet {
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
}
declare module "multisig/MultisigOrder" {
    import { Cell } from '@ijstech/ton-core';
    import { MultisigWallet } from "multisig/MultisigWallet";
    export class MultisigOrder {
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
}
declare module "multisig/MultisigOrderBuilder" {
    import { Builder, MessageRelaxed } from '@ijstech/ton-core';
    import { MultisigOrder } from "multisig/MultisigOrder";
    export class MultisigOrderBuilder {
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
}
declare module "elector/ElectorContract" {
    import { Address, Contract, ContractProvider } from "@ijstech/ton-core";
    export class ElectorContract implements Contract {
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
}
declare module "config/ConfigParser" {
    import { Address, Slice, Cell, Dictionary } from "@ijstech/ton-core";
    export function configParseMasterAddress(slice: Slice | null | undefined): Address | null;
    export function parseValidatorSet(slice: Slice): {
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
    export function parseBridge(slice: Slice): {
        bridgeAddress: Address;
        oracleMultisigAddress: Address;
        oracles: Map<string, Buffer>;
        externalChainAddress: Buffer;
    };
    export function configParseMasterAddressRequired(slice: Slice | null | undefined): Address;
    export function configParse5(slice: Slice | null | undefined): {
        blackholeAddr: Address | null;
        feeBurnNominator: number;
        feeBurnDenominator: number;
    };
    export function configParse13(slice: Slice | null | undefined): {
        deposit: bigint;
        bitPrice: bigint;
        cellPrice: bigint;
    };
    export function configParse15(slice: Slice | null | undefined): {
        validatorsElectedFor: number;
        electorsStartBefore: number;
        electorsEndBefore: number;
        stakeHeldFor: number;
    };
    export function configParse16(slice: Slice | null | undefined): {
        maxValidators: number;
        maxMainValidators: number;
        minValidators: number;
    };
    export function configParse17(slice: Slice | null | undefined): {
        minStake: bigint;
        maxStake: bigint;
        minTotalStake: bigint;
        maxStakeFactor: number;
    };
    export type StoragePrices = {
        utime_since: number;
        bit_price_ps: bigint;
        cell_price_ps: bigint;
        mc_bit_price_ps: bigint;
        mc_cell_price_ps: bigint;
    };
    export function configParse18(slice: Slice | null | undefined): StoragePrices[];
    export function configParse8(slice: Slice | null | undefined): {
        version: number;
        capabilities: bigint;
    };
    export function configParse40(slice: Slice | null | undefined): {
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
    export function configParseWorkchainDescriptor(slice: Slice): WorkchainDescriptor;
    export type WorkchainDescriptor = {
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
    export function configParse12(slice: Slice | null | undefined): Dictionary<number, WorkchainDescriptor>;
    export function configParseValidatorSet(slice: Slice | null | undefined): {
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
    export function configParseBridge(slice: Slice | null | undefined): {
        bridgeAddress: Address;
        oracleMultisigAddress: Address;
        oracles: Map<string, Buffer>;
        externalChainAddress: Buffer;
    } | null;
    export type GasLimitsPrices = ReturnType<typeof configParseGasLimitsPrices>;
    export function configParseGasLimitsPrices(slice: Slice | null | undefined): {
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
    export type MsgPrices = ReturnType<typeof configParseMsgPrices>;
    export function configParseMsgPrices(slice: Slice | null | undefined): {
        lumpPrice: bigint;
        bitPrice: bigint;
        cellPrice: bigint;
        ihrPriceFactor: number;
        firstFrac: number;
        nextFrac: number;
    };
    export function configParse28(slice: Slice | null | undefined): {
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
    export function configParse29(slice: Slice | null | undefined): {
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
    export function parseProposalSetup(slice: Slice): {
        minTotalRounds: number;
        maxTotalRounds: number;
        minWins: number;
        maxLoses: number;
        minStoreSec: number;
        maxStoreSec: number;
        bitPrice: number;
        cellPrice: number;
    };
    export function parseVotingSetup(slice: Slice | null | undefined): {
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
    export function loadConfigParamById(configBase64: string, id: number): Cell;
    export function loadConfigParamsAsSlice(configBase64: string): Map<number, Slice>;
    export function parseFullConfig(configs: Map<number, Slice>): {
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
}
declare module "utils/fees" {
    import { Cell } from '@ijstech/ton-core';
    import { MsgPrices, StoragePrices } from "config/ConfigParser";
    export function computeStorageFees(data: {
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
    export function computeFwdFees(msgPrices: MsgPrices, cells: bigint, bits: bigint): bigint;
    export function computeGasPrices(gasUsed: bigint, prices: {
        flatLimit: bigint;
        flatPrice: bigint;
        price: bigint;
    }): bigint;
    export function computeExternalMessageFees(msgPrices: MsgPrices, cell: Cell): bigint;
    export function computeMessageForwardFees(msgPrices: MsgPrices, cell: Cell): {
        fees: bigint;
        remaining: bigint;
    };
}
declare module "utils/createTestClient" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { TonClient } from "client/TonClient";
    export function createTestClient(net?: 'testnet' | 'mainnet'): TonClient;
}
declare module "utils/createTestClient4" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    import { TonClient4 } from "client/TonClient4";
    export function createTestClient4(net?: 'testnet' | 'mainnet'): TonClient4;
}
declare module "utils/randomTestKey" {
    export function randomTestKey(seed: string): import("@ton/crypto").KeyPair;
}
declare module "utils/testWallets" {
    import { OpenedContract } from '@ijstech/ton-core';
    import { WalletContractV5R1 } from "wallets/v5r1/WalletContractV5R1";
    import { WalletContractV5Beta } from "wallets/v5beta/WalletContractV5Beta";
    import { WalletContractV4 } from "wallets/WalletContractV4";
    import { WalletContractV3R2 } from "wallets/WalletContractV3R2";
    import { WalletContractV3R1 } from "wallets/WalletContractV3R1";
    import { WalletContractV2R2 } from "wallets/WalletContractV2R2";
    import { WalletContractV2R1 } from "wallets/WalletContractV2R1";
    import { WalletContractV1R2 } from "wallets/WalletContractV1R2";
    import { WalletContractV1R1 } from "wallets/WalletContractV1R1";
    type WalletContract = WalletContractV5R1 | WalletContractV5Beta | WalletContractV4 | WalletContractV3R2 | WalletContractV3R1 | WalletContractV2R2 | WalletContractV2R1 | WalletContractV1R2 | WalletContractV1R1;
    export const tillNextSeqno: (wallet: OpenedContract<WalletContract>, oldSeqno: number, maxTries?: number) => Promise<void>;
}
declare module "utils/time" {
    /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    export function exponentialBackoffDelay(currentFailureCount: number, minDelay: number, maxDelay: number, maxFailureCount: number): number;
    export function delay(ms: number): Promise<unknown>;
    export function delayBreakable(ms: number): {
        promise: Promise<unknown>;
        resolver: () => void;
    };
    export function forever(): Promise<unknown>;
    export function backoff<T>(callback: () => Promise<T>, log: boolean): Promise<T>;
}

  /// <amd-module name="@ton/core" />
declare module "@ton/core" {
      /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    export { Address, address, ExternalAddress, ADNLAddress, contractAddress, BitString, BitReader, BitBuilder, Builder, beginCell, Slice, CellType, Cell, Writable, Dictionary, DictionaryKey, DictionaryKeyTypes, DictionaryValue, exoticMerkleProof, convertToMerkleProof, exoticMerkleUpdate, exoticPruned, generateMerkleProof, generateMerkleProofDirect, generateMerkleUpdate, Tuple, TupleItem, TupleItemNull, TupleItemInt, TupleItemNaN, TupleItemCell, TupleItemSlice, TupleItemBuilder, parseTuple, serializeTuple, TupleReader, TupleBuilder, Contract, ContractProvider, ContractGetMethodResult, ContractState, Sender, SenderArguments, openContract, OpenedContract, ComputeError, ContractABI, ABIError, ABITypeRef, ABIField, ABIArgument, ABIGetter, ABIType, ABIReceiverMessage, ABIReceiver, toNano, fromNano, crc16, crc32c, base32Decode, base32Encode, getMethodId, Maybe, safeSign, safeSignVerify, paddedBufferToBits, internal, external, comment, Account, loadAccount, storeAccount, AccountState, loadAccountState, storeAccountState, AccountStatus, loadAccountStatus, storeAccountStatus, AccountStatusChange, loadAccountStatusChange, storeAccountStatusChange, AccountStorage, loadAccountStorage, storeAccountStorage, OutActionSendMsg, OutActionSetCode, OutActionReserve, OutActionChangeLibrary, OutAction, loadOutAction, storeOutAction, loadOutList, storeOutList, CommonMessageInfo, CommonMessageInfoInternal, CommonMessageInfoExternalIn, CommonMessageInfoExternalOut, loadCommonMessageInfo, storeCommonMessageInfo, CommonMessageInfoRelaxed, CommonMessageInfoRelaxedExternalOut, CommonMessageInfoRelaxedInternal, loadCommonMessageInfoRelaxed, storeCommonMessageInfoRelaxed, ComputeSkipReason, loadComputeSkipReason, storeComputeSkipReason, CurrencyCollection, loadCurrencyCollection, storeCurrencyCollection, DepthBalanceInfo, loadDepthBalanceInfo, storeDepthBalanceInfo, ExtraCurrency, packExtraCurrencyCell, packExtraCurrencyDict, loadExtraCurrency, loadMaybeExtraCurrency, storeExtraCurrency, HashUpdate, loadHashUpdate, storeHashUpdate, MasterchainStateExtra, loadMasterchainStateExtra, Message, loadMessage, storeMessage, MessageRelaxed, loadMessageRelaxed, storeMessageRelaxed, SendMode, ReserveMode, ShardAccount, loadShardAccount, storeShardAccount, ShardAccountRef, ShardAccountRefValue, loadShardAccounts, storeShardAccounts, ShardIdent, loadShardIdent, storeShardIdent, ShardStateUnsplit, loadShardStateUnsplit, SimpleLibrary, loadSimpleLibrary, storeSimpleLibrary, LibRef, loadLibRef, storeLibRef, SplitMergeInfo, loadSplitMergeInfo, storeSplitMergeInfo, StateInit, loadStateInit, storeStateInit, StorageInfo, loadStorageInfo, storeStorageInfo, StorageUsed, loadStorageUsed, storeStorageUsed, StorageUsedShort, loadStorageUsedShort, storeStorageUsedShort, TickTock, loadTickTock, storeTickTock, Transaction, loadTransaction, storeTransaction, TransactionActionPhase, loadTransactionActionPhase, storeTransactionActionPhase, TransactionBouncePhase, TransactionBounceNoFunds, TransactionBounceNegativeFunds, TransactionBounceOk, loadTransactionBouncePhase, storeTransactionBouncePhase, TransactionComputeVm, TransactionComputePhase, TransactionComputeSkipped, loadTransactionComputePhase, storeTransactionComputePhase, TransactionCreditPhase, loadTransactionCreditPhase, storeTransactionCreditPhase, TransactionDescription, TransactionDescriptionGeneric, TransactionDescriptionMergeInstall, TransactionDescriptionMergePrepare, TransactionDescriptionSplitInstall, TransactionDescriptionSplitPrepare, TransactionDescriptionStorage, TransactionDescriptionTickTock, loadTransactionDescription, storeTransactionDescription, TransactionStoragePhase, loadTransactionStoragePhase, storeTransactionsStoragePhase } from '@ijstech/ton-core';
    export * as TonCrypto from '@ton/crypto';
    export * as TonConnector from "@tonconnect/sdk";
    export { HttpApi, HttpApiParameters } from "client/api/HttpApi";
    export { TonClient, TonClientParameters } from "client/TonClient";
    export { TonClient4, TonClient4Parameters } from "client/TonClient4";
    export { WalletContractV1R1 } from "wallets/WalletContractV1R1";
    export { WalletContractV1R2 } from "wallets/WalletContractV1R2";
    export { WalletContractV1R3 } from "wallets/WalletContractV1R3";
    export { WalletContractV2R1 } from "wallets/WalletContractV2R1";
    export { WalletContractV2R2 } from "wallets/WalletContractV2R2";
    export { WalletContractV3R1 } from "wallets/WalletContractV3R1";
    export { WalletContractV3R2 } from "wallets/WalletContractV3R2";
    export { WalletContractV4 } from "wallets/WalletContractV4";
    export { WalletContractV5Beta } from "wallets/WalletContractV5Beta";
    export { WalletContractV5R1 } from "wallets/WalletContractV5R1";
    export { JettonMaster } from "jetton/JettonMaster";
    export { JettonWallet } from "jetton/JettonWallet";
    export { MultisigOrder } from "multisig/MultisigOrder";
    export { MultisigOrderBuilder } from "multisig/MultisigOrderBuilder";
    export { MultisigWallet } from "multisig/MultisigWallet";
    export { ElectorContract } from "elector/ElectorContract";
    export { GasLimitsPrices, StoragePrices, MsgPrices, WorkchainDescriptor, configParse5, configParse8, configParse12, configParse13, configParse15, configParse16, configParse17, configParse18, configParse28, configParse29, configParse40, configParseBridge, configParseGasLimitsPrices, configParseMasterAddress, configParseMasterAddressRequired, configParseMsgPrices, configParseValidatorSet, configParseWorkchainDescriptor, parseBridge, parseProposalSetup, parseValidatorSet, parseVotingSetup, parseFullConfig, loadConfigParamById, loadConfigParamsAsSlice } from "config/ConfigParser";
    export { computeExternalMessageFees, computeFwdFees, computeGasPrices, computeMessageForwardFees, computeStorageFees } from "utils/fees";
}

/// <amd-module name="@scom/ton-core" />
declare module "@scom/ton-core" {
      /**
     * Copyright (c) Whales Corp.
     * All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    export { Address, address, ExternalAddress, ADNLAddress, contractAddress, BitString, BitReader, BitBuilder, Builder, beginCell, Slice, CellType, Cell, Writable, Dictionary, DictionaryKey, DictionaryKeyTypes, DictionaryValue, exoticMerkleProof, convertToMerkleProof, exoticMerkleUpdate, exoticPruned, generateMerkleProof, generateMerkleProofDirect, generateMerkleUpdate, Tuple, TupleItem, TupleItemNull, TupleItemInt, TupleItemNaN, TupleItemCell, TupleItemSlice, TupleItemBuilder, parseTuple, serializeTuple, TupleReader, TupleBuilder, Contract, ContractProvider, ContractGetMethodResult, ContractState, Sender, SenderArguments, openContract, OpenedContract, ComputeError, ContractABI, ABIError, ABITypeRef, ABIField, ABIArgument, ABIGetter, ABIType, ABIReceiverMessage, ABIReceiver, toNano, fromNano, crc16, crc32c, base32Decode, base32Encode, getMethodId, Maybe, safeSign, safeSignVerify, paddedBufferToBits, internal, external, comment, Account, loadAccount, storeAccount, AccountState, loadAccountState, storeAccountState, AccountStatus, loadAccountStatus, storeAccountStatus, AccountStatusChange, loadAccountStatusChange, storeAccountStatusChange, AccountStorage, loadAccountStorage, storeAccountStorage, OutActionSendMsg, OutActionSetCode, OutActionReserve, OutActionChangeLibrary, OutAction, loadOutAction, storeOutAction, loadOutList, storeOutList, CommonMessageInfo, CommonMessageInfoInternal, CommonMessageInfoExternalIn, CommonMessageInfoExternalOut, loadCommonMessageInfo, storeCommonMessageInfo, CommonMessageInfoRelaxed, CommonMessageInfoRelaxedExternalOut, CommonMessageInfoRelaxedInternal, loadCommonMessageInfoRelaxed, storeCommonMessageInfoRelaxed, ComputeSkipReason, loadComputeSkipReason, storeComputeSkipReason, CurrencyCollection, loadCurrencyCollection, storeCurrencyCollection, DepthBalanceInfo, loadDepthBalanceInfo, storeDepthBalanceInfo, ExtraCurrency, packExtraCurrencyCell, packExtraCurrencyDict, loadExtraCurrency, loadMaybeExtraCurrency, storeExtraCurrency, HashUpdate, loadHashUpdate, storeHashUpdate, MasterchainStateExtra, loadMasterchainStateExtra, Message, loadMessage, storeMessage, MessageRelaxed, loadMessageRelaxed, storeMessageRelaxed, SendMode, ReserveMode, ShardAccount, loadShardAccount, storeShardAccount, ShardAccountRef, ShardAccountRefValue, loadShardAccounts, storeShardAccounts, ShardIdent, loadShardIdent, storeShardIdent, ShardStateUnsplit, loadShardStateUnsplit, SimpleLibrary, loadSimpleLibrary, storeSimpleLibrary, LibRef, loadLibRef, storeLibRef, SplitMergeInfo, loadSplitMergeInfo, storeSplitMergeInfo, StateInit, loadStateInit, storeStateInit, StorageInfo, loadStorageInfo, storeStorageInfo, StorageUsed, loadStorageUsed, storeStorageUsed, StorageUsedShort, loadStorageUsedShort, storeStorageUsedShort, TickTock, loadTickTock, storeTickTock, Transaction, loadTransaction, storeTransaction, TransactionActionPhase, loadTransactionActionPhase, storeTransactionActionPhase, TransactionBouncePhase, TransactionBounceNoFunds, TransactionBounceNegativeFunds, TransactionBounceOk, loadTransactionBouncePhase, storeTransactionBouncePhase, TransactionComputeVm, TransactionComputePhase, TransactionComputeSkipped, loadTransactionComputePhase, storeTransactionComputePhase, TransactionCreditPhase, loadTransactionCreditPhase, storeTransactionCreditPhase, TransactionDescription, TransactionDescriptionGeneric, TransactionDescriptionMergeInstall, TransactionDescriptionMergePrepare, TransactionDescriptionSplitInstall, TransactionDescriptionSplitPrepare, TransactionDescriptionStorage, TransactionDescriptionTickTock, loadTransactionDescription, storeTransactionDescription, TransactionStoragePhase, loadTransactionStoragePhase, storeTransactionsStoragePhase } from '@ijstech/ton-core';
    export * as TonCrypto from '@ton/crypto';
    export * as TonConnector from "@tonconnect/sdk";
    export { HttpApi, HttpApiParameters } from "client/api/HttpApi";
    export { TonClient, TonClientParameters } from "client/TonClient";
    export { TonClient4, TonClient4Parameters } from "client/TonClient4";
    export { WalletContractV1R1 } from "wallets/WalletContractV1R1";
    export { WalletContractV1R2 } from "wallets/WalletContractV1R2";
    export { WalletContractV1R3 } from "wallets/WalletContractV1R3";
    export { WalletContractV2R1 } from "wallets/WalletContractV2R1";
    export { WalletContractV2R2 } from "wallets/WalletContractV2R2";
    export { WalletContractV3R1 } from "wallets/WalletContractV3R1";
    export { WalletContractV3R2 } from "wallets/WalletContractV3R2";
    export { WalletContractV4 } from "wallets/WalletContractV4";
    export { WalletContractV5Beta } from "wallets/WalletContractV5Beta";
    export { WalletContractV5R1 } from "wallets/WalletContractV5R1";
    export { JettonMaster } from "jetton/JettonMaster";
    export { JettonWallet } from "jetton/JettonWallet";
    export { MultisigOrder } from "multisig/MultisigOrder";
    export { MultisigOrderBuilder } from "multisig/MultisigOrderBuilder";
    export { MultisigWallet } from "multisig/MultisigWallet";
    export { ElectorContract } from "elector/ElectorContract";
    export { GasLimitsPrices, StoragePrices, MsgPrices, WorkchainDescriptor, configParse5, configParse8, configParse12, configParse13, configParse15, configParse16, configParse17, configParse18, configParse28, configParse29, configParse40, configParseBridge, configParseGasLimitsPrices, configParseMasterAddress, configParseMasterAddressRequired, configParseMsgPrices, configParseValidatorSet, configParseWorkchainDescriptor, parseBridge, parseProposalSetup, parseValidatorSet, parseVotingSetup, parseFullConfig, loadConfigParamById, loadConfigParamsAsSlice } from "config/ConfigParser";
    export { computeExternalMessageFees, computeFwdFees, computeGasPrices, computeMessageForwardFees, computeStorageFees } from "utils/fees";
}
