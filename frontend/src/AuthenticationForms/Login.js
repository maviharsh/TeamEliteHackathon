import { useState} from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify';

export default function LoginForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState(null);

  const navigate = useNavigate();

  const initial ={
    email: "",
    password: "",
  };

  const SignInValidationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter the password"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initial,
    validationSchema: SignInValidationSchema,
    onSubmit: async (e, { resetForm }) => {
      setLoading(true);
    
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/loginform`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          credentials:"include",
        }
      );
    
        const json = await response.json();
    
        if (!response.ok) {
          throw new Error(json.error || "Something went wrong. Please try again.");
        }
    
        setData(json);
        console.log(json);
    
        // Success actions
        resetForm();
        navigate("/");
      } catch (error) {
        console.error("Signup error:", error.message);
        toast(error.message);
      } finally {
        setLoading(false);
      }
    },});
  const isValid =values.email && values.password ;

  return (
    
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form onSubmit={handleSubmit}
          encType="multipart/form-data" className="mx-auto max-w-[24rem] text-left">

          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            />
          </div>
          <ToastContainer />
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <div>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            //   type={passwordShown ? "text" : "password"}
            //   icon={
            //     <i onClick={togglePasswordVisiblity}>
            //       {passwordShown ? (
            //         <EyeIcon className="h-5 w-5" />
            //       ) : (
            //         <EyeSlashIcon className="h-5 w-5" />
            //       )}
            //     </i>
            //   }
              name="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              type="password"
            />
            </div>
                  {errors.password && <small>{errors.password}</small>}

          </div>
          <Button  size="lg" type="submit" className="mt-6 p-3 bg-black" fullWidth disabled={!isValid}>
            {loading ? "Submitting..." : "SIGN IN"}
          </Button>
          
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <Link to="/register">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

