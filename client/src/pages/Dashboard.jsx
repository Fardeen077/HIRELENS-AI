import useAuthStore from "../store/useAuthStore"

function Dashboard () {
    const authUser = useAuthStore((s) => s.authUser);
    
return (
    <div>
        <h1 className="text-white">Welcome, {authUser?.username}</h1>
    </div>
)
}
export default Dashboard