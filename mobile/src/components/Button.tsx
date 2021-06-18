import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

type Props = {
    text: string;
    onPress: Function;
}

export function Button({ text, onPress } : Props) {
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => onPress()}
        >
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.orange,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    text: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.text
    }
})