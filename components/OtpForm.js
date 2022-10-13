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

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheet } from "react-native-btr";
import { Snackbar } from "react-native-paper";
import api from "./../services/api";
import OTPComp from "./OTPComp";
const win = Dimensions.get("window");

function OtpForm({ navigation, setDisplayMsg, setVisible, setScreenToShow, setOtpCode, emailForReset }) {
    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");
    const [pin5, setPin5] = useState("");
    const [pin6, setPin6] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const verifyOtp = async () => {
        setScreenToShow("newPassword");
        try {
            const code = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
            setOtpCode(code);
            const user = await AsyncStorage.getItem("user");
            const { email } = JSON.parse(user.email);
            const bodyOtp = { code, email: email.toLowerCase() };
            const res = await axios.post("/users/checkVerifyCode", {
                user: bodyOtp,
            });
            console.log(res);
            if (Error) {
                setVisible(true);
                setDisplayMsg(message);
            } else {
                setForComfirm(true);
            }
        } catch (error) {
            setVisible(true);
            setDisplayMsg(error.message);
        }
    };
    return (
        <View style={styles.logForm}>
            <View style={styles.headingFCont}>
                <Text style={styles.subF1}>Enter 4 Digit Code</Text>
                <Text style={styles.subF2}>Enter 4 digit code that you receive in your email</Text>
            </View>
            <OTPComp
                pin1={pin1}
                setPin1={setPin1}
                pin2={pin2}
                setPin2={setPin2}
                pin3={pin3}
                setPin3={setPin3}
                pin4={pin4}
                setPin4={setPin4}
                pin5={pin5}
                setPin5={setPin5}
                pin6={pin6}
                setPin6={setPin6}
            />
            <Pressable style={styles.loginBtn} onPress={() => verifyOtp()}>
                {isLoading === false && <Text style={styles.loginText}>Submit</Text>}
                {isLoading && <ActivityIndicator size="small" color="white" style={{ marginLeft: win.width / 50 }} />}
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    headingFCont: {},
    subF1: {
        fontSize: win.height / 35,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: win.height / 90,
        color: "#0F3749",
    },
    subF2: {
        fontSize: win.height / 60,
        // fontWeight: "bold",
        textAlign: "center",
        paddingHorizontal: win.width / 20,
        color: "lightgray",
    },
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
    loginBtn: {
        backgroundColor: "rgba(31, 157, 217, 1)",
        width: "85%",
        height: win.height / 20,
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

export default OtpForm;
