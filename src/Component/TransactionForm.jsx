import { useState, useRef } from "react";

function TransactionForm({ setTransactions }) {
  const descriptionRef = useRef(null);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/transactions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            description: description.trim(),
            amount: Number(amount),
            type,
          }),
        }
      );

   if (!response.ok) {
  const errorData = await response.json();

  throw new Error(
    errorData.error || errorData.message
  );
}

      const newTransaction = await response.json();

      setTransactions((prevTransactions) => [
        newTransaction,
        ...prevTransactions,
      ]);

      setDescription("");
      setAmount("");
      setType("expense");
      setError("");

      descriptionRef.current.focus();
    } catch (error) {
      console.error("Failed to create transaction:", error);
      setError("error.message");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="transaction-form"
    >
      <h2>Add Transaction</h2>

      <div className="form-group">
        <label htmlFor="description">
          Description
        </label>

        <input
          ref={descriptionRef}
          type="text"
          id="description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Enter description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">
          Amount
        </label>

        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          placeholder="Enter amount"
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">
          Type
        </label>

        <select
          id="type"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option value="expense">
            Expense
          </option>

          <option value="income">
            Income
          </option>
        </select>
      </div>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      <button type="submit">
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;