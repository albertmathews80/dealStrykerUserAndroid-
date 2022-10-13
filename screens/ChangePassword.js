import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TextInput, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./../services/api";

let win = Dimensions.get("window");
const ChangePasswordScreen = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const changePassword = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem("user"));

            if (newPassword !== confirmPassword) {
                alert("Password and Confirm Password not match!");
            }

            const body = {
                email: user.email,
                newPassword,
                oldPassword,
            };

            const headers = {
                Authorization: `Token ${user.token}`,
            };

            const res = await api.post("/users/changePassword", body, { headers });

            console.log("changePassword res >>>>>>>>>>>>>>", res);

            if (res) {
                alert("Password changed successfully...");
                navigation.navigate("SettingScreen");
            }
        } catch (error) {
            console.log("changePassword error >>>>>>>>>>>>>>>>", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headingWrap}>
                {/* <Image style={styles.imgIcon}/> */}
                <FontAwesome name="unlock-alt" size={win.height / 20} color="#0F3749" />
                <Text style={styles.headingText}>Change Password</Text>
            </View>
            <View style={styles.formWrap}>
                <View style={styles.inpWrap}>
                    <View style={styles.inpWrapInner}>
                        <Text style={styles.nameHeading}>Old Password</Text>
                        <Text></Text>
                    </View>
                    <TextInput
                        style={styles.inpStyle}
                        placeholder="Enter Old Password"
                        onChangeText={setOldPassword}
                        value={oldPassword}
                    ></TextInput>
                </View>
                <View style={styles.inpWrap}>
                    <View style={styles.inpWrapInner}>
                        <Text style={styles.nameHeading}>New Password</Text>
                        <Text></Text>
                    </View>
                    <TextInput
                        style={styles.inpStyle}
                        placeholder="Enter New Password"
                        onChangeText={setNewPassword}
                        value={newPassword}
                    ></TextInput>
                </View>
                <View style={styles.inpWrap}>
                    <View style={styles.inpWrapInner}>
                        <Text style={styles.nameHeading}>Confirm Password</Text>
                        <Text></Text>
                    </View>
                    <TextInput
                        style={styles.inpStyle}
                        placeholder="Confirm New Password"
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                    ></TextInput>
                </View>

                <Pressable style={styles.btn} onPress={() => changePassword()}>
                    <Text style={styles.btnText}>Save</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: win.width / 25,
    },
    headingWrap: {
        width: "100%",
        height: win.height / 10,
        //   backgroundColor:'pink',
        alignItems: "center",
        paddingHorizontal: win.width / 50,
        color: "blue",
        flexDirection: "row",
    },
    headingText: {
        fontSize: win.height / 40,
        color: "#0F3749",
        marginLeft: win.width / 50,
    },
    formWrap: {
        //   height:win.height/1.8,
        backgroundColor: "white",
        width: "100%",
        marginTop: win.height / 40,
        paddingHorizontal: win.width / 20,
        paddingVertical: win.height / 40,
        width: "100%",
        borderRadius: 10,
        borderWidth: 0,
        borderColor: "#CDCDCD",
        shadowColor: "#CDCDCD",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        borderRadius: 5,
        elevation: 4,
    },
    inpWrap: {
        paddingVertical: win.height / 40,
    },
    inpWrapInner: {
        height: win.height / 25,
        justifyContent: "center",
    },
    inpStyle: {
        borderWidth: 1,
        fontSize: win.height / 50,
        borderColor: "#CDCDCD",
        height: win.height / 18,
        borderRadius: 8,
        paddingLeft: win.width / 50,
    },
    btn: {
        backgroundColor: "#1F9DD9",
        height: win.height / 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    btnText: {
        color: "white",
        fontSize: win.height / 50,
    },
    nameHeading: {
        fontSize: win.height / 55,
        color: "#0F3749",
    },
});
export default ChangePasswordScreen;
