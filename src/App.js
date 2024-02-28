
import './App.css';
import { Route , Routes } from 'react-router-dom';
import Giris from './paht/Giris';

import {Toaster} from'react-hot-toast'
import FlimEkle from './paht/FlimEkle';
import Home from './paht/Home';
import Arama from './paht/Arama';
import Detay from './paht/Detay';
import Katogeri from './paht/Katogeri';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/giris' element={<Giris/>}/>
        <Route path='/ekle' element={<FlimEkle/>}/>
        <Route path='/aramalar/:isim' element={<Arama/>}/>
        <Route path='/deyat/:id' element={<Detay/>}/>
        <Route path='/katogeri/:name' element={<Katogeri/>}/>
      </Routes>
   
    </div>
  );
}

export default App;
