import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Pressable,
    FlatList,
    Dimensions,
    Animated,
    KeyboardAvoidingView,
    ActivityIndicator,
    Input,
    Picker,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheet } from "react-native-btr";
import { Snackbar } from "react-native-paper";
import api from "./../services/api";
const win = Dimensions.get("window");

function NewPasswordComp({ setScreenToShow, setDisplayMsg, setVisible, otpCode, emailForReset }) {
    const [password, onChangePass] = useState("");
    const [passwordConfirm, onChangePassConfirm] = useState("");
    const newPasswordChanged = async () => {
        setScreenToShow("login");
        try {
            const body = { email: emailForReset, code: otpCode, newPassword: password };
            let res = await api.post("/users/verified-passwordReset", { user: body });
            console.log(res);
        } catch (error) {
            console.log("Verify password reset", error);
            // setDisplayMsg(e)
        }
    };

    return (
        <View style={styles.logForm}>
            <View>
                <Text style={styles.subF1}>Change Password</Text>
            </View>
            <View style={styles.inputWrap}>
                <TextInput onChangeText={onChangePass} placeholder="Enter New password" value={password} style={styles.input} />
                <Entypo name="lock" size={win.width / 18} color="#0F3749" />
            </View>
            <View style={styles.inputWrap}>
                <TextInput
                    onChangeText={onChangePassConfirm}
                    placeholder="Confirm New password"
                    value={passwordConfirm}
                    style={styles.input}
                />
                <Entypo name="lock" size={win.width / 18} color="#0F3749" />
            </View>
            <Pressable style={styles.loginBtnF} onPress={() => newPasswordChanged()}>
                <Text style={styles.loginText}>Submit</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    logForm: {
        // flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        // position: "absolute",
        // top: "20%",
        height: win.height / 2.5,
        width: "80%",
        backgroundColor: "white",
        opacity: 1,
        borderRadius: 10,
        zIndex: 1000,
        marginBottom: win.height / 8,
    },
    inputWrap: {
        display: "flex",
        flexDirection: "row",
        height: "10%",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(205, 205, 205, 1)",

        justifyContent: "space-between",
        width: "85%",
        // backgroundColor: "pink",
    },
    input: {
        // backgroundColor: "blue",
        height: 40,
        width: "90%",
        fontSize: win.height / 50,
        color: "lightgray",
    },
    subF1: {
        fontSize: win.height / 35,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: win.height / 90,
        color: "#0F3749",
    },
    loginBtnF: {
        backgroundColor: "rgba(31, 157, 217, 1)",
        width: win.width / 1.5,
        height: win.height / 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    loginText: {
        color: "white",
        fontSize: win.height / 55,
    },
});

export default NewPasswordComp;
