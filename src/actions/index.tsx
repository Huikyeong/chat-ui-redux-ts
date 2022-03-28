import * as types from './ActionTypes';

export interface ChangeTextAction {
    type: string;
    text: string;
}

export interface AddMsgAction {
    type: string;
    sender: number;
}

export const changeText:((text: string) => ChangeTextAction) = text => ({
    type: types.CHANGE_TEXT,
    text
})

export const addMsg: ((sender: number) => AddMsgAction) = sender => ({
    type: types.ADD_MSG,
    sender
})