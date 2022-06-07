import styled from "styled-components";
import OverviewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";
import React, {useState,useEffect} from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px;
  font-family: montserrat;
  width: 360px;
`;

const HomeComponent = (props) => {

    const [transactions, updateTransactions] = useState([]);
    const [expense, updateExpense] = useState(0);
    const [income, updateIncome] = useState(0);

    const addTransaction = (payload) =>{
        const transactionArray = [...transactions];
        transactionArray.push(payload);
        updateTransactions(transactionArray);
    }

    const calculateBalance = () => {
        let exp = 0;
        let inc = 0;
        transactions.map((payload)=>{
            payload.type === "EXPENSE"? (exp=exp+payload.amount) : (inc=inc+payload.amount)
        });
        updateExpense(exp);
        updateIncome(inc);
    }

    useEffect(()=>calculateBalance(), [transactions] )

  return (
    <Container>
      <OverviewComponent addTransaction={addTransaction} expense={expense} income={income} />
      <TransactionComponent transactions={transactions} />
    </Container>
  );
};

export default HomeComponent;
