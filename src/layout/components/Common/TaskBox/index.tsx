import React from "react";
import { Button } from 'antd';
import './taskBox.css'
interface Props {
    children: React.ReactNode;
    taskStatus: number;
}
const TaskBox = ({ children, taskStatus }: Props) => {
    const ongoing = () => (
        <text style={{ color: 'orange' }}> ⏳ onging</text>
    );

    const finish = () => (
        <text style={{ color: 'green' }}> ✅ finish</text>
    );

    const SuccessCover = () => (
        <div className="task_box_cover">
            Task Completed! ✅
        </div>
    );

    return (
        <>
            <div className={`task_box mt-20 ${taskStatus === 3 ? "task_box_relative" : ""}`}>
                {taskStatus === 3 && <SuccessCover />}
                <div className="task_header">
                    <div className="task_status">
                        Task status: {taskStatus === 3 ? finish() : ongoing()}
                    </div>
                    <div className="task_guide">
                        <Button type="link">任务指南</Button>|<Button type="link">Task guide</Button>
                    </div>
                </div>
                <div className='task_main text-24px'>
                    {children}
                </div>
            </div>
        </>
    );
};

export default TaskBox;