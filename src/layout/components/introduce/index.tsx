import React, { useState, useEffect, ReactNode } from 'react';
import './introduce.css'
import { useActiveWeb3React } from '../../../hooks'
import { updateTask, getTaskListByAccount } from '../../../api/activity'
import AccountWallet from '../../../components/AccountWallet';
import { ChainId } from 'artswap'
import { getEtherscanLink } from '../../../utils'
import { ExternalLink } from '../../../theme'
import { TaskInfo } from '../../../utils/campaignClient';
import { Button } from 'antd';
import { failed, ongoing, finish } from '../Common/StatusIcon';
import { buttonStyle, buttonDisabledStyle } from '../Common/Button'
import { Spin } from 'antd';
interface IntroduceProps {
    getTaskList: () => void;
    taskInfo?: TaskInfo;
    captcha: ReactNode;
}
export default function Introduce({ getTaskList, taskInfo, captcha }: IntroduceProps) {
    const { account } = useActiveWeb3React()
    const [taskStatus, setTaskStatus] = useState(5)
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
    const getFaucet = async () => {
        setLoading(true)
        try {
            if (account && taskInfo) {
                const res = await updateTask(account, taskInfo.id, '1');
                if (res.success) {
                    const taskInfoRes = await getTaskListByAccount(account, taskInfo.id);
                    if (taskInfoRes.success) {
                        setTaskStatus(taskInfoRes.data.taskInfos[0].taskStatus);
                        fetchTaskInfo();
                    }
                }
            }
        } catch (error) {
            console.error(error); // 处理或记录错误
        } finally {
            setLoading(false); // 在这里统一停止加载状态
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
        }
    }, [taskInfo])
    return (
        <div className="introduce">
            <div className='bkimg'>
                <div className="img_container text-48px text-bold">Experience RamenSwap with Anti-Rug Aspect<br />Complete tasks to earn Energy Block rewards</div>
            </div>
            <div className='introduce_text mt-14'>
                <div>
                    Let's experience how Artela network's RamenSwap achieves Anti-rug!<br />
                    Rug-pull is a fraudulent act by the project team.In the Spot DEX,youprovide liquidity to the project's poll,but the project team can pull out all assets in just two steps,leaving you with nothing.<br />
                    So as a liquidity provider,who can protect you?On the Artela Network,there's an on-chain risk control module to safeguard you!It identifies rug-pull transactions and blocks them in real-time.
                </div>
            </div>
            <div className='text-56px mt-20 text-center'>
                Connect Artela Testnet & Claim test tokens
            </div>
            <div className='my_card mt-20'>
                <div style={{marginLeft:'55px'}} className='claim_box'>
                    <div className='subTitle'>Step1: Connect to Artela Testnet</div>
                    <AccountWallet />
                    {
                        captcha
                    }
                    <div className='subTitle'>Step2: Claim test tokens</div>
                    <div style={{ width: '600px' }}>
                        <Button type='primary' disabled={taskStatus !== 0 && taskStatus !== 4} style={taskStatus == 0 || taskStatus === 4 ? buttonStyle : buttonDisabledStyle} loading={loading} onClick={() => getFaucet()} className='my_button' >claim tokens</Button>
                    </div>
                    <div className='claim_res'>
                        {taskStatus !== 0&&taskStatus !== 5 && <div className='subTitle'>Claim transactions</div>}
                        {taskStatus == 1 || taskStatus == 2 ? <Spin /> : taskInfo ? (taskInfo.txs && (<>
                            <div className='subTitle'>
                                <div className='subDescribe'>
                                    <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, taskInfo?.txs?.split(',')[0], 'transaction')}> {formatAddress(taskInfo?.txs?.split(',')[0])} </ExternalLink><text style={{ color: '#2F9E44' }}>{taskStatus == 3 ? finish() : taskStatus == 2 ? ongoing() : ''}</text><br />
                                    <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, (taskInfo?.txs?.split(',').length >= 2 ? taskInfo?.txs?.split(',')[1] : ''), 'transaction')}> {formatAddress((taskInfo?.txs?.split(',').length >= 2 ? taskInfo?.txs?.split(',')[1] : ''))} </ExternalLink><text style={{ color: '#F08C00' }}>{taskStatus == 3 ? finish() : taskStatus == 2 ? ongoing() : ''}</text>
                                </div>
                            </div>
                        </>)) : ''}
                    </div>
                </div>
                <div className='task_swap' style={{ width: '450px' }}>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}
