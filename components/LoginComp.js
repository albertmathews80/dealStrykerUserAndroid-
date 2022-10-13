import { Entypo, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import facebookIcon from "../images/facebookIcon.png";
import googleIcon from "../images/googleIcon.png";
// import axios from "axios";
import api from "../services/api";

const win = Dimensions.get("window");

function LoginComp({ setScreenToShow, navigation, setDisplayMsg, setVisible, goto }) {
    const [email, onChangeEmail] = useState("vofeta7147@wnpop.com"); // vofeta7147@wnpop.com
    const [password, onChangePass] = useState("Vofeta7147@"); // Vofeta7147@
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const login = async () => {
        if (email !== "" && password !== "") {
            setIsLoading(true);

            try {
                const body = {
                    user: {
                        email,
                        password,
                    },
                };

                let res = await api.post(`/users/login`, body);
                // console.log("res.data >>>>>>>>>>>", res.data);

                if (res && res.data.user.role === "customer") {
                    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
                    setIsLoading(false);
                    goto();
                } else {
                    setDisplayMsg("Customer account not found");
                    setIsLoading(false);
                }
            } catch (error) {
                console.log("login error", error);
                setVisible(true);
                setDisplayMsg(error.message);
                setIsLoading(false);
            }
        } else {
            setVisible(true);
            setDisplayMsg("Please fill all feilds");
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.logForm}>
            <View style={styles.inputWrap}>
                <TextInput onChangeText={onChangeEmail} value={email} style={styles.input} placeholder="Email Address" />

                <MaterialIcons name="email" size={win.width / 18} color="#0F3749" />
            </View>

            <View style={styles.inputWrap}>
                {showPassword ? (
                    <>
                        <TextInput onChangeText={onChangePass} placeholder="Password" value={password} style={styles.input} />
                        <TouchableOpacity onPress={() => setShowPassword(false)}>
                            <Entypo name="eye-with-line" size={win.width / 18} color="#0F3749" />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TextInput
                            onChangeText={onChangePass}
                            placeholder="Password"
                            value={password}
                            style={styles.input}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(true)}>
                            <Entypo name="eye" size={win.width / 18} color="#0F3749" />
                        </TouchableOpacity>
                    </>
                )}
            </View>
            <View style={styles.inpHeading}>
                <Text></Text>
                <Pressable onPress={() => setScreenToShow("forgetPassword")}>
                    <Text style={styles.forgetText}>Forgot Password?</Text>
                </Pressable>
            </View>
            <Pressable style={styles.loginBtn} onPress={() => login()}>
                <View>
                    {isLoading === false && <Text style={styles.loginText}>Login</Text>}
                    {isLoading && <ActivityIndicator size="small" color="white" style={{ marginLeft: win.width / 50 }} />}
                </View>

                {/* <Pressable onPress={signupDealer}>
            <Text style={styles.loginText}>Signup</Text>
          </Pressable> */}
            </Pressable>
            <View style={styles.loginBtnFb}>
                <Image source={facebookIcon} />

                <Text style={styles.loginTextFb}>Login with Facebook</Text>
            </View>
            <View style={styles.loginBtnGoogle}>
                <Image source={googleIcon} />

                <Text style={styles.loginTextGo}>Login with Google</Text>
            </View>
            <Pressable onPress={() => setScreenToShow("signup")}>
                <Text style={styles.createAcc}>
                    Dont Have an Account? <Text style={styles.createAccInner}>Sign up</Text>
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
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
    loginTextFb: {
        marginLeft: 5,
        color: "white",
        fontSize: win.height / 58,
    },
    loginTextGo: {
        marginLeft: 5,
        color: "gray",
        fontSize: win.height / 58,
    },
    forgetText: {
        color: "rgba(31, 157, 217, 1)",
        fontSize: win.height / 62,
    },
    loginBtnFb: {
        backgroundColor: "rgba(80, 112, 169, 1)",
        width: "85%",
        height: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 10,
    },
    logForm: {
        // flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        // position: "absolute",
        // top: "20%",
        height: win.height / 2.1,
        width: "80%",
        backgroundColor: "white",
        opacity: 1,
        borderRadius: 10,
        zIndex: 1000,
        marginBottom: win.height / 8,
    },
    inpHeading: {
        display: "flex",
        justifyContent: "space-between",

        width: "85%",
        flexDirection: "row",
    },

    loginBtnGoogle: {
        backgroundColor: "white",
        width: "85%",
        height: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 10,
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: "lightgray",
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
    input: {
        // backgroundColor: "blue",
        height: 40,
        width: "90%",
        fontSize: win.height / 50,
        color: "gray",
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
    createAcc: {
        color: "gray",
        fontSize: win.height / 60,
    },
    createAccInner: {
        color: "#1F9DD9",
        // color: "gray",
        fontWeight: "bold",
    },
});
export default LoginComp;
