//JUST A FUCKING TEST TO USE CAMERA
import { Camera } from 'expo-camera';
import {useEffect, useRef, useState} from "react";
import {Pressable, StyleSheet, TouchableOpacity} from "react-native";
import {Text, View, } from "react-native";
import * as React from "react";
import {CameraCapturedPicture, CapturedPicture} from "expo-camera/build/Camera.types";
import useFetchStore from "../secureStorage/storageData";

export default function CameraScreen ({pictures, setPictures}){
    const [hasPermission, setHasPermission] = useState(null);
    const [displayFlatList, setDisplayFlatList]=useState<boolean>(false);
    const [data,setData]=useState<CapturedPicture[]>([])
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [photos, setPhoto]=useState<CapturedPicture[]>([]);
    const camera = useRef<Camera | null>(null);
    const STORAGE=useFetchStore();
    
    useEffect(() => {
        (async () => {
            // on doit autoriser l'utilisation de la caméra
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            STORAGE.getValueFor("pictures").then(value => {
            })
        })();
    }, []);

    useEffect( () => {
        console.log("pictures : "+ pictures)
        if(pictures.length > 0){
            STORAGE.save("pictures",JSON.stringify(pictures));
        }
        //STORAGE.save("pictures",JSON.stringify(pictures));
    },[pictures])

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async ()=> {
        if (camera.current) {
            const photo = await camera.current.takePictureAsync()
                .then((value) => {
                    setPictures([...pictures,value]);
                    
                    console.log("picture taking at ",new Date().getTime())
                    console.log(pictures)
                })
                .catch(error=>{
                    console.log(error);
                })
        }
        else {
            console.log('error with take picture')
        }
    }

    return (
        <Camera type={type} style={styles.cameraContainer} ref={camera}>
            <View style={styles.cameraSubContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <Text style={styles.cameraButton}>Retourne !</Text>
                </TouchableOpacity>
                <Pressable onPress={takePicture}>
                    <View style={styles.cameraSnap}></View>
                </Pressable>
            </View>
        </Camera>
    );
}
// Just style, nothing important
const styles=StyleSheet.create({
    cameraContainer:{
        flex:1,
        marginTop:0,
        position:"relative",
        width:"100%",
        height:"50%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"flex-end"
    },
    cameraSubContainer:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"transparent",
        marginBottom:50
    },
    cameraButton:{
        backgroundColor:"rgba(255,255,255,0.1)",
        fontSize:24,
        color:"white"
    },
    cameraSnap:{
        borderRadius:60,
        height:80,
        width:80,
        backgroundColor:"rgba(255,255,255,0.5)",
    },
    flatList:{
    }
})
