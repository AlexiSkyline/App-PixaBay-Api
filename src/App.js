import React, { useEffect, useState } from 'react';
import { Formulario } from './Components/Formulario';
import { ListadoImagenes } from './Components/ListadoImagenes';

function App() {

  const [ busqueda, setBusqueda ] = useState('');
  const [ imagenes, setImagenes ] = useState([]);

  useEffect(() => {
      const consultarAPI = async() => {
          const imagenesPorPagina = 30;
          const key = '22504627-b612b27ada69a75193bb22664';
          const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

          const respuesta = await fetch( url );
          const resultado = await respuesta.json();

          setImagenes( resultado.hits )
      }
      consultarAPI();
  }, [busqueda]);

  return (
    <div className="container">
        <div className="jumbotron">
            <p className="lead text-center">Buscador de Imáfenes</p>

            <Formulario 
              setBusqueda={ setBusqueda }
            /> 
        </div>
        <div className="row justify-content-center">
            <ListadoImagenes 
                imagenes={ imagenes }
            />
        </div>
    </div>
  );
}

export default App;
