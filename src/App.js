import React, { useEffect, useState } from 'react';
import { Formulario } from './Components/Formulario';
import { ListadoImagenes } from './Components/ListadoImagenes';

function App() {

  const [ busqueda, setBusqueda ] = useState('');
  const [ imagenes, setImagenes ] = useState([]);
  const [ paginaactual, setPaginaActual ] = useState(1);
  const [ totalpaginas, setTotalPaginas ] = useState(1);

  useEffect(() => {
      const consultarAPI = async() => {
          const imagenesPorPagina = 30;
          const key = 'your API https://pixabay.com/';
          const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

          const respuesta = await fetch( url );
          const resultado = await respuesta.json();

          setImagenes( resultado.hits )

          // * Calcular el total de paginas
          const calcularTotalPaginas = Math.ceil( resultado.totalHits / imagenesPorPagina );
          setTotalPaginas( calcularTotalPaginas );

          // * Mover la pantalla hacia arriba
          const jumbotron = document.querySelector('.jumbotron');
          jumbotron.scrollIntoView({ behavior: 'smooth' });
      }
      consultarAPI();
  }, [busqueda, paginaactual]);

  // * Definir la página anterior
  const paginaAnterior = () => {
    const nuevaPaguinaActual = paginaactual - 1;

    if( nuevaPaguinaActual === 0 ) return;

    setPaginaActual( nuevaPaguinaActual );
  }

  // * Definir la pagina Siguiente
  const paginaSiguiente = () => {
    const nuevaPaguinaActual = paginaactual + 1;

    if( nuevaPaguinaActual > totalpaginas ) return;

    setPaginaActual( nuevaPaguinaActual );
  }

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

            { ( paginaactual ) === 1 ? null :
                  <button 
                    type="button" 
                    className="btn btn-info mr-1"
                    onClick={ paginaAnterior }
                  >
                    &laquo; Anterior
                  </button>
            }

            { ( paginaactual === totalpaginas ) ? null :
                  <button 
                    type="button" 
                    className="btn btn-info mr-1"
                    onClick={ paginaSiguiente }
                  >
                    Siguiente &raquo;
                  </button>
            }
        </div>
    </div>
  );
}

export default App;
