import React, { useCallback, useContext } from 'react'
import { ArrowDown } from 'react-feather'
import { ThemeContext } from 'styled-components'
import { ButtonPrimary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { AutoRow } from '../../components/Row'
import { ArrowWrapper, BottomGrouping, Wrapper } from '../../components/swap/styleds'
import { Field } from '../../state/swap/actions'
import { useSwapActionHandlers } from '../../state/swap/hooks'
import { useCurrency } from '../../hooks/Tokens'
import { useExpertModeManager } from '../../state/user/hooks'
import { useDerivedMintInfo } from '../../state/mint/hooks'
import './style.css'
import AppBody from '../AppBody'
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
  const theme = useContext(ThemeContext)
  const [isExpertMode] = useExpertModeManager()
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
  const currencyA = useCurrency('ETH');
  const currencyB = useCurrency('0x058dDd9339F3cecDb7662e2130Bd1cB1f03672D2');
  const {
    currencies

  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)
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
  // const mtk = new MTK(18, "RUG", "My Token");
  const mtk = new MTK(18, "RUG", "My Token");

  const { onUserInput } = useSwapActionHandlers()

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput]
  )


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <AppBody>
        {
          taskStatus == 0 || taskStatus == 1 || taskStatus == 2 || taskStatus == 5 ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>Swap</div>
              <Wrapper id="swap-page">
                <AutoColumn gap={'md'}>
                  <CurrencyInputPanel
                    label={'From'}
                    value={fromVal}
                    showMaxButton={false}
                    currency={mtk}
                    onUserInput={handleTypeInput}
                    id="swap-currency-input"
                  />
                  <AutoColumn justify="space-between">
                    <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                      <ArrowWrapper clickable>
                        <ArrowDown
                          size="16"
                          color={theme.primary1}
                        />
                      </ArrowWrapper>
                    </AutoRow>
                  </AutoColumn>
                  <CurrencyInputPanel
                    value={toVal}
                    onUserInput={handleTypeOutput}
                    label={'To'}
                    showMaxButton={false}
                    currency={currencies.CURRENCY_A}
                    id="swap-currency-output"
                  />
                </AutoColumn>

                <BottomGrouping>
                  <Button disabled={disabled} style={disabled ? disButtonStyle : buttonStyle} onClick={updateTaskStatus} loading={swapLoading}>Swap</Button>
                </BottomGrouping>
              </Wrapper>
            </>

          ) :
            (
              <div className='task2_box'>
                <div style={{color:'white',fontSize:'28px',marginTop:'15px'}}>Aha, as a contract owner, You make 990 ART token by Rug Pull! Not bad. </div>
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


      </AppBody>
    </div>
  )
}

//465: {betterTradeLinkVersion && <BetterTradeLink version={betterTradeLinkVersion} />}
