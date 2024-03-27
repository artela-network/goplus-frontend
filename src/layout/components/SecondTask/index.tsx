import React from 'react'
import Swap from '../../../pages/Swap'

const SecondTask = () => {
  return (
    <>
      <div className="text-56px mt-20 text-center">
        Task 2<br />
        Simulated experience rug pull
      </div>
      <div className="task_item  my_card mt-20">
        <div className="swapContainer">
          <Swap />
        </div>
        <div className="describeContainer text-24px">
          <div className="subTitle">进行RugPull,仅需要2步！</div>
          <div className="subTitle">Step1: 点击下面这个按钮，增发$Rug代币</div>
          <button>Mint with back door</button>
          <div className="subTitle">Step2: 点击左边的swap，输入xxx$代币,倾销资产，卷走所有的$ART</div>

          <div className="subTitle">
            Alice在这个池子里的资产
            <div>$ART: 1</div>
            <div>$RUG: 2</div>
          </div>
          <div className="subTitle">Status: 已完成</div>
        </div>
      </div>
    </>
  )
}
export default SecondTask
