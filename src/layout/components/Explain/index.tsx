import React from "react";
import Video from '../video';

const Explain = ()=> {
    return (
        <>
            <div className='text-56px mt-20 text-center'>
                How do Artela and RamenSwap achieve this?
            </div>
            <div className="task_item my_card mt-20">
                <Video></Video>
                <div style={{ flex: '1' }}></div>
                <div style={{ flex: '1' }} className='describeContainer text-24px'>
                    <div className='subTitle'>Aspect Programming offers an SDK and a WASM runtime environment for building native extensions on Artela blockchain. To add Aspects to your dApp:</div>
                    <div className='subDescribe'>
                        1. Develop Aspects and compile to WASM bytecode.
                    </div>
                    <div className='subDescribe'>
                        2. Sign deployment transaction and send to network.
                    </div>
                    <div className='subDescribe'>
                        3. Bind Aspects with your smart contract.
                    </div>
                    <div className='subDescribe'>
                        4. Send a transaction to invoke the contract, and trigger the associated Aspects.
                    </div>
                </div>
            </div>
        </>
    )
}
export default Explain;