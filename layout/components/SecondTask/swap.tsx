import React, { useCallback, useContext } from 'react'


import { Button } from 'antd'

enum TaskStatus {
  Init = 0,
  Ongoing = 1,
  Finish = 2,
}
interface PropType {
  taskStatus: TaskStatus,
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

  // swap state
  class Currency {
    readonly decimals: number;
    readonly symbol?: string;
    readonly name?: string;
    static readonly DEV: Currency = new Currency(0, 'DEV', 'Development');
    protected constructor(decimals: number, symbol?: string, name?: string) {
      this.decimals = decimals;
      this.symbol = symbol;
      this.name = name;
    }
  }
  // 继承 Currency 类来创建 MTK 类
  class MTK extends Currency {
    constructor(decimals: number, symbol: string, name: string) {
      super(decimals, symbol, name);
    }
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>

        {
          taskStatus == 0 || taskStatus == 1 || taskStatus == 2 || taskStatus == 5 ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>Swap</div>
    
            </>

          ) :
            (
              <div className='task2_box'>
                <div style={{color:'white',fontSize:'28px',marginTop:'15px'}}>Aha, as a contract owner, You make 990 ART token by Rug Pull! 👺Not bad. </div>
                <div style={{margin:'25px 0'}}>Let’s see how it comes.</div>
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
            )
        }


    </div>
  )
}

