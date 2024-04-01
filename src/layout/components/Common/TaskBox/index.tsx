import React from 'react'
import { Button } from 'antd'
import './taskBox.css'
interface Props {
  children: React.ReactNode
  taskStatus: number
  footer?: React.ReactNode
}
const TaskBox = ({ children, taskStatus, footer }: Props) => {
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
  const statusList = [notStarted, ongoing, ongoing, finish, failed, notStarted]
  return (
    <>
      <div className="task_box">
        <div className="task_header">
          <div className="task_status">Task status:<text style={{ fontSize: '24px' }}>{statusList[taskStatus ? taskStatus : 0]()}</text> </div>
          <div className="to_task_guide">
             <Button type="link">Task guide</Button>
          </div>
        </div>
        <div className="task_main text-24px">{children}</div>
        <div className='task_footer'>
          {taskStatus==3 && footer}
        </div>
      </div>
    </>
  )
}
export default TaskBox
