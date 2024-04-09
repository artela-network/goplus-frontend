import React, { useCallback, useEffect, useState } from 'react'
import { getEtherscanLink } from '../../../utils'
import { ExternalLink } from '../Common/ExternalLink'
import { ChainId } from 'artswap'
import { TaskInfo } from '../../../utils/campaignClient'
import TaskBox from '../Common/TaskBox'
import RedirectDuplicateTokenIds from './addLiquidity'

import { getTaskListByAccount, updateTask } from '../../../api/index'
import SuccessCover from '../Common/SuccessCover'
import Loading from '../Common/Loading'
import { failed, finish, ongoing } from '../Common/StatusIcon'
import { useAccount, useSendTransaction, useWriteContract } from 'wagmi'

import { abi } from '../../../api/uniswap/IUniswapV2Router02.json';
import { RouterV02 } from '../../../api/uniswap/UniswapConfig.json';
import { BigNumber } from '@ethersproject/bignumber'
import AddLiquidity from './addLiquidity'


interface Props {
  taskInfo: TaskInfo;
  getTaskList: () => void;
  preTaskState: number;
}
const FirstTask = ({ taskInfo, getTaskList }: Props) => {
  const { address: account, isConnected } = useAccount();
  const [taskStatus, setTaskStatus] = useState(0)
  const [txHash, setTxHash] = useState(taskInfo.txs)

  const { data: hash , isPending,  writeContractAsync } = useWriteContract()

  const tokenAddress = '0xb8D2C890F1c3412dbFa992D03a4a36BbAF6B58D7'

  useEffect(() => {
    setTxHash(taskInfo.txs)
  }, [taskInfo])

  const addLiquidity = useCallback(() => {
    console.log(account)
    if (!account) {
      console.log('account not connected')
      return
    }

    console.log('addLiquidity')
    writeContractAsync({
      address: RouterV02 as `0x${string}`,
      abi,
      functionName: 'addLiquidityETH',
      args: [
        tokenAddress,
        BigNumber.from('998009961155390383063040'),
        BigNumber.from('993019911349613468057600'),
        BigNumber.from('995000000000000000'),
        account,
        BigNumber.from(Math.floor(Date.now() / 1000) + 600),
      ],
      value: BigNumber.from('1000000000000000000').toBigInt(),
      gas: BigNumber.from('4000000').toBigInt(),
    }).then(console.log).catch(console.error)
  }, [account, writeContractAsync])

  useEffect(() => {
    console.log('hash', hash)
    console.log('isPending', isPending)
    if (isPending && hash) {
      // only trigger this when the transaction is pending and hash changed
      console.log(`update task 1 status with hash: ${hash}`)
      updateTaskStatus(hash, '').catch(console.error)
    }
  }, [isPending, hash])

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
  const updateTaskStatus = async (txs: string, memo: string) => {
    if (account && taskInfo) {
      const res = await updateTask(account, taskInfo.id, '1', txs, memo)
      if (res.success) {
        if (res.success) {
          fetchTaskInfo()
        }
      }
    }
  }
  const fetchTaskInfo = async () => {
    if (account && taskInfo) {
      const taskInfoRes = await getTaskListByAccount(account, taskInfo.id);
      if (taskInfoRes.success) {
        const newTaskStatus = taskInfoRes.data.taskInfos[0].taskStatus;
        setTaskStatus(newTaskStatus);
        setTxHash(taskInfoRes.data.taskInfos[0].txs);
        if (newTaskStatus === 1 || newTaskStatus === 2) {
          setTimeout(fetchTaskInfo, 1000); // 如果状态是1或2，1秒后再次查询
        } else if (newTaskStatus === 3) {
          getTaskList()
        }
      }
    }

  };
  useEffect(() => {
    if (taskInfo) {
      setTaskStatus(taskInfo.taskStatus)
      setTxHash(taskInfo.txs)
    }
  }, [taskInfo])
  return (
    <>
      <div className="head_title">
        Task 1: &nbsp;Provide Liquidity for a Meme token called RUG
      </div>
      <TaskBox taskStatus={taskStatus}>
        <div className="task_guide">
          <div>Add Liquidity</div>
          <ul>
            <li className="subDescribe">Select ART/RUG pair</li>
            <li className="subDescribe">Add ART/RUG liquidity to the pool</li>
          </ul>
          {txHash ? (
            <>
              <div className="subTitle">Transaction</div>
              <ul>
                <li className="subDescribe">
                  <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, txHash, 'transaction')}>
                    {formatAddress(txHash)}
                  </ExternalLink>
                  {taskStatus == 4 ? failed() : taskStatus == 3 ? finish() : taskStatus == 2 ? ongoing() : ''}
                </li>
              </ul>
            </>
          ) : (
            null
          )}
          {taskStatus == 1 || taskStatus == 2 ? <Loading /> :
            taskStatus == 3 ? (
              <div>
                <hr />
                <div className='subTitle'>Your liquidity in the pool: {taskInfo.memo.split(',')[0]}ART</div>
                <ul>
                  <li className='subDescribe'>ART: {taskInfo.memo.split(',')[0]}</li>
                  <li className='subDescribe'>RUG: {taskInfo.memo.split(',')[1]}</li>
                </ul>
              </div>
            ) : ''
          }
        </div>
        <div className="task_swap">
          <div style={{ position: 'relative' }}>
            {taskStatus == 3 && <SuccessCover />}
            <AddLiquidity taskStatus={taskStatus} addLiquidity={addLiquidity} fromVal={'0'} toVal={'0'} swapLoading={isPending} disabled={taskStatus === 3}/>
          </div>
          <div style={{ textAlign: 'center', width: '100%', fontSize: '16px', marginTop: '10px' }}>©Power by <a style={{color:'#1890ff'}} href='https://www.ramenswap.xyz/' target='blank'> Ramenswap</a></div>
        </div>
      </TaskBox>
    </>
  )
}
export default FirstTask
