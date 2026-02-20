import React, { useState } from 'react';
import { getChartData, getExpensesByMonth } from '../utils/expenses';
import { useExpenses } from '../context/ExpenseContext';
import { BarChart, PieChart } from 'lucide-react';
import ExpensePieChart from './ExpensePieChart';
import ExpenseBarChart from './ExpenseBarChart';

const ExpenseChart = () => {
    const { expenses } = useExpenses();
    const [chartType, setChartType] = useState("pie")
    const chartData   = getChartData(expenses);
    const monthData = getExpensesByMonth(expenses);

    if (!expenses || expenses.length === 0) {
        return (
            <div className='bg-white rounded-lg shadow-md text-center p-6'>
                <h2 className='text-xl font-semibold text-gray-500'>Expenses Analytics</h2>
                <div className='flex justify-center mb-4 mt-4 space-x-4'>
                    <button onClick={() => setChartType("pie")} className={`flex items-center px-4 py-2 rounded-md transition-all cursor-pointer ${chartType === 'pie' ? 'bg-expese text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-300'}`}>
                        <PieChart size={18} className='mr-2' />
                        <span>Pie chart</span>
                    </button>
                    <button onClick={() => setChartType("bar")} className={`flex items-center px-4 py-2 rounded-md transition-all cursor-pointer ${chartType === 'bar' ? 'bg-expese text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-300'}`}>
                        <BarChart size={18} className='mr-2' />
                        <span>Bar chart</span>
                    </button>
                   
                </div>
                <p className='text-sm text-gray-500'> Add some expenses to see your spending analytic  </p>
            </div>
        )
    }

    return (
        <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold text-gray-500'>Expenses Analytics</h2>

            <div className='flex justify-center mb-4 mt-4 space-x-4'>
                <button onClick={() => setChartType("pie")} className={`flex items-center px-4 py-2 rounded-md transition-all cursor-pointer ${chartType === 'pie' ? 'bg-expese text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-300'}`}>
                    <PieChart size={18} className='mr-2' />
                    <span>Pie chart</span>
                </button>
                <button onClick={() => setChartType("bar")} className={`flex items-center px-4 py-2 rounded-md transition-all cursor-pointer ${chartType === 'bar' ? 'bg-expese text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-300'}`}>
                    <BarChart size={18} className='mr-2' />
                    <span>Bar chart</span>
                </button>
            </div>

            <div> {chartType === 'pie' ? <ExpensePieChart data={chartData} /> : <ExpenseBarChart data={monthData} />} </div>
        </div>
    );
}

export default ExpenseChart;
