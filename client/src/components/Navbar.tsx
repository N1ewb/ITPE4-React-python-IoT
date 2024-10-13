import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const Navbar = () => {  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 500) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`flex flex-row h-[100px] w-full ${!scrolled? 'bg-indigo-800' : "bg-indigo-800 text-indigo-800"} items-center justify-between py-10 px-20 fixed z-10`} >
        <Link to='/'>
        <div className="logo-wrapper flex items-center">
        <img className="w-20" src="../Logo.png" alt="Logo" />
        <h1 className="ml-4 text-2xl text-white">Camera Vision</h1>
        </div>
        </Link>
        <div className="nav-links font-bold text-white cursor-pointer bg-transparent px-8 py-3 rounded-lg border-2 border-white transition-transform duration-300 ease-in-out hover:scale-105">
          <Link to="/auth/Login">Login</Link>
        </div>


    </div>
  )
}

export default Navbar