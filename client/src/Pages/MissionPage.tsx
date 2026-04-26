import { Link } from "react-router";
import ToolBar from "../components/ToolBar";

const problems = [
  { icon: "😬", text: "I don't want it to be awkward." },
  { icon: "🤷", text: "I don't know if we're compatible." },
  { icon: "👀", text: "I don't know if they even want to be approached." },
  { icon: "💬", text: "I don't know how to reach out." },
  { icon: "💔", text: "I don't want to be rejected." },
];

const whyPoints = [
  "Even though we're more connected than ever online, many people still feel lonely and disconnected in real life.",
  "Most platforms push users toward dating apps or events planned far in advance.",
  'There\'s still no simple, natural way to go from "I want to do something" to "I\'m doing something with someone today."',
];

const steps = [
  {
    num: "01",
    title: "Post an activity",
    desc: "Share something you want to do today or this week — studying, the gym, grabbing food, or anything else.",
  },
  {
    num: "02",
    title: "Find people who opted in",
    desc: "Instead of guessing who might be interested, you connect with people who already want to join.",
  },
  {
    num: "03",
    title: "Build real connection",
    desc: "Relationships grow more naturally when they start with shared experiences and genuine interest.",
  },
];

const C = {
  bg: "#F0F4FB",
  dark: "#1A2640",
  accent: "#5B8FD4",
  accentLight: "#B8D0F0",
  muted: "#6A7D9A",
  cardBg: "#F8FAFF",
  border: "rgba(26,38,64,0.08)",
  altBg: "#E8EFF9",
};

export default function MissionPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: C.bg,
        fontFamily: "'DM Sans', sans-serif",
        color: C.dark,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <ToolBar />
      <MissionHero />
      <TheProblem />
      <WhyAmial />
      <MissionStatement />
      <HowItWorks />
      <MissionCTA />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-medium tracking-widest uppercase mb-3"
      style={{ color: C.accent, letterSpacing: "0.2em" }}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <h2
      className="font-bold mb-8"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(28px, 4vw, 44px)",
        color: light ? "#F0F6FF" : C.dark,
        letterSpacing: "-1px",
      }}
    >
      {children}
    </h2>
  );
}

function MissionHero() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6 py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(150deg, #0F1E38 0%, #1A3360 45%, #2A5080 100%)",
        minHeight: "52vh",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 55% 50%, rgba(91,143,212,0.18) 0%, transparent 70%)",
        }}
      />
      <p
        className="text-xs font-medium tracking-widest uppercase mb-5 relative"
        style={{ color: C.accentLight, letterSpacing: "0.2em" }}
      >
        Our mission
      </p>
      <h1
        className="font-bold leading-tight relative mb-5"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(40px, 7vw, 72px)",
          color: "#F0F6FF",
          letterSpacing: "-1.5px",
        }}
      >
        Let's do life <span style={{ color: C.accent }}>together.</span>
      </h1>
      <p
        className="relative max-w-xl"
        style={{
          fontSize: "clamp(15px, 2vw, 18px)",
          fontWeight: 300,
          color: "rgba(220,232,255,0.72)",
          lineHeight: 1.7,
        }}
      >
        Amial is built to make it easy and frictionless for people to connect in
        real life through everyday activities.
      </p>
    </div>
  );
}

function TheProblem() {
  return (
    <div className="px-6 py-24" style={{ background: C.bg }}>
      <div className="max-w-3xl mx-auto">
        <SectionLabel>The problem</SectionLabel>
        <SectionHeading>The idea dies before it starts.</SectionHeading>
        <p
          className="mb-3 text-base leading-relaxed"
          style={{ color: C.muted }}
        >
          You see people out doing things and think, "I want to do something
          today too" — but then hesitation kicks in.
        </p>
        <p
          className="mb-10 text-base leading-relaxed"
          style={{ color: C.muted }}
        >
          Reaching out feels awkward, uncertain, and harder than it should be.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {problems.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl px-6 py-4"
              style={{ background: C.cardBg, border: `1px solid ${C.border}` }}
            >
              <span className="text-2xl">{p.icon}</span>
              <p className="text-base" style={{ color: C.dark }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhyAmial() {
  return (
    <div className="px-6 py-24" style={{ background: C.altBg }}>
      <div className="max-w-3xl mx-auto">
        <SectionLabel>Why Amial</SectionLabel>
        <SectionHeading>
          More connected online,{<br />}lonelier in real life.
        </SectionHeading>
        <div className="flex flex-col gap-5">
          {whyPoints.map((text, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div
                className="shrink-0 w-2 h-2 rounded-full"
                style={{ background: C.accent, marginTop: 8 }}
              />
              <p
                className="text-base leading-relaxed"
                style={{ color: C.muted }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function MissionStatement() {
  return (
    <div className="px-6 py-24 text-center" style={{ background: C.dark }}>
      <div className="max-w-2xl mx-auto">
        <p
          className="text-xs font-medium tracking-widest uppercase mb-5"
          style={{ color: C.accentLight, letterSpacing: "0.2em" }}
        >
          Our mission
        </p>
        <p
          className="font-bold leading-snug"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(26px, 4vw, 42px)",
            color: "#F0F6FF",
            letterSpacing: "-1px",
          }}
        >
          To make it easy for people to do daily activities together and create
          real connections through shared experiences.
        </p>
      </div>
    </div>
  );
}

function HowItWorks() {
  return null;
}

function MissionCTA() {
  return null;
}
