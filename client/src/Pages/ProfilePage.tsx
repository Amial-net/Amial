import MainSideBar from "../components/SideBar.tsx";
import mypfp from "../assets/mypfp.jpg";

export default function ProfilePage() {
  return (
    <div className="grid grid-cols-12 w-full min-h-screen bg-white">
      
      {/* LEFT SIDEBAR */}
      <div className="col-span-3">
        <MainSideBar />
      </div>

      {/* CENTER PROFILE */}
      <div className="col-span-6 border-r border-black/10 bg-white">

        {/* PROFILE HEADER */}
        <div className="p-6 border-b border-black/10">
          <div className="flex items-center gap-5">
            
            <img
              src={mypfp}
              className="h-20 w-20 rounded-full object-cover"
            />

            <div>
              <h1 className="text-[24px] font-extrabold">Richard Wei</h1>
              <p className="text-[14px] text-black/40">@Richardwei4174</p>
            </div>

          </div>

          {/* STATS */}
          <div className="flex gap-8 mt-4 text-[14px] font-semibold">
            <span><b>12</b> Posts</span>
            <span><b>45</b> Followers</span>
            <span><b>30</b> Following</span>
          </div>
        </div>

        {/* POSTS SECTION */}
        <div className="p-4 space-y-4">

          <ProfilePost />

        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="col-span-3 bg-white p-4">
        
        <div className="rounded-[18px] border border-black/10 p-5">
          <h3 className="text-[18px] font-extrabold mb-4">About</h3>
          <p className="text-[14px] text-black/60">
            Passionate about building things 🚀  
            Always learning and improving.
          </p>
        </div>

      </div>
    </div>
  );
}

function ProfilePost() {
  return (
    <div className="rounded-[18px] border border-black/10 p-4">
      
      <div className="flex items-center gap-3">
        <img
          src={mypfp}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <div className="text-[14px] font-bold">Richard Wei</div>
          <div className="text-[12px] text-black/30">@Richardwei4174</div>
        </div>
      </div>

      <p className="mt-3 text-[15px]">
        Just finished a great workout 💪
      </p>

 

    </div>
  );
}