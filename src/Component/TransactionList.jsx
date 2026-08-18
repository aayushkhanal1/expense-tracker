import TransactionCard from "./TransactionCard";

function TransactionList({
  transactions,
  deleteTransaction,
  startEdit,
  editingId,
  saveEdit,
  cancelEdit,
}) {
  return (
    <section className="transaction-section">
      <div className="transaction-header">
        <div>
          <h2>Transactions</h2>
          <p>View and manage your transactions.</p>
        </div>

        <span className="transaction-count">
          {transactions.length} transactions
        </span>
      </div>

      <div className="transaction-list">
        {transactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💰</div>

            <h3>No transactions yet</h3>

            <p>Add your first income or expense above.</p>
          </div>
        ) : (
          transactions.map((transaction) => (
  <TransactionCard
    key={transaction._id}
    title={transaction.description}
    amount={transaction.amount}
    id={transaction._id}
    type={transaction.type}
    deleteTransaction={deleteTransaction}
    startEdit={startEdit}
    editingId={editingId}
    saveEdit={saveEdit}
    cancelEdit={cancelEdit}
  />
))
        )}
      </div>
    </section>
  );
}

export default TransactionList;