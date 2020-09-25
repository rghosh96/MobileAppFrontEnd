# Mobile Project
### Running the Project
Download Expo on your device. Clone repo, cd into folder, and run `expo start`. Scan the QR code on your devices camera, and watch the app pop up!
To run on Android:
1. Navigate to android emulator folder, ex 
`$ cd /Users/rashighosh/Library/Android/sdk/emulator`
3. Display which simulators you have with: 
`$ ./emulator -list-avds`
4. Pick a simulator and run it.
`$ ./emulator -avd Pixel_3a_API_27`

## Theming with Redux 
![](https://img.shields.io/badge/native-component-9cf?style=for-the-badge&logo=react) ![](https://img.shields.io/badge/redux-store-blueviolet?style=for-the-badge&logo=redux) ![](https://img.shields.io/badge/css-styling-ff69b4?style=for-the-badge&logo=css3)

## [component].js. ![](https://img.shields.io/badge/native-component-9cf?style=flat-square&logo=react)
**The following imports are necessary at the top of each component:**
`import { connect } from 'react-redux'`
`import { ThemeProvider } from 'styled-components/native'`

**Passing theme to a generic component**
Connect the entire app to Redux via the connect function we imported, passing in `mapStateToProps` as the first parameter. Define the `mapStateToProps(state)` function, returning the `theme` property from the themeReducer.
Wrap the entire component in `<ThemeProvider theme={ this.props.theme }>`

**Changing Themes in Settings.js**
For the `Settings.js` component (in which we can actually change themes), the following additional imports are necessary:
`import { pickTheme } from '../redux/actions'`
`import { [ all themes ] } from '../theming/themes'`
Additionally, we will need to pass `{pickTheme}` as a second parameter to the connect function. Then, the `onClick()` callback within the component call `this.props.pickTheme([themeName])` to change themes accordingly.



## action.js ![](https://img.shields.io/badge/redux-store-blueviolet?style=flat-square&logo=redux)
From the settings page, when the `pickTheme` action is called, the action takes the single parameter of `theme` and dispatches this action to the themeReducer.js.

## themeReducer.js ![](https://img.shields.io/badge/redux-store-blueviolet?style=flat-square&logo=redux)
Inside themeReducer.js, it stores an initial state with one property: the theme. By default it is `oliveTheme`.
When the reducer receives the `PICK_THEME` action type (from our dispatched action), it triggers a state change which updates the theme.

## styles ![](https://img.shields.io/badge/css-styling-ff69b4?style=flat-square&logo=css3)
Now that our components are linked to the theme via ThemeProvider, and our entire application has access to the theme via the Redux store, we can use these theme properties to style our components. In all the style files, simply set a CSS attribute with the following syntax:
```javascript
[propertyName]: ${props => props.theme.[PROPERTY_NAME]};
```
