import React from 'react';
import { Redirect } from 'react-router-dom';
import AddLiquidity from './addLiquidityForTask1';
interface RedirectDuplicateTokenIdsProps {
  currencyIdA: string;
  currencyIdB: string;
  updateTaskStatus:(txs:string)=>void;
}
const RedirectDuplicateTokenIds: React.FC<RedirectDuplicateTokenIdsProps> = ({ currencyIdA, currencyIdB, updateTaskStatus }) => {
  if (currencyIdA.toLowerCase() === currencyIdB.toLowerCase()) {
    return <Redirect to={`/add/${currencyIdA}`} />;
  }
  return (
    <>
      <AddLiquidity currencyIdA={currencyIdA} currencyIdB={currencyIdB} updateTaskStatus={updateTaskStatus}/>
    </>
  );
};

export default RedirectDuplicateTokenIds;
