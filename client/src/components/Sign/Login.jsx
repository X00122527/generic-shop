import React from "react";
import { useForm } from "react-hook-form";
import ApiEndpoints from "../../api/apiEndpoints";
import AppPaths from "../../lib/appPaths";
import CookieUtil from "../../util/cookieUtil";
import ServerUrl from "../../api/serverUrl";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import GoogleSSO from "./GoogleSSO";

function Login({ location }) {



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (loginData) => {

    const options = {
      method: 'POST',
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(loginData)
    };
    const url = ServerUrl.BASE_URL + ApiEndpoints.LOGIN;
    let successLoginData;
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
  };

  const getLoginMessage = () => {
    if (
      location &&
      location.state &&
      location.state.redirectFrom === AppPaths.SIGN_UP
    ) {
      return (
        <div id="loginMessage">
          Your account has been created successfully. Please login.
        </div>
      );
    }
    return null;
  };

  return (
    // <div className='w-full mx-auto'>
    // <button 
    // onClick={googleAuth}
    // className='h-12 px-2 bg-white border-2 border-black rounded-lg w-fit'>Sign up with google</button>
    // </div>
    <div className='container grid w-1/3 p-10 mx-auto my-auto border-2 border-gray-400 rounded-lg gap-y-4'>
      {getLoginMessage()}
      <div>
        <span>Log in to your account</span>
      </div>
      <div className='grid gap-2'>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="authFieldContainer">
            <input
              className="w-full my-2"
              type="email"
              placeholder="Email"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="requiredFieldError">This field is required</p>
            )}
          </div>
          <div className="authFieldContainer">
            <input
              className="w-full"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="requiredFieldError">This field is required</p>
            )}
          </div>
          <br />
          <button className="w-full p-2 border-2 border-black btn-block" type="submit">
            Login
          </button>
        </form>

        <p id="authFormFooter">
          Don't have any account! <Link to="/signup">Click here</Link> to
          singup.
        </p>
      </div>
      



<GoogleSSO></GoogleSSO>

    </div>
  )
}

export default Login