import React, { useState, useEffect } from "react";
import Video from "../Common/RugPullVideo"
import TaskBox from "../Common/TaskBox";
import { ChainId } from 'artswap'
import { Button } from "antd";
import { TaskInfo } from '../../../utils/campaignClient'
import { updateTask, getTaskListByAccount } from '../../../api/activity'
import { useActiveWeb3React } from '../../../hooks'
import { getEtherscanLink } from '../../../utils'
import { ExternalLink } from '../../../theme'

interface PropsType {
    getTaskList?: () => void;
    taskInfo?: TaskInfo;
}
const ThirdTask = ({ taskInfo }: PropsType) => {
    const { account } = useActiveWeb3React()
    const [txHash, setTxHash] = useState('')
    const formatAddress = (address: string | undefined | null): string => {
        if (!address) {
            return ''
        }
        if (address.length < 20) {
            return ''
        }
        // 提取前11位  
        const first11 = address.substr(0, 11);
        // 提取后9位  
        const last9 = address.substr(address.length - 9);
        // 返回格式化后的字符串  
        return `${first11}...${last9}`;
    }
    const doRugPull = () => {
        updateTaskStatus()
    }
    const [taskStatus, setTaskStatus] = useState(0)
    const updateTaskStatus = async () => {
        if (account && taskInfo) {
            const res = await updateTask(account, taskInfo.id, '1')
            if (res.success) {
                fetchTaskInfo()
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
            <div className='text-56px mt-20 text-center'>
                Task 3<br />
                Real experience:RamenSwap prevents rug pulls
            </div>
            <TaskBox taskStatus={taskStatus}>
                <div className="task_guide">
                    <div className='subTitle'>
                        Step1: Click 👇 button to send a real Rug-pull transaction
                    </div>
                    <Button type="primary" onClick={doRugPull}> Do Rug-pull</Button>
                    <div className='subTitle mt-20'>Rug-pull transaction:</div>
                    <div className='subTitle'>
                        {txHash ? (
                            <>
                            <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, txHash, 'transaction')}>
                                {formatAddress(txHash)}
                            </ExternalLink>View on Explore</>
                        ) : (
                            ''
                        )}  
                    </div>
                    <div className='subTitle'>
                        Status: Processing | Fail
                    </div>
                    <div className='subTitle mt-20'>
                        Anti-rug Aspect has prevented this rug transaction.
                    </div>
                </div>
                <div className="task_swap">
                    <Video />
                </div>

            </TaskBox>
        </>
    )
}
export default ThirdTask;