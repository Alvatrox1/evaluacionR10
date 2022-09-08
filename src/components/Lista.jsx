
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import moment from 'moment/moment';

function Lista() {

    const [listado, setListado] = useState([]);
    const [tabla, setTabla] = useState([]);
    const [ numResultados, setNumResultados ] = useState(0);

    const endPoint = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";


    useEffect(() => {
        cargarListado();
    }, [])

    const cargarListado = () => {

        let crearTabla = [];
        let arrayFecha = [];

        axios.get(endPoint).then((response) => {
            console.log("Datos : ", response.data.results);
            for (let i = 0; i < response.data.results.length; i++) {

                arrayFecha[i] = moment.utc(response.data.results[i].lastreporttime).local();
                response.data.results[i].lastreporttime = arrayFecha[i].format('DD/MM/YYYY');
            }
            setListado(response.data.results);
        }).catch((error) => {
            console.log("Error", error);
        });

        setNumResultados( listado.length );

        setTabla(listado);   

    }

    return (
        <div>
            <h1> Lista de Resultados </h1>

            {
                numResultados > 0 &&

                <h4> Numero de Resultados : { numResultados } </h4>

            }

            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#4682B4', color: '#ccc' }}>
                                <TableCell align="center"> ID </TableCell>
                                <TableCell align="center"> ID Ciudad </TableCell>
                                <TableCell align="center"> Nombre </TableCell>
                                <TableCell align="center"> Estado </TableCell>
                                <TableCell align="center"> Probabilidad de Precipitación </TableCell>
                                <TableCell align="center"> Humedad Relativa </TableCell>
                                <TableCell align="center"> Ultimo Reporte </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listado.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="center" scope="row"> {row._id} </TableCell>
                                    <TableCell align="center" scope="row"> {row.cityid} </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.state}</TableCell>
                                    <TableCell align="center">{row.probabilityofprecip}</TableCell>
                                    <TableCell align="center">{row.relativehumidity}</TableCell>
                                    <TableCell align="center">{row.lastreporttime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </div>
    )
}


export default Lista