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
import CustomModal from "../components/Common/Model"
export default function Activity() {
  const { account } = useActiveWeb3React()
  const [loading, setLoading] = useState(false)
  const [isCaptchaShow, setIsCaptchaShow] = useState(false)
  // const sitkey: string = process.env.REACT_APP_SIT_KEY || '';
  const sitkey: string = '6LcrZqgpAAAAAD8L2W-XJE7CR2xmI-nC76HNxqsb';

  const recaptchaRef = React.createRef<ReCAPTCHA>();
  const [taskStatus, setTaskStatus] = useState(0)
  const [taskInfos, setTaskInfos] = useState([])
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
          setIsCaptchaShow(true)
          // const initRes = await initTaskListByAccount(account, getQueryParams())
          // if (initRes.success) {
          //   return getTaskList(attempt + 1)
          // }
        }
      }
    } else {
      setTaskInfos([])
    }

    return false
  }
  const onSubmit = async (token: any) => {
    console.log("reCAPTCHA token:", token);
    setIsCaptchaShow(false)
    if (account) {
      if (getQueryParams()) {
        setLoading(true)
        const initRes = await initTaskListByAccount(account, getQueryParams(), token, sitkey)
        setLoading(false)
        if (initRes.success) {
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

    const init = async () => {
      let allDone = await getTaskList()

      if (intervalId.current) {
        clearInterval(intervalId.current)
      }

      if (!allDone) {
        intervalId.current = setInterval(async () => {
          allDone = await getTaskList()
          if (allDone && intervalId.current) {
            clearInterval(intervalId.current)
            intervalId.current = null
          }
        }, 8000)
      }
    }

    init()

    return () => {
      if (intervalId.current) clearInterval(intervalId.current)
    }
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
        const res = syncTask(account)
      }
  

  }
  const Footer = () => {
    if (taskStatus == 3) {
      return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'start',width:'1200px', maxWidth: '1200px',marginTop:'25px'}}>
          <div style={{ fontSize:'38px', maxWidth: '1200px' }}>
            Thanks for hacking!
          </div>
          <div style={{ fontSize:'38px', maxWidth: '1200px' }}>
            With Anti-Rug Aspect, 0 rug pull happen!
          </div>
          <div style={{ fontSize:'38px', maxWidth: '1200px' }}>
            Imagine Anti-Rug to earn? Claim your OAT and stay tuned!
          </div>

          <div style={{ fontSize: '30px', marginTop: '10px' }}>
            <a style={{ color: 'gray' }} href="https://SecWareX.io/"> Go to SecWareX</a>
          </div>
          <div onClick={syncState} style={{ fontSize: '30px', marginTop: '10px' }}>
            <a style={{ color: 'gray' }}> Sync status to SecWareX</a>
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
      {/* <TaskList /> */}
      <FirstTask taskInfo={taskInfos[1]} />
      <SecondTask taskInfo={taskInfos[2]} />
      <ThirdTask getTaskList={getTaskList} taskInfo={taskInfos[3]} />
      {/* <Explain /> */}
      <Footer />
    </div>
  )
}
