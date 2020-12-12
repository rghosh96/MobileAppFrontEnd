
# Social Debug: A CSCE Social Media Application.
## Running the Project
*IMPORTANT*: currently does not work on Android, ONLY on iOS. see information at the very bottom.

### Install the Expo CLI on your command line:
Instructions can be found here: https://docs.expo.io/workflow/expo-cli/

### Download the Expo Client app on your phone:
Go to your app store, and download Expo Client (if you want to run on a physical device)

### Connect to the UARK VPN
You need to be connected both on your computer AND your phone!
Directions for getting on the VPN can be found here: https://its.uark.edu/network-access/vpn/index.php
(On your phone, download the Global Protect app)

### Run the app!
**NOTE:** if trying to run on android simulator, see note below before following these steps
1. Clone this repository.
2. Navigate into the root directory
3. To be safe, run `expo upgrade`
4. Run `npm install`
5. Run `expo start`
6. Your web browser should pop up, and you can run on iOS or Android simulator. To run on a physical device, you should see a QR code in the bottom left. Scan this on your phone (for iPhone, via the camera app, for Android, from inside the Expo Client app)
7. And there u go!

**NOTE**
To run on Android simulator:
8. Navigate to android emulator folder, ex 
`$ cd /Users/rashighosh/Library/Android/sdk/emulator`
9. Display which simulators you have with: 
`$ ./emulator -list-avds`
10. Pick a simulator and run it.
`$ ./emulator -avd Pixel_3a_API_27`

**IMPORTANT** app does not currently work on android, due to some npm package version mismatches with the current expo sdk version.. this is a fix for future work. The issue is detailed here: https://github.com/lottie-react-native/lottie-react-native/issues/617
