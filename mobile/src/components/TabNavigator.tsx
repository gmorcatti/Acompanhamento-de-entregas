import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Entypo, FontAwesome5 } from '@expo/vector-icons';


export default function TabNavigator() {

    const navigation = useNavigation();

    function goTo(page : string) {
      navigation.navigate(page);
    }

    return (
        <SafeAreaView>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.view} onPress={() => goTo('Packages')}>
                    <Entypo name="list" size={24} color="black" />
                    <Text style={styles.text}>Visualizar Pacotes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.view} onPress={() => goTo('AddPackage')}>
                    <Entypo name="plus" size={24} color="black" />
                    <Text style={styles.text}>Adicionar Pacote</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.view} onPress={() => goTo('StartTravel')}>
                    <FontAwesome5 name="truck" size={16} color="black" />
                    <Text style={styles.text}>Iniciar Viagem</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: colors.orange,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 5,
        // marginHorizontal: 20,
        borderRadius: 13,
    },
    text: {
        fontFamily: fonts.text,
        maxWidth: 80,
        lineHeight: 15,
        textAlign: 'center',
        marginTop: 5,
    },
    view: {
        alignItems: 'center',    }
});