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