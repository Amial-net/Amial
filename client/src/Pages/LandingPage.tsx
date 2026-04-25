import { useState } from "react";
import { Link } from "react-router";

export default function LandingPage() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div>
      <Toolbar />
      <HeroImage onOpen={() => setShowPopUp(true)} />
      <Why />

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

function Toolbar({ onOpen }) {
  const links = [
    ["Home", "/"],
    ["Activity", "/activities"],
    ["Contact", "/messages"],
    ["Mission", "/mission"],
    ["Playback", "/playback"],
  ];
  return (
    <nav className="bg-[#1A2640] flex items-center pr-8 h-[60px] sticky top-0 z-[100]">
      {/* Logo + wordmark */}
      <div className="flex items-center gap-[10px] mr-auto">
        <img
          src="/amial-logo.png"
          alt="Amial logo"
          className="w-[100px] h-[100px] object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "flex";
          }}
        />
        <div className="hidden w-8 h-8 rounded-lg bg-[rgba(184,208,240,0.15)] border-[1.5px] border-dashed border-[rgba(184,208,240,0.3)] items-center justify-center text-[11px] text-[rgba(184,208,240,0.45)] font-medium">
          Logo
        </div>
        <span className="font-['Playfair_Display',serif] text-[#B8D0F0] text-[22px] font-bold">
          Amial
        </span>
      </div>

      {links.map(([label, href]) => (
        <a
          key={label}
          href={href}
          className="text-[rgba(255,255,255,0.65)] text-sm no-underline px-[14px] h-[60px] flex items-center"
        >
          {label}
        </a>
      ))}
      <button
        onClick={onOpen}
        className="text-[#B8D0F0] text-sm font-medium border border-[rgba(184,208,240,0.35)] rounded-md px-4 h-9 ml-2 bg-transparent cursor-pointer font-[DM_Sans,sans-serif]"
      >
        Join waitlist
      </button>
    </nav>
  );
}

function HeroImage({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="bg-[url(/hero.png)] bg-no-repeat bg-cover bg-center gap-8 max-w-full h-[80vh] flex flex-col items-center justify-center text-black text-shadow-lg text-shadow-zinc-500 font-black">
      <div className="text-9xl text-center">Amial</div>
      <div className="text-5xl">Meet new people in your free time</div>
      <button
        className="mt-3 text-3xl px-6 py-2 bg-zinc-200 rounded-sm dark:bg-zinc-800 dark:text-white"
        onClick={onOpen}
      >
        Join the Waitlist
      </button>
    </div>
  );
}

function Why() {
  const items = [
    {
      title: "Title",
      desc: "Body text",
    },
    {
      title: "Title",
      desc: "Body text",
    },
    {
      title: "Title",
      desc: "Body text",
    },
    {
      title: "Title",
      desc: "Body text",
    },
    {
      title: "Title",
      desc: "Body text",
    },
    {
      title: "Title",
      desc: "Body text",
    },
  ];

  return (
    <div className="mx-30">
      <div className="text-5xl">Why Amial?</div>

      <div className="grid lg:grid-cols-3 gap-y-10">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <h3 className="text-3xl font-bold">{item.title}</h3>
            <p className="">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
