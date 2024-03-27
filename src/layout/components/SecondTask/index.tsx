import React, { useState } from 'react'
import { useActiveWeb3React } from '../../../hooks'
import Swap from '../../../pages/SwapForTask2'
import TaskBox from "../Common/TaskBox";
import { Button } from 'antd';
import { updateTask, getTaskListByAccount } from '../../../api/activity'
import { TaskInfoType } from '../introduce'
import { set } from 'lodash';
enum TaskStatus {
  Init = 0,
  Ongoing = 1,
  Finish = 2,
}
interface PropsType {
  getTaskList?: () => void;
  taskInfo?: TaskInfoType;
}
const SecondTask = ({ taskInfo }: PropsType) => {
  const { account } = useActiveWeb3React()
  const [supplyWords, setSupplyWords] = useState('Total supply: 1B')
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(0)
  const inreaseRUG = () => {
    setSupplyWords('Total supply: 1B -> 3B')
  }
  const updateTaskStatus = async () => {
    if (account && taskInfo) {
      const res = await updateTask(account, taskInfo.id, '2')
      if (res.success) {
        const taskInfoRes = await getTaskListByAccount(account, taskInfo.id)
        if(taskInfoRes.success){
          setTaskStatus(taskInfoRes.data.taskInfos[0].taskStatus)
        }
      }
    }
  }
  return (
    <>
      <div className="text-56px mt-20 text-center">
        Task 2<br />
        Simulated experience rug pull
      </div>
      <TaskBox taskStatus={taskStatus}>
        <div className="task_guide">
          <div className='subTitle'>Step1: Increase 2B $RUG</div>
          <Button type="primary" onClick={inreaseRUG}> Increase</Button>
          <div className='subTitle'>{supplyWords} </div>
          <div className='subTitle mt-20'>Step2: Swap 3B $RUG</div>
          <div className='subTitle'>Click swap button to sell all $Rug</div>
        </div>
        <div className="task_swap">
          <Swap taskStatus={taskStatus} updateTaskStatus={updateTaskStatus}/>
        </div>

      </TaskBox>
    </>
  )
}
export default SecondTask
