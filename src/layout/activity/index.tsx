import React, { useRef, useState, useEffect } from 'react';
import './activity.css'
import Introduce from '../components/introduce/index';
import Swap from '../../pages/Swap'
import Pool from '../../pages/Pool'
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
            fetch(`/tasks/${account}`)
                .then(r => r.json())
                .then((data: any) => {
                    if (data.success) {
                        setTaskStatus(data.data.status)
                        if (data.data.taskInfos) {
                            setTaskInfos(data.data.taskInfos)
                        }else{
                            setTaskInfos([])
                        }
                    }
                })
        }else{
            setTaskInfos([])
        }
    }
    useEffect(() => {
        getTaskListByAccount()
    }, [account])
    const firstTaskRef = useRef<HTMLDivElement>(null);
    const secondTaskRef = useRef<HTMLDivElement>(null);
    const thirdTaskRef = useRef<HTMLDivElement>(null);

    const scrollToTaskScreen = (ref: React.RefObject<HTMLDivElement>): void => {
        const navbarHeight: number = isFixed ? 0 : 100;
        if (ref.current) {
            const secondScreenPosition = ref.current.offsetTop;
            window.scrollTo({
                top: secondScreenPosition - navbarHeight, // 减去Navbar的高度以避免遮挡
                behavior: 'smooth',
            });
        }
    };

    const [isFixed, setIsFixed] = useState<boolean>(false);

    const handleScroll = (): void => {
        const divElement = document.getElementById('scrollDiv');
        if (!divElement) return;

        const divTop = divElement.offsetTop;
        const scrolled = window.scrollY;
        if (scrolled >= divTop - 105) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='activity'>
            <Introduce getTaskList={getTaskListByAccount} />
            <div id="scrollDiv" />
            {taskInfos.length > 0 &&
                (<>
                    <div className={`mt-20  w-full relative`}>
                        <div className={`task-list-row`}>
                            <div>
                                <button onClick={() => scrollToTaskScreen(firstTaskRef)} className="task_button">1</button>
                            </div>
                            <div style={{ margin: '0 20px' }}>{'--->'}</div>
                            <div>
                                <button onClick={() => scrollToTaskScreen(secondTaskRef)} className="task_button">2</button>
                            </div>
                            <div style={{ margin: '0 20px' }}>{'--->'}</div>
                            <div>
                                <button onClick={() => scrollToTaskScreen(thirdTaskRef)} className="task_button">3</button>
                            </div>
                        </div>
                    </div>
                    <div className='text-56px mt-20 text-center'>
                        Task 1<br />
                        Act as Alice and add liquidity
                    </div>
                    <div ref={firstTaskRef} className="task_item my_card mt-20">
                        <div className='swapContainer'>
                            <Pool />
                        </div>
                        <div className='describeContainer text-24px'>
                            <div className='subDescribe'>Step1: 在左边的DEX里，添加1 $ART 的流动性吧！</div>
                            <div className='subDescribe'>Status: 已完成</div>
                            <div className='subDescribe'>
                                Alice在这个池子里的资产
                                <div>$ART: 1</div>
                                <div>$RUG: 2</div>
                            </div>
                        </div>
                    </div>
                    <div className='text-56px mt-20 text-center'>
                        Task 2<br />
                        Simulated experience rug pull
                    </div>
                    <div ref={secondTaskRef} className="task_item  my_card mt-20">
                        <div className='swapContainer'>
                            <Swap />
                        </div>
                        <div className='describeContainer text-24px'>
                            <div className='subDescribe'>进行RugPull,仅需要2步！</div>
                            <div className='subDescribe'>Step1: 点击下面这个按钮，增发$Rug代币</div>
                            <div className='subDescribe'>Step2: 点击左边的swap，输入xxx$代币,倾销资产，卷走所有的$ART</div>
                            <div className='subDescribe'>
                                Alice在这个池子里的资产
                                <div>$ART: 1</div>
                                <div>$RUG: 2</div>
                            </div>
                            <div className='subDescribe'>Status: 已完成</div>
                        </div>
                    </div>
                    <div className='text-56px mt-20 text-center'>
                        Task 3<br />
                        Reall experience:RamenSwap prevents rug pulls
                    </div>
                    <div ref={thirdTaskRef} className="task_item my_card mt-20">
                        <div className='swapContainer'>
                            {children}
                        </div>
                        <div className='describeContainer text-24px'>
                            <div className='subDescribe'>Step1: 点击下面这个按钮，增发$Rug代币</div>
                            <div className='subDescribe'>Step2: 点击左边的swap，输入xxx$代币,倾销资产，卷走所有的$ART</div>
                            <div className='subDescribe'>
                                你会发现，项目方在step2的tx失败了，它被Artela的风控模块拦截了！
                            </div>
                            <div className='subDescribe'>Status: 已完成</div>
                        </div>
                    </div>
                    <div className='text-56px mt-20 text-center'>
                        How do Artela and RamenSwap achieve this?
                    </div>
                    <div ref={thirdTaskRef} className="task_item my_card mt-20">

                        <div className='video_card'>
                            {/* <div className='bkimg-overlay'></div> */}
                            <video autoPlay loop muted src="https://framerusercontent.com/assets/thoVJI505450y1BDDWkUogY7o5U.mp4">
                            </video>
                        </div>

                        <div className='describeContainer text-24px'>
                            <div className='subDescribe'>Aspect Programming offers an SDK and a WASM runtime environment for building native extensions on Artela blockchain. To add Aspects to your dApp:</div>
                            <div className='subDescribe'>
                                1. Develop Aspects and compile to WASM bytecode.
                            </div>
                            <div className='subDescribe'>
                                2. Sign deployment transaction and send to network.
                            </div>
                            <div className='subDescribe'>
                                3. Bind Aspects with your smart contract.
                            </div>
                            <div className='subDescribe'>
                                4. Send a transaction to invoke the contract, and trigger the associated Aspects.
                            </div>
                        </div>
                    </div>
                </>)
            }

        </div>
    );
}
