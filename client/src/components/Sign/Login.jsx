import React from "react";
import { useForm } from "react-hook-form";
import ApiEndpoints from "../../api/apiEndpoints";
import AppPaths from "../../lib/appPaths";
import CookieUtil from "../../util/cookieUtil";
import ServerUrl from "../../api/serverUrl";
import { useEffect } from "react";
import GoogleSSO from "./GoogleSSO";
import CommonUtil from "../../util/commonUtil";
import { useNavigate, Link } from "react-router-dom";


function Login({ location }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  // redirect already logged in user to homepage
  useEffect(() => {
    if (CommonUtil.getUserId()) {
      navigate("/", {
        replace: true,
      });
    }
  }, []);

  const onSubmit = async (loginData) => {
    const formData = new FormData();
    Object.keys(loginData).forEach((key) => {
      formData.append(key, loginData[key]);
    });
    const options = {
      method: 'POST',
      body: formData
    };
    const url = ServerUrl.BASE_URL + ApiEndpoints.LOGIN;

    var successLoginData = await  fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

    if (successLoginData) {
      Object.keys(successLoginData).forEach((key) => {
        CookieUtil.setCookie(key, successLoginData[key]);
      });
      navigate(AppPaths.SHOP, {replace: true});
      window.location.reload();
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
          <p>OR</p>
          <GoogleSSO></GoogleSSO>

        </form>

        <p id="authFormFooter">
          Don't have any account! <Link to="/signup">Click here</Link> to
          singup.
        </p>

      </div>
      




    </div>
  )
}

export default Login