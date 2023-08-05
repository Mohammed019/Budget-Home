import { Link, useFetcher } from "react-router-dom";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";
import { BsFillTrashFill } from "react-icons/bs";

/* eslint-disable react/prop-types */
// we use showBudget prop to show budget name in expense page and hide it in home page
const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher(); // we use useFetcher hook to get fetcher object and use form method to delete expense

  // we use getAllMatchingItems function to get budget by id from budgets array
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0]; // we use [0] to get first item from array

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {/* we use showBudget prop to show budget name in expense page and hide it in home page */}
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            // we use css variable to set the accent color of budget item
            style={{
              "--accent": budget.color,
            }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <BsFillTrashFill width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
