import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteCity, fetchCities } from "../actions/actions";
import { Button,
    LinearProgress,
    Paper,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow } from "@material-ui/core";

function Cities() {
    const history = useHistory();
    const cities = useSelector(({ cities }) => cities);
    const [isHovering, setIsHovering] = useState(false);
    const dispatch = useDispatch();
    let idRow = 0;

    useEffect(() => {
        dispatch(fetchCities())
    }, []);

    const handleDelete = (event) => {
        const id = event.currentTarget.id;
        deleteCity(id);
    };

    const handleSetUpCity = (event) => {
        const id = event.currentTarget.id;
        history.push(`/citySetUp/${id}`);
    };

    const handleMouseOver = () => {
        setIsHovering(true);
    };
    
    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <div>
            <br/>
            <div>
                <NavLink to="/">Initial Page</NavLink>
            </div>
            <div>
                <NavLink to="/citySetUp">Add city</NavLink>
            </div>
            <br/>
            {cities.isLoading && (
                <div>
                    <LinearProgress/>
                </div>
            )}
            {!cities.isLoading && (
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">OfficialName</TableCell>
                                <TableCell align="right">Population</TableCell>
                                <TableCell align="right">Area&nbsp;(km2)</TableCell>
                                <TableCell align="right">TimeZone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                cities.data.map((row) => {
                                    <TableRow key={++idRow}>
                                        <TableCell component="th" scope="row"
                                                   onMouseOver={handleMouseOver}
                                                   onMouseOut={handleMouseOut}>
                                            {row.officialName}
                                        </TableCell>
                                        <TableCell align="right">{row.population}</TableCell>
                                        <TableCell align="right">{row.area}</TableCell>
                                        <TableCell align="right">{row.timeZone}</TableCell>
                                        {
                                            isHovering && (
                                                <div>
                                                <TableCell align="right">
                                                    <Button variant="outlined"
                                                            onClick={handleSetUpCity}>Edit City</Button>
                                                </TableCell>
                                                <TableCell>
                                                <Button variant="outlined"
                                                        onClick={deleteCity}>Delete City</Button>
                                                </TableCell>
                                                </div>
                                            )
                                        }
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                )
            }
            {
                cities.error && (
                    <div>Could not fetch cities from BE ({cities.error})</div>
                )
            }
        </div>
    )
}

export default Cities;