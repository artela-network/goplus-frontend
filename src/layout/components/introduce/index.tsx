import React from 'react';
import './introduce.css'
import { useActiveWeb3React } from '../../../hooks'
import { updateTask, getTaskListByAccount } from '../../../api/activity'
import AccountWallet from '../../../components/AccountWallet';
interface TaskInfoType {
    id: number;
    memo: string;
    taskName: string;
    taskStatus: number;
    title: string;
    txs: string;
}

interface IntroduceProps {
    getTaskList: () => void;
    taskInfo?: TaskInfoType;
}
export default function Introduce({ getTaskList, taskInfo }: IntroduceProps) {
    const { account } = useActiveWeb3React()

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
            const res = await updateTask(account, taskInfo.id, '2')
            if (res.success) {
                const taskInfoRes = await getTaskListByAccount(account, taskInfo.id)
            }
        }
    }
 
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
                    <div>Step1: Connect to Artela Testnet</div>
                    <AccountWallet />
                    <div>Step2: Claim test tokens</div>
                    <div>
                        <button onClick={() => getFaucet()} className='my_button bg-blue-500 rounded-md text-white p-2 hover:bg-blue-700'>claim tokens</button>
                    </div>
                </div>
                <div className='claim_res'>
                    <div className='subTitle'>Claim transactions</div>
                    <div className='text-24px'> {formatAddress(account)} <text style={{ color: '#2F9E44' }}>Finish</text></div>
                    <div className='text-24px'> {formatAddress(account)} <text style={{ color: '#F08C00' }}>Procesing</text></div>

                </div>
            </div>
        </div>
    );
}
