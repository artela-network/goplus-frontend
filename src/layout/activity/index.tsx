import React, { useRef, useState, useEffect } from 'react';
import './activity.css'
import Introduce from '../components/introduce/index';
import TaskList from '../components/TaskList/index';
import FirstTask from '../components/FirstTask/index';
import SecondTask from '../components/SecondTask/index';
import ThirdTask from '../components/ThirdTask/index';
import Explain from '../components/Explain/index';
import constructGetUrl from '../../utils/constructGetUrl'
import { useActiveWeb3React } from '../../hooks'

interface Props {
    children: React.ReactNode;
}
export default function Activity({ children }: Props) {

    const { account } = useActiveWeb3React()
    const [taskStatus, setTaskStatus] = useState(0)
    const [taskInfos, setTaskInfos] = useState([])
    const getTaskListByAccount = () => {
        if (account) {
            fetch(constructGetUrl(`https://campaign.artela.network/api/goplus/tasks`, { accountAddress: account }), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            })
                .then(r => r.json())
                .then((data: any) => {
                    if (data.success) {
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
        <div className='activity'>
            <Introduce getTaskList={getTaskListByAccount} />
            <TaskList />
            <FirstTask />
            <SecondTask />
            <ThirdTask>
                {children}
            </ThirdTask>
            <Explain />
        </div>
    );
}
