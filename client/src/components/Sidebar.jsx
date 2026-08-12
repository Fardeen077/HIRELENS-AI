import useAuthStore from "../store/useAuthStore";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegMoon, FaSadCry } from "react-icons/fa";
import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { TbSparkles2Filled } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
    const logout = useAuthStore((s) => s.logout);
    const theme = useState(true);

    async function handleLogout() {
        try {
            await logout()
            console.log("Logout success");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        // Top Side 
        <nav className="h-full bg-gray-700 flex w-15 flex-col">
            <ul className="flex flex-col gap-5 items-center text-3xl text-black cursor-pointer pt-5">
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-white" : ""}>
                        <IoMdHome />
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/analyze" className={({ isActive }) => isActive ? "text-white" : ""}>
                        <TbSparkles2Filled />
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/resumes" className={({ isActive }) => isActive ? "text-white" : ""}>
                        <FaFileAlt />
                    </NavLink>
                </li>
            </ul>
            {/* End Side  */}
            <ul className="mt-auto flex flex-col items-center gap-5 pb-5 text-3xl text-black">
                <li className="">
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer"><IoIosLogOut size={20} />
                    </button>
                </li>

                <li>
                    <button className="cursor-pointer">{theme ? (
                        < MdOutlineWbSunny />
                    ) : (
                        <FaRegMoon />
                    )}</button>
                </li>

                <li>

                    <NavLink to="/settings">
                        <button
                            onClick={handleLogout}
                            className="cursor-pointer"><IoIosSettings size={20} />
                        </button>
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}
export default Sidebar