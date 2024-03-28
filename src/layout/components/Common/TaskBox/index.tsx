import React from 'react'
import { Button } from 'antd'
import './taskBox.css'
interface Props {
  children: React.ReactNode
  taskStatus: number
}
const TaskBox = ({ children, taskStatus }: Props) => {
  const ongoing = () => {
    return (
      <>
        <text style={{ color: 'orange' }}> ⏳ Processing</text>
      </>
    )
  }
  const finish = () => {
    return (
      <>
        <text style={{ color: 'green' }}> ✅ Finish</text>
      </>
    )
  }

  const notStarted = () => {
    return (
      <>
        <text style={{ color: 'grey' }}> 👷 Not Started</text>
      </>
    )
  }

  const failed = () => {
    return (
      <>
        <text style={{ color: 'grey' }}> ❌ Failed</text>
      </>
    )
  }

  const SuccessCover = () => (
    <div className="task_box_cover">
        Task Completed! ✅
    </div>
);
  const statusList = [notStarted, ongoing, ongoing, finish, failed]
  return (
    <>
      <div className="task_box mt-20">
        {/* {taskStatus === 3 && <SuccessCover />} */}
        <div className="task_header">
          <div className="task_status">Task status:<text style={{fontSize:'24px'}}>{statusList[taskStatus ? taskStatus : 0]()}</text> </div>
          <div className="task_guide">
            <Button type="link">任务指南</Button>| <Button type="link">Task guide</Button>
          </div>
        </div>
        <div className="task_main text-24px">{children}</div>
      </div>
    </>
  )
}
export default TaskBox
