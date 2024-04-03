import React, { useEffect, useState } from 'react'
import { useActiveWeb3React } from '../../../hooks'
import Swap from '../../../pages/SwapForTask2'
import TaskBox from "../Common/TaskBox";
import { Button } from 'antd';
import { updateTask, getTaskListByAccount } from '../../../api/activity'
import { TaskInfo } from '../../../utils/campaignClient'
import './style.css'
// import { buttonStyle, buttonDisabledStyle } from '../Common/Button'
import SuccessCover from '../Common/SuccessCover'

interface PropsType {
  getTaskList: () => void;
  taskInfo: TaskInfo;
  preTaskState: number;
}
const SecondTask = ({ taskInfo, getTaskList, preTaskState }: PropsType) => {
  const footerWords = <div>
    {
      `That's how typically a rug-pull attack unfolds: Malicious smart contracts owners instantly increase a huge amount of token supply for themselves, and then swap out your valuable assets.`
    }
  </div>
  const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '20px',
    color: '#ffffff',
    background: '#2172E5',
    border: 'none',
    borderRadius: '5px',
    transition: 'background 0.3s ease',
    height: '50px',
    width: '188px',
  };
  const buttonDisabledStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '20px', // 稍微减小字体大小，使按钮看起来更加“静态”
    color: '#dddddd', // 改为灰色，表示不可用
    background: '#8fa2bf', // 使用更暗或更灰的背景色来表示按钮不可点击
    border: 'none',
    borderRadius: '5px',
    transition: 'background 0.3s ease',
    height: '50px',
    width: '188px',
    cursor: 'not-allowed', // 显示一个不允许的光标，进一步指示按钮不可用
    opacity: '0.6', // 降低透明度，增加不可用的视觉效果
    pointerEvents: 'none', // 确保用户不能点击或以其他方式与按钮交互
  };
  const { account } = useActiveWeb3React()
  const [swapLoading, setSwapLoading] = useState(false)
  const [fromVal, setFromVal] = useState('0')
  const [toVal, setToVal] = useState('0')
  const [supplyWords, setSupplyWords] = useState('Total supply: 1 Billion')
  const [taskStatus, setTaskStatus] = useState<number>(5)
  const [loading, setLoading] = useState(false)
  const inreaseRUG = async () => {
    if (account && taskInfo) {
      setLoading(true)
      const res = await updateTask(account, taskInfo.id, '1')
      if (res.success) {
        fetchTaskInfo()
      }
      setLoading(false)
      setSupplyWords('Total supply: 1 Billion -> 99 Billion')
      setFromVal('99 Billion')
      setToVal('990')
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
  const fetchTaskInfo = async () => {
    if (account && taskInfo) {
      const taskInfoRes = await getTaskListByAccount(account, taskInfo.id);
      if (taskInfoRes.success) {
        const newTaskStatus = taskInfoRes.data.taskInfos[0].taskStatus;
        setTaskStatus(newTaskStatus);
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
      if (taskInfo.taskStatus == 1 || taskInfo.taskStatus == 3) {
        setSupplyWords('Total supply: 1 Billion -> 99 Billion')
        setFromVal('99,000,000,000 (99 Billion)')
        setToVal('990')
      } else {
        setSupplyWords('Total supply: 1 Billion')
        setFromVal('0')
        setToVal('0')
      }
    }
  }, [taskInfo])
  return (
    <>
      <div className="head_title">
        Task 2: &nbsp;Let’s say you own RUG token contract, now Rug Pull!
      </div>
      <TaskBox taskStatus={taskStatus} footer={footerWords}>
        <div className="task_guide">
          <div className='subTitle'>Step1: Click to increase 99 Billion RUG token supply for you! </div>
          <Button loading={loading} disabled={preTaskState == 0 || preTaskState == 4 || taskStatus == 1 || taskStatus == 3}
            style={(preTaskState == 2 || preTaskState == 3) && (taskStatus == 0 || taskStatus == 4) ? buttonStyle : buttonDisabledStyle}
            type="primary" onClick={inreaseRUG}> Increase </Button>
          <div className='subDescribe'>{supplyWords} </div>
          <div className='subTitle mt-20'>Step2: Use the newly added 99 Billion RUG token to swap for ART tokens in the pool.</div>
          <div className='subDescribe'>Click swap button to sell all Rug</div>
        </div>
        <div className="task_swap" style={{ position: 'relative' }}>
          {taskStatus == 3 && <SuccessCover />}
          <Swap taskStatus={taskStatus} updateTaskStatus={updateTaskStatus} fromVal={fromVal} toVal={toVal} swapLoading={swapLoading} disabled={taskStatus != 1} />
        </div>
      </TaskBox>
    </>
  )
}
export default SecondTask
