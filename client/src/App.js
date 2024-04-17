import {BrowserRouter,Routes,Route} from 'react-router-dom'
import BookingAppointmentPage from './pages/BookingAppointmentPage';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<BookingAppointmentPage />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;