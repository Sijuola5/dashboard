import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type FormValues = {
  email: string;
  password: string;
};

const SignUp = () => {
  const { signup } = useAuth();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    signup(data);
    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
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

        <button type="submit" disabled={!isValid} className={isValid ? "btn" : "btn disabled"}>
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
