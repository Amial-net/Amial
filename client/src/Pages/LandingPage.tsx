import { useState } from "react";
import { Link } from "react-router";

const features = [
  {
    title: "Activity-first matching",
    desc: "Get matched based on what you actually want to do — hikes, coffee, board games, gigs. Not just profiles.",
  },
  {
    title: "No awkward swiping",
    desc: "Amial is not a dating app. Connections are mutual, opt-in, and built around shared activities.",
  },
  {
    title: "Local and real",
    desc: "Every connection is someone in your city. Meet people you can actually hang out with in real life.",
  },
  {
    title: "Free to join",
    desc: "No paywalls to meet people. Amial is free to use — always has been, always will be.",
  },
  {
    title: "Safety first",
    desc: "Verified profiles, community reports, and optional group meetups so you always feel comfortable.",
  },
  {
    title: "Your schedule, your vibe",
    desc: "Set your availability and interests. Amial finds people who fit your life — not the other way around.",
  },
];

const steps = [
  {
    num: "01",
    title: "Create your profile",
    desc: "Tell us what you're into — activities, schedule, and what kind of friends you're looking for.",
  },
  {
    num: "02",
    title: "Discover activities",
    desc: "Browse local events and hangouts, or post your own. Coffee, hiking, game nights — you pick.",
  },
  {
    num: "03",
    title: "Match & meet up",
    desc: "Connect with people who said yes to the same thing. No pressure, just good company.",
  },
];

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

function HeroImage({ onOpen }) {
  return (
    <div className="min-h-[90vh] bg-[linear-gradient(150deg,#0F1E38_0%,#1A3360_45%,#2A5080_100%)] flex items-center justify-between px-24 relative overflow-hidden gap-12">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_70%_50%,rgba(91,143,212,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Left: text content */}
      <div className="flex-none max-w-[520px] z-10">
        <p className="text-[13px] tracking-[3px] uppercase text-[#B8D0F0] font-medium mb-6">
          Where friendships begin
        </p>
        <h1 className="font-['Playfair_Display',serif] text-[clamp(52px,7vw,84px)] font-bold text-[#F0F6FF] leading-[1.05] mb-5 tracking-[-2px]">
          Make friends
          <br />
          who <span className="text-[#5B8FD4]">get you.</span>
        </h1>
        <p className="text-[clamp(15px,2vw,18px)] font-light text-[rgba(220,232,255,0.75)] leading-[1.7] mb-10 max-w-[420px]">
          Amial matches you with real people nearby based on what you actually
          want to do — no profiles to swipe, no awkward intros.
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onOpen}
            className="bg-[#5B8FD4] text-white border-none text-[15px] font-medium px-9 py-[14px] rounded-full cursor-pointer font-[DM_Sans,sans-serif]"
          >
            Join the waitlist
          </button>
          <a
            href="/activities"
            className="text-[#B8D0F0] text-[15px] font-normal px-6 py-[14px] rounded-full border border-[rgba(184,208,240,0.3)] no-underline inline-flex items-center gap-[6px]"
          >
            Browse activities →
          </a>
        </div>
        <p className="text-[12px] text-[rgba(220,232,255,0.35)] mt-4">
          No spam. Just your spot in line.
        </p>
      </div>

      {/* Right: anime art slot */}
      <div className="flex-none w-[clamp(280px,35vw,480px)] h-[clamp(360px,55vh,620px)] relative z-10">
        <img
          src="/moremore.png"
          alt="Amial character"
          className="w-full h-full object-contain object-bottom [filter:drop-shadow(0_0_40px_rgba(91,143,212,0.35))]"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "flex";
          }}
        />
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <div className="bg-[#1A2640] py-24 px-12">
      <div className="max-w-[1000px] mx-auto">
        <p className="text-[12px] tracking-[3px] uppercase text-[#B8D0F0] font-medium mb-3 text-center">
          Simple by design
        </p>
        <h2 className="font-['Playfair_Display',serif] text-[clamp(30px,4vw,46px)] font-bold text-[#F0F6FF] tracking-[-1px] text-center mb-16">
          How it works
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.num}
              className="text-center px-6 py-8 rounded-2xl border border-[rgba(184,208,240,0.12)] bg-[rgba(255,255,255,0.04)]"
            >
              <div className="font-['Playfair_Display',serif] text-[48px] font-bold text-[#5B8FD4] opacity-60 leading-none mb-4">
                {s.num}
              </div>
              <h3 className="text-[18px] font-medium text-[#F0F6FF] mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-[rgba(184,208,240,0.65)] leading-[1.7]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Why() {
  return (
    <div className="py-24 px-12 max-w-[1100px] mx-auto">
      <p className="text-[12px] tracking-[3px] uppercase text-[#5B8FD4] font-medium mb-3">
        The case for Amial
      </p>
      <h2 className="font-['Playfair_Display',serif] text-[clamp(34px,5vw,52px)] font-bold text-[#1A2640] tracking-[-1px] mb-14">
        Why Amial?
      </h2>
      <div className="grid grid-cols-3 gap-[1.5px] border-[1.5px] border-[rgba(26,38,64,0.1)] rounded-2xl overflow-hidden bg-[rgba(26,38,64,0.1)]">
        {features.map((item, i) => (
          <div key={i} className="bg-[#F8FAFF] p-8 pr-7">
            <div className="font-['Playfair_Display',serif] text-[42px] font-bold text-[#B8D0F0] leading-none mb-3">
              0{i + 1}
            </div>
            <h3 className="text-[17px] font-medium mb-2 text-[#1A2640]">
              {item.title}
            </h3>
            <p className="text-sm text-[#6A7D9A] leading-[1.65]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
