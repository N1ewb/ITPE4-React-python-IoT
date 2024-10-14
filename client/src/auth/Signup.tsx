import { useRef } from "react";

const Signup: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    console.log("Submitted", { username, password, confirmPassword });
   
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100 p-10">
  <div className="login-content w-full max-w-md">
    <form
      className="bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6 border border-gray-200"
      onSubmit={handleSubmit}
    >
      <h1 className="text-indigo-800 text-4xl font-bold text-center mb-6">SIGN UP</h1>
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
      <input 
        type="password" 
        placeholder="Confirm Password" 
        ref={confirmPasswordRef} 
        className="border border-indigo-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        className="bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-800 transition duration-200"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</div>

  );
};

export default Signup;
