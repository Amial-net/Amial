import { Outlet } from 'react-router-dom'
import { EventsProvider } from './assets/context/EventsContext'

function App() {
  return (
    <EventsProvider>
      <Outlet />
    </EventsProvider>
  )
}

export default App