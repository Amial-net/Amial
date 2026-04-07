export default function MissionPage(){
    return (
        <div className = "">
            <Toolbar/>
            <Mission/>
        </div>
    );
}    


function Toolbar() {
  const links = [
    ["Home", "/"],
    ["Resources", ""],
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

function Mission(){
    return(
        <div>
            <h3 className="py-10 text-black flex items-center justify-center max-w-4xl mx-auto"> AMIAL is .... </h3>
            <div className ="text-3xl bg-red-300 h-[6vh] w-full flex items-center justify-center"> About AMIAL </div>
            <div className ="mx-30"> example paragraph </div>

        </div>     
    )
}
