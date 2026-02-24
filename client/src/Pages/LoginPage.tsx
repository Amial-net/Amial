{/* To do:
    - Logo/Background Image (waiting for group leader)
    - Button to actually show the password
*/}

import {useState} from "react";

export default function LoginPage() {
    return (
        <div className="">
            <Login/>
        </div>
    )
}

function enterButton(email:string, password:string){
    console.log("Button clicked");
    console.log(email);
    console.log(password);
}

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        //temporary until I can make it into a cleaner look 
        <div className="bg-[url(/hero.png)] min-h-screen bg-no-repeat bg-cover bg-center gap-8 max-w-full h-[80vh] text-shadow-lg text-shadow-zinc-500">

            <h1 className="text-7xl underline font-bold my-10"> Amial </h1>
            <div className="px-50 text-3xl mt-30 font-bold"> Login </div>

            <div className="px-50 text-1xl mt-3"> Email </div>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mx-50 text-1xl mt-3"></input>


            <div className="px-50 text-1xl mt-5"> Password </div>
            <input type="password" placeholder="Password" value={password} onChange = {(e) => setPassword(e.target.value)} className="mx-50 text-1xl mt-3"></input>

            

            <button className="mt-10 mx-50 px-40 py-2.5 bg-black text-white hover:bg-slate-600 flex items-center active:bg-blue-600"
                onClick={() => enterButton(email, password)}
            >
                Enter
            </button>
        </div>
    )
}
