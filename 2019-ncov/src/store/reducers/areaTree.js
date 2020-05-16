let areaTree = (state = [], action) => {
    if (action.type === 'AREA_TREE_LIST') {
        return action.payload
    }
    return state;
}

export default areaTree;