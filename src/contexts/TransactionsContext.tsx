import { createContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../services/axios";

interface Transaction {
  id: number;
  description: string;
  type: "entrada" | "saída";
  value: number;
  category: string;
  date: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  deleteTransactions: (id: number) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}
export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  console.log(transactions);

  async function fetchTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        _sort: "createdAt",
        q: query,
      },
    });

    setTransactions(response.data);
  }

  async function deleteTransactions(id: number) {
    await api.delete(`/transactions/${id}`);

    const filterIdTransaction = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(filterIdTransaction);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        deleteTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
