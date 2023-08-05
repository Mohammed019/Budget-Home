import { useFetcher } from "react-router-dom";
import { BiSolidUserPlus } from "react-icons/bi";
import illustration from "../assets/illustration.jpg";
import { useEffect, useRef } from "react";

// this intro page is a like login page to create a new user and start using the app
const Intro = () => {
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
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal Budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
        <fetcher.Form method="post" ref={formRef}>
          <input
            ref={foucsRef}
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn--dark"
          >
            <span>Create Account</span>
            <BiSolidUserPlus width={30} />
          </button>
        </fetcher.Form>
      </div>
      <img src={illustration} alt="Person With Money" width={600} />
    </div>
  );
};

export default Intro;
