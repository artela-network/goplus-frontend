import React, { useEffect, useState } from 'react'
import { useActiveWeb3React } from '../../../hooks'
import Swap from '../../../pages/SwapForTask2'
import TaskBox from "../Common/TaskBox";
import { Button } from 'antd';
import { updateTask, getTaskListByAccount } from '../../../api/activity'
import { TaskInfo } from '../../../utils/campaignClient'
import './style.css'

interface PropsType {
  getTaskList?: () => void;
  taskInfo: TaskInfo;
}
const SecondTask = ({ taskInfo }: PropsType) => {
  const { account } = useActiveWeb3React()
  const [supplyWords, setSupplyWords] = useState('Total supply: 1B')
  const [taskStatus, setTaskStatus] = useState<number>(0)
  const inreaseRUG = async () => {
    if (account && taskInfo) {
      await updateTask(account, taskInfo.id, '1')
    }
    setSupplyWords('Total supply: 1B -> 3B')
  }
  const updateTaskStatus = async () => {
    if (account && taskInfo) {
      const res = await updateTask(account, taskInfo.id, '3')
      if (res.success) {
        const taskInfoRes = await getTaskListByAccount(account, taskInfo.id)
        if (taskInfoRes.success) {
          setTaskStatus(taskInfoRes.data.taskInfos[0].taskStatus)
        }
      }
    }
  }
  useEffect(() => {
    if (taskInfo) {
      setTaskStatus(taskInfo.taskStatus)
      if (taskInfo.taskStatus == 3) {
        setSupplyWords('Total supply: 1B -> 3B')
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
          <Button type="primary" onClick={inreaseRUG}> Increase</Button>
          <div className='subTitle'>{supplyWords} </div>
          <div className='subTitle mt-20'>Step2: Swap 3B $RUG</div>
          <div className='subTitle'>Click swap button to sell all $Rug 👉</div>
        </div>
        <div className="task_swap">
          <Swap taskStatus={taskStatus} updateTaskStatus={updateTaskStatus} />
        </div>
      </TaskBox>
    </>
  )
}
export default SecondTask
