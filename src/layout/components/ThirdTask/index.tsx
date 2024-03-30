import React, { useState, useEffect } from "react";
import Video from "../Common/RugPullVideo"
import TaskBox from "../Common/TaskBox";
import { ChainId } from 'artswap'
import { Button, Spin } from "antd";
import { TaskInfo } from '../../../utils/campaignClient'
import { updateTask, getTaskListByAccount } from '../../../api/activity'
import { useActiveWeb3React } from '../../../hooks'
import { getEtherscanLink } from '../../../utils'
import { ExternalLink } from '../../../theme'
import { failed, ongoing, finish, notStarted } from '../Common/StatusIcon';
import { buttonStyle, buttonDisabledStyle } from '../Common/Button'

interface PropsType {
    getTaskList: () => void;
    taskInfo?: TaskInfo;
}
const ThirdTask = ({ getTaskList, taskInfo }: PropsType) => {
    const { account } = useActiveWeb3React()
    const [txHash, setTxHash] = useState('')
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        try {
            if (account && taskInfo) {
                const res = await updateTask(account, taskInfo.id, '1')
                if (res.success) {
                    fetchTaskInfo()
                }
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
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
            <div className='text-56px mt-20 text-center'>
                Task 3<br />
                Real experience:RamenSwap prevents rug pulls
            </div>
            <TaskBox taskStatus={taskStatus}>
                <div className="task_guide" style={{ minHeight: '457px' }}>
                    <div className='subTitle'>
                        Step1: Click 👇 button to send a real Rug-pull transaction
                    </div>
                    <Button disabled={taskStatus !== 0} style={taskStatus == 0 ? buttonStyle : buttonDisabledStyle} loading={loading} type="primary" onClick={doRugPull}> Do Rug-pull</Button>
                    {taskStatus == 3 ?
                        (txHash ? (
                            <>
                                <div className='subTitle mt-20'>Rug-pull transaction:</div>
                                <div className='subDescribe'>
                                    <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, txHash, 'transaction')}>
                                        {`${formatAddress(txHash)}`}
                                    </ExternalLink>

                                    {txHash ? finish() : notStarted()}
                                    <div style={{ marginTop: '10px' }}>
                                        status:  Anti-rug Aspect has prevented this rug transaction.
                                    </div>
                                </div></>
                        ) : (
                            ''
                        )) : taskStatus == 1 || taskStatus == 2 ? <div className='subTitle mt-20'><Spin /></div> : ''
                    }
                    {taskStatus == 3 &&
                        <div className='subTitle'>Aspect Programming offers an SDK and a WASM runtime environment for building native extensions on Artela blockchain.</div>
                    }
                </div>
                <div className="task_swap">
                    <Video />
                </div>
            </TaskBox>
        </>
    )
}
export default ThirdTask;