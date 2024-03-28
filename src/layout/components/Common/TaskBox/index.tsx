import React from 'react'
import { Button } from 'antd'
import './taskBox.css'
enum TaskStatus {
  Init = 0,
  Ongoing = 1,
  Finish = 2
}
interface Props {
  children: React.ReactNode
  taskStatus: TaskStatus
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

    console.log('✈️️️' + taskStatus)

    const statusList = [notStarted, ongoing, ongoing, finish, failed];
  return (
    <>
      <div className="task_box mt-20">
        <div className="task_header">
          <div className="task_status">Task status: {statusList[taskStatus ? taskStatus : 0]()}</div>
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
