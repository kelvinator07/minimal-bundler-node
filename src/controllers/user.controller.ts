import { Request, Response } from 'express';
import { getBlockNumber, executeUserOperation } from '../services/Bundler';
import { STATUS, STATUSCODE, successResponse, errorResponse } from '../utils/response';

export default class UserController {
    async getBlockNumber(req: Request, res: Response) {
        try {
            const blockNumber = await getBlockNumber();
            res.status(STATUSCODE.OK).json(successResponse(STATUS.SUCCESS, blockNumber.toString()));
        } catch (err) {
            res.status(STATUSCODE.SERVER).json(
                errorResponse(STATUS.ERROR, 'Some error occurred while getting latest block number.')
            );
        }
    }

    async sendUserOperation(req: Request, res: Response) {
        try {
            const { jsonrpc, method, params, id } = req.body;
            // Validate JSON-RPC request
            if (jsonrpc !== '2.0' || method !== 'eth_sendUserOperation' || !params.length) {
                res.status(STATUSCODE.BAD_REQUEST).json(
                    errorResponse(STATUS.ERROR, {
                        jsonrpc: '2.0',
                        error: { code: -32600, message: 'Invalid Request' },
                        id,
                    })
                );
                return;
            }
            const transactionHash = await executeUserOperation(params);
            const response = { jsonrpc: '2.0', id: Date.now(), result: transactionHash };
            res.status(STATUSCODE.OK).json(successResponse(STATUS.SUCCESS, response));
        } catch (err) {
            res.status(STATUSCODE.SERVER).json(
                errorResponse(STATUS.ERROR, 'Some error occurred while sending user operation.')
            );
        }
    }
}
