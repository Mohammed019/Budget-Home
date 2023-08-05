// packages
import React from "react";
import ReactDOM from "react-dom/client";

// styles
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard, {
  DashBoardAction,
  DashBoardLoder,
} from "./pages/DashBoard.jsx";
import Error from "./pages/Error.jsx";
import MainLayout, { MainLayoutLoader } from "./layouts/MainLayout.jsx";
import { logoutAction } from "./actions/logout.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import ExpensesPage, {
  ExpensesLoader,
  expensesAction,
} from "./pages/ExpensesPage.jsx";
import BudgetPage, { BudgetAction, BudgetLoader } from "./pages/BudgetPage";
import { deleteBudget } from "./actions/deleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: MainLayoutLoader,
    errorElement: <Error />,
    // these are a children for te (/) route
    children: [
      // when user go to (/) route, this route will be called, we have an element in this route, this element is DashBoard component, this component is in pages folder, this component will show the dashboard page for user, and we set it as a index route instade of "path" prop it mean by default this component or this route will be called when user go to (/) route
      {
        index: true,
        element: <DashBoard />,
        loader: DashBoardLoder, // this is a loader for this route, it mean when user go to this route, this loader will be called, we have a function in this loader, this function is in DashBoard.jsx file in pages folder, this function will get the user data from local storage and send it to DashBoard component, and we can use this data in DashBoard component, we use this instade of useeffect hook
        action: DashBoardAction,
        errorElement: <Error />, // when we have any error inside this route, this errorElement will be called
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: BudgetLoader,
        action: BudgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: ExpensesLoader,
        action: expensesAction,
      },
      // this is logout route when user click logout button, this route will be called we have an action in this logout route, this action is on logout.js file in actions folder, this action will delete the user data from local storage and redirect the user to login page
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <Error />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* this is provider for react router */}
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
