import { redirect } from "react-router-dom";
import { deleteAccount } from "../helpers";
import { toast } from "react-toastify";

// this is a logout action we use inside a /logout route when user go to /logout route we call this action, and it's delete user from local storage and redirect user to login page
export async function logoutAction() {
  // delete user from local storage
  deleteAccount({
    key: "userName",
  });
  deleteAccount({
    key: "budgets",
  });
  deleteAccount({
    key: "expenses",
  });

  toast.success("You're Deleted Successfully");

  // return user to login page
  return redirect("/");
}
