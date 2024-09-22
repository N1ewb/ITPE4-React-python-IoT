import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Layout = () => {



  return (
    <div className="h-screen w-full flex flex-col ">
      <div className="layout-header">
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout