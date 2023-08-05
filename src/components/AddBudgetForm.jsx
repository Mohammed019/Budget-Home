import { useFetcher } from "react-router-dom";
import { BiSolidDollarCircle } from "react-icons/bi";
import { useEffect, useRef } from "react";

// this is a custom component that uses the useFetcher hook and add a budget with the form, we use usefetcher instade a form because we want to use the usefetcher hook to handle the form submission and the loading state of the form, to know what is the state of the form like loading or submiting to update the UI by that
const AddBudgetForm = () => {
  const fetcher = useFetcher();
  // this is how we get state of form from usefetcher hook
  const isSubmitting = fetcher.state === "submitting";

  // we create these refs to reset the form after submiting and focus on the first input
  const formRef = useRef();
  const foucsRef = useRef();

  // when isSubmitting changes we reset the form and focus on the first input
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      foucsRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      {/* this is how we use usefetcher within form */}
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g, Groceries"
            required
            ref={foucsRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g, $350"
            required
            inputMode="decimal"
          />
          {/* we add this hidden input to send the action to the server to handle it there and we can use the same form for different actions like create budget and create user and so on */}
          <input type="hidden" name="_action" value="createBudget" />
        </div>
        {/* disabled the button when isSubmitting is true */}
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Budget</span>
              <BiSolidDollarCircle width={30} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
