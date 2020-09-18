import { oliveTheme } from '../theming/themes'


const initialState = {
    theme: {...oliveTheme} 
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'PICK_THEME':
            let newState = {
                ...state,
                theme: {...state.theme, ...action.chosenTheme}
            }
            return newState
        default:
            return state
    }
}