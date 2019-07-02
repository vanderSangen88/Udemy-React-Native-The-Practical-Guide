import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';

const listItem = (props) => (
    <TouchableWithoutFeedback onPress={props.onItemPressed}>
        <View 
            style={styles.listItem}
        >
            <Image 
                style={styles.placeImage}
                source={props.placeImage}
                resizeMode="contain"
            />
            <Text>
                {props.placeName}
            </Text>
        </View>
    </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center"
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    }
});

export default listItem;