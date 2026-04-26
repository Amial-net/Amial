import { useNavigate, Link } from "react-router-dom";

export default function ToolBar({ onOpen }) {
  const links = [
    ["Home", "/"],
    ["Activity", "/activities"],
    ["Contact", "/messages"],
    ["Mission", "/mission"],
    ["Playback", "/playback"],
    ["Log In", "/login"],
  ];
  const navigate = useNavigate();

  return (
    <nav className="bg-[#1A2640] flex items-center pr-8 h-[60px] sticky top-0 z-[100]">
      {/* Logo + wordmark */}
      <div className="flex items-center gap-[10px] mr-auto">
        <img
          src="/amial-logo.png"
          alt="Amial logo"
          className="w-[100px] h-[100px] object-contain transition-transform duration-300 hover:scale-105"
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
        <Link
          key={label}
          to={href}
          className="relative text-[rgba(255,255,255,0.65)] text-sm no-underline px-[14px] h-[60px] flex items-center transition-all duration-300 hover:text-white hover:-translate-y-[2px] after:content-[''] after:absolute after:left-3 after:bottom-3 after:w-0 after:h-[2px] after:bg-[#B8D0F0] after:transition-all after:duration-300 hover:after:w-[calc(100%-24px)]"
        >
          {label}
        </Link>
      ))}

      <button
        onClick={() => navigate("/signup")}
        className="text-[#B8D0F0] text-sm font-medium border border-[rgba(184,208,240,0.35)] rounded-md px-4 h-9 ml-2 bg-transparent cursor-pointer font-[DM_Sans,sans-serif] transition-all duration-300 hover:bg-[#B8D0F0] hover:text-[#1A2640] hover:shadow-md hover:-translate-y-[1px]"
      >
        Sign Up
      </button>
    </nav>
  );
}
