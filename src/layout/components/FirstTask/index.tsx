import React, { useEffect, useState } from 'react'
import { getEtherscanLink } from '../../../utils'
import { ExternalLink } from '../../../theme'
import { ChainId } from 'artswap'
import { useActiveWeb3React } from '../../../hooks'

import { TaskInfo } from '../../../utils/campaignClient'
import TaskBox from '../Common/TaskBox'
import RedirectDuplicateTokenIds from '../../../pages/AddLiquidity/redirectsForTask1'

import { updateTask, getTaskListByAccount } from '../../../api/activity'
import { MinimalPositionCard } from '../../../components/PositionCard'
import { AutoColumn } from '../../../components/Column'
import { useCurrency } from '../../../hooks/Tokens'
import { useDerivedMintInfo } from '../../../state/mint/hooks'
import SuccessCover from '../Common/SuccessCover'

interface Props {
  taskInfo: TaskInfo
}
const defaultTaskInfo: TaskInfo = {
  id: 0,
  taskName: '',
  taskStatus: 0,
  memo: '',
  title: '',
  txs: ''
}
const FirstTask = ({ taskInfo = defaultTaskInfo }: Props) => {
  const { account } = useActiveWeb3React()
  const [taskStatus, setTaskStatus] = useState(0)
  const [txHash, setTxHash] = useState(taskInfo.txs)

  const currencyIdA = 'ETH'
  const currencyIdB = '0x8997ec639d49D2F08EC0e6b858f36317680A6eE7'

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  const { pair } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  useEffect(() => {
    setTxHash(taskInfo.txs)
  }, [taskInfo])

  const formatAddress = (address: string | undefined | null): string => {
    if (!address) {
      return ''
    }
    if (address.length < 20) {
      return ''
    }
    // 提取前11位
    const first11 = address.substr(0, 11)
    // 提取后9位
    const last9 = address.substr(address.length - 9)
    // 返回格式化后的字符串
    return `${first11}...${last9}`
  }
  const updateTaskStatus = async (txs: string) => {
    if (account && taskInfo) {
      const res = await updateTask(account, taskInfo.id, '1', txs)
      if (res.success) {
        const taskInfoRes = await getTaskListByAccount(account, taskInfo.id)
        if (taskInfoRes.success) {
          setTaskStatus(taskInfoRes.data.taskInfos[0].taskStatus)
          setTxHash(taskInfoRes.data.taskInfos[0].txs)
        }
      }
    }
  }
  useEffect(() => {
    if (taskInfo) {
      setTaskStatus(taskInfo.taskStatus)
      setTxHash(taskInfo.txs)
    }
  }, [taskInfo])
  return (
    <>
      <div className="head_title">
        Task 1: &nbsp;Add liquidity for ART/RUG pair
      </div>
      <TaskBox taskStatus={taskStatus}>
        <div className="task_guide">
          <div>Step1: Add liquidity</div>
          <ul>
            <li className="subDescribe">Select ART/RUG pair</li>
            <li className="subDescribe">Add 1 $ART liquidity to the pool</li>
          </ul>
          {txHash ? (
            <>
              <div className="subTitle">Transaction</div>
              <ul>
                <li className="subDescribe">
                  <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, txHash, 'transaction')}>
                    {formatAddress(txHash)}
                  </ExternalLink>
                </li>
              </ul>
            </>
          ) : (
            ''
          )}
          {taskStatus == 3 ? (
            <div>
              {/* <AutoColumn style={{ minWidth: '20rem', marginTop: '1rem', marginRight: '1rem' }}>
                <MinimalPositionCard showUnwrapped={false} pair={pair} />
              </AutoColumn> */}
              <hr />
              <div className='subTitle'>Your liquidity in the pool: 500</div>
              <ul>
                <li className='subDescribe'>$ART: 0.5</li>
                <li className='subDescribe'>$RUG: 500000</li>
              </ul>

            </div>
          ) : null}
        </div>
        <div className="task_swap" style={{ marginLeft: '15px', position: 'relative' }}>
          {taskStatus == 3 && <SuccessCover />}
          <RedirectDuplicateTokenIds
            currencyIdA={currencyIdA}
            currencyIdB={currencyIdB}
            updateTaskStatus={updateTaskStatus}
          />
          <div style={{ textAlign: 'center', width: '100%', fontSize: '16px' }}>©Power by <a href='https://www.ramenswap.xyz/'> Ramenswap</a></div>
        </div>
      </TaskBox>
    </>
  )
}
export default FirstTask
