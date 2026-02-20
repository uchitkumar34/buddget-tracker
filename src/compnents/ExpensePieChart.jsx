import { } from 'lucide-react';
import React from 'react';
import { Cell, Legend, Pie, ResponsiveContainer, Tooltip, PieChart } from 'recharts';

const CATEGORY_COLORS = {
    Food: '#6366F1',
    Transport: '#06B6D4',
    Entertainment: '#A855F7',
    Utilities: '#14B8A6',
    Health: '#22C55E',
    Shopping: '#F97316',
    Other: '#64748B',
};


const ExpensePieChart = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return <div className="text-center text-gray-500">No expenses data to display</div>;
    }


    const getColor = (name) => {
        return CATEGORY_COLORS[name?.charAt(0).toUpperCase() + name.slice(1)] || '#8E9196';
    };

    const CustomToolTip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { name, value } = payload[0].payload;
            const total = data.reduce((sum, item) => sum + item.value, 0);
            const percentage = ((value / total) * 100).toFixed(0);

            return (
                <div className='bg-white rounded-md p-4 shadow-md border border-gray-100'>
                    <p className='font-medium'> {name} </p>
                    <p className='text-lg'>₹{value.toFixed(2)}
                    </p>
                    <span className='text-sm text-gray-500'> {percentage}% </span>
                </div>
            )
        }

        return null;
    }

    return (
        <>
            <ResponsiveContainer width='100%' height="300">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        label={false}
                        outerRadius={80}
                        fill='#8884d4'
                        dataKey="value"
                        animationDuration={750}
                        animationBegin={0}
                        animationEasing='ease-out' >

                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
                        ))}

                    </Pie>
                    <Tooltip content={<CustomToolTip />} />
                    <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        formatter={(value) => (
                            <span className="text-sm font-medium">{value}</span>
                        )}
                    />
                </PieChart>

            </ResponsiveContainer>
        </>
    )
}

export default ExpensePieChart;

