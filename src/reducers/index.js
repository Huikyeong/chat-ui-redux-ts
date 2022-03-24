import * as types from '../actions/ActionTypes';

const initialState = {
    text: '',
    list: []
};

export default function reducer(state = initialState, action) {
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