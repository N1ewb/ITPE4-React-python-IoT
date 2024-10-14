import { useRef } from "react";
import { axiosAPI } from "../lib/global";
import { Link } from "react-router-dom"

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if(!email && !password){
      alert("Please fill in fields")
      return;
    } 
    try{
      const response = await axiosAPI.post('/auth/login', {email, password})
    
      alert("Logged in successfuly")
    }catch(error:Error | any){
      if(error instanceof Error){
        alert(`Error in logging in: ${error.message}`)
      }else {
        alert("Unknown Error")
      }
    }
    
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100 p-10">
  <div className="login-content w-full max-w-md">
    <form
      className="bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6 border border-gray-200"
      onSubmit={handleSubmit}
    >
      <h1 className="text-indigo-800 text-4xl font-bold text-center mb-6">Login</h1>
      <input 
        type="text" 
        placeholder="Username" 
        ref={usernameRef} 
        className="border border-indigo-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input 
        type="password" 
        placeholder="Password" 
        ref={passwordRef} 
        className="border border-indigo-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button className="bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-800 transition duration-200" type="submit">
        Submit
      </button>
      <p className="text-center text-gray-600">
        Don't have an account? 
        <Link to='/auth/Signup' className="text-indigo-600 hover:underline"> Sign Up</Link>
      </p>
    </form>
  </div>
</div>


  );
};

export default Login;
