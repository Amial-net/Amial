{/* To do:
    - Background Image
    - Logo Image
*/}

export default async function LoginPage() {
    return <div>
        <h1 className="px-50 text-7xl underline font-bold my-10"> Amial </h1>
        <div className="bg-black"></div> 

        <h1 className="px-50 text-3xl mt-30 font-bold"> Login </h1>
        <h1 className="px-50 text-1xl mt-3"> Username </h1>
        <input type="text" placeholder="username" className="px-50 text-1xl mt-3"></input>
        <h1 className="px-50 text-1xl mt-5"> Password </h1>
        <input type="text" placeholder="password" className="px-50 text-1xl mt-3"></input>

        <button className="mt-10 mx-50 px-40 py-2.5 bg-white text-black hover:bg-slate-600 flex items-center ">Enter</button>

    </div>
}
