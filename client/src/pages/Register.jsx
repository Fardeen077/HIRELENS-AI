import CvScanningAnimation from "../components/CvScanningAnimation"
import { useForm } from "react-hook-form"
import useAuthStore from "../store/useAuthStore"

function Register() {
    const registerUser = useAuthStore((s) => s.register);
    const { register, handleSubmit, formState: {
        errors, isSubmitting
    } } = useForm();

    const handleRegister = async (userData) => {
        try {
            await registerUser(userData);
            console.log("Register success");
        } catch (error) {
            // console.error(error?.response?.data?.message);
            console.log(error);
        }
    }
    return (
        <form onSubmit={handleSubmit(handleRegister)}>

            <input
                type="text"
                placeholder="username"
                {...register("username", {
                    required: "Name is required",
                })}
            />

            {errors.username && <p>{errors.username.message}</p>}
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
                {isSubmitting ? "loading" : "register"}
            </button>

        </form>
    )
}

export default Register;