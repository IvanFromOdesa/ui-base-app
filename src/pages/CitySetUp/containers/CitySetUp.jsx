import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import { editCity, getCityById, postCity } from "../actions/actions";
import { Button, makeStyles, TextField } from "@material-ui/core";

const getClasses = makeStyles(() => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        top: '25%',
        left: '50%',
        marginTop: '-50px',
        marginLeft: '-100px'
    },
}));

function CitySetUp() {
    const [officialName, setOfficialName] = useState("");
    const [population, setPopulation] = useState(0);
    const [area, setArea] = useState(0);
    const [timeZone, setTimeZone] = useState("");
    const classes = getClasses();
    let params = useParams();
    let history = useHistory();

    useEffect(() => {
        // If id present in URL, get the associated values with entity
        if(params.id) {
            getCityById(params.id)
                .then(response => {
                    if(response.ok) {
                        response.json()
                            .then(city => {
                                setOfficialName(city.officialName);
                                setPopulation(city.population);
                                setArea(city.area);
                                setTimeZone(city.timeZone);
                            })
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }, []) 

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate the data
        if(officialName === "" || timeZone === "") {
            alert("Either officialName or timeZone is empty!");
        }
        else if(area === 0 || population === 0) {
            alert("Either area or population is 0!");
        }
        else if(population % 1 !== 0) {
            alert("Population must be a whole number!");
        }
        else {
            if (params.id) {
                editCity(params.id, officialName, population, area, timeZone)
                    .then(response => {
                        if (response.ok) {
                            history.push('/cities');
                        }
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }
            else {
                postCity(officialName, population, area, timeZone)
                    .then(response => {
                        if (response.ok) {
                            history.push('/cities');
                        }
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }
        }
    }

    return (
        <div>
            <form className={classes.main}>
                <TextField id="txf1" 
                           label="OfficialName" 
                           name="officialName" 
                           required="true"
                           onChange={(event) => setOfficialName(event.target.value)}
                           value={officialName}
                />
                <br/>
                <TextField id="txf2"
                           type="number"
                           label="Population"
                           name="population"
                           required="true"
                           InputProps={{inputProps: {min: 0}}}
                           onChange={(e) => setPopulation(e.target.value)}
                           value={population}
                />
                <br/>
                <TextField id="txf3"
                           type="number"
                           label="Area"
                           name="area"
                           required="true"
                           InputProps={{inputProps: {min: 0}}}
                           onChange={(e) => setArea(e.target.value)}
                           value={area}
                />
                <br/>
                <TextField id="txf4" 
                           label="TimeZone" 
                           name="timeZone" 
                           required="true"
                           onChange={(event) => setTimeZone(event.target.value)}
                           value={timeZone}
                />
                <br/>
                <Button id="btn1"
                        onClick={handleSubmit} 
                        variant="outlined" 
                        type="submit">{params.id ? "Edit city" : "Post city"}</Button>
                <br/>
                <Button id="btn2"
                        onClick={() => (history.push('/cities'))}
                        variant="contained" 
                        color="secondary">Cancel</Button>
            </form>
        </div>
    )
}

export default CitySetUp;