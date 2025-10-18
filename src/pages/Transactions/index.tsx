import { useContext, useState } from "react";
import { Header } from "../../components/Header";
import Summary from "../../components/Summary";
import * as S from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { NewTransactionModal } from "../../components/NewTransactionModal";
import * as Dialog from "@radix-ui/react-dialog";
import { TransactionActionButton } from "../../components/TransactionActionButton";

export default function Transactions() {
  const { transactions, deleteTransactions } = useContext(TransactionsContext);
  const [selectedId, setSelectedId] = useState("");

  const handleOpenModal = (id: string) => {
    setSelectedId(id);
  };

  console.log(transactions, "transactions");

  return (
    <div>
      <Header />
      <S.Main>
        <Summary />

        <S.TransactionsContainer>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button>Adicionar nova transação</button>
            </Dialog.Trigger>

            <NewTransactionModal mode="register" />
          </Dialog.Root>
          <S.TransactionsTable>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td width="44%">{transaction.description}</td>
                    <td>
                      <S.PriceHighLight variant={transaction.type}>
                        {transaction.type === "saída" && "- "}
                        {priceFormatter.format(transaction.value)}
                      </S.PriceHighLight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      {transaction?.date
                        ? dateFormatter.format(new Date(transaction.date))
                        : ""}
                    </td>
                    <td>
                      <TransactionActionButton
                        id={transaction.id}
                        icon="eye"
                        mode="view"
                        onClick={handleOpenModal}
                        selectedId={selectedId}
                      />

                      <TransactionActionButton
                        id={transaction.id}
                        icon="pencil"
                        mode="edit"
                        onClick={handleOpenModal}
                        selectedId={selectedId}
                      />

                      <TransactionActionButton
                        id={transaction.id}
                        icon="trash"
                        onClick={deleteTransactions}
                      />
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
