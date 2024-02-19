import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { authService } from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const signup = async (data) => {
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/");
        setError("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={
          "mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10"
        }
      >
        <div className="mb-2 flex justify-center">
          <span className="inilne-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign in to your account
      </h2>
      <p className="mt-2 text-center text-base text-black/60">
        have an account? &nbsp;
        <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Log In
        </Link>
      </p>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit(signup)} className="mt-8">
        <div className="space-y-5">
          <Input
            label="Name: "
            placeholder="Enter your name"
            type="email"
            {...register("text", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password: "
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 20,
            })}
          />
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
