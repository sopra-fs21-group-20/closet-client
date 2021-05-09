import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    Image,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity,
    Alert, Platform, KeyboardAvoidingView, ScrollView
} from "react-native";
import Text from "./Text";
import colors from "../config/colors";
import Badge from "./Badge";
import Button from "./Button";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import PostImagePicker from "./forms/PostImagePicker";
import {Form, FormField, SubmitButton} from "./forms";
import * as Yup from "yup";
import fabrics from "../config/fabrics";
import ImageInput from "./ImageInput";
import Screen from "./Screen";
import {ColorPicker} from "react-native-color-picker";
import ActionSheet from "react-native-actions-sheet";
import RadioForm from "react-native-simple-radio-button";
import TextInput from "./TextInput";

const radio_props = [
    {label: 'Color', value: "color"},
    {label: 'Pattern', value: "pattern"},
    {label: 'Fabric', value: "fabric"},
];

function NewBadge({refObj, newBadgeFunc}) {

    const [radioValue, setRadioValue] = useState(radio_props[0].value);
    const [textValue, setTextValue] = useState("");

    return (
        <ActionSheet ref={refObj} onClose={() => {
            setRadioValue(radio_props[0].value);
            setTextValue("");
        }}>
            <View style={styles.container}>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonColor={colors.medium}
                    selectedButtonColor={colors.dark}
                    animation={true}
                    onPress={(value) => {
                        setRadioValue(value);
                    }}
                    style={styles.radioGroup}
                />
                <TextInput
                    onBlur={() => {
                    }}
                    onChangeText={(text) => setTextValue(text)}
                    placeholder={'Value'}
                    value={textValue}
                    width={'100%'}
                />
                <Button title="Save" buttonStyle={styles.button}
                        onPress={() => {
                            if(textValue === "") {
                                return Alert.alert("Please enter a value.");
                            }
                            newBadgeFunc(radioValue, textValue);
                            setRadioValue(radio_props[0].value);
                            setTextValue("");
                            refObj.current?.setModalVisible(false);
                        }}/>
            </View>
        </ActionSheet>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 30,
    },
    radioGroup: {
        marginBottom: 15,
    },
    button: {
        backgroundColor: colors.primary,
    }
});

export default NewBadge;
