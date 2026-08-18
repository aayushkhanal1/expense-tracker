function Dashboard({ balance, totalIncome, totalExpenses }) {
  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Here's your financial overview.</p>
      </div>

      <div className="dashboard-cards">

        <div className="summary-card balance-card">
          <p className="card-label">Total Balance</p>
          <h3>Rs. {balance}</h3>
        </div>

        <div className="summary-card income-card">
          <p className="card-label">Income</p>
          <h3>Rs. {totalIncome}</h3>
        </div>

        <div className="summary-card expense-card">
          <p className="card-label">Expenses</p>
          <h3>Rs. {totalExpenses}</h3>
        </div>

      </div>
    </section>
  );
}

export default Dashboard;