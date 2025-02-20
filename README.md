<h1 align="center">Expo image manipulator view</h1>

## Note

This repository was forked from [brunon80/expo-image-crop](https://github.com/brunon80/expo-image-crop)(it is probably no longer maintained).
The changes (at 2022/06/20) are as follows:

* Up supported Expo SDK to 48.
* Support aspect ratio.
* Support images longer than the screen with scroll.
* Several icons can be changed.
* Remove unnecessary dependencies from package.json.
* Reorganized directory structure.
* Rewritten to typescript, and type information was provided.

All changes can be found [here](https://github.com/gomo/expo-image-crop/pull/1/files).

<p align="center">Multi platform 🚀</p>

<p align="center">
   <img width="250" src="./demo.gif"/>
   <br/>
   <br/>
   <br/>
   <br/>
   <a href="https://github.com/gomo/expo-image-crop"><img alt="npm version" src="https://badge.fury.io/js/expo-image-crop.svg"/>
   <a href="https://github.com/gomo/expo-image-crop"><img alt="npm version" src="https://img.shields.io/badge/platform-ios%2Fandroid-blue.svg"/>
   <a href="https://github.com/gomo/expo-image-crop"><img alt="npm version" src="https://img.shields.io/badge/license-MIT-lightgrey.svg"/>
</a>
</p>

## Crop and rotate image without detach your expo project!
## `Expo.ImageManipulator` is only a API without a UI, so you have to build your own UI on top of it, or choose detach your project to use third party linked packages, witch is no so good because a pure javascript Expo project is marvelous!

[PRs are welcome...](https://github.com/gomo/expo-image-crop/pulls)

>No more flickering while resizing image mask!

>Compatible with Expo SDK 44

>Support typescript

## Install
`yarn add expo-image-manipulator-view`

## Example

```javascript
import React from 'react'
import { Dimensions, Button, ImageBackground } from 'react-native'
import { ImageManipulatorView } from 'expo-image-manipulator-view'

export default class App extends React.Component {
  state = {
      isVisible: false,
      uri: 'https://i.pinimg.com/originals/39/42/a1/3942a180299d5b9587c2aa8e09d91ecf.jpg',
  }
  onToggleModal = () => {
      const { isVisible } = this.state
      this.setState({ isVisible: !isVisible })
  }
  render() {
      const { uri, isVisible } = this.state
      const { width, height } = Dimensions.get('window')
      return (
          <ImageBackground
              resizeMode="contain"
              style={{
                  justifyContent: 'center', padding: 20, alignItems: 'center', height, width, backgroundColor: 'black',
              }}
              source={{ uri }}
          >
              <Button title="Open Image Editor" onPress={() => this.setState({ isVisible: true })} />
              <ImageManipulatorView
                  photo={{ uri }}
                  isVisible={isVisible}
                  onPictureChoosed={({ uri: uriM }) => this.setState({ uri: uriM })}
                  onToggleModal={this.onToggleModal}
              />
          </ImageBackground>
      )
  }
}
```

## Props
| Props            | Type     | Default                                                                    | Description                                        |
|------------------|----------|----------------------------------------------------------------------------|----------------------------------------------------|
| isVisible        | boolean  | false                                                                      | Show or hide modal with image manipulator UI       |
| onBeforePictureChoosed | function |                                                                      | Callback before done. You must return boolean. If you return false, it will stop. |
| onPictureChoosed | function |                                                                            | Callback where is passed image edited as parameter |
| photo            | object   | ```{  uri: string } ```                                                    | uri of image to be edited                          |
| btnTexts         | object   | ```{ crop: string, done: string, processing: string}```                    | name for crop, done and processing texts           |
| onToggleModal    | function |                                                                            | Callback called when modal is dismissed            |
| borderColor      | string   | #a4a4a4                                                                    | Color for crop mask border                         |
| allowRotate      | boolean  | true                                                                       | Show rotate option                                 |
| allowFlip        | boolean  | true                                                                       | Show flip option                                   |
| saveOptions      | object   | ```{ compress: number, format: string, base64: boolean}``` | A map defining how modified image should be saved  
| fixedMask      | object   | ```{ width: number, height: number }``` | Width and height fixed mask
| ratio      | object   | ```{ width: number, height: number }``` | Width and height cropping ratio
| icons      | object   | ```{ crop: ReactNode, back: ReactNode, processing: ReactNode }``` | Some icons can be changed


## Return of onBeforePictureChoosed/onPictureChoosed is an object with format:

```javascript
{
    uri: string,
    base64: string | undefined, // undefined if base64 is false on saveOptions prop
    width: number,
    height: number,
    cropped: boolean // Whether cropped or not
}
```
## Run the example!
- Clone this repository
- cd source/
- run yarn or npm install
- enjoy!
### The animation is fluid even on dev mode!


## Requirements
* Use it into Expo app (from expo client, Standalone app or ExpoKit app).
* Because we need to have access to `ImageManipulator`

## Features
* Crop
* Rotate
* Flip (Horizontal and Vertical)
* Base64

## If you have some problem open a issue
