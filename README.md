#  RNWeather
I have build up a basic weather app that calls the https://www.metaweather.com/ api. The source code for the project is here.
I used the ignite saga boilerplate to start off the project. It comes with the industry best practices baked in place.


![alt text](https://i.imgur.com/Hc2J0wr.png)

![alt text](https://i.imgur.com/BZhs727.png)

![alt text](https://i.imgur.com/V17EKYc.png)

![alt text](https://i.imgur.com/Z3RyYVy.png)

![alt text](https://i.imgur.com/pW0HsUN.png)

Few notable items are 
### 1.ESLining and prettier has been incorporated for auto code formatting 
### 2.Husky has been used to incorporate the eslinting checks at commit time
### 3.React Navigation is used for managing screens
### 4.React Native Elements used as a view component library
### ​5.Redux and React-redux has been used for Message passing
### 6.For async message passing Redux-saga has been used over thunk as middleware
### 7. Apisauce has been used to define API end points
### 8. A global Config is in place to alter config files
### 9. test cases for testing redux, saga and api has been written with jest. All tests pass right now
### 10. Reactotron integration is in place for network monitoring 
### 11. A nearby city finder based on GPS is also in place
### 12. All error and loading prompts and displayed to the user in nonobstructing way
### 13. Minimal styling has been used, but when ever used styles are created off reacts StyleSheet object
### 14. In addition there are global styling definitions also in place
### 15. Components and code are structured, named and written in a self documenting way, so minimal comments are used
### 16. App works both on portrait and landscape screens
### 17. App can be further extended with data persistence,notifications and other mobile specific features.
### 18. Reduxsauce has been used to define redux specific functions in a less verbose way
### 19. The app was primarily tested on Android device and emulator, it cannot be guaranteed that the same app would compile for a iOS ipa.

▶️ How to Run App
cd to the repo
Run Build for either OS
for iOS
run react-native run-ios
for Android
Run Genymotion
run react-native run-android
