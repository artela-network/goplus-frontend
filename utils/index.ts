import { ChainId } from 'artswap'

export function getEtherscanLink(chainId: ChainId, data: string, type: 'transaction' | 'token' | 'address'): string {
  //const prefix = `https://${DEVSCAN_PREFIXES[chainId] || DEVSCAN_PREFIXES[1]}etherscan.io`
  const prefix = 'https://betanet-scan.artela.network'
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}
