import {Text, View, Alert} from "react-native";
import {useEffect, useRef, useState} from "react";
import useFetchStore from "../secureStorage/storageData";
import {CapturedPicture} from "expo-camera/build/Camera.types";
import {FlatList, Image, Pressable, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import * as SecureStore from 'expo-secure-store';
import * as MediaLibrary from 'expo-media-library';
import React from "react";
import BottomSheet from 'reanimated-bottom-sheet';


export default function List ({pictures, setPictures}){
    const STORAGE=useFetchStore();
    const [displayFlatList, setDisplayFlatList]=useState<boolean>(true);

    const [isVisible, setIsVisible] = useState(false);
    const list = [
    { title: 'List Item 1' },
    { title: 'List Item 2' },
    {
        title: 'Cancel',
        containerStyle: { backgroundColor: 'red' },
        titleStyle: { color: 'white' },
        onPress: () => setIsVisible(false),
    },
    ];

    const saveInPhone = (uri:string)=>{
        MediaLibrary.saveToLibraryAsync(uri)
    }

    const trashPicture = (uri:string) => {
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
              {
                text: "Cancel",
                onPress: () => Alert.alert("Annulation"),
                style: "cancel",
              },
              {
                text: "CONFIRM",
                onPress: () => {
                    STORAGE.deleteValue(uri);
                    let arrayTemp:Array<CapturedPicture>=[];
                    pictures.forEach((item:any) =>{
                        if(item.uri != uri){
                            arrayTemp.push(item)
                        }
                    })
                    setPictures(arrayTemp);
                },
                style: "cancel",
              },
            ],
            {
              cancelable: true,
              onDismiss: () =>
                Alert.alert(
                  "This alert was dismissed by tapping outside of the alert dialog."
                ),
            }
          );


    }
        <BottomSheet
            isVisible={isVisible}
            containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
        ></BottomSheet>
    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync(true)
        })();
    })

    useEffect(() => {
        (async () => {
            await STORAGE.getValueFor("pictures").then(value => {
                //console.log("access store");
                console.log("pictures : "+pictures)
                if(value!=null){
                    setPictures(JSON.parse(value))
                    //console.log("gallerie : ", data);
                }
            })
        })();
    },[])

    const renderItem = ({item}:{item:CapturedPicture})=>{
        return(
            <ScrollView>
                <View>
                <View style={styles.cameraSnap}>
                    
                    <TouchableOpacity
                        onPress={() => {
                            saveInPhone(item.uri);
                         }} >
                    <Text>Nuage</Text>
                    </TouchableOpacity >
                   
                    <TouchableOpacity
                        onPress={() => {
                            trashPicture(item.uri);
                         }} >
                    <Text>Poubelle</Text>
                    </TouchableOpacity >
                </View>
                    <Image
                        style={{width:100,height:100, margin:2}}
                        source={{uri:item.uri}}
                    />
                </View>
            
            </ScrollView>
        )
    }
    return(
        <View style={styles.flatList}>
            {/* <Pressable onPress={()=>setDisplayFlatList(false)}><Text>prendre une photo</Text></Pressable> */}
            <FlatList
                data={pictures}
                renderItem={renderItem}
                keyExtractor={item=>item.uri}
                contentContainerStyle={styles.flatList}
                horizontal
                
            />
        </View>
    );
    
}

const styles = StyleSheet.create({
    flatList:{
        justifyContent: 'center',
        flexDirection: 'row',
    },
    test : {
        display:'flex',
    },
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
  });