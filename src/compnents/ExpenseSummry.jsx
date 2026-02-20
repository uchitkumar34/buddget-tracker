import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatcurrency, getExpensesByCategory, getTotalExpenses, } from '../utils/expenses'
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

const ExpenseSummry = () => {
  const { expenses } = useExpenses()
  const categoriesData = getExpensesByCategory(expenses || {});
  const totalExpenses = getTotalExpenses(expenses);

  let highestCategory = {
    name: "none",
    amount: 0,
  }

  Object.entries(categoriesData).forEach(([category, amount]) => {
    if (amount > highestCategory.amount) {
      highestCategory = { name: category, amount };
    }
  });

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <div className='bg-white shadow-md p-6 rounded-lg hover:shadow-lg w-auto'>
        <div className='flex items-center space-x-4'>
          <div className='bg-slate-100 rounded-full p-3'>
            <Wallet size={24} strokeWidth={1.5} className='text-expese' />
          </div>
          <div>
            <h2 className='text-sm font-medium text-gray-500'>Total Expenses</h2>
            <p className='text-2xl font-bold text-expese-dark'> {formatcurrency(totalExpenses)} </p>
          </div>
        </div>
      </div>
      <div className='bg-white shadow-md p-6 rounded-lg hover:shadow-lg w-auto'>
        <div className='flex items-center space-x-4'>
          <div className='bg-red-100 rounded-full p-3'>
            <TrendingUp size={24} strokeWidth={1.5} className='text-red-500' />
          </div>
          <div>
            <h2 className='text-sm font-medium text-gray-500'>Highest Expenses</h2>
            <p className='text-2xl font-bold text-expese-dark'>
              {highestCategory.name !== "none" ? (
                <>
                  <span className='capitalize'> {highestCategory.name} </span>
                  <span className='text-red-500'> &nbsp; {formatcurrency(highestCategory.amount)} </span>
                </>
              ) : ("none")
              }

            </p>
          </div>
        </div>
      </div>
      <div className='bg-white shadow-md p-6 rounded-lg hover:shadow-lg w-auto'>
        <div className='flex items-center space-x-4'>
          <div className='bg-green-100 rounded-full p-3'>
            <TrendingDown size={24} strokeWidth={1.5} className='text-green-500' />
          </div>
          <div>
            <h2 className='text-sm font-medium text-gray-500'>Total Entries</h2>
            <p className='text-2xl font-bold text-expese-dark'>
              {expenses.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseSummry;
