import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    mode: "onChange",
  });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    const success = login(data.email, data.password);
    if (success) {
      navigate("/dashboard");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "At least 8 characters" },
            validate: {
              hasUpper: (v) => /[A-Z]/.test(v) || "Must contain at least one uppercase letter"
            }
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        {loginError && <p className="error">{loginError}</p>}

        <button type="submit" disabled={!isValid} className={isValid ? "btn" : "btn disabled"}>
          Login
        </button>
      </form>
      <p>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
