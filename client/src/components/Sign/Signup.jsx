import React, {useRef} from "react";
import { useForm } from "react-hook-form";
import ApiEndpoints from "../../api/apiEndpoints";
import AppPaths from "../../lib/appPaths";
import CookieUtil from "../../util/cookieUtil";
import ServerUrl from "../../api/serverUrl";
import { Link } from "react-router-dom";

const Signup = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  
  const password = useRef({});
  password.current = watch("password");
  const image = watch("image");

  const onSubmit = async (signupData) => {
    console.log(signupData);
    const formData = new FormData();
    Object.keys(signupData).forEach((key) => {
      formData.append(key, signupData[key]);
    });
    let successLoginData;
    let url = ServerUrl.BASE_URL + ApiEndpoints.SIGNUP;

    const options = {
      method: 'POST',
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(formData)
    }

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        successLoginData = data;
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

    if (successLoginData) {
      Object.keys(successLoginData).forEach((key) => {
        CookieUtil.setCookie(key, successLoginData[key]);
      });
      window.location.href = AppPaths.HOME;
    }


    if (successLoginData) {
      history.push({
        pathname: AppPaths.LOGIN,
        state: { redirectFrom: AppPaths.SIGN_UP },
      });
    }
  };

  return (
    <div id="authFormContainer">
      <div id="authForm">
        <h2 id="authTitle">Sign Up</h2>
        {errors.message && (
              <p className="requiredFieldError">{errors.message}</p>
            )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="text"
              placeholder="First Name"
              {...register("first_name", { required: true })}
            />
            {errors.first_name && (
              <p className="requiredFieldError">This field is required</p>
            )}
          </div>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="text"
              placeholder="Last Name"
              {...register("last_name", { required: true })}
            />
            {errors.last_name && (
              <p className="requiredFieldError">This field is required</p>
            )}
          </div>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="requiredFieldError">This field is required</p>
            )}
          </div>

          <div className="authFieldContainer">
            <input
              className="authField"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="requiredFieldError">This field is required</p>
            )}
          </div>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="password"
              name="passwordTwo"
              placeholder="Confirm Password"
              {...register("passwordTwo", {
                required: "This field is required",
                validate: (value) =>
                  value === password.current || "The passwords doesn't match",
              })}
            />
            {errors.passwordTwo && (
              <p className="requiredFieldError">
                {errors.passwordTwo?.message}
              </p>
            )}
          </div>
          <br />
          <button className="btn btn-outline-warning btn-block" type="submit">
            Sign Up
          </button>
        </form>
        <p id="authFormFooter">
          Already have an account. <Link to="/login">Click here</Link> to login.
        </p>
      </div>
    </div>
  );
};

export default Signup;
