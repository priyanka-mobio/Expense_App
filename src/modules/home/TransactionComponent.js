import styled from "styled-components";
import React, { useState,useEffect} from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: montserrat;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  & input {
    padding: 10px 12px;
    border-redius: 12px;
    background: #e6e8e9;
    color: 1px solid #e6e8e9;
    outline: none;
    width: 92%;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  width: 90%;
  border-redius: 2px;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border: 2px solid #e6e8e9;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span> {props.payload.desc} </span>
      <span> {props.payload.amount} </span>
    </Cell>
  );
};

const TransactionComponent = (props) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(props.transactions);

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateTxn(txn)
  };

  useEffect (()=>filterData(searchText),[props.transactions])

  return (
    <Container>
      {" "}
      Transactions
      <input
        placeholder="Search"
        value={searchText}
      onChange={(e) => {updateSearchText(e.target.value);
      filterData(e.target.value)}}
      />
      {filteredTransaction?.length
        ? filteredTransaction.map((payload) => (
            <TransactionCell payload={payload} />
          ))
        : ""}
    </Container>
  );
};

export default TransactionComponent;
