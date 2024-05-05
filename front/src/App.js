import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import Player from './pages/player'
import Manager from './pages/manager'
// import Player from './pages/player'
import Contest from './pages/contest'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/playerlist/:id' element={<Player />} />
          <Route path='/manager/:id' element={<Manager />} />
          <Route path='/contestant/:id' element={<Contest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
