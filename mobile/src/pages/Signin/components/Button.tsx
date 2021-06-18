import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

type Props = {
    text: string;
    color: string;
    onPress: Function;
}

export function Button({ text, onPress, color } : Props) {
    return (
        <TouchableOpacity 
            style={[
                styles.container, 
                { backgroundColor: color || colors.orange }
            ]}
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
        height: 56,
        width: '50%',
        borderRadius: 40,
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