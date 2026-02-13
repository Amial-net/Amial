export default function LandingPage() {
  return (
    <div>
      <Toolbar/>
      <HeroImage/>
    </div>
  );
}



function Toolbar() {
  const links = [["Solutions", "#"], ["Community", "#"], ["Resources", "#"], ["Contact", "#"], ["Sign in", "/login"], ["Register", "/register"]]
  return <div className="max-w-full flex [&>div]:p-5">
    <div>
      Amial
    </div>
    <div className="flex-auto"/>
    {
      links.map(i => {
        return <a href={i[1]} className="p-5" key={i[0]}>
          {i[0]}
          </a>
      })
    }
  </div>
}

function HeroImage() {
  return <div className="bg-[url(/hero.png)] bg-no-repeat bg-cover bg-center gap-8 max-w-full h-[80vh] flex flex-col items-center justify-center text-black text-shadow-lg text-shadow-zinc-500 font-black">
    <div className="text-9xl text-center">Amial</div>
    <div className="text-5xl">Meet new people in your free time</div>
    <button className="mt-3 text-3xl px-6 py-2 bg-zinc-200 rounded-sm dark:bg-zinc-800 dark:text-white">Join the Waitlist</button>
  </div>
}