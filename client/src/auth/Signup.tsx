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
    <div className="w-full flex flex-col h-screen items-center justify-center gap-10 p-20 [&_h1]:text-indigo-800 [&_h1]:text-4xl font-bold">
      <div className="login-header">
        <h1>SIGN UP</h1>
      </div>
      <div className="login-content w-1/2">
        <form
          className="p-10 shadow-md rounded-3xl flex flex-col gap-3 [&_input]:border-indigo-600 [&_input]:border-solid [&_input]:border-[1px] [&_input]:rounded-lg [&_input]:p-3"
          onSubmit={handleSubmit}
        >
          <input type="text" placeholder="Username" ref={usernameRef} />
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />
          <button
            className="bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-800"
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
