import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

/* eslint-disable react/prop-types */
const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const formRef = useRef();
  const foucsRef = useRef();

  // this is how we get state of form from usefetcher hook
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      foucsRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g, Coffee"
              required
              ref={foucsRef}
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              name="newExpenseAmount"
              id="newExpenseAmount"
              step="0.01"
              inputMode="decimal"
              placeholder="e.g, 3.50"
              required
            />
          </div>
        </div>

        {/* We hide the budget category if we have only one budget, if we have more than one budget we show the budget category, then we map over budgets and show the budgets name as a option, we set the value of option to budget id, so when we submit the form we can get the budget id from the form data, we use hidden attribute to hide the budget category if we have only one budget */}
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget">
            {budgets
              // We sort the budgets by createdAt date it mean we sort the budgets by date that we create them
              .sort((a, b) => (a.createdAt = b.createdAt))
              .map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Expense</span>
              <CiCirclePlus width={30} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
