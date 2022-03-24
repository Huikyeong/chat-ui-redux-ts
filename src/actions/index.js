import * as types from './ActionTypes';

export const changeText = text => ({
    type: types.CHANGE_TEXT,
    text
})

export const addMsg = sender => ({
    type: types.ADD_MSG,
    sender
})