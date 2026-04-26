import { Link } from "react-router";
import ToolBar from "../components/ToolBar";

const problems = [
  { icon: "😬", text: "I don't want it to be awkward." },
  { icon: "🤷", text: "I don't know if we're compatible." },
  { icon: "👀", text: "I don't know if they even want to be approached." },
  { icon: "💬", text: "I don't know how to reach out." },
  { icon: "💔", text: "I don't want to be rejected." },
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

export default function MissionPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#F0F4FB",
        fontFamily: "'DM Sans', sans-serif",
        color: "#1A2640",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <ToolBar />
      <Mission />
    </div>
  );
}

function Mission() {
  return (
    <div>
      {/* Hero */}
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
          style={{ color: "#B8D0F0", letterSpacing: "0.2em" }}
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
          Let's do life <span style={{ color: "#5B8FD4" }}>together.</span>
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
          Amial is built to make it easy and frictionless for people to connect
          in real life through everyday activities.
        </p>
      </div>

      {/* The Problem */}
      <div className="px-6 py-24" style={{ background: "#F0F4FB" }}>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-3"
            style={{ color: "#5B8FD4", letterSpacing: "0.2em" }}
          >
            The problem
          </p>
          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "#1A2640",
              letterSpacing: "-1px",
            }}
          >
            The idea dies before it starts.
          </h2>
          <p
            className="mb-3 text-base leading-relaxed"
            style={{ color: "#6A7D9A" }}
          >
            You see people out doing things and think, "I want to do something
            today too" — but then hesitation kicks in.
          </p>
          <p
            className="mb-10 text-base leading-relaxed"
            style={{ color: "#6A7D9A" }}
          >
            Reaching out feels awkward, uncertain, and harder than it should be.
          </p>

          <div className="grid grid-cols-1 gap-3">
            {problems.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl px-6 py-4"
                style={{
                  background: "#F8FAFF",
                  border: "1px solid rgba(26,38,64,0.08)",
                }}
              >
                <span className="text-2xl">{p.icon}</span>
                <p
                  className="text-base"
                  style={{ color: "#1A2640", fontWeight: 400 }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Amial */}
      <div className="px-6 py-24" style={{ background: "#E8EFF9" }}>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-3"
            style={{ color: "#5B8FD4", letterSpacing: "0.2em" }}
          >
            Why Amial
          </p>
          <h2
            className="font-bold mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "#1A2640",
              letterSpacing: "-1px",
            }}
          >
            More connected online,
            <br />
            lonelier in real life.
          </h2>
          <div className="flex flex-col gap-5">
            {[
              "Even though we're more connected than ever online, many people still feel lonely and disconnected in real life.",
              "Most platforms push users toward dating apps or events planned far in advance.",
              'There\'s still no simple, natural way to go from "I want to do something" to "I\'m doing something with someone today."',
            ].map((text, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div
                  className="mt-1 shrink-0 w-2 h-2 rounded-full"
                  style={{ background: "#5B8FD4", marginTop: 8 }}
                />
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#6A7D9A" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Mission Statement */}
      <div className="px-6 py-24 text-center" style={{ background: "#1A2640" }}>
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-5"
            style={{ color: "#B8D0F0", letterSpacing: "0.2em" }}
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
            To make it easy for people to do daily activities together and
            create real connections through shared experiences.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="px-6 py-24" style={{ background: "#F0F4FB" }}>
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-3"
            style={{ color: "#5B8FD4", letterSpacing: "0.2em" }}
          >
            How it works
          </p>
          <h2
            className="font-bold mb-12"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "#1A2640",
              letterSpacing: "-1px",
            }}
          >
            Three steps to a real hangout.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div
                key={s.num}
                className="rounded-2xl p-7"
                style={{
                  background: "#F8FAFF",
                  border: "1.5px solid rgba(26,38,64,0.08)",
                }}
              >
                <div
                  className="font-bold mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 44,
                    color: "#B8D0F0",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <h3
                  className="font-medium mb-2 text-lg"
                  style={{ color: "#1A2640" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6A7D9A" }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="px-6 py-24 text-center"
        style={{
          background: "linear-gradient(135deg, #1A2640 0%, #2A4070 100%)",
        }}
      >
        <div className="max-w-xl mx-auto">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-5"
            style={{ color: "#B8D0F0", letterSpacing: "0.2em" }}
          >
            Ready?
          </p>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 5vw, 52px)",
              color: "#F0F6FF",
              letterSpacing: "-1px",
            }}
          >
            One activity at a time.
          </h2>
          <p
            className="mb-10 font-light"
            style={{
              color: "rgba(220,232,255,0.65)",
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            Your next great friendship is one post away.
          </p>
          <Link
            to="/signup"
            className="inline-block font-medium"
            style={{
              background: "#5B8FD4",
              color: "#fff",
              fontSize: 15,
              padding: "14px 40px",
              borderRadius: 50,
              textDecoration: "none",
            }}
          >
            Get started →
          </Link>
        </div>
      </div>
    </div>
  );
}
