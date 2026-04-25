import {useState} from "react";
import {Link} from "react-router";

export default function LandingPage() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [email, setEmail] = useState("");
  
  return (
    <div>
      <Toolbar />
      <HeroImage onOpen={() => setShowPopUp(true)}/>
      <Why/>

      {showPopUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-2xl mb-4">Join the Waitlist</h2>
            <h2 className="text-2xl mb-4">
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-1xl"
              />
            </h2>

            <button
              onClick={() => setShowPopUp(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Toolbar() {
  const links = [
    ["Home", "/"],
    ["Activity", "/activities"],
    ["Contact", "/messages"],
    ["Sign in", "/login"],
    ["Mission", "/mission"],
    ["Playback", "/playback"],
  ];
  return (
    <div className="max-w-full flex [&>div]:p-5 bg-black text-white">
      <div className="rounded-full ml-auto bg-[url(/amial-logo.png)] bg-no-repeat bg-center bg-contain"></div>
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

function HeroImage({onOpen}: {onOpen:() => void}) {
  return (
    <div className="bg-[url(/hero.png)] bg-no-repeat bg-cover bg-center gap-8 max-w-full h-[80vh] flex flex-col items-center justify-center text-black text-shadow-lg text-shadow-zinc-500 font-black">
      <div className="text-9xl text-center">Amial</div>
      <div className="text-5xl">Meet new people in your free time</div>
      <button className="mt-3 text-3xl px-6 py-2 bg-zinc-200 rounded-sm dark:bg-zinc-800 dark:text-white" onClick={onOpen}>
        Join the Waitlist
      </button>
    </div>
  );
}

function Why(){
  const items = [
    {
      title: "Title",
      desc: "Body text"
    },{
      title: "Title",
      desc: "Body text"
    },{
      title: "Title",
      desc: "Body text"
    },{
      title: "Title",
      desc: "Body text"
    },{
      title: "Title",
      desc: "Body text"
    },{
      title: "Title",
      desc: "Body text"
    }
  ]

  return(
    <div className="mx-30">
        <div className="text-5xl">Why Amial?</div>

        <div className ="grid lg:grid-cols-3 gap-y-10">
          {items.map((item,i) => (
            <div key={i} className="flex flex-col gap-1">
              <h3 className="text-3xl font-bold">{item.title}</h3>
              <p className="">{item.desc}</p>
            </div>
          ))}
        </div>

    </div>
  );
}