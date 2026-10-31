import { useNavigate } from "react-router-dom";
function NotFound() {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/")
    }

    return (
        <div className="justify-center items-center text-center flex min-h-screen">
            <div>
                <h1 className="text-8xl mt-3 bold">404</h1>
                <span className="text-2xl">Not Found</span>
                <p className="text-gray-400 mt-4 text-base">the resourse requested could not be found on this server</p>

                <button className="bg-blue-500 mt-3 rounded p-2 cursor-pointer hover:bg-blue-600 hover:shadow-2xl"
                    onClick={handleNavigate}>HOME {"->"}</button>
            </div>
        </div>
    )
}

export default NotFound;