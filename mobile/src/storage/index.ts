import AsyncStorage from '@react-native-async-storage/async-storage';

const parseJSON = (value : string) => {
    try {
        const object = JSON.parse(value);
        return object;
    } catch (e) {
        return value;
    }
}

const storeData = async (key : string, value : string | object) => {
    try {
        if(typeof value === 'object') value = JSON.stringify(value);
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        throw e;
    }
}

const getData = async (key : string) => {
    try {
        let value = await AsyncStorage.getItem(key);
        value = parseJSON(`${value}`);
        return value;
    } catch (e) {
        throw e;
    }
}

export default {
    storeData,
    getData,
}