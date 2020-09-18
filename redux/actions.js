export const pickTheme = (theme) => {
    return(dispatch) => {
        dispatch({
            type: 'PICK_THEME',
            chosenTheme: theme
        })
    }
}