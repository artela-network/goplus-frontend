import React from "react";
import Pool from '../../../pages/Pool'

const FirstTask = () => {
    return (
        <>
            <div className='text-56px mt-20 text-center'>
                Task 1<br />
                Act as Alice and add liquidity
            </div>
            <div className="task_item my_card mt-20">
                <div className='swapContainer'>
                    <Pool />
                </div>
                <div className='describeContainer text-24px'>
                    <div className='subTitle'>Step1: 在左边的DEX里，添加1 $ART 的流动性吧！</div>
                    <div className='subTitle'>Status: 已完成</div>
                    <div className='subTitle'>
                        Alice在这个池子里的资产
                        <div>$ART: 1</div>
                        <div>$RUG: 2</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FirstTask;