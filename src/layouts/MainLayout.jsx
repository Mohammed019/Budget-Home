// helper function
import { useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { fetchData } from "../helpers";
// assets
import wave from "../assets/wave.svg";
// components
import Nav from "../components/Nav";

const MainLayout = () => {
  // we get the user name from the MainLayoutLoder function with useLoaderData hook
  const { userName } = useLoaderData();

  return (
    <div>
      {/* we set a userName prop for Nav component and send the user name to Nav component */}
      <Nav userName={userName} />

      <main>
        {/* outlet mean we set all MainLayout children routes inside this outlet */}
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

// this is a loader function that we set for mainLayout as a loader instade of useeffect hook, we get a user in local storage and send it to mainLayout component, and we can use this user in mainLayout component
export const MainLayoutLoader = () => {
  // we use a fetchData function from helpers.jsx file to get the user data from local storage
  const userName = fetchData("userName");

  return { userName };
};

export default MainLayout;
