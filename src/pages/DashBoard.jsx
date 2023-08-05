// helper function
import { Link, useLoaderData } from "react-router-dom";
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../helpers";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// this is a dashboardaction that get request from the server and handle it, we have some hidden input and we can also get those inputs from the request, and we check if these input like _action is equal to newUser or createBudget and we handle it, we have a toastify package to show a toast message for user when we create a new user or create a new budget
export async function DashBoardAction({ request }) {
  await waait();

  // we get the form data from the request, what ever we send from the form we can get it from the request, and we set some hidden input in the form to send the action to the server to handle it there to know this is a new user or create a new budget
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  console.log(_action);

  if (_action === "newUser") {
    try {
      // create user if the action is newUser that we pass in hidden input
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName}`);
    } catch (error) {
      throw new Error("There was a problem creating your account.");
    }
  }
  if (_action === "createBudget") {
    try {
      // create budgets if the action is createBudget that we pass in hidden input
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success(`Budget Created`);
    } catch (error) {
      throw new Error("There was a problem creating your budget.");
    }
  }
  if (_action === "createExpense") {
    try {
      // create an Expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget, // we get the budgetId from the form
      });

      return toast.success(`Expense ${values.newExpense} Created`);
    } catch (error) {
      throw new Error("There was a problem creating your expense.");
    }
  }
  if (_action === "deleteExpense") {
    try {
      // Delete an Expense
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });

      return toast.success(`Expense Deleted`);
    } catch (error) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

// this is a loader function that we set for DashBoard as a loader instade of useeffect hook, we get a user in local storage and send it to DashBoard component, and we can use this user in DashBoard component
export const DashBoardLoder = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");

  return { userName, budgets, expenses };
};

const DashBoard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  // we check if user is exist in local storage we show the dashboard page for user, and if user is not exist in local storage we show the intro page for user to create a new user and start using the app
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back,
            <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <>
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      <Table
                        expenses={expenses
                          .sort((a, b) => b.createdAt - a.createdAt) // sort expenses by createdAt
                          .slice(0, 8)} // get first 8 expenses
                      />
                      {expenses.length > 8 && (
                        <Link to="expenses" className="btn btn--dark">
                          View All Expenses
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default DashBoard;
