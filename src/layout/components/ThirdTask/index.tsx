import React, { useState } from "react";
import Video from "../Common/RugPullVideo"
import TaskBox from "../Common/TaskBox";
import { Button } from "antd";
import { TaskInfoType } from "../introduce";
interface PropsType {
    getTaskList?: () => void;
    taskInfo?: TaskInfoType;
}
const ThirdTask = ({ taskInfo }: PropsType) => {
    const doRugPull = () => {

    }
    const [taskStatus, setTaskStatus] = useState(0)

    return (
        <>
            <div className='text-56px mt-20 text-center'>
                Task 3<br />
                Real experience:RamenSwap prevents rug pulls
            </div>
            <TaskBox taskStatus={taskStatus}>
                <div className="task_guide">
                    <div className='subTitle'>
                        Step1: Click 👇 button to send a real Rug-pull transaction
                    </div>
                    <Button type="primary" onClick={doRugPull}> Do Rug-pull</Button>
                    <div className='subTitle mt-20'>Rug-pull transaction:</div>
                    <div className='subTitle'>
                        0xCAFEefefefefef…bebebeDACE   View on Explore
                    </div>
                    <div className='subTitle'>
                        Status: Processing | Fail
                    </div>
                    <div className='subTitle mt-20'>
                        Anti-rug Aspect has prevented this rug transaction.
                    </div>
                </div>
                <div className="task_swap">
                    <Video />
                </div>

            </TaskBox>
        </>
    )
}
export default ThirdTask;