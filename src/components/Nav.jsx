import { Form, NavLink } from "react-router-dom";
import LogoMark from "../assets/logomark.svg";
import { BsFillTrashFill } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go To Home">
        <img src={LogoMark} alt="" height={30} />
        <span>Home Budget</span>
      </NavLink>
      {userName && (
        // this is a for for logout button, when user click this button, the user will be logged out
        <Form
          method="post"
          action="/logout"
          onSubmit={(e) => {
            console.log("Submit");
            // if this button is clicked, the user will be logged out and we send a popup to confirm the action with say "Delete User and All Data", and we say if user don't click the confirm button, the user will not be logged out and just refresh the page
            if (!confirm("Do you want to delete all data?")) {
              e.preventDefault();
            }
          }}
        >
          <button className="btn btn--warning">
            <span>Delete User</span>
            <BsFillTrashFill width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
