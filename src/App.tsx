import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { AdminRoom } from "./pages/AdminRoom";
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/rooms/new' element={<NewRoom />} />
          <Route path='/rooms/:id' element={<Room />} />
          <Route path='/admin/rooms/:id' element={<AdminRoom />} />
        </Routes>
        </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
