import React, { useState, useEffect, ReactNode } from 'react';
import { updateTask, getTaskListByAccount } from '../../../api/index'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChainId } from 'artswap'
import { getEtherscanLink } from '../../../utils'
import { ExternalLink } from '../Common/ExternalLink'
import { TaskInfo } from '../../../utils/campaignClient';
import { Button, Spin } from 'antd';
import { failed, ongoing, finish } from '../Common/StatusIcon';
import { buttonStyle, buttonDisabledStyle } from '../Common/Button'
import Loading from "../Common/Loading"
import goPulusIcon from '../../../assets/icon/galxe.png';
import artelaIcon from '../../../assets/icon/artela.png'
import connectIcon from '../../../assets/icon/connect.svg'
import { isMobile } from 'react-device-detect'
import CryptoFraudSummary from '../Common/CryptoFraudInfo';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';
interface IntroduceProps {
    getTaskList: () => void;
    taskInfo?: TaskInfo;
    captcha: ReactNode;
    initLoading: boolean;
}
export default function Introduce({ getTaskList, taskInfo, captcha, initLoading }: IntroduceProps) {
    const { address: account, isConnected } = useAccount();
    const [taskStatus, setTaskStatus] = useState(5)
    const [loading, setLoading] = useState(false)
    const linkStyle = {
        color: '#2f6eeb', // 链接文本颜色
        textDecoration: 'underline', // 鼠标悬停时显示下划线
     
    };

    const hoverStyle = {
    };

    const [isHovered, setIsHovered] = React.useState(false);
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
                <div className="img_container text-48px text-bold">
                    <text>
                        Testnet Faucet <br />
                    </text>
                    <div className="icon-container">
                        <Image alt='img' height={32} style={{ height: '30px' }} src={artelaIcon} ></Image>
                    </div>
                </div>
            </div>

            <div className='head_title' style={{ marginTop: '60px' }}>
                Connect Artela Testnet & Claim Test Tokens
            </div>
            <div className='my_card'>
                <div className='claim_box'>
                    <div className='subTitle'>Step1: Connect to Artela Testnet<br /> <text style={{ color: 'gray ', fontSize: '16px' }}>please use Metamask Wallet to finish these tasks.</text></div>
                    <ConnectButton />
                    <div className='subTitle'>Step2: Claim Test Tokens</div>
                    {
                        captcha
                    }
                    <div style={{ width: '600px' }}>
                        <Button type='primary' disabled={taskStatus !== 0 && taskStatus !== 4} style={taskStatus == 0 || taskStatus === 4 ? buttonStyle : buttonDisabledStyle} loading={loading || initLoading} onClick={() => getFaucet()} className='my_button' >claim tokens</Button>
                    </div>
                    <div className='claim_res'>
                        {taskStatus !== 0 && taskStatus !== 5 && <div className='subTitle'>Claim Transactions</div>}

                        {taskStatus == 1 || taskStatus == 2 ? <>
                            <div style={{ fontSize: '24px' }}>
                                <Spin /> {`Queueing...`}
                            </div>
                        </> : taskInfo ? (taskInfo.txs && (<>
                            <div className='subTitle'>
                                <div className='subDescribe'>
                                    <div>
                                        ART: 2 &nbsp;
                                        <ExternalLink href={getEtherscanLink(ChainId.ARTELATESTNET, taskInfo?.txs?.split(',')[0], 'transaction')}> {formatAddress(taskInfo?.txs?.split(',')[0])} </ExternalLink><text style={{ color: '#2F9E44' }}>{taskStatus == 4 ? failed() : taskStatus == 3 ? finish() : taskStatus == 2 ? ongoing() : ''}</text>
                                        {taskStatus == 4 && <text className='error-message'>Claim token failed, please claim again</text>}
                                    </div>
                                    <div>
                                        To claim more faucets, please Join 🚰 <ExternalLink href='https://docs.artela.network/develop/resources/faucet'>
                                            Artela Discord
                                        </ExternalLink>
                                    </div>
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
