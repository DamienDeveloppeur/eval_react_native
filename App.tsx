import { CapturedPicture } from 'expo-camera/build/Camera.types';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraScreen from './component/cameraScreen';
import List from './component/list';
export default function App() {
  const [pictures,setPictures] = useState<CapturedPicture[]>([]);
  return (
    <View style={styles.container}>
      <View style={styles.camera}>
        <CameraScreen pictures={pictures} setPictures={setPictures}></CameraScreen>
      </View>
      <View style={styles.list}>
        <List pictures={pictures} setPictures={setPictures}></List>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  camera : {
    flex :2
  },
  list : {
    flex:1,
  }
});
