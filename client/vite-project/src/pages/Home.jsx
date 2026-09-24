import { useAuth } from '../context/AuthContext.jsx'


const Home = () => {
    const { user, logout } = useAuth()
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
            <p className="text-gray-500">@{user?.username}</p>
            <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Log out
            </button>
        </div>
    )
}

export default Home