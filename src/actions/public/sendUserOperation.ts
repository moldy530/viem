import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Address, Hash, RpcUserOperation } from '../../index.js'
import type { Chain } from '../../types/chain.js'

export type SendUserOperationParameters = {
  userOperation: RpcUserOperation
  entrypoint: Address
}

/**
 * @description Sends a signed user operation to the network the specified entrypoint address
 * @link https://eips.ethereum.org/EIPS/eip-4337
 *
 * @param client - Client to use
 * @param parameters - {@link SendUserOperationParameters}
 * @returns The hash of the operation.
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { readContract } from 'viem/contract'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const result = await sendUserOperation(client, {userOperation: ..., entrypoint: "0x..."})
 * // 0x...
 */
export async function sendUserOperation<TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { userOperation, entrypoint }: SendUserOperationParameters,
): Promise<Hash> {
  return client.request({
    method: 'eth_sendUserOperation',
    params: [userOperation, entrypoint],
  })
}
