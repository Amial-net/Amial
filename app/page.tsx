export default function Home() {
  return (
    <div>
      <Toolbar/>
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
  return <div className="bg-[url(/demo.png)] max-w-full h-screen bg-auto">
    asd
  </div>
}