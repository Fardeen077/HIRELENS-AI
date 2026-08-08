import CvScanningAnimation from "../components/CvScanningAnimation"
import { useForm } from "react-hook-form"
import useAuthStore from "../store/useAuthStore"

function Login() {
    const loginUser = useAuthStore((s) => s.login);
    const { register, handleSubmit, formState: {
        errors, isSubmitting
    } } = useForm();

    const handleLogin = async (userData) => {
        try {
            await loginUser(userData);
            console.log("Register success", userData);
        } catch (error) {
            console.error(error?.response?.data?.message);
             console.error("LOGIN ERROR:", error);
        }
    }
    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <input
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: "Email is required",
                })}
            />

            {errors.email && <p>{errors.email.message}</p>}
            <input
                type="password"
                placeholder="Password"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                    },
                })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button disabled={isSubmitting}>
                {isSubmitting ? "loading" : "login"}
            </button>

        </form>
    )
}

export default Login;