import React from 'react';
import { Redirect } from 'react-router-dom';
import AddLiquidity from './addLiquidityForTask1';
interface RedirectDuplicateTokenIdsProps {
  currencyIdA: string;
  currencyIdB: string;
  updateTaskStatus: (txs: string, memo: string) => void;
}
const RedirectDuplicateTokenIds: React.FC<RedirectDuplicateTokenIdsProps> = ({ currencyIdA, currencyIdB, updateTaskStatus }) => {
  if (currencyIdA.toLowerCase() === currencyIdB.toLowerCase()) {
    return <Redirect to={`/add/${currencyIdA}`} />;
  }
  return (
    <div style={{margin:'auto',width:'80%'}}>
      <AddLiquidity currencyIdA={currencyIdA} currencyIdB={currencyIdB} updateTaskStatus={updateTaskStatus} />
    </div>
  );
};

export default RedirectDuplicateTokenIds;
