import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import PokemonPage from './pages/PokemonPage';

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pokemon/:slug' element={<PokemonPage/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
