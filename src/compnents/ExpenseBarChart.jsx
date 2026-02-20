import React from 'react';
import { formatcurrency } from '../utils/expenses';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ExpenseBarChart = ({ data }) => {
    
    const chartData = Object.entries(data).map(([name, value]) => ({
        name,
        amount: value,
    })).reverse();

    if(!data || Object.keys(data).length === 0) {
        return (
            <div className="text-center text-gray-500">
                No expenses data to display
            </div>
        );
    }


    const CustomToolTip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white rounded-md p-4 shadow-md border border-gray-100'>
                    <p className='font-medium'> {label} </p>
                    <p className='text-lg'> {formatcurrency(payload[0].value)} </p>
                </div>
            )
        }
        return null;
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={chartData}
                margin={{ top: 20, bottom: 60, right: 30, left: 20, }} >

                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" angle={-45} textAnchor='end' height={60} tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `₹ ${value}`} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomToolTip />} />
                <Bar dataKey="amount" radius={[4,4,0,0]} fill='#9b87f5' animationBegin={0} animationDuration={750} animationEasing="ease-out" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ExpenseBarChart;
