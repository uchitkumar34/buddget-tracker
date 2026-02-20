import ExpenseChart from "./ExpenseChart";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummry from "./ExpenseSummry";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Expensive summey  */}
      <ExpenseSummry />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">

          {/*Expensive chart */}
          <ExpenseChart />
        </div>

        <div>
          {/* Expenses form  */}
          <ExpenseForm />
        </div>
      </div>
      <ExpenseList />
    </div>
  );
}

export default Dashboard;
