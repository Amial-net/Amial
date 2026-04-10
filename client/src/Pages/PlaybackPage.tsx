export default function PlaybackPage(){
    return(
        <div className = "">
            <Toolbar/>
            <Playback/>
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

function Playback(){
    return(
        <div>
            richard
        </div>
    )
}