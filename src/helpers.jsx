// get item from local storage
export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(`Error parsing data for key ${key}:`, e);
    }
  }
  return null;
};

// waait for random 1.1 seconds
export const waait = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1100));

// generate random color for budget
const generateRandomColor = () => {
  const existingBudgetLenght = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLenght * 34} 65% 50%`;
};

// create budget
export const createBudget = ({ name, amount }) => {
  // create new item with random id, name, createdAt, amount and color
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  // get existing budgets from local storage or set it to empty array, and add new item to existing budgets and save it to local storage
  const existingBudgets = fetchData("budgets") ?? [];

  // add new item to existing budgets and save it to local storage, we use spread operator to add new item to existing budgets array and save it to local storage as a string
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// create Expense
export const createExpense = ({ name, amount, budgetId }) => {
  // create new item with random id, name, createdAt, amount and color
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  // get existing Expenses from local storage or set it to empty array, and add new item to existing Expenses and save it to local storage
  const existingExpenses = fetchData("expenses") ?? [];

  // add new item to existing Expenses and save it to local storage, we use spread operator to add new item to existing Expenses array and save it to local storage as a string
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// get all matching items for expense items and budgets items, with this function we can get all expenses for specific budget
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// delete account from local storage and log out user
export const deleteAccount = ({ key }) => {
  return localStorage.removeItem(key);
};

// delete item from local storage by key and id, key would be budgets or expenses and id would be id of item
export const deleteItem = ({ key, id }) => {
  const exsitingData = fetchData(key);
  if (id) {
    const newData = exsitingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// formating

// format date to locale string
export const formatDateToLocaleString = (date) =>
  new Date(date).toLocaleString();

export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

// total spent by budget id, we use this function to get total spent by budget id
export const totalSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];

  const budgetSpend = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    if (expense.budgetId === budgetId) return (acc += expense.amount);
  }, 0);
  return budgetSpend;
};

// formatting percentage for budget, we use this function to get percentage for budget
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
