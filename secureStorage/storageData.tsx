import * as SecureStore from "expo-secure-store";

export default function useFetchStore(){

    async function getValueFor(key:string) {
         return await SecureStore.getItemAsync(key);
    }

    async function deleteValue(key:string):Promise<void>{
        await SecureStore.deleteItemAsync(key);
    }

    async function save(key:string, value:string | number | object) {
        if (typeof value === "string") {
            await SecureStore.setItemAsync(key, value);
        }
        else if(typeof value==="number"){
            await SecureStore.setItemAsync(key, JSON.stringify(value));
        }

    }

    return {getValueFor, deleteValue, save};
}