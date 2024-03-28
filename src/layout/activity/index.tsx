import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './activity.css'
import Introduce from '../components/introduce/index'
import TaskList from '../components/TaskList/index'
import FirstTask from '../components/FirstTask/index'
import SecondTask from '../components/SecondTask/index'
import ThirdTask from '../components/ThirdTask/index'
import Explain from '../components/Explain/index'
import { useActiveWeb3React } from '../../hooks'
import { getTaskListByAccount, initTaskListByAccount } from '../../api/activity'

export default function Activity() {
  const { account } = useActiveWeb3React()
  const [taskStatus, setTaskStatus] = useState(0)
  const [taskInfos, setTaskInfos] = useState([])
  const getQueryParams = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const taskId = queryParams.get('taskid')
    if (taskId !== null) {
      return taskId.split('/')[0]
    } else {
      return ''
    }
  }
  const getTaskList = async (attempt = 0) => {
    if (account) {
      const res = await getTaskListByAccount(account)
      if (res.success) {
        setTaskStatus(res.data.status)
        if (res.data.taskInfos) {
          setTaskInfos(res.data.taskInfos)
        } else if (attempt < 2) {
          const initRes = await initTaskListByAccount(account, getQueryParams())
          if (initRes.success) {
            await getTaskList(attempt + 1)
          }
        }
      }
    } else {
      setTaskInfos([])
    }
  }

  useEffect(() => {
    getTaskList()

    const interval = setInterval(async () => {
      await getTaskList()
    }, 2000)

    return () => clearInterval(interval)
  }, [account])

  return (
    <div className="activity">
      <Introduce getTaskList={getTaskList} taskInfo={taskInfos[0]} />
      <TaskList />
      <FirstTask taskInfo={taskInfos[1]} />
      <SecondTask taskInfo={taskInfos[2]} />
      <ThirdTask taskInfo={taskInfos[3]} />
      <Explain />
    </div>
  )
}
