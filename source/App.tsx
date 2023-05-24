import React from 'react';
import {
  Dimensions, View, Image, Text, StatusBar
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import ImageManipulatorView from './libraries/ImageManipulatorView';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import HybridTouch from './HybridTouch';
import { SaveFormat } from 'expo-image-manipulator';

const noImage = require('./assets/no_image.png');

export default class App extends React.Component {
  state = {
    isVisible: false,
    uri: null,
  };
  onToggleModal = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };
  _pickImage = async () => {
    // this.setState({ uri: null });
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        this.setState({
          uri: result.assets[0].uri,
        }, () => this.setState({ isVisible: true }));
      }
    }
  };

  _pickCameraImage = async () => {
    // this.setState({ uri: null });
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      console.log(status);
      const result = await ImagePicker.launchCameraAsync({
        
      });

      if (!result.canceled) {
        this.setState({
          uri: result.assets[0].uri,
        }, () => this.setState({ isVisible: true }));
      }
    }
  };

  render() {
    const {
      uri, isVisible,
    } = this.state;
    const { width, height } = Dimensions.get('window');
    return (
      <View style={{
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height,
      }}
      >
        <StatusBar barStyle="dark-content" />
        {uri ? (
          <Image resizeMode="contain"
            style={{
              width, height, marginBottom: 40, backgroundColor: '#fcfcfc',
            }}
            source={{ uri }}
          />
        ) : <Image source={noImage} />}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#2c98fd',
          width,
          position: 'absolute',
          bottom: 0,
          padding: 20,
        }}
        >
          <HybridTouch style={{ flex: 1, alignItems: 'center' }} onPress={() => this._pickImage()}>
            <View style={{ alignItems: 'center' }}>
              <Icon size={30} name="photo" color="white" />
              <Text style={{ color: 'white', fontSize: 18 }}>Galery</Text>
            </View>
          </HybridTouch>
          <HybridTouch style={{ flex: 1, alignItems: 'center' }} onPress={() => this._pickCameraImage()}>
            <View style={{ alignItems: 'center' }}>
              <Icon size={30} name="photo-camera" color="white" />
              <Text style={{ color: 'white', fontSize: 18 }}>Camera</Text>
            </View>
          </HybridTouch>
        </View>
        {
          uri
          && (
            <ImageManipulatorView
              photo={{ uri }}
              isVisible={isVisible}
              onPictureChoosed={(data) => {
                // console.log(data)
                this.setState({ uri: data.uri });
              }}
              onBeforePictureChoosed={(data) => {
                const diff = Math.abs(data.width / data.height - 16 / 9) * 1000;
                if (data.cropped || diff < 3) {
                  return true;
                }

                alert('You must crop the image.');
                return false;
              }}
              // fixedMask={{ width: 200, height: 200 }}
              onToggleModal={this.onToggleModal}
              saveOptions={{
                compress: 1,
                format: SaveFormat.PNG,
                base64: true,
              }}
              btnTexts={{
                done: 'Done',
                crop: 'Crop',
                processing: 'Loading',
              }}
              ratio={{ width: 16, height: 9 }}
            />
          )
        }
      </View>
    );
  }
}
