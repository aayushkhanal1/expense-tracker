import { useState, useEffect } from "react";

import Navbar from "./Component/Navbar";
import Dashboard from "./Component/Dashboard";
import TransactionForm from "./Component/TransactionForm";
import TransactionList from "./Component/TransactionList";
import SearchBar from "./Component/SearchBar";
import FilterButtons from "./Component/FilterButton";

import "./App.css";

function App() {
  // Store transactions received from MongoDB
  const [transactions, setTransactions] = useState([]);

  // Search and filter
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Editing transaction
  const [editingId, setEditingId] = useState(null);

  // =========================
  // GET TRANSACTIONS
  // =========================

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/transactions"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();

        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // =========================
  // EDIT
  // =========================

  const startEdit = (id) => {
    setEditingId(id);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id, updatedTitle, updatedAmount,type) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            description: updatedTitle,
            amount: Number(updatedAmount),
            type: type,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }

      const updatedTransaction = await response.json();

      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction._id === id
            ? updatedTransaction
            : transaction
        )
      );

      setEditingId(null);
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  // =========================
  // DELETE
  // =========================

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) => transaction._id !== id
        )
      );
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  // =========================
  // DASHBOARD CALCULATIONS
  // =========================

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount || 0),
      0
    );

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount || 0),
      0
    );

  const balance = totalIncome - totalExpenses;

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        transaction.type === filter;

      return matchesSearch && matchesFilter;
    }
  );

  // =========================
  // UI
  // =========================

  return (
    <div className="app">

      <Navbar />

      <main className="container">

        <Dashboard
          balance={balance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        <TransactionForm
          setTransactions={setTransactions}
        />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <FilterButtons
          filter={filter}
          setFilter={setFilter}
        />

        <TransactionList
          transactions={filteredTransactions}
          deleteTransaction={deleteTransaction}
          startEdit={startEdit}
          editingId={editingId}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />

      </main>

    </div>
  );
}

export default App;