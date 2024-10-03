import { useRef } from "react";
import { axiosAPI } from "../lib/global";

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
      return response
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
    <div className="w-full flex flex-col h-screen items-center justify-center gap-10 p-20 [&_h1]:text-indigo-800 [&_h1]:text-4xl font-bold">
      <div className="login-header"><h1>LOGIN</h1></div>
      <div className="login-content w-1/2">
        <form
          className="p-10 shadow-md rounded-3xl flex flex-col gap-3 [&_input]:border-indigo-600 [&_input]:border-solid [&_input]:border-[1px] [&_input]:rounded-lg [&_input]:p-3"
          onSubmit={handleSubmit}
        >
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <button className="bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-800" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
