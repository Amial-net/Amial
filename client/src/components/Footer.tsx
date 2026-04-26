export default function Footer() {
  return (
    <div className="bg-[#1A2640] py-10 px-12 flex items-center justify-between flex-wrap gap-4">
      <span className="font-['Playfair_Display',serif] text-[#B8D0F0] text-[18px] font-bold">
        Amial
      </span>
      <p className="text-[13px] text-[rgba(184,208,240,0.4)]">
        © 2025 Amial. All rights reserved.
      </p>
      <div className="flex gap-6">
        {["Privacy", "Terms", "Contact"].map((l) => (
          <a
            key={l}
            href="#"
            className="text-[13px] text-[rgba(184,208,240,0.5)] no-underline"
          >
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}
