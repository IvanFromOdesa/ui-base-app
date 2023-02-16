import config from "config/configExample"

const receiveCities = cities => ({
    type: 'RECEIVE_CITIES',
    payload: cities
});

const requestCities = () => ({
    type: 'REQUEST_CITIES'
});

const errorReceiveCities = error => ({
    type: 'ERROR_RECEIVE_CITIES',
    payload: error
})

const getCities = () => {
    const CITIES_URL = config.BASE_URL + "/api/cities/all";
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    };
    return fetch(CITIES_URL, options);
}

export const fetchCities = () => (dispatch) => {
    dispatch(requestCities());
    return getCities()
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(cities => dispatch(receiveCities(cities)))
            }
        })
        .catch((error) => {
            const errorMsg = error.message;
            dispatch(errorReceiveCities(errorMsg));
        })

};

export const deleteCity = (id) => (dispatch) => {
    const CITIES_URL = config.BASE_URL + "/api/cities";
    const options = {
        method: 'DELETE'
    };
    return fetch(CITIES_URL + `/delete/${id}`, options)
            .then(() => {
                dispatch(fetchCities())
            });
}