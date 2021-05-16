import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import Text from "../Text";
import ProfileBar from "./ProfileBar";
import useAuth from "../../auth/useAuth";
import colors from "../../config/colors";
import Image2 from "../Image";

export default function ProfileDetails({userDetails, postsAmount}) {
    const {user, logOut} = useAuth();

    return (
        <View style={styles.container}>
            <Image2
                source={{uri: userDetails.signedUrl}}
                style={styles.profilePic}
            />
            <View style={styles.details}>
                <Text style={styles.username}>{userDetails.username}</Text>
                <Text style={styles.bio}>{userDetails.biography ? userDetails.biography : 'this is a placeholder'}</Text>
            </View>
            <ProfileBar posts={postsAmount}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        alignItems: "center",
    },
    bio:{
        color: colors.white
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
        fontSize: 20,
        color: colors.white,
    },
});
