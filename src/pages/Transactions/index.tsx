import { useContext, useState } from "react";
import { Header } from "../../components/Header";
import Summary from "../../components/Summary";
import * as S from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { NewTransactionModal } from "../../components/NewTransactionModal";
import * as Dialog from "@radix-ui/react-dialog";
import { TransactionActionButton } from "../../components/TransactionActionButton";
import { CaretLeft, CaretRight } from "phosphor-react";

export default function Transactions() {
  const { transactions, deleteTransactions } = useContext(TransactionsContext);
  const [selectedId, setSelectedId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleOpenModal = (id: string) => {
    setSelectedId(id);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

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
              {paginatedTransactions.map((transaction) => {
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
            <S.PaginationContainer>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <CaretLeft size={20} />
              </button>

              <span>{currentPage}</span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < Math.ceil(transactions.length / itemsPerPage)
                      ? prev + 1
                      : prev
                  )
                }
                disabled={
                  currentPage >= Math.ceil(transactions.length / itemsPerPage)
                }
              >
                <CaretRight size={20} />
              </button>
            </S.PaginationContainer>
          </S.TransactionsTable>
        </S.TransactionsContainer>
      </S.Main>
    </div>
  );
}
