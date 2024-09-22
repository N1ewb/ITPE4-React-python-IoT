import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex flex-row h-[100px] w-full bg-indigo-800 items-center justify-between py-10 px-20">
        <div className="logo-wrapper w-1/2"></div>
        <div className="nav-links flex flex-row justify-between w-1/2 text-white">
            <Link to='/'>Home</Link>
            <Link to='/auth/Login'>Login</Link>
            <Link to='/auth/Signup'>Signup</Link>
        </div>
    </div>
  )
}

export default Navbar