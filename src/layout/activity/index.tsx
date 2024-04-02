import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './activity.css'
import Introduce from '../components/introduce/index'
import TaskList from '../components/TaskList/index'
import FirstTask from '../components/FirstTask/index'
import SecondTask from '../components/SecondTask/index'
import ThirdTask from '../components/ThirdTask/index'
import Explain from '../components/Explain/index'
import { useActiveWeb3React } from '../../hooks'
import { getTaskListByAccount, initTaskListByAccount, syncTask } from '../../api/activity'
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from 'antd'
import { TaskInfo } from '../../utils/campaignClient'
import CustomModal from "../components/Common/Model"
export default function Activity() {
  const { account } = useActiveWeb3React()
  const [loading, setLoading] = useState(false)
  const [isCaptchaShow, setIsCaptchaShow] = useState(false)
  // const sitkey: string = process.env.REACT_APP_SIT_KEY || '';
  const sitkey: string = '6LcrZqgpAAAAAD8L2W-XJE7CR2xmI-nC76HNxqsb';

  const initialTaskInfos: TaskInfo[] = [
    {
      id: 0,
      taskName: '',
      taskStatus: 5,
      memo: '',
      title: '',
      txs: '',
      taskId: ''
    },
    {
      id: 0,
      taskName: '',
      taskStatus: 5,
      memo: '',
      title: '',
      txs: '',
      taskId: ''
    },
    {
      id: 0,
      taskName: '',
      taskStatus: 5,
      memo: '',
      title: '',
      txs: '',
      taskId: ''
    },
    {
      id: 0,
      taskName: '',
      taskStatus: 5,
      memo: '',
      title: '',
      txs: '',
      taskId: ''
    },
  ]

  const recaptchaRef = React.createRef<ReCAPTCHA>();
  const [taskStatus, setTaskStatus] = useState(0)
  const [taskInfos, setTaskInfos] = useState<TaskInfo[]>(initialTaskInfos)
  const location = useLocation()
  const intervalId = useRef<NodeJS.Timeout | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const getQueryParams = () => {
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('taskId')
    if (taskId !== null) {
      return taskId.split('/')[0]
    } else {
      return ''
    }
  }
  const getTaskList = async (attempt = 0): Promise<boolean> => {
    if (account) {
      const res = await getTaskListByAccount(account)
      if (res.success) {
        setTaskStatus(res.data.status)
        if (res.data.taskInfos) {
          setTaskInfos(res.data.taskInfos)

          for (let i = 0; i < res.data.taskInfos.length; i++) {
            if (res.data.taskInfos[i].taskStatus !== 3) {
              return false
            }
          }
          return true
        } else if (attempt < 2) {
          setTaskInfos(initialTaskInfos)
          setIsCaptchaShow(true)
          // const initRes = await initTaskListByAccount(account, getQueryParams())
          // if (initRes.success) {
          //   return getTaskList(attempt + 1)
          // }
        }
      }
    } else {
      setTaskInfos(initialTaskInfos)
    }

    return false
  }
  const onSubmit = async (token: any) => {
    setIsCaptchaShow(false)
    if (account) {
      if (getQueryParams()) {
        setLoading(true)
        const initRes = await initTaskListByAccount(account, getQueryParams(), token, sitkey)
        setLoading(false)
        if (initRes.success) {
          getTaskList()
        }
      } else {
        handleOpenModal()
      }
    }
  };
  useEffect(() => {
    if (!account) {
      return
    }
    getTaskList()
    setIsCaptchaShow(false)
  }, [account])

  const captcha = () => {
    if (isCaptchaShow) {
      return (
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={sitkey}
          onChange={onSubmit}
        />
      )
    } else {
      return ''
    }

  }
  const syncState = async () => {
    if (account) {
      if (Array.isArray(taskInfos) && taskInfos.length > 0)
        var res = syncTask(account, taskInfos[0].taskId)
    }
  }
  const Footer = () => {
    if (taskStatus == 3) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', width: '1200px', maxWidth: '1200px', marginTop: '25px' }}>
          <div style={{ fontSize: '38px', maxWidth: '1200px' }}>
            Thanks for your participation! You have finished all your tasks！
          </div>
          <div style={{ fontSize: '38px', maxWidth: '1200px' }}>
            Claim you rewards here and stay tuned!
          </div>
          <div style={{ fontSize: '38px', maxWidth: '1200px' }}>
            <a href="https://SecWareX.io/">
              Claim your energy blocks.
            </a>
            <text onClick={syncState} style={{ fontSize: '30px', marginTop: '10px', marginBottom: "50px" }}>
              <a style={{ color: 'gray' }}> Sync status to SecWareX</a>
            </text>
          </div>
          <div style={{ fontSize: '38px', maxWidth: '1200px' }}>
            <a href="https://SecWareX.io/">
              Claim your Artela Security guardian Badge.
            </a>
          </div>
          <div style={{ fontSize: '38px', maxWidth: '1200px' }}>
            Wishing you a smooth, safe, and prosperous journey in Web3!
          </div>

        </div>
      )
    } else {
      return null;
    }

  }
  return (
    <div className="activity">
      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} >
        <p style={{ fontSize: '18px' }}>
          Welcome to our task! This task is co-hosted by Artela and SecWareX. Please enter the event page through the <a href="https://SecWareX.io/img-task/81553" target="_blank" rel="noopener noreferrer" style={{ color: '#4E9CAF' }}>correct entrance</a>. Let's make this event a success together!
        </p>
      </CustomModal>
      <Introduce getTaskList={getTaskList} taskInfo={taskInfos[0]} captcha={captcha()} initLoading={loading} />
      <FirstTask getTaskList={getTaskList} taskInfo={taskInfos[1]} />
      <SecondTask getTaskList={getTaskList} taskInfo={taskInfos[2]} />
      <ThirdTask getTaskList={getTaskList} taskInfo={taskInfos[3]} />
      <Footer />
    </div>
  )
}
