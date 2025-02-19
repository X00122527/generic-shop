import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import ApiEndpoints from "../../api/apiEndpoints";
import AppPaths from "../../lib/appPaths";
import CookieUtil from "../../util/cookieUtil";
import ServerUrl from "../../api/serverUrl";
import { useNavigate, Link } from "react-router-dom";
import GoogleSSO from "./GoogleSSO";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  let navigate = useNavigate();

  const password = useRef({});
  password.current = watch("password");

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
      body: formData,
    }

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('data', data);
        successLoginData = data;
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

    if (successLoginData) {
      Object.keys(successLoginData).forEach((key) => {
        CookieUtil.setCookie(key, successLoginData[key]);
      });
    }

    console.log('successLoginData', successLoginData)

    if (successLoginData) {
      navigate(AppPaths.LOGIN, { replace: true });
      window.location.reload();
    }
  };

  return (
      <div class="flex flex-col items-center px-6 mx-auto  lg:py-0">

        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <GoogleSSO></GoogleSSO>
            <div class="inline-flex items-center justify-center w-full">
              <hr class="w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
              <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} class="space-y-4 md:space-y-6" >
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"  id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
              </div>
              <div>
                <label for="f_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input
                  {...register("first_name", { required: true })}
                  type="text" id="f_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
              </div>
              <div>
                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input
                  {...register("last_name", { required: true })}
                  type="text"  id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  {...register("password", { required: true })}
                  type="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
              </div>
              <div>
                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input
                  {...register("passwordTwo", {
                    required: "This field is required",
                    validate: (value) =>
                      value === password.current || "The passwords doesn't match",
                  })}
                  type="password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                {errors.passwordTwo && (
                  <p className="requiredFieldError">
                    {errors.passwordTwo?.message}
                  </p>
                )}
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                </div>
              </div>
              <button type="submit" class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/login"><span className="font-medium text-black hover:underline dark:text-primary-500">Log in here</span></Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Signup;
