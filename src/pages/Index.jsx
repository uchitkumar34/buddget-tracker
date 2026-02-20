
import { ExpenseProvider } from '../context/ExpenseContext';
import DashboardLayout from '../DashboardLayout';
import Dashboard from '../compnents/Dashboard'
import ExpenseSummry from '../compnents/ExpenseSummry';

const Index = () => {
  return (
    <ExpenseProvider>
      <DashboardLayout >
        <Dashboard />
      </DashboardLayout>
    </ExpenseProvider>
  );
}

export default Index;
