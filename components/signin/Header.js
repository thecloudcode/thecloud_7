import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

const Header = () =>{
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    style={styles.logo}
                    source={require('../../logo.png')}
                />
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 47,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 17,
        backgroundColor: 'rgba(0,0,0,0)',
    },

    iconsContainer: {
        flexDirection: 'row',

    },

    logo: {
        // marginLeft: 7,
        width:140,
        height: 50,
        resizeMode: 'contain',
        zIndex: 47,
    },

    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
    },

    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 27,
        bottom: 18,
        width: 18,
        height: 18,
        borderRadius: 25,
        alignItems:"center",
        zIndex: 100,
    },

    unreadBadgeText: {
        color: 'white',
        fontWeight: 600,
    }
})
export default Header