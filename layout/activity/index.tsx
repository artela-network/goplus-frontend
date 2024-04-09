import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import Introduce from '../components/introduce/index'
import FirstTask from '../components/FirstTask/index'
import SecondTask from '../components/SecondTask/index'
import ThirdTask from '../components/ThirdTask/index'
import { getTaskListByAccount, initTaskListByAccount, syncTask } from '../../api/index'
import ReCAPTCHA from "react-google-recaptcha";
import { Button, message } from 'antd'
import { TaskInfo } from '../../utils/campaignClient'
import CustomModal from "../components/Common/Model"
import goplusPic from '../../assets/footer/goplus.png'
import artelaPic from '../../assets/footer/badge.png'
import { useAccount } from 'wagmi';
import Image from 'next/image';


export default function Activity() {
  const { address: account, isConnected } = useAccount();
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
  const location = useRouter();
  const intervalId = useRef<NodeJS.Timeout | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskError, setNewTaskError] = useState('')
  const [modalTitle, setModalTitle] = useState('')

  const handleOpenNewTaskModal = () => {
    setIsNewTaskModalOpen(true);
    setModalTitle('Error')
  };

  const handleCloseNewTaskModal = () => {
    setIsNewTaskModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const getQueryParams = () => {
    const taskId = location.query.taskId;
    if (taskId && !Array.isArray(taskId)) {
      return taskId
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
        } else {
          setNewTaskError(initRes.error)
          handleOpenNewTaskModal()
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
        var res = await syncTask(account, taskInfos[0].taskId)
      if (res.success) {
        setIsNewTaskModalOpen(true);
        setModalTitle('Success')
        setNewTaskError('Success to sync status to GoPlus.')

      } else {
        setIsNewTaskModalOpen(true);
        setModalTitle('Error')
        // setNewTaskError(res.error)
        setNewTaskError('Failed to sync status to goplus! Sync task have been completed!')

      }
    }
  }
  const Footer = () => {
    if (taskStatus === 3) {
      return (
        <div className="footerContainer">
          <div className="footerText">
            🎉🎉&nbsp;You have finished all your tasks!
          </div>
          <div className="footerText">
            Claim your rewards here and stay tuned!
          </div>
          <div className="claim_rewords">
            <div className='rewords_box'>
              <div style={{ fontSize: '26px' }}>Block Energy SecWareX</div>
              <div className='img_box'>
                <Image height={100} alt='goplusLogo' src={goplusPic}></Image>
              </div>
              <div className='rewords_footer'>
                <Button type='primary'>
                  <a target='blank' href="https://SecWareX.io/">
                    Go to SecWareX
                  </a>
                </Button>
              </div>

            </div>
            <div className="rewords_box">
              <div style={{ fontSize: '26px' }}>Artela Security Guardian</div>
              <div className='img_box'>
                <Image height={100} alt='artLogo' src={artelaPic}></Image>
              </div>
              <div className='rewords_footer'>
                <Button type='primary'>
                  <a target='blank' href="https://app.galxe.com/quest/Artela/GCEZwthhTx/">
                    Claim in Galex
                  </a>
                </Button>
              </div>

            </div>
          </div>
          <div className="footerText" style={{ fontSize: '28px' }}>
            Wish you a smooth, safe, and prosperous journey in Web3!
          </div>
          <text style={{ fontSize: '22px', textAlign: 'center' }}>
            <text>
              ❓If the task status of SecWareX stays unfinished, please press to&nbsp;
              <a onClick={syncState} className='footerLink' style={{ cursor: 'pointer' }}>
                Synchronize task status
              </a> manually.
            </text>
          </text>

        </div>
      )
    } else {
      return null;
    }
  };
  return (
    <div className="activity">
      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} >
        <p style={{ fontSize: '18px' }}>
          Welcome to our task! This task is co-hosted by Artela and SecWareX. Please enter the event page through the <a href="https://SecWareX.io/img-task/81553" target="_blank" rel="noopener noreferrer" style={{ color: '#4E9CAF' }}>correct entrance</a>. Let's make this event a success together!
        </p>
      </CustomModal>
      <CustomModal isOpen={isNewTaskModalOpen} onClose={handleCloseNewTaskModal} >
        <h3 style={{ width: '100%', textAlign: 'center', color: 'white', fontSize: '24px' }}>{modalTitle}</h3>
        <p style={{ fontSize: '18px' }}>
          {newTaskError}
        </p>
      </CustomModal>
      <Introduce getTaskList={getTaskList} taskInfo={taskInfos[0]} captcha={captcha()} initLoading={loading} />
      <FirstTask getTaskList={getTaskList} taskInfo={taskInfos[1]} preTaskState={taskInfos[0].taskStatus} />
      <SecondTask getTaskList={getTaskList} taskInfo={taskInfos[2]} preTaskState={taskInfos[1].taskStatus} />
      <ThirdTask getTaskList={getTaskList} taskInfo={taskInfos[3]} preTaskState={taskInfos[2].taskStatus} />
      <Footer />
    </div>
  )
}
