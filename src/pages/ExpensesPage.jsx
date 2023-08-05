/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

export const ExpensesLoader = () => {
  const expenses = fetchData("expenses");

  return { expenses };
};

export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length})</small>
          </h2>
          <Table
            expenses={
              expenses.sort((a, b) => b.createdAt - a.createdAt) // sort expenses by createdAt
            }
          />
        </div>
      ) : (
        <p>No expenses yet</p>
      )}
    </div>
  );
};

export default ExpensesPage;
