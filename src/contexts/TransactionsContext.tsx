import { createContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../services/axios";

interface Transaction {
  id: string;
  description: string;
  type: "entrada" | "saída";
  value: number;
  category: string;
  date: string | Date;
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
  deleteTransactions: (id: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  fetchTransactionById: (id: string) => Promise<Transaction | null>;
  editTransaction: (data: Transaction) => Promise<void>;
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

  async function fetchTransactionById(id: string) {
    try {
      const response = await api.get(`/transactions?id=${id}`);
      return response.data[0];
    } catch (error) {
      console.error("Erro ao buscar transação:", error);
      return null;
    }
  }

  async function editTransaction(data: Transaction) {
    const { id, description, value, category, type } = data;
    await api.put(`/transactions/${id}`, {
      description,
      value,
      category,
      type,
      date: new Date(),
    });

    await fetchTransactions();
  }

  async function deleteTransactions(id: string) {
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
        fetchTransactionById,
        editTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
