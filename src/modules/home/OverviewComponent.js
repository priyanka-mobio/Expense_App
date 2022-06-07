import styled from "styled-components";
import React, { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 100%;
`;

const BalanceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  width: 100%;
  font-weight: bold;
`;

const AddTranSaction = styled.button`
  background: black;
  color: white;
  padding: 5px 10px;
  border-redius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
`;

const AddTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px;
  border: 3px solid #e6e8e9;
  gap: 10px;
  width: 100%;
  padding: 15px 20px;
  margin: 20px;
  & input {
    outline: none;
    padding: 10px 12px;
    border-redius: 4px;
    border: 1px solid #e6e8e9;
  }
`;
const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  width: 100%;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

const AddTranSactionView = (props) => {
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState();
  const [type, setType] = useState("EXPENSE");

  const addTransaction = () => {
    props.addTransaction({
      amount: Number(amount),
      desc,
      type,
      id: Date.now(),
    });
    props.toggleAddtxn();
  };

  return (
    <AddTransactionContainer>
      <input
        placeholder="Amount"
        value={amount}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense"> Expense </label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense"> Income </label>
      </RadioBox>
      <AddTranSaction onClick={addTransaction}> AddTransaction </AddTranSaction>
    </AddTransactionContainer>
  );
};

const ExpenseContainer = styled.div`
    display: flex;
    flex-direction:row;
    gap:12px;
    margin:20px;
`

const ExpenseBox = styled.div`
    display: flex;
    flex-direction:column;
    border-redius:4px;
    border: 2px solid #e6e8e9;
    padding: 15px 20px; 
    width:135px;
    font-size:15px;
    & span{
        font-weight:bold;
        font-size:20px;
        color: ${(props) => (props.isIncome?`green`:`red`)}
    }
`

const OverviewComponent = (props) => {
  const [isAddTxnVisible, toggleAddtxn] = useState(false);

  return (
    <Container>
      <BalanceBox>
        Balance:${props.income - props.expense}
        <AddTranSaction onClick={() => toggleAddtxn(!isAddTxnVisible)}>
          {" "}
          {isAddTxnVisible ? "Cancel" : "ADD"}
        </AddTranSaction>
      </BalanceBox>
      {isAddTxnVisible && (
        <AddTranSactionView
          toggleAddtxn={toggleAddtxn}
          addTransaction={props.addTransaction}
        />
      )}

    <ExpenseContainer> 
        <ExpenseBox isIncome={false}>  
             Expense <span>${props.expense} </span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>  
             Income<span>$ {props.income} </span>
        </ExpenseBox>
    </ExpenseContainer>

    </Container>
  );
};

export default OverviewComponent;
