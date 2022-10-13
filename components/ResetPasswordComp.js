import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import api from "./../services/api";

const win = Dimensions.get("window");

function ResetPasswordComp({ navigation, setScreenToShow, setDisplayMsg, setVisible, setEmailForReset }) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        setIsLoading(true);

        try {
            const body = {
                user: {
                    email: email.toLowerCase().trim(),
                },
            };

            const res = await api.post("/users/sendVerifyCode", body);
            console.log("resetPassword >>>>>>>>>", res.data);

            if (res) {
                setEmailForReset(email);
                setScreenToShow("otpScreen");
                //   setForComfirm(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error.message);
            setIsLoading(false);

            // alert(error.message);
            // setVisible(true);
            // setDisplayMsg(error.message);
        }
    };

    return (
        <View style={styles.logForm}>
            <View style={styles.forgetFCont}>
                <View>
                    <Text style={styles.subF1}>Reset Password</Text>
                </View>
                <View style={styles.inputWrapF}>
                    <TextInput onChangeText={setEmail} placeholder="Enter Email" value={email} style={styles.inputF} />

                    <MaterialIcons name="email" size={win.width / 18} color="#0F3749" />
                </View>
                <Pressable style={styles.loginBtnF} onPress={onSubmit}>
                    <Text style={styles.loginText}>Submit</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    forgetFCont: {
        display: "flex",
        justifyContent: "space-evenly",
        // backgroundColor: "red",
        height: win.height / 2.5,
        alignItems: "center",
    },
    subF1: {
        fontSize: win.height / 35,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: win.height / 90,
        color: "#0F3749",
    },
    inputWrapF: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        alignItems: "center",
    },
    inputF: {
        height: 40,
        width: win.width / 1.5,
        fontSize: win.height / 50,
        color: "lightgray",
        // backgroundColor: "blue",
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
});

export default ResetPasswordComp;
