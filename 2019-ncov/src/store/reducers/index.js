import { combineReducers } from 'redux';
import chinaData from './chinaData.js';
import chinaList from './chinaList.js';
import areaTree from './areaTree.js';
import articleList from './articleList.js';

export default combineReducers({
    chinaData,
    chinaList,
    areaTree,
    articleList
})