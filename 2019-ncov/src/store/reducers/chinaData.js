let chinaData = (state = {}, action) => {
    if (action.type === 'CHINA_DATA') {
        return {
            ...state,
            ...action.payload
        }
    }
    return state;
}

export default chinaData;