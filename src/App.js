import React from 'react';
import { Formulario } from './Componets/Formulario';

function App() {
  return (
    <div className="container">
        <div className="jumbotron">
            <p className="lead text-center">Buscador de Imáfenes</p>
            
            <Formulario /> 
        </div>
    </div>
  );
}

export default App;
