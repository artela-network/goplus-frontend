import React, { useEffect, useState } from 'react'
import { useActiveWeb3React } from '../../../hooks'
import Swap from '../../../pages/SwapForTask2'
import TaskBox from "../Common/TaskBox";
import { Button } from 'antd';
import { updateTask, getTaskListByAccount } from '../../../api/activity'
import { TaskInfo } from '../../../utils/campaignClient'
import './style.css'
import { buttonStyle, buttonDisabledStyle } from '../Common/Button'

interface PropsType {
  getTaskList?: () => void;
  taskInfo: TaskInfo;
}
const SecondTask = ({ taskInfo }: PropsType) => {
  const { account } = useActiveWeb3React()
  const [swapLoading, setSwapLoading] = useState(false)
  const [fromVal, setFromVal] = useState('0')
  const [toVal, setToVal] = useState('0')
  const [supplyWords, setSupplyWords] = useState('Total supply: 1B')
  const [taskStatus, setTaskStatus] = useState<number>(0)
  const [loading,setLoading] = useState(false)
  const inreaseRUG = async () => {
    if (account && taskInfo) {
      setLoading(true)
      await updateTask(account, taskInfo.id, '1')
      setLoading(false)
      setSupplyWords('Total supply: 1B -> 3B')
      setFromVal('3B')
      setToVal('1B')
    }

  }
  const updateTaskStatus = async () => {
    if (account && taskInfo) {
      const res = await updateTask(account, taskInfo.id, '3')
      if (res.success) {
        setSwapLoading(true)
        const taskInfoRes = await getTaskListByAccount(account, taskInfo.id)
        if (taskInfoRes.success) {
          setTaskStatus(taskInfoRes.data.taskInfos[0].taskStatus)
        }
        setSwapLoading(false)
      }
    }
  }
  useEffect(() => {
    if (taskInfo) {
      setTaskStatus(taskInfo.taskStatus)
      if (taskInfo.taskStatus == 1 || taskInfo.taskStatus == 3) {
        setSupplyWords('Total supply: 1B -> 3B')
        setFromVal('3B')
        setToVal('1B')
      }
    }
  }, [taskInfo])
  return (
    <>
      <div className="text-56px mt-20 text-center">
        Task 2<br />
        Simulated experience rug pull
      </div>
      <TaskBox taskStatus={taskStatus}>
        <div className="task_guide">
          <div className='subTitle'>Step1: Click 👇 button to Increase 2B $RUG</div>
          <Button loading={loading} disabled={taskStatus == 1 || taskStatus == 3} style={taskStatus == 1 || taskStatus == 3 ? buttonDisabledStyle : buttonStyle} type="primary" onClick={inreaseRUG}> Increase </Button>
          <div className='subDescribe'>{supplyWords} </div>
          <div className='subTitle mt-20'>Step2: Swap 3B $RUG</div>
          <div className='subDescribe'>Click swap button to sell all $Rug 👉</div>
        </div>
        <div className="task_swap">
          <Swap taskStatus={taskStatus} updateTaskStatus={updateTaskStatus} fromVal={fromVal} toVal={toVal} swapLoading={swapLoading} />
        </div>
      </TaskBox>
    </>
  )
}
export default SecondTask
