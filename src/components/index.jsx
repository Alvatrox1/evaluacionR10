import React, { useState, useEffect } from 'react'
import axios from 'axios'

function index() {

    const [ listado, setListado ] = useState([]);

    const endPoint = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";

    useEffect( () => {
        cargarServicio();
    }, []);

    useEffect( () => {
        console.log("Listado : ", listado);
    }, [listado])

    const cargarServicio = () => {
        axios.get( endPoint ).then( (response) => {
            // console.log("Datos : ", response.data.results);
            setListado(response.data.results);
        }).catch( (error) => {
            console.log("Error", error);
        });
    }

  return (
    <div>
        <h1> Listado </h1>

        <table>
            <thead>
                <tr>
                    <th> ID </th>
                    <th> Ciudad </th>
                    <th> Fecha Valida  </th>
                    <th> Dirección Cardinal del Viendo </th>
                    <th> Probabilidad de Precipitación </th>
                </tr>
            </thead>
            <tbody>
                {
                    listado.map ( (dato) => (

                        <tr> 
                            <td> { dato._id } </td>
                            <td> { dato.cityid } </td>
                            <td> { dato.lastreporttime } </td>
                            <td> { dato.winddirectioncardinal } </td>
                            <td> { dato.probabilityofprecip } </td>
                        </tr>

                    ))
                }
            </tbody>
        </table>

        {
            listado?.length > 1 &&

            listado.map((dato) => {
                <ul>
                    <li> { dato._id } </li>
                </ul>
            })
        }

    </div>
  )
}

export default index