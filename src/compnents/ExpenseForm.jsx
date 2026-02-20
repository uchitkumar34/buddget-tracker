import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { toast } from 'react-toastify';

const ExpenseForm = () => {

    const { addExpense } = useExpenses();
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categoryOptons = [
        { value: "food", label: 'Food & Dining' },
        { value: "transport", label: 'Transportation' },
        { value: "entertainment", label: 'Entertainment' },
        { value: "shopping", label: 'Shopping' },
        { value: "utilities", label: 'Utilities' },
        { value: "health", label: 'Health & Medical' },
        { value: "other", label: 'Other' },
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (!description.trim()) {
                throw new Error("Please enter a description");
            }
            if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
                throw new Error("Please enter a amount");
            }

            addExpense({
                description: description.trim(),
                amount: Number(amount),
                category,
                date,
            });
            toast.success("Expense Add Successfully");

            setDescription('');
            setAmount('');
            setCategory("");
            setDate(new Date().toISOString().split("T")[0]);

        } catch (error) {
            toast.error("Failed to add Expense")
        }
        finally {

        }
    }
    return (
        <div className='bg-white rounded-lg shadow-md w-full max-w-md mx-auto'>
            <h2 className='text-2xl font-semibold text-expese-dark mb-6 text-center'> Add new Expense </h2>
            <form onSubmit={handleSubmit} className='space-y-4 p-6'>
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-500 mb-1'>Description</label>
                    <input type="text" id='description' placeholder='what did you spend on' value={description} onChange={(e) => setDescription(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-expese-light focus:border-transparent transition-all duration-200 ' disabled={isSubmitting} />
                </div>
                <div>
                    <label htmlFor="amount" className='block text-sm font-medium text-gray-500 mb-1'>Amount</label>
                    <input type="number" id='amount' placeholder='0.00' value={amount} onChange={(e) => setAmount(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-expese-light focus:border-transparent transition-all duration-200 ' disabled={isSubmitting} />
                </div>
                <div>
                    <label htmlFor="category" className='block text-sm font-medium text-gray-500 mb-1'>Category</label>
                    <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-expese-light focus:border-transparent transition-all duration-200 ' disabled={isSubmitting} >
                        <option selected >Select Category</option>
                        {categoryOptons.map((item) => (
                            <option key={item.value} value={item.value} >
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className='block text-sm font-medium text-gray-500 mb-1'>Date</label>
                    <input type="date" id='date' placeholder='what did you spend on' value={date} onChange={(e) => setDate(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-expese-light focus:border-transparent transition-all duration-200 ' disabled={isSubmitting} />
                </div>
                <div>
                    <button className='w-full px-4 py-2  cursor-pointer bg-expese hover:bg-expese-dark  text-white rounded-lg transition-all duration-200 ' disabled={isSubmitting}> {isSubmitting ? 'Adding' : 'Add Expense'} </button>
                </div>
            </form>
        </div>
    );
}

export default ExpenseForm;
