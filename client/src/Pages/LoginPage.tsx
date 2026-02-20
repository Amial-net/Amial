{/* To do:
    - Logo Image (waiting for group leader)
    - Button to actually show the password
    - Can probably tidy up code to make it less hard coded and easier to read
*/}

export default function LoginPage() {
    return <div className="bg-[url(/hero.png)] min-h-screen bg-no-repeat bg-cover bg-center gap-8 max-w-full h-[80vh] text-black text-shadow-lg text-shadow-zinc-500 font-black">

        <h1 className=" text-7xl underline font-bold my-10"> Amial </h1>
        
        <div className="px-50 text-3xl mt-30 font-bold"> Login </div>
        <div className="px-50 text-1xl mt-3"> Username </div>
        <input type="text" placeholder="username" className="mx-50 text-1xl mt-3"></input>
        <div className="px-50 text-1xl mt-5"> Password </div>
        <input type="password" placeholder="password" className="mx-50 text-1xl mt-3"></input>

        <button className="mt-10 mx-50 px-40 py-2.5 bg-black text-white hover:bg-slate-600 flex items-center active:bg-blue-600">Enter</button>

        

    </div>
}
