import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { getEtherscanLink } from '../../../utils'
import { ExternalLink } from '../../../theme'
import { ChainId } from 'artswap'
import { TaskInfo } from '../../../utils/campaignClient'

interface Props {
  children: React.ReactNode
  taskInfo: TaskInfo
}

const FirstTask = ({ children, taskInfo }: Props) => {
  const firstTaskRef = useRef<HTMLDivElement>(null)
  const history = useHistory()
  const taskStatus = ['❌', '⏳', '✅']

  const handleScroll = () => {
    if (firstTaskRef.current) {
      const rect = firstTaskRef.current.getBoundingClientRect()
      const scrolled = window.scrollY
      if (scrolled >= rect.top - 105) {
        // when scrolled to certain position, redirect to add liquidity page
        history.push('/add/ETH/0x058dDd9339F3cecDb7662e2130Bd1cB1f03672D2')
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="text-56px mt-20 text-center">
        Task 1<br />
        Act as Alice and add liquidity
      </div>
      <div className="task_item my_card mt-20" ref={firstTaskRef}>
        <div className="describeContainer text-24px">
          <div>Step1: Add liquidity</div>
          <div>
            <li className="subTitle">1. Select ART/RUG pair</li>
            <li className="subTitle">2. Add 1 $ART liquidity to the pool</li>
          </div>
          <div className="subTitle">Transaction</div>
          <div className="subTitle">
            {taskInfo.txHash ? (
              <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, taskInfo.txHash, 'transaction')}>
                {taskInfo.txHash}
              </ExternalLink>
            ) : (
              ''
            )}
            {taskStatus[taskInfo.taskStatus]}
          </div>
        </div>
        <div className="swapContainer">{children}</div>
      </div>
    </>
  )
}
export default FirstTask
