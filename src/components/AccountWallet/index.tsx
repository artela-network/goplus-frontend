import { ChainId } from 'artswap'
import React from 'react'
import styled from 'styled-components'

import { useActiveWeb3React } from '../../hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import Web3Status from '../Web3StatusX'


const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`


const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.ARTELATESTNET]: 'Artela Testnet',
  [ChainId.ARTELALOCAL]: 'Artela Local',
  [ChainId.ARTELADEVNET]: 'Artela Devnet',
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  //const [isDark] = useDarkModeManager()

  return (
    <div>
      <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
        {account && userEthBalance ? (
          <div style={{fontSize:'18px',padding:'5px'}}>
            {userEthBalance?.toSignificant(4)} ART
          </div>
         ) : null}
        <Web3Status />
      </AccountElement>
    </div>
  )
}
