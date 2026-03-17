/*
display input error
*/
import {useState} from "react";
import {Link} from "react-router"

export default function SignupPage() {
    return (
        <div className="">
            <Signup/>
        </div>
    )
}

function enterButton(email:string, password:string){
    console.log("Button clicked");
    console.log(email);
    console.log(password);
}

function Signup(){
    const [email, setEmail] = useState("");
    const [display, setDisplay] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className="bg-black min-h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center gap-1 align-center content-center justify-center">
            <h1 className="text-7xl underline font-bold text-white "> Amial </h1>

            <div className="bg-white h-[90%] min-h-[40vh] max-w-xs w-full border rounded-[10%] flex flex-col items-center gap-1 align-center content-center justify-center">
                <div className="text-center text-3xl font-bold"> Sign Up </div>
                
                <div className="text-1xl text-left w-full pl-[5%]"> RPI Email</div>
                <div className="text-left w-full pl-[5%]">
                    <input type="email" placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} className="text-1xl"></input>
                </div>

                <div className="text-1xl text-left w-full pl-[5%]"> Display Name</div>
                <div className="text-left w-full pl-[5%]">
                    <input type="display" placeholder={"Display"} value={display} onChange={(e) => setDisplay(e.target.value)} className="text-1xl"></input>
                </div>

                <div className="text-1xl text-left w-full pl-[5%]"> Username</div>
                <div className="text-left w-full pl-[5%]">
                    <input type="username" placeholder={"Username"} value={username} onChange={(e) => setUsername(e.target.value)} className="text-1xl"></input>
                </div>

                <div className="text-1xl text-left w-full pl-[5%]"> Password</div>
                <div className="text-left w-full pl-[5%]">
                    <input type="password" placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} className="text-1xl"></input>
                </div>

                <button className="px-[40%] bg-black text-white hover:bg-slate-600 flex items-center active:bg-blue-600"
                    onClick={() => enterButton(email, password)}>
                    Enter
                </button>
            </div>




        </div>
    )
}