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
}
export default function Swap({ taskStatus, updateTaskStatus, fromVal, toVal, swapLoading }: PropType) {
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
    width:'100%'
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
    <>
      <AppBody>
        {
          taskStatus == 0 || taskStatus == 1 || taskStatus == 2 ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>兑换</div>
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
                  <Button style={buttonStyle} onClick={updateTaskStatus} loading={swapLoading}>Swap</Button>
                </BottomGrouping>
              </Wrapper>
            </>

          ) :
            (
              <div className='task2_box'>
                <div > Liquidity in the pool</div>
                <ul>
                  <li>{`$ART: 3M -> 1K`}</li>
                  <li>{`$RUG: 30M -> 3B`}</li>
                </ul>

                <div>Alice's Liquidity</div>
                <ul>
                  <li>{`$ART: 1 -> 0.1`}</li>
                  <li>{`$RUG: 10 -> 1M`}</li>
                </ul>
                <div className='des'>
                  As project, you get 3M $ART
                  As Alice, you lose 1 $ART and get 1M
                  valueless token.
                </div>
              </div>
            )
        }


      </AppBody>
    </>
  )
}

//465: {betterTradeLinkVersion && <BetterTradeLink version={betterTradeLinkVersion} />}
