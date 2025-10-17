import { useContext } from "react";
import { Header } from "../../components/Header";
import Summary from "../../components/Summary";
import * as S from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";

export default function Transactions() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <div>
      <Header />
      <S.Main>
        <Summary />

        <S.TransactionsContainer>
          {/* <SearchForm /> */}
          <button>Olá</button>
          <S.TransactionsTable>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                      <S.PriceHighLight variant={transaction.type}>
                        {transaction.type === "outcome" && "- "}
                        {/* {priceFormatter.format(transaction.price)} */}
                      </S.PriceHighLight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      {/* {dateFormatter.format(new Date(transaction.createdAt))} */}
                    </td>
                    <td>
                      {/* <ButtonDelete
                        onClick={() => deleteTransactions(transaction.id)}
                      >
                        <Trash size={20} />
                      </ButtonDelete> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </S.TransactionsTable>
        </S.TransactionsContainer>
      </S.Main>
    </div>
  );
}
