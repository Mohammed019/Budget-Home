import { useRouteError, Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { IoReturnUpBackOutline } from "react-icons/io5";

const Error = () => {
  // this hook will get the error from the route and we can use it in this component, it mean when we have any error in any route, this component will be called and we can use the error in this component
  const error = useRouteError();
  // this hook will give us a navigate function to navigate to any route we want
  const navigate = useNavigate();

  // we show the error message for user and we have two button to go back or go to home page
  return (
    <div className="error">
      <h1>{`Uh oh! We've got a problem!`}</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <IoReturnUpBackOutline width={35} />
          <span>Go Back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <AiOutlineHome width={25} />
          <span>Go home!</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
