import { UserOperation } from '../utils/types';
import { EntryPoint } from './EntryPoint';
import { publicClient } from '../utils/config';

import dotenv from 'dotenv';
dotenv.config();

const entryPoint = new EntryPoint(publicClient);

export async function executeUserOperation(userOp: UserOperation): Promise<string> {
export async function executeUserOperation(userOp: UserOperation[]): Promise<string> {
    const transactionHash = await entryPoint.handleOps(userOp);
    return transactionHash;
}

export const getBlockNumber = async () => {
    return await entryPoint.getBlockNumber();
};
