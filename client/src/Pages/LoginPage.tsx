import {useState} from "react";
import {Link} from "react-router"

export default function LoginPage() {
    return (
        <div className="">
            <Toolbar/>
            <Login/>
        </div>
    )
}

function Toolbar() {
  const links = [
    ["Home", "/"],
    ["Resources", "#"],
    ["Contact", "/messages"],
    ["Sign in", "/login"],
    ["Mission", "/mission"],
  ];
  return (
    <div className="max-w-full flex [&>div]:p-5 bg-black text-white">
      <div>Amial</div>
      <div className="flex-auto" />
      {links.map((i) => {
        return (
          <a href={i[1]} className="p-5" key={i[0]}>
            {i[0]}
          </a>
        );
      })}
    </div>
  );
}

function enterButton(email:string, password:string){
    console.log("Button clicked");
    console.log(email);
    console.log(password);
}

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 

    return (
        <div className="bg-black min-h-screen bg-no-repeat bg-cover bg-center">
            <h1 className="text-7xl underline font-bold text-white flex flex-col items-center gap-1 align-center "> Amial </h1>
            <div className="min-h-screen flex flex-col justify-center items-center">
                <div className="bg-white h-[90%] min-h-[40vh] min-w-[70vh] max-w-xs w-full border rounded-[10%] flex flex-col items-center gap-1 align-center content-center justify-center">

                    <div className="text-center text-3xl font-bold"> Login </div>

                    <div className="text-1xl text-left w-full pl-[5%]"> Email or Username</div>
                    <div className="text-left w-full pl-[5%]">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-1xl w-[95%]"></input>
                    </div>
                    
                    <div className="text-1xl text-left w-full pl-[5%]"> Password </div>
                    <div className="flex text-left w-full pl-[5%]">    
                        <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange = {(e) => setPassword(e.target.value)} className="text-1xl w-[95%]"></input>
                        <button className="ml-auto bg-[url(/show-password-icon.png)] bg-no-repeat bg-center bg-contain pl-[5%] text-white hover:bg-slate-600"
                                onClick={() => setShowPassword((prev) => !prev)}>
                        </button>
                    </div>

                    <button className="px-[42%] bg-black text-white hover:bg-slate-600 flex items-center active:bg-blue-600"
                        onClick={() => enterButton(email, password)} >
                        Enter
                    </button>

                    <p className="">
                        Dont have an account?
                    </p>   

                    <Link to="/signup" className="">
                        <span>Sign up</span>
                        <span className="text-blue-600"> here</span> 
                    </Link>
                </div>
            </div>
        </div>
    )
}