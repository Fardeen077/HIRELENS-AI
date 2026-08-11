import useAuthStore from "../store/useAuthStore";

function Sidebar() {
    const logout = useAuthStore((s) => s.logout);

    async function handleLogout() {
        try {
            await logout()
            console.log("Logout success");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-full bg-blue-300 w-55 flex">
            <div>
                sidebar
            </div>
            <button
                onClick={handleLogout}
                className="cursor-pointer">Logout</button>
        </div>
    )
}
export default Sidebar