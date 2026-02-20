export const formatcurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(amount);
}

export const formateDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
};

export const getExpensesByCategory = (expenses = []) => {
    const categories = {
        food: 0,
        transport: 0,
        entertainment: 0,
        shopping: 0,
        utilities: 0,
        other: 0,
        health: 0,
    };
    expenses.forEach((expense) => {
        const category = expense?.category?.toLowerCase();
        const amount = Number(expense?.amount);
        if (categories[category] !== undefined && !isNaN(amount)) {
            categories[category] += amount;
        }
    });
    return categories;
};

export const getTotalExpenses = (expenses = []) => {
    return expenses.reduce((total, expense) => total + Number(expense?.amount || 0), 0);
};

export const getChartData = (expenses) => {
    const expensesByCategory = getExpensesByCategory(expenses);
    return Object.entries(expensesByCategory).filter(([__, value]) =>
        value > 0).map(([name, value]) =>
        ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value,
        }));
};

export const getCategoryTextColor = (category) => {
    const colors = {
        food: "text-indigo-500",
        transport: "text-sky-500",
        entertainment: "text-purple-500",
        shopping: "text-teal-500",
        utilities: "text-lime-500",
        other: "text-pink-500",
        health: "text-green-500",
    };

    return colors[category] || "text-red-500";
};

export const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
};

export const getExpensesByMonth = (expenses, numMonth = 6) => {
    const now = new Date();
    const resulte = {};
    for (let i = 0; i < numMonth; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthYear = `${getMonthName(d)} ${d.getFullYear()}`;
        resulte[monthYear] = 0;
    }
    expenses.forEach(expense => {
        const expenseDate = new Date(expense.date);

        const monthYear = `${getMonthName(expenseDate)} ${expenseDate.getFullYear()}`;

        if (resulte[monthYear] !== undefined) {
            resulte[monthYear] += expense.amount;
        };
    });
    return resulte;
};

