import React, { useEffect, useState } from 'react'
import './activity.css'
import Introduce from '../components/introduce/index'
import TaskList from '../components/TaskList/index'
import FirstTask from '../components/FirstTask/index'
import SecondTask from '../components/SecondTask/index'
import ThirdTask from '../components/ThirdTask/index'
import Explain from '../components/Explain/index'
import { useActiveWeb3React } from '../../hooks'
import { getTaskListByAccount, initTaskListByAccount } from '../../api/activity'
import { CampaignClient, TaskInfo } from '../../utils/campaignClient'

interface Props {
  children: React.ReactNode
}
export default function Activity({ children }: Props) {
  const defaultTaskInfo: TaskInfo = {
    id: 0,
    taskName: '',
    taskStatus: 0,
    memo: '',
    title: '',
    txHash: ''
  }
  const { account } = useActiveWeb3React()
    const [taskStatus, setTaskStatus] = useState(0)
    const [taskInfos, setTaskInfos] = useState([])
    const getTaskList = async (attempt = 0) => {
        if (account) {
            const res = await getTaskListByAccount(account);
            if (res.success) {
                setTaskStatus(res.data.status);
                if (res.data.taskInfos) {
                    setTaskInfos(res.data.taskInfos);
                } else if (attempt < 2) {
                    const initRes = await initTaskListByAccount(account);
                    if (initRes.success) {
                        await getTaskList(attempt + 1);
                    }
                }
            }
        } else {
            setTaskInfos([]);
        }
    };

    useEffect(() => {
        getTaskList()
    }, [account])

    return (
        <div className='activity'>
            <Introduce getTaskList={getTaskList} taskInfo={taskInfos[0]} />
            <TaskList />
            <FirstTask children={children} taskInfo={taskInfos ? defaultTaskInfo : taskInfos[1]} />
            <SecondTask />
            <ThirdTask>
                {children}
            </ThirdTask>
            <Explain />
        </div>
    );
}
