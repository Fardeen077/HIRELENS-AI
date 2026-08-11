import CvScanningAnimation from "../components/CvScanningAnimation"
import { useForm } from "react-hook-form"
import useAuthStore from "../store/useAuthStore"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom"

function Register() {
    const registerUser = useAuthStore((s) => s.register);
    const isAuthLoading = useAuthStore((s) => s.isAuthLoading);
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
        <div className="flex items-center justify-center gap-10 min-h-screen">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit(handleRegister)}
                    className="text-white bg-[#4A3B39] flex flex-col gap-4 p-6 rounded-xl">
                    <div className="text-center mb-2">
                        <h1 className="text-2xl font-semibold">Create Account</h1>
                        <p className="text-sm">
                            Sign up to get started
                        </p>
                    </div>
                    <input
                        className="p-2 rounded border-2 focus:outline-none"
                        type="text"
                        placeholder="username"
                        {...register("username", {
                            required: "Name is required",
                        })}
                    />

                    {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
                    <input
                        className="p-2 rounded border-2 focus:outline-none"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />

                    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                    <input
                        className="p-2 rounded border-2 focus:outline-none"
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
                    {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

                    <button disabled={isAuthLoading}
                        className="bg-[#241401] rounded p-2 cursor-pointer">
                        {isAuthLoading ? (
                            <>
                                <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin inline mr-2" />
                                Register
                            </>
                        ) : (
                            "Create Account"
                        )}

                    </button>
                    <p className="text-sm text-center mt-4">
                        you have already account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>

            <div className="mt-2 hidden lg:block">
                <CvScanningAnimation />
            </div>
        </div>
    )
}

export default Register;