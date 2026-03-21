export default function ActivityPage() {
  return (
    <div>
      <Sidebar />

      <div>
        <TopTabs />

        <div>
          <div>
            <ActivityFeed />
          </div>

          <div>
            <FilterPanel />
            <UpcomingPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return <div>Sidebar</div>;
}

function TopTabs() {
  return <div>Top Tabs</div>;
}

function ActivityFeed() {
  return (
    <div>
      <ActivityCard />
      <ActivityCard />
    </div>
  );
}

function ActivityCard() {
  return <div>Activity Card</div>;
}

function FilterPanel() {
  return <div>Filter Panel</div>;
}

function UpcomingPanel() {
  return (
    <div>
      <UpcomingCard />
      <UpcomingCard />
    </div>
  );
}

function UpcomingCard() {
  return <div>Upcoming Card</div>;
}
