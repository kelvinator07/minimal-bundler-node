import { createPublicClient, createWalletClient, http, Address, PrivateKeyAccount } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet, sepolia } from 'viem/chains';

export const entryPointAddress = process.env.ENTRY_POINT_CONTRACT_ADDRESS as Address;

export const account1 = process.env.PRIVATE_KEY1 as Address;
export const account2 = process.env.PRIVATE_KEY2 as Address;

const network = process.env.NETWORK === 'testnet' ? sepolia : mainnet

export const walletClient = createWalletClient({
    chain: network,
    transport: http(),
});

export const publicClient = createPublicClient({
    chain: network,
    transport: http(),
});

export const alternateEOA = (): PrivateKeyAccount => {
    const signer1 = privateKeyToAccount(account1);
    const signer2 = privateKeyToAccount(account2);

    const randomIndex = Math.random() < 0.5 ? 0 : 1;
    const signer = randomIndex === 0 ? signer1 : signer2;
    return signer;
};
