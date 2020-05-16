let chinaList = (state = {}, action) => {
    if (action.type === 'CHINA_LIST') {
        return {
            ...state,
            ...action.payload
        }
    }
    return state;
}

export default chinaList;