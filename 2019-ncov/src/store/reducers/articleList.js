let articleList = (state = [], action) => {
    if (action.type === 'ARTICLE_LIST') {
        return action.payload
    }
    return state;
}

export default articleList;