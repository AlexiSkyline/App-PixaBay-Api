import React, { useState } from 'react'
import { Error } from './Error';
import PropTypes from 'prop-types';

export const Formulario = ({ setBusqueda }) => {

    const [ termino, setTermino ] = useState('');
    const [ error, setError ] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();

        // * Validar
        if( termino.trim() === '' ) {
            setError( true );        
            return;
        }

        setError( false );
        // * Enviar el termino de búqueda hacia el componente principal
        setBusqueda( termino );
    }


    return (
        <form
            onSubmit={ buscarImagenes }
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control from-control-lg"
                        placeholder="Buscar una imágen, ejemplo: futbol o café"
                        onChange={ e => setTermino( e.target.value ) }
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>

            { error ? <Error mensaje="Agrega un término de Búsqueda"/> : null }
        </form>
    )
}

Formulario.propTypes = {
    setBusqueda: PropTypes.func.isRequired
}