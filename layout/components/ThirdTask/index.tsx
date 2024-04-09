import React, { useState, useEffect } from "react";
import Video from "../Common/RugPullVideo"
import TaskBox from "../Common/TaskBox";
import { ChainId } from 'artswap'
import { Button } from "antd";
import Loading from "../Common/Loading"
import { TaskInfo } from '../../../utils/campaignClient'
import { updateTask, getTaskListByAccount } from '../../../api/index'
import { useAccount } from 'wagmi';
import { getEtherscanLink } from '../../../utils'
import { ExternalLink } from '../Common/ExternalLink'
import { failed, ongoing, finish, notStarted } from '../Common/StatusIcon';
import { buttonStyle, buttonDisabledStyle } from '../Common/Button'
import CustomModal from "../../components/Common/Model"
import galxe from '../../../assets/galxe.png'
import Image from 'next/image';

interface PropsType {
    getTaskList: () => void;
    taskInfo?: TaskInfo;
    preTaskState: number;
}
const ThirdTask = ({ getTaskList, taskInfo, preTaskState }: PropsType) => {
    const { address: account, isConnected } = useAccount();    
    const [txHash, setTxHash] = useState('')
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const footer = () => {
        return (
            <>
                In this scenario, the swap is safeguarded by the Anti-rug Aspect, a risk management module integrated into the blockchain runtime. The attempted rug-pull transaction has been assessed by the risk control logics within the Anti-rug Aspect. Consequently, the Aspect  intervened and reverted the transaction before it was finalized, preventing any actual loss of funds.
                For further details on the implementation of Aspect technology, please visit <a type="link" target='blank' href="https://docs.artela.network/develop/core-concepts/aspect">here</a>.
            </>
        )
    }
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
    const [taskStatus, setTaskStatus] = useState(5)
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
                    // handleOpenModal()
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
            <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} >
                <p style={{ fontSize: '18px' }}>
                    🎉&nbsp;The real rug-pull transaction has been reverted by Aspect!
                </p>
            </CustomModal>
            <div className='head_title'>
                Task 3: &nbsp;Now try again, but the Swap is protected by Anti-rug Aspect!
            </div>
            <TaskBox taskStatus={taskStatus} footer={footer()}>
                <div className="task_guide" style={{ minHeight: '457px' }}>
                    <div className='subTitle'>
                        Step1: Click 👇 button to send a real Rug-pull transaction
                    </div>
                    <Button disabled={preTaskState != 0 && preTaskState != 4 && taskStatus !== 0 && taskStatus !== 4}
                        style={(taskStatus == 0 || taskStatus == 4) && (preTaskState == 2 || preTaskState == 3) ? buttonStyle : buttonDisabledStyle}
                        loading={loading} type="primary" onClick={doRugPull}> Do Rug-pull</Button>
                    {taskStatus == 4 && <text style={{fontSize:'18px',color:'red'}}><br /> Please try again!</text>}
                    {taskStatus !== 0 && <div className='subTitle'>Rug-pull transaction:</div>}
                    {taskStatus == 3 ?
                        (txHash ? (
                            <>
                                <div className='subDescribe'>
                                    <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, txHash, 'transaction')}>
                                        {`${formatAddress(txHash)}`}
                                    </ExternalLink>
                                    <div style={{ marginTop: '10px' }}>
                                        Status: Reverted by Aspect.
                                    </div>
                                </div></>
                        ) : (
                            ''
                        )) : taskStatus == 1 || taskStatus == 2 ? <div className='subTitle mt-20'><Loading /></div> : ''
                    }
                    {
                        taskStatus == 3 && <>
                            🎉&nbsp;The real rug-pull transaction has been reverted by Aspect!
                        </>
                    }
                </div>
                <div className="task_swap" >
                    <Image alt="" width={600} src={galxe} style={{ borderRadius: '35px' }} />
                </div>
            </TaskBox>
        </>
    )
}
export default ThirdTask;