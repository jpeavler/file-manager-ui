import React from 'react';
import './stylesheets/App.css';
import MediaForm from './components/MediaForm';
import MediaTable from './components/MediaTable';

function App() {
  return ( 
    <div className="App">
        <MediaForm/>
        <MediaTable/>
    </div>
  );
}

export default App;
