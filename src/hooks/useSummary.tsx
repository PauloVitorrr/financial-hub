import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "entrada") {
        acc.entrada += transaction.value;
        acc.total += transaction.value;
      } else {
        acc.saida += transaction.value;
        acc.total -= transaction.value;
      }

      return acc;
    },
    {
      entrada: 0,
      saida: 0,
      total: 0,
    }
  );
  return summary;
}
