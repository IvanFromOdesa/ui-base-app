const initialState = {
    isLoading: false,
    error: '',
    data: [],
}
const cities = (state = initialState, action) => {
    switch (action.type) {
        case 'ERROR_RECEIVE_CITIES': {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        }
        case 'REQUEST_CITIES': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'RECEIVE_CITIES': {
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: ''
            };
        }
        default:
            return state;
    }
}

export default cities;