/* eslint-disable react/prop-types */
import { Form, Link } from "react-router-dom";
import {
  formatCurrency,
  formatPercentage,
  totalSpentByBudget,
} from "../helpers";
import { BsBank2, BsFillTrashFill } from "react-icons/bs";

// we use showDelete prop to show delete button in budget page and hide it in home page
const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  // we use totalSpentByBudget function to get total spent by budget id
  const spent = totalSpentByBudget(id);

  return (
    <div
      className="budget"
      // we use css variable to set the accent color of budget item
      style={{
        "--accent": color,
      }}
    >
      {
        <>
          <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency(amount)} Bugeted</p>
          </div>
          {/* we use progress element to show progress bar, we set the value of progress element to spent and max to amount, we use formatPercentage function to format percentage */}
          <progress value={spent} max={amount}>
            {/* we use formatPercentage function to format percentage, we divide amount by spent to get percentage */}
            {formatPercentage(amount / spent)}
          </progress>
          <div className="progress-text">
            {/* we use formatCurrency function to format currency, we subtract spent from amount to get remaining amount  */}
            <small>{formatCurrency(spent)} spent</small>
            <small>{formatCurrency(amount - spent)} remaining</small>
          </div>
          {/* we use showDelete prop to show delete button in budget page and hide it in home page, and then if user want to delete budget we show confirm message */}
          {showDelete ? (
            <div className="flex-sm">
              <Form
                method="post"
                action="delete"
                onSubmit={(e) => {
                  // we user confirm function to show confirm message to user when user click delete button and if user click ok button, we delete the budget
                  if (
                    !confirm(
                      "Are you sure you want to permanently delete this budget?"
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <button type="submit" className="btn">
                  <span>Delete Budget</span>
                  <BsFillTrashFill width={20} />
                </button>
              </Form>
            </div>
          ) : (
            <div className="flex-sm">
              <Link to={`/budget/${id}`} className="btn">
                <span>View Details</span>
                <BsBank2 width={20} />
              </Link>
            </div>
          )}
        </>
      }
    </div>
  );
};

export default BudgetItem;
