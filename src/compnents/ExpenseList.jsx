import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { toast } from 'react-toastify';
import { formatcurrency, formateDate, getCategoryTextColor } from '../utils/expenses';
import { Pencil, Trash2 } from 'lucide-react';
import UpdateExpenseModal from './UpdateExpenseModel';

const ExpenseList = () => {
    const { deleteExpense, expenses } = useExpenses()
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [editingExpense, setEditingExpense] = useState(null);

    const categoryOptons = [
        { value: "food", label: 'Food & Dining' },
        { value: "transport", label: 'Transportation' },
        { value: "entertainment", label: 'Entertainment' },
        { value: "shopping", label: 'Shopping' },
        { value: "utilities", label: 'Utilities' },
        { value: "health", label: 'Health & Medical' },
        { value: "other", label: 'Other' },
    ];

    const filterExpenses = expenses.filter((expense) =>
        categoryFilter === 'all' || expense.category === categoryFilter)

    const sortedExpenses = [...filterExpenses].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime())

    const handleDelete = (id) => {
        deleteExpense(id);
        toast.success("Delete expense successfully");
    }

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-3xl font-semibold text-gray-600'>Expenses History</h2>

                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className='bg-white px-9 py-1 rounded-md border border-gray-200 cursor-pointer border-none focus:outline-none focus:ring-2 focus:border-transparent focus:ring-expese-light  transition-all duration-200'>
                    <option value="all">All Categories</option>
                    {categoryOptons.map((item) => (
                        <option key={item.value} value={item.value}> {item.label} </option>
                    ))}
                </select>
            </div>

            {sortedExpenses.length === 0 ? (
                <div className='bg-white rounded-sm p-8 shadow-md text-center text-gray-500'>
                    <p className='mb-2'>No expense found</p>
                    {
                        categoryFilter !== 'all' && <p>
                            Try changing category filter or add new expenses.
                        </p>
                    }
                </div>
            ) : (
                <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                                <tr >
                                    <th scope='col' className='px-6 py-3 text-left text-md font-medium text-gray-600 tracking-wider uppercase'>
                                        Date
                                    </th>
                                    <th scope='col' className='px-6 py-3 text-left text-md font-medium text-gray-600 tracking-wider uppercase'>
                                        Descrition
                                    </th>
                                    <th scope='col' className='px-6 py-3 text-left text-md font-medium text-gray-600 tracking-wider uppercase'>
                                        Category
                                    </th>
                                    <th scope='col' className='px-6 py-3 text-left text-md font-medium text-gray-600 tracking-wider uppercase'>
                                        Amount
                                    </th>
                                    <th scope='col' className='px-6 py-3 text-left text-md font-medium text-gray-600 tracking-wider uppercase'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {sortedExpenses.map((expense) => (
                                    <tr key={expense.id} className='hover:bg-gray-100 transition-colors'>
                                        <td className='px-6 py-4 whitespace-nowrap text-gray-900 text-sm font-medium'> {formateDate(expense.date)} </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                                            {expense.description}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm'>
                                            <span className={`${getCategoryTextColor(expense.category)} font-medium`} >
                                                {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-gray-900 text-sm font-medium'> {formatcurrency(expense.amount)} </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-right flex justify-around'>
                                            <button
                                                onClick={() => setEditingExpense(expense)}
                                                className='text-blue-600 hover:text-blue-800 transition-colors cursor-pointer'
                                            >
                                                <Pencil size={22} />
                                            </button>
                                            <button onClick={() => handleDelete(expense.id)} className='text-red-600 hover:text-red-800 cursor-pointer transition-colors'>
                                                <Trash2 size={24} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            )}

            {editingExpense && (
                <UpdateExpenseModal expense={editingExpense} onClose={() => setEditingExpense(null)} />
            )}
        </div>
    );
}

export default ExpenseList;
