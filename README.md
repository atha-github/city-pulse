# CityPulse (Existing React Native project)

This is an existing React Native project. Follow the steps below to set up the development environment and run the app locally.
<p align="center">
  <img src="/preview/login.png" alt="Login" width="120"/>
  <img src="/preview/home.png" alt="Home" width="120"/>
  <img src="/preview/event.png" alt="Event" width="120"/>
  <img src="/preview/eventDetails.png" alt="Event Details" width="120"/>
  <img src="/preview/eventMap.png" alt="Event in Map" width="120"/>
  <img src="/preview/login_ar.png" alt="Login AR" width="120"/>
  <img src="/preview/signup_ar.png" alt="Signup AR" width="120"/>
  <img src="/preview/login_ios.png" alt="Login iOS" width="120"/>
  <img src="/preview/signup_ios.png" alt="Signup iOS" width="120"/>
  <img src="/preview/home_ios.png" alt="Home iOS" width="120"/>
</p>

## Prerequisites
- Follow the official React Native environment setup first:
  https://reactnative.dev/docs/environment-setup
  - Choose the "React Native CLI Quickstart" tab and complete the macOS / Android / iOS setup that applies to you.
- Install Node.js (recommended LTS) and Yarn (optional but preferred).
- Install Xcode (for iOS) and Android Studio (for Android) with required SDKs.

## 1) Clone the repository
```bash
git clone https://github.com/atha-github/city-pulse.git
cd city-pulse
```

## 2) Install JavaScript dependencies
After cloning, install node modules:

```bash
# using yarn (recommended)
yarn install

# or using npm
npm install
```

> Note: If you haven't set up the native environment (Xcode/Android SDK) follow the React Native docs above first.

## 3) iOS setup (macOS only)
Install CocoaPods dependencies:

```bash

# project uses Bundler:
yarn biob

yarn bpod

# or 

Open the `ios` folder and install CocoaPods dependencies:

```bash

cd ios
# project uses Bundler:
bundle install

bundle exec pod install


cd ..
```

If you edited native dependencies, repeat `pod install`.

## 4) Android setup
- Open Android Studio → SDK Manager and ensure required SDKs and build tools are installed.
- If you need to update Gradle or SDK versions, edit files under `android/` as required.

## 5) Running the app
Start the Metro bundler in one terminal:

```bash
# yarn
yarn start

# or npm
npm start
```

Then build & run:

```bash
#To run on Android emulator / device
# from project root
yarn android

#To run iOS simulator (macOS)
yarn ios
```

If commands fail, try:
```bash
npx react-native run-android
npx react-native run-ios
```

## Troubleshooting
- If Metro caching causes issues, restart with cache reset:

```bash
yarn startc
```

#or else

```bash
npx react-native start --reset-cache
```

- For CocoaPods issues: `bundle exec pod install --repo-update` then `bundle exec pod install`.
- For permission or build errors, open the native project in Android Studio / Xcode and run from the IDE — it surfaces better logs.

## Final note
Happy coding 🎉

If you'd like, I can add CI scripts, a dev-setup checklist, or platform-specific troubleshooting sections.