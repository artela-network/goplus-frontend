import React, { useState, useEffect } from 'react';
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
const defaultTaskInfo: TaskInfo = {
    id: 0,
    taskName: '',
    taskStatus: 0,
    memo: '',
    title: '',
    txs: ''
}
interface IntroduceProps {
    getTaskList: () => void;
    taskInfo?: TaskInfo;
}
export default function Introduce({ getTaskList, taskInfo = defaultTaskInfo }: IntroduceProps) {
    const { account } = useActiveWeb3React()
    const [taskStatus, setTaskStatus] = useState(0)
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
        if (account && taskInfo) {
            const res = await updateTask(account, taskInfo.id, '1')
            if (res.success) {
                const taskInfoRes = await getTaskListByAccount(account, taskInfo.id)
                if (taskInfoRes.success) {
                    setTaskStatus(taskInfoRes.data.taskInfos[0].taskStatus)
                    fetchTaskInfo()
                }
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
                    setLoading(true)
                } else if (newTaskStatus === 3) {
                    getTaskList()
                    setLoading(false)
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
                <div className='claim_box'>
                    <div className='subTitle'>Step1: Connect to Artela Testnet</div>
                    <AccountWallet />
                    <div className='subTitle'>Step2: Claim test tokens</div>
                    <div>
                        <Button type='primary' disabled={taskStatus === 3} style={taskStatus !== 3 ? buttonStyle : buttonDisabledStyle} loading={loading} onClick={() => getFaucet()} className='my_button' >claim tokens</Button>
                    </div>
                    <div className='claim_res'>
                        {
                            taskInfo.txs && (<>
                                <div className='subTitle'>Claim transactions<br />
                                <div className='subDescribe'>
                                    <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, taskInfo?.txs?.split(',')[0], 'transaction')}> {formatAddress(taskInfo?.txs?.split(',')[0])} </ExternalLink><text style={{ color: '#2F9E44' }}>{finish()}</text><br />
                                    <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, (taskInfo?.txs?.split(',').length >= 2 ? taskInfo?.txs?.split(',')[1] : ''), 'transaction')}> {formatAddress((taskInfo?.txs?.split(',').length >= 2 ? taskInfo?.txs?.split(',')[1] : ''))} </ExternalLink><text style={{ color: '#F08C00' }}>{finish()}</text>
                                </div>
                                </div>
                            </>)
                        }
                    </div>
                </div>
                <div style={{ width: '450px' }}>

                </div>
            </div>
        </div>
    );
}
