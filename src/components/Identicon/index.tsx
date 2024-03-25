import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import Jazzicon from 'jazzicon'

const StyledIdenticonContainer = styled.div`
  height: 2rem; /* 从1rem调整为2rem */
  width: 2rem; /* 从1rem调整为2rem */
  border-radius: 2.25rem; /* 可根据实际效果调整 */
  background-color: ${({ theme }) => theme.bg4};
`

export default function Identicon() {
  const ref = useRef<HTMLDivElement>(null)

  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      // Jazzicon尺寸从16调整为32
      ref.current.appendChild(Jazzicon(32, parseInt(account.slice(2, 10), 16)))
    }
  }, [account])

  return <StyledIdenticonContainer ref={ref as any} />
}
