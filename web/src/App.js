import React, { useEffect, useState } from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './services/api';

import DevItem from './components/DevItem/index';
import DevForm from './components/DevForm/index'
function App() {

  const [devs, setDevs] = useState([]);
  

  async function handleAddDev(data) {

    const response = await api.post('/devs', data)
    setDevs([...devs, response.data]);
  }



  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  return (
  <div id="app">
    <aside>
      <strong>Cadastrar</strong>
      <DevForm onSubmit={handleAddDev}/>
    </aside>

    <main>
      <ul>
        {devs.map(dev =>(
          <DevItem dev={dev} key={dev.id}/>
        ))}
        
        
      </ul>
    </main>
  </div>
  );
}

export default App;
