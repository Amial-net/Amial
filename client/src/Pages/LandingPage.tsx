import {useState} from "react";
import {Link} from "react-router";

export default function LandingPage() {
  return (
    <div>
      <Toolbar />
      <HeroImage />
      <Why/>
    </div>
  );
}

function Waitlist(){
  console.log("waitlist");
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

function HeroImage() {
  return (
    <div className="bg-[url(/hero.png)] bg-no-repeat bg-cover bg-center gap-8 max-w-full h-[80vh] flex flex-col items-center justify-center text-black text-shadow-lg text-shadow-zinc-500 font-black">
      <div className="text-9xl text-center">Amial</div>
      <div className="text-5xl">Meet new people in your free time</div>
      <button className="mt-3 text-3xl px-6 py-2 bg-zinc-200 rounded-sm dark:bg-zinc-800 dark:text-white" onClick={() => Waitlist()}>
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