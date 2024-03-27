import React from "react";
import { Button } from 'antd';
// import { Input } from "antd";
const TaskBox = () => {

    return (
        <>
            <div className='describeContainer text-24px'>
                <div className="status_title">
                    <div className="task_status"> Task status: onging</div>
                    <div className="task_guide">
                        <Button type="link">任务指南</Button>| <Button type="link">Task guide</Button>
                    </div>
                </div>
                <div className='subTitle'>Step1: Increase 2B $RUG</div>
                <Button type="primary"> Increase</Button>
                <div className='subTitle'>{`Total supply: 1B -> 2B`} </div>
                <div className='subTitle'>Step2: Swap 3B $RUG</div>
                <div className='subTitle'>Click swap button to sell all $Rug</div>

            </div>
        </>
    )
}
export default TaskBox;