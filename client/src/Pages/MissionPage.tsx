export default function MissionPage(){
    return (
        <div className = "">
            <Mission/>
        </div>
    );
}    

function Mission(){
    return(
        <div>
            <div className ="text-3xl bg-black h-[6vh] w-full flex items-center justify-center"></div>
            <h3 className="py-10 text-black flex items-center justify-center max-w-4xl mx-auto"> AMIAL is .... </h3>
            <div className ="text-3xl bg-red-300 h-[6vh] w-full flex items-center justify-center"> About AMIAL </div>
            <div className ="mx-30"> example paragraph </div>

        </div>     
    )
}
