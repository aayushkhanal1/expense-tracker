import { useState } from "react";

function TransactionCard({
  title,
  amount,
  id,
  type,
  deleteTransaction,
  startEdit,
  editingId,
  saveEdit,
  cancelEdit,
}) {
  const isEditing = editingId === id;

  const [editTitle, setEditTitle] = useState(title);
  const [editAmount, setEditAmount] = useState(amount ?? "");

  return (
    <div className="transaction-card">

      {isEditing ? (

        // EDIT MODE
        <div>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <input
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
          />

          <button
            onClick={() => saveEdit(id, editTitle, editAmount,type)}
          >
            Save
          </button>

          <button onClick={cancelEdit}>
            Cancel
          </button>
        </div>

      ) : (

        // NORMAL MODE
        <div className="transaction-content">

          <div className="transaction-info">

            <div className={`transaction-icon ${type}`}>
              {type === "income" ? "↓" : "↑"}
            </div>

            <div>
              <h3>{title}</h3>
              <p>{type}</p>
            </div>

          </div>

          <div className="transaction-right">

            <p className={`transaction-amount ${type}`}>
              {type === "income" ? "+" : "-"} Rs. {amount}
            </p>

            <div className="transaction-actions">

              <button
                className="edit-btn"
                onClick={() => startEdit(id)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTransaction(id)}
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default TransactionCard;