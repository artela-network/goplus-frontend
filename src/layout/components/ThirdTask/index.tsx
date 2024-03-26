import React from "react";
interface Props {
    children: React.ReactNode;
}
const ThirdTask = ({ children }: Props) => {
    return (
        <>
            <div className='text-56px mt-20 text-center'>
                Task 3<br />
                Reall experience:RamenSwap prevents rug pulls
            </div>
            <div className="task_item my_card mt-20">
                <div className='swapContainer'>
                    {children}
                </div>
                <div className='describeContainer text-24px'>
                    <div className='subTitle'>Step1: 点击下面这个按钮，增发$Rug代币</div>
                    <div className='subTitle'>Step2: 点击左边的swap，输入xxx$代币,倾销资产，卷走所有的$ART</div>
                    <div className='subTitle'>
                        你会发现，项目方在step2的tx失败了，它被Artela的风控模块拦截了！
                    </div>
                    <div className='subTitle'>Status: 已完成</div>
                </div>
            </div>
        </>
    )
}
export default ThirdTask;