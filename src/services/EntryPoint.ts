import { getContract, PublicClient } from 'viem';
import { UserOperation } from '@biconomy/core-types';
// import type { UserOperationStruct } from "@alchemy/aa-core";
// import { UserOperation } from '../utils/types';

import logger from '../utils/logger';
import { entryPointABI } from '../utils/abi';
import { walletClient, alternateEOA, entryPointAddress } from '../utils/config';

export class EntryPoint {
    private contract;
    private publicClient: PublicClient;

    constructor(provider: PublicClient) {
        this.publicClient = provider;
        this.contract = getContract({
            address: entryPointAddress,
            abi: entryPointABI,
            client: provider,
        });
    }

    async handleOps(userOps: UserOperation): Promise<string> {
        const account = alternateEOA();
        try {
            const { request } = await this.publicClient.simulateContract({
                address: entryPointAddress,
                abi: entryPointABI,
                functionName: 'handleOps',
                args: [userOps],
                account,
            });

            const transactionHash = await walletClient.writeContract(request);
            return transactionHash;
        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async getBlockNumber(): Promise<bigint> {
        return await this.publicClient.getBlockNumber();
    }
}
