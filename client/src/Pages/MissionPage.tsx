export default function MissionPage(){
    return (
        <div className = "">
            <Toolbar/>
            <Mission/>
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

function Mission(){
    return(
        <div>
          <h1 className="py-10 text-black flex items-center justify-center max-w-4xl mx-auto text-[100%]"> Amial - Let's do life together </h1>
          <div className ="text-3xl bg-red-300 h-[6vh] w-full flex items-center justify-center"> Amial is built to make it easy and frictionless for people to connect in real lifethrough everyday activities. </div>
          <div className ="text-center">
            <h2>The problem</h2>
            <p>
              You see people out doing things and think, “I want to do something today too,” but then
              the idea dies before it even starts. Reaching out feels awkward, uncertain, and harder
              than it should be.
            </p>

            <ul className="problem-list">
              <li>I do not want it to be awkward.</li>
              <li>I do not know if we are compatible.</li>
              <li>I do not know if they even want to be approached.</li>
              <li>I do not know how to reach out.</li>
              <li>I do not want to be rejected.</li>
            </ul>

            <h2><br/> Why Amial?</h2>

            <p>
              Even though we are more connected than ever online, many people still feel lonely and
              disconnected in real life. Most platforms push users toward dating apps or events planned
              far ahead. There is still no simple, natural way to go from “I want to do something” to
              “I am doing something with someone today.”
            </p>

            <h2><br/>Our mission</h2>
            <p>
              To make it easy for people to do daily activities together and create real connections
              through shared experiences.
            </p>

            <h2>How it works</h2>
            <h3>Post an activity</h3>
            <p>
              Share something you want to do today or this week, like studying, going to the gym,
              grabbing food, or anything else.
            </p>

            <h3>Find people who opted in</h3>

            <p>
              Instead of guessing who might be interested, you connect with people who already want
              to join.
            </p>

            <h3>Build real connection</h3>
            <p>
              Relationships grow more naturally when they start with shared experiences and genuine
              interest.
            </p>

            <div><br/>Let's be connected One activity at a time</div>
        </div>
      </div>     
    )
}
