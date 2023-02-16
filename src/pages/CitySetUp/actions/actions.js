import config from "config/configExample"

const CITIES_URL = config.BASE_URL + "/api/cities"

export function postCity(officialName, population, area, timeZone) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(getRequestBody(officialName, population, area, timeZone)),
    };
    return fetch(CITIES_URL + "/create", options);
}

export function editCity(id, officialName, population, area, timeZone) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(getRequestBody(officialName, population, area, timeZone)),
    };
    return fetch(CITIES_URL + `/update/${id}`, options);
}

export function getCityById(id) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    };
    return fetch(CITIES_URL + `getById/${id}`, options);
}

function getRequestBody(officialName, population, area, timeZone) {
    return {
        officialName: officialName,
        population: population,
        area: area,
        timeZone: timeZone
    };
}