import { createContext, useContext, useEffect, useReducer } from "react";

const ExpeseContext = createContext();

const initialState = {
  expenses:JSON.parse(localStorage.getItem('expenses'))|| [],
  loading: false,
  error: null,
}

const ExpenseReducer  = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "DELETE_EXPENSE":
      return { ...state, expenses: state.expenses.filter((expense) => expense.id !== action.payload.id) }
    case "UPDATE_EXPENSE":
      return { ...state, expenses: state.expenses.map((expense) => expense.id === action.payload.id ? action.payload : expense) }
    case "SET_EXEPENSE":
      return { ...state, expenses: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state
  }

}

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExpenseReducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem('expenses', JSON.stringify(state.expenses))
    } catch (error) {
      console.error("Fail to save expenses", error);
      dispatch({ type: "SET_ERROR", payload: error })
    }
  }, [state.expenses])

  const value = {
    ...state,
    addExpense: (expense) => {
      const newExpense = {
        ...expense,
        id: crypto.randomUUID(),
      };
      dispatch({ type: "ADD_EXPENSE", payload: newExpense })
    },
    deleteExpense: (id) => {
      dispatch({ type: "DELETE_EXPENSE", payload: { id } })
    },
    updateExpense: (expense) => {
      dispatch({ type: "UPDATE_EXPENSE", payload: expense })
    }
  };

  return <ExpeseContext.Provider value={value}>
    {children}
  </ExpeseContext.Provider>
}

export const useExpenses = () => {
  const context = useContext(ExpeseContext);
  if (context === undefined) {
    throw new Error("use context not find");
  }
  return context;
}
