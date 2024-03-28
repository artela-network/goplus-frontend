import React, { useEffect, useState } from 'react'
import { getEtherscanLink } from '../../../utils'
import { ExternalLink } from '../../../theme'
import { ChainId } from 'artswap'
import { useActiveWeb3React } from '../../../hooks'

import { TaskInfo } from '../../../utils/campaignClient'
import TaskBox from '../Common/TaskBox'
import RedirectDuplicateTokenIds from '../../../pages/AddLiquidity/redirectsForTask1'

import { updateTask, getTaskListByAccount } from '../../../api/activity'

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
    }
  }, [taskInfo])
  return (
    <>
      <div className="text-56px mt-20 text-center">
        Task 1<br />
        Add liquidity for ART/RUG pair
      </div>
      <TaskBox taskStatus={taskStatus}>
        <div className="task_guide">
          <div>Step1: Add liquidity</div>
          <div>
            <li className="subTitle">1. Select ART/RUG pair</li>
            <li className="subTitle">2. Add 1 $ART liquidity to the pool</li>
          </div>
          <div className="subTitle">Transaction</div>
          <div className="subTitle">
            {txHash ? (
              <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, txHash, 'transaction')}>
                {formatAddress(txHash)}
              </ExternalLink>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="task_swap">
          <RedirectDuplicateTokenIds
            currencyIdA={'ETH'}
            currencyIdB={'0x058dDd9339F3cecDb7662e2130Bd1cB1f03672D2'}
            updateTaskStatus={updateTaskStatus}
          />
        </div>
      </TaskBox>
    </>
  )
}
export default FirstTask
