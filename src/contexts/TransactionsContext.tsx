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

interface CreateTransactionInput {
  description: string;
  value: number;
  category: string;
  type: "entrada" | "saída";
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  deleteTransactions: (id: number) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: { _sort: "createdAt", q: query },
    });
    setTransactions(response.data);
  }

  async function deleteTransactions(id: number) {
    await api.delete(`/transactions/${id}`);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, value, category, type } = data;
    const response = await api.post("transactions", {
      description,
      value,
      category,
      type,
      date: new Date(),
    });
    setTransactions((prev) => [...prev, response.data]);
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
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
