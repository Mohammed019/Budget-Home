// folder
import { deleteItem, getAllMatchingItems } from "../helpers";

// packages
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

// this action is called when a user deletes a budget and it's delete all the expenses associated with it
export const deleteBudget = ({ params }) => {
  try {
    // we delete the budget by passing the key and the id of the budget
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    console.log("params", params);

    // we get all the expenses associated with the budget and delete them
    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.filter((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully");
  } catch (error) {
    throw new Error("There was a problem deleting your budget.");
  }

  // then re direct the user to the home page
  return redirect("/");
};
