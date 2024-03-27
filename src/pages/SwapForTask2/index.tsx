import React, { useCallback, useContext } from 'react'
import { ArrowDown } from 'react-feather'
import { ThemeContext } from 'styled-components'
import { ButtonPrimary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { AutoRow } from '../../components/Row'
import { ArrowWrapper, BottomGrouping, Wrapper } from '../../components/swap/styleds'
import { Field } from '../../state/swap/actions'
import {
  useDerivedSwapInfo,
  useSwapActionHandlers
} from '../../state/swap/hooks'
import { useExpertModeManager } from '../../state/user/hooks'

import AppBody from '../AppBody'

enum TaskStatus {
  Init = 0,
  Ongoing = 1,
  Finish = 2,
}
interface PropType {
  taskStatus: TaskStatus,
  updateTaskStatus: any;
}
export default function Swap({ taskStatus, updateTaskStatus }: PropType) {
  const theme = useContext(ThemeContext)
  const [isExpertMode] = useExpertModeManager()

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
  const mtk = new MTK(18, "RUG", "My Token");

  const { currencies } = useDerivedSwapInfo()


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
          taskStatus == 0 || taskStatus == 1 ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>兑换</div>
              <Wrapper id="swap-page">
                <AutoColumn gap={'md'}>
                  <CurrencyInputPanel
                    label={'From'}
                    value={'3B'}
                    showMaxButton={false}
                    currency={mtk}
                    onUserInput={handleTypeInput}
                    otherCurrency={currencies[Field.OUTPUT]}
                    id="swap-currency-input"
                  />
                  <AutoColumn justify="space-between">
                    <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                      <ArrowWrapper clickable>
                        <ArrowDown
                          size="16"
                          color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? theme.primary1 : theme.text2}
                        />
                      </ArrowWrapper>
                    </AutoRow>
                  </AutoColumn>
                  <CurrencyInputPanel
                    value={'1B'}
                    onUserInput={handleTypeOutput}
                    label={'To'}
                    showMaxButton={false}
                    currency={currencies[Field.INPUT]}
                    otherCurrency={currencies[Field.INPUT]}
                    id="swap-currency-output"
                  />
                </AutoColumn>

                <BottomGrouping>
                  <ButtonPrimary onClick={updateTaskStatus}>Swap</ButtonPrimary>
                </BottomGrouping>
              </Wrapper>
            </>

          ) :
            (
              <div>
                <div> Liquidity in the pool</div>
                <div>{`$ART: 3M -> 1K`}</div>
                <div>{`$RUG: 30M -> 3B`}</div>
                <div>Alice's Liquidity</div>
                <div>{`$ART: 1 -> 0.1`}</div>
                <div>{`$RUG: 10 -> 1M`}</div>
                <div>
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
