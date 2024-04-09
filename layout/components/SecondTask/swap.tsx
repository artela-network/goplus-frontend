import React, { useCallback, useContext } from 'react'
import { Button } from 'antd'
import styles from '../FirstTask/styles.module.css'
import { ArrowDown } from 'react-feather'
import Image from 'next/image'

interface PropType {
  taskStatus: number,
  updateTaskStatus: any;
  fromVal: string;
  toVal: string;
  swapLoading: boolean;
  disabled: boolean;
}
export default function Swap({ taskStatus, updateTaskStatus, fromVal, toVal, swapLoading, disabled }: PropType) {

  const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '20px',
    color: '#ffffff',
    background: '#2172E5',
    border: 'none',
    borderRadius: '15px',
    transition: 'background 0.3s ease',
    height: '60px',
    width: '100%'
  };
  const disButtonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '20px',
    color: '#dddddd', // 改为灰色，表示不可用
    background: '#59677E', // 使用更暗或更灰的背景色来表示按钮不可点击
    border: 'none',
    borderRadius: '15px',
    transition: 'background 0.3s ease',
    height: '60px',
    width: '100%'
  };



  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>

      {
        taskStatus == 0 || taskStatus == 1 || taskStatus == 2 || taskStatus == 5 ? (
          <>
            <div className={styles.box}>
              <div className={styles.header}>Swap</div>
              <div className={styles.main}>
                <div className={styles.input}>
                  <div className={styles.dJQRda}>From</div>
                  <div className={styles.lldVYp}>
                    <div className={styles.dKIWpo}>
                      {fromVal}
                    </div>
                    <div className={styles.hempoT}>
                      <div style={{ width: '32px', height: '32px', fontSize: '25px', lineHeight: '32px', margin: '0px 10px' }}>
                        😈
                      </div>
                      <span>
                        RUG
                      </span>
                    </div>

                  </div>
                </div>
                <div className={styles.iconBox}>
                  <ArrowDown size="16" />
                </div>
                <div className={styles.input}>
                  <div className={styles.dJQRda}>To</div>
                  <div className={styles.lldVYp}>
                    <div className={styles.dKIWpo}>
                      {toVal}
                    </div>
                    <div className={styles.hempoT}>
                      <Image style={{ backgroundColor: 'white', borderRadius: '50%', margin: '0 15px' }} alt='logo' width={32} height={32} src={'/artLogo3.png'}></Image>
                      <span>
                        ART
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.footer}>
                <Button disabled={disabled} style={disabled ? disButtonStyle : buttonStyle} onClick={updateTaskStatus} loading={swapLoading}>Swap</Button>
              </div>
            </div>
          </>

        ) :
          (
            <div className={styles.box}> 
              <div className='task2_box'>
                <div style={{ color: 'white', fontSize: '28px', marginTop: '15px' }}>Aha, as a contract owner, You make 990 ART token by Rug Pull! 👺Not bad. </div>
                <div style={{ margin: '25px 0' }}>Let’s see how it comes.</div>
                <div style={{ fontSize: '24px' }}> Liquidity before Rug:</div>
                <ul style={{ fontSize: '20px', marginTop: '10px' }}>
                  <li>{`ART:1000`}</li>
                  <li>{`RUG:1000,000,000(1 Billion)`}</li>
                </ul>
                <div style={{ fontSize: '24px', marginTop: '15px' }}> Liquidity After Rug:</div>
                <ul style={{ fontSize: '20px', marginTop: '10px' }}>
                  <li>{`ART:10`}</li>
                  <li>{`RUG:100,000,000,000(100 Billion)`}</li>
                </ul>
                {/* <div className='des'>
                  That's how typically rug-pull happens, malicious smart contracts instantly increase a huge amount of token supply for him own, and then swap out the valuable assets.
                </div> */}
              </div>
            </div>
          )
      }


    </div>
  )
}

