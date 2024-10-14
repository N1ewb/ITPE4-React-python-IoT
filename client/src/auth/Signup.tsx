import { useRef } from "react";
import axios from "axios";
import { axiosAPI } from "../lib/global";

const Signup= () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!username || !password || password !== confirmPassword) {
      alert("Please fill out all fields and ensure passwords match.");
      return;
    }

    try {
      const response = await axiosAPI.post('/auth/register', { username,email, password });
      alert(`User registered successfully: ${response.data}`);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Error during registration:", error.response?.data);
        alert(error.response?.data?.message || "Something went wrong");
      } else {
        console.error("Unknown error:", error);
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
