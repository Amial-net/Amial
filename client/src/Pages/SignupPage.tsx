import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function SignupPage() {
  return (
    <div>
      <Signup />
    </div>
  );
}

<<<<<<< HEAD
function Signup() {
  const [email, setEmail] = useState("");
  const [display, setDisplay] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
=======
async function enterButton(email:string, password:string, username:string){
    // try{
    //     console.log(email);
    // } 
}
>>>>>>> 23abcc527dcb80e34f2a33602f90b5437ef86804

  async function handleSignup() {
    setError("");

<<<<<<< HEAD
    // Quick client-side check (backend validates too)
    if (!email.includes("@rpi.edu")) {
      setError("Invalid email. Must use school email.");
      return;
    }
    if (!username || !password) {
      setError("All fields are required.");
      return;
=======
    function checkingValid(){
        if(!email.includes("@rpi.edu")){
            setError("Invaild email. Must use school email.");
            return;
        }

        setError("");
        enterButton(email, password, username);
>>>>>>> 23abcc527dcb80e34f2a33602f90b5437ef86804
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed.");
        return;
      }

      // Account created — verification email sent
      navigate("/verify");
    } catch (err) {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black min-h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center gap-1 align-center content-center justify-center">
      <h1 className="text-7xl underline font-bold text-white flex flex-col items-center gap-1 align-center">
        Amial
      </h1>
      <div className="bg-white h-[90%] min-h-[40vh] min-w-[70vh] max-w-xs w-full border rounded-[10%] flex flex-col items-center gap-1 align-center content-center justify-center">
        <div className="text-center text-3xl font-bold">Sign Up</div>

        {error && <p className="text-red-500 px-4 text-center">{error}</p>}

        <div className="text-1xl text-left w-full pl-[5%]">RPI Email</div>
        <div className="text-left w-full pl-[5%]">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-1xl" />
        </div>
        <div className="text-1xl text-left w-full pl-[5%]">Display Name</div>
        <div className="text-left w-full pl-[5%]">
          <input type="text" placeholder="Display" value={display} onChange={(e) => setDisplay(e.target.value)} className="text-1xl" />
        </div>
        <div className="text-1xl text-left w-full pl-[5%]">Username</div>
        <div className="text-left w-full pl-[5%]">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="text-1xl" />
        </div>
        <div className="text-1xl text-left w-full pl-[5%]">Password</div>
        <div className="text-left w-full pl-[5%]">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-1xl" />
        </div>

        <button
          className="px-[40%] bg-black text-white hover:bg-slate-600 flex items-center active:bg-blue-600"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "..." : "Enter"}
        </button>

        <p>Have an account?</p>
        <Link to="/login">
          <span>Login</span>
          <span className="text-blue-600"> here</span>
        </Link>
      </div>
    </div>
  );
}