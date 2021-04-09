import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import Text from "../Text";
import ProfileBar from "./ProfileBar";

export default function ProfileDetails() {
    const user = {
        name: "myOutfit",
        email: "is the coolest shit ever"
    }

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/corey_nici.jpg")}
                style={styles.profilePic}
            />
            <View style={styles.details}>
                <Text style={styles.username}>{user.name}</Text>
                <Text style={styles.bio}>{user.email}</Text>
            </View>
            <ProfileBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        alignItems: "center",
    },
    bio:{
    },
    details:{
        margin: 10,
        alignItems: 'center'
    },
    profilePic:{
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    username:{
        fontWeight: "800",
        fontSize: 20
    },
});