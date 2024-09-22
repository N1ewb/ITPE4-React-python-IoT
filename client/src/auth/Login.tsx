import { useRef } from "react";

const Login: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    console.log("Submitted", { username, password });
    
  };

  return (
    <div className="w-full flex flex-col h-screen items-center justify-center gap-10 p-20 [&_h1]:text-indigo-800 [&_h1]:text-4xl font-bold">
      <div className="login-header"><h1>LOGIN</h1></div>
      <div className="login-content w-1/2">
        <form
          className="p-10 shadow-md rounded-3xl flex flex-col gap-3 [&_input]:border-indigo-600 [&_input]:border-solid [&_input]:border-[1px] [&_input]:rounded-lg [&_input]:p-3"
          onSubmit={handleSubmit}
        >
          <input type="text" placeholder="Username" ref={usernameRef} />
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
