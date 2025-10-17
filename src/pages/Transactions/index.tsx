import { useContext } from "react";
import { Header } from "../../components/Header";
import Summary from "../../components/Summary";
import * as S from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { Trash } from "phosphor-react";

export default function Transactions() {
  const { transactions, deleteTransactions } = useContext(TransactionsContext);

  console.log(transactions, "transactions page");

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
                        {transaction.type === "Saída" && "- "}
                        {priceFormatter.format(transaction.value)}
                      </S.PriceHighLight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>{dateFormatter.format(new Date(transaction.date))}</td>
                    <td>
                      <S.ButtonDelete
                        onClick={() => deleteTransactions(transaction.id)}
                      >
                        <Trash size={20} />
                      </S.ButtonDelete>
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
