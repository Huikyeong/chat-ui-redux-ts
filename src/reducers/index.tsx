import * as types from '../actions/ActionTypes';

export interface Message {
    sender: number;
    content: string;
}

export interface State {
    text: string;
    list: Message[];
}

const initialState: State = {
    text: '',
    list: []
};

export default function reducer(state: State = initialState, action: any) {
    switch (action.type) {
        case types.CHANGE_TEXT:
            return {
                ...state,
                text: action.text
            };
        case types.ADD_MSG:
            if (state.text === '') {
                return state;
            }
            return {
                text: '',
                list: [ ...state.list, { sender: action.sender, content: state.text } ]
            };
        default:
            return state;
    }
}