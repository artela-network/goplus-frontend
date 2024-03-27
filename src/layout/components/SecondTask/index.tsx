import React from "react";
import Swap from '../../../pages/Swap'
import TaskBox from "../Common/TaskBox";

const SecondTask = () => {
    return (
        <>
            <div className='text-56px mt-20 text-center'>
                Task 2<br />
                Simulated experience rug pull
            </div>
            <div className="task_item  my_card mt-20">
                {/* <div className='describeContainer text-24px'>
                    <div className="status_title">
                        <div className="task_status"> Task status: onging</div>
                       <div className="task_guide">
                            <a href="">任务指南 </a> | <a href="">Task guide</a>
                        </div> 
                       </div>
                    <div className='subTitle'>Step1: Increase 2B $RUG</div>
                    <button> Increase</button>
                    <div className='subTitle'>{`Total supply: 1B -> 2B`} </div>
                    <div className='subTitle'>Step2: Swap 3B $RUG</div>
                    <div className='subTitle'>Click swap button to sell all $Rug</div>

                </div> */}
                <TaskBox/>
                <div className='swapContainer'>
                    <Swap />
                </div>
            </div>
        </>
    )
}
export default SecondTask;