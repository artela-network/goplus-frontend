import React, { useEffect, useState } from 'react'
import './activity.css'
import Introduce from '../components/introduce/index'
import TaskList from '../components/TaskList/index'
import FirstTask from '../components/FirstTask/index'
import SecondTask from '../components/SecondTask/index'
import ThirdTask from '../components/ThirdTask/index'
import Explain from '../components/Explain/index'
import { useActiveWeb3React } from '../../hooks'
import { CampaignClient, TaskInfo } from '../../utils/campaignClient'

interface Props {
  children: React.ReactNode
}

export default function Activity({ children }: Props) {
  const { account } = useActiveWeb3React()
  const [taskStatus, setTaskStatus] = useState(0)
  const [taskInfos, setTaskInfos] = useState<TaskInfo[]>([])
  const defaultTaskInfo: TaskInfo = {
    id: 0,
    taskName: '',
    taskStatus: 0,
    memo: '',
    title: '',
    txHash: ''
  }

  const getTaskListByAccount = () => {
    if (account) {
      CampaignClient.getTasksByAccount(account).then(data => {
        console.log(data)
        if (data.success && data.data) {
          setTaskStatus(data.data.status)
          if (data.data.taskInfos) {
            setTaskInfos(data.data.taskInfos)
          } else {
            setTaskInfos([])
          }
        }
      })
    } else {
      setTaskInfos([])
    }
  }

  useEffect(() => {
    getTaskListByAccount()
  }, [account])

  return (
    <div className="activity">
      <Introduce getTaskList={getTaskListByAccount} />
      <TaskList />
      <FirstTask children={children} taskInfo={taskInfos ? defaultTaskInfo : taskInfos[1]} />
      <SecondTask />
      <ThirdTask>{children}</ThirdTask>
      <Explain />
    </div>
  )
}
