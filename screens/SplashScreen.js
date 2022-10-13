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
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import splashBackImg from "../images/splashBackImg.png";
import DealStrykerLogo from "../images/DealStrykerLogo.png";
import carImg from "../images/carImg.png";
// import userIcon from "../images/userIcon.png";
// import eyeIcon from "../images/eyeIcon.png";
import facebookIcon from "../images/facebookIcon.png";
import googleIcon from "../images/googleIcon.png";
// import { TouchableOpacity } from "react-native-web";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { CheckBox, Icon } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import OTPComp from "../components/OTPComp";
import axios from "axios";
import { Snackbar } from "react-native-paper";
import api from "./../services/api";
import OtpForm from "../components/OtpForm";
import LoginComp from "../components/LoginComp";
import SignupComp from "../components/SignupComp";
import NewPasswordComp from "../components/NewPasswordComp";
import ResetPasswordComp from "../components/ResetPasswordComp";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AsyncStorage from '@react-native-community/async-storage'

const win = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePass] = useState("");
    const [dName, onChangeDname] = useState("");
    const [manu, onChangeManu] = useState("");
    const [street, onChangeStreet] = useState("");
    const [zipC, onChangeZipC] = useState("");
    const [emailSign, onChangeEmailSign] = useState("");
    const [passSign, onChangePassSign] = useState("");
    const [cpassSign, onChangeCPassSign] = useState("");
    const [newPass, onChangeNewPass] = useState("");
    const [username, onChangeUsername] = useState("");

    const [number, onChangeNumber] = useState(null);
    const [selectedUser, setSelectedUser] = useState("user");
    const [forSign, setForSign] = useState(true);
    const [checkAnime, setCheckAnime] = useState(false);
    const [check1, setCheck1] = useState(false);
    const [forForget, setForForget] = useState(false);
    const [forOtp, setForOtp] = useState(false);
    const [forComfirm, setForComfirm] = useState(false);
    // const [Snackbar, setSnackbar] = useState(false);
    const [visible, setVisible] = useState(false);
    const [displayMsg, setDisplayMsg] = useState("");
    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [screenToShow, setScreenToShow] = useState("login");
    const [emailForReset, setEmailForReset] = useState("");
    const [otpCode, setOtpCode] = useState("");

    useEffect(async () => {
        if ((await AsyncStorage.getItem("user")) !== null) {
            goto();
        }
    }, []);
    function goto(val) {
        // navigation.navigate("MainScreen");
        setCheckAnime(true);
        setTimeout(() => {
            navigation.navigate("MainScreen");
        }, 1500);
        // alert(val);
    }

    const onToggleSnackBar = () => setVisible(!Snackbar);

    const onDismissSnackBar = () => setVisible(false);

    // function passwordChanged() {
    //     setForForget(false);
    //     setForOtp(false);
    //     setForComfirm(false);
    // }

    const resetPasswordRequest = async () => {
        setIsLoading(true);
        try {
            const body = {
                email: email.toLowerCase(),
            };
            console.log(body);
            let res = await axios.post(`${"https://app.dealstryker.com/api/users/resetPasswordReq"}`, body);

            setForComfirm(true);
            console.log("check response for forget password", res);
            setIsLoading(false);
        } catch (error) {
            // alert(error.message);
            // setVisible(true);
            // setDisplayMsg(error.message);
            console.log("check error for forget password", error.message);
            setIsLoading(false);
            setVisible(true);
            setDisplayMsg(error.message);
        }
    };

    const passwordChangedNew = async () => {
        const bodyResetPass = {
            id: await AsyncStorage.getItem("id"),
            newPassword: newPass.toString(),
            token: await AsyncStorage.getItem("token"),
        };

        try {
            console.log(bodyResetPass);
            let res = await axios.post(`${"https://app.dealstryker.com/api/users/resetPassword"}`, bodyResetPass);
            setVisible(true);
            console.log(res, "coming");
        } catch (error) {
            alert(error.message);
            setForComfirm(true);
            // setVisible(true);
            // setDisplayMsg(error.message);
        }
    };

    const passwordChanged = async () => {
        try {
            // if (newPass === cpassSign && newPass && cpassSign) {
            //     const {
            //         data: { message, Error },
            //     } = await axios.post("https://deal-stryker-backend.herokuapp.com/api/v1/users/change-pass", {
            //         email: email,
            //         password: newPass,
            //     });
            //     if (!Error) {
            //         setForForget(false);
            //         setForOtp(false);
            //         setForComfirm(false);
            //     } else {
            //         // alert(message);
            //         setVisible(true);
            //         setDisplayMsg(message);
            //     }
            // } else {
            //     // alert("Password mismatch!")
            //     setVisible(true);
            //     setDisplayMsg("Password mismatch");
            // }
        } catch (error) {
            // alert(error.message);
            // setVisible(true);
            // setDisplayMsg(error.message);
        }
    };

    const verifyOtp = async () => {
        try {
            const code = `${pin1}${pin2}${pin3}${pin4}`;
            const {
                data: { message, Error },
            } = await axios.post("https://deal-stryker-backend.herokuapp.com/api/v1/users//verify-otp", {
                email: email.toLowerCase(),
                otp: code,
            });

            // console.log(message , Error);

            if (Error) {
                // alert(message);
                setVisible(true);
                setDisplayMsg(message);
            } else {
                setForComfirm(true);
            }
        } catch (error) {
            // alert(error.message)
            setVisible(true);
            setDisplayMsg(error.message);
        }
    };

    const requestOtp = async () => {
        try {
            const {
                data: { message, Error },
            } = await axios.post("https://deal-stryker-backend.herokuapp.com/v1/users/verify-email", { email: email.toLowerCase() });

            if (Error) {
                // alert(message)
                setVisible(true);
                setDisplayMsg(message);
            } else {
                setForOtp(true);
            }
        } catch (error) {
            // alert(error.message)
            setVisible(true);
            setDisplayMsg(error.message);
        }
    };

    const login = async () => {
        if (email !== "" && password !== "") {
            try {
                setIsLoading(true);
                const body = {
                    user: {
                        email: email.toLowerCase(),
                        password,
                    },
                };

                const res = await api.post("/users/login", body);
                setIsLoading(false);
                console.log("login res.data.user >>>>>>>>>>>>>>>>>>>>", res.data.user);

                await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

                setCheckAnime(true);

                setTimeout(() => {
                    navigation.navigate("MainScreen");
                }, 1500);
            } catch (error) {
                console.log("login error", error);
                setVisible(true);
                setDisplayMsg(error.message);
                setIsLoading(false);
            }
        } else {
            setVisible(true);
            setDisplayMsg("Please fill all feilds");
        }
    };

    const registerCustomer = async () => {
        if (emailSign !== "" && passSign !== "" && username !== "" && cpassSign !== "") {
            try {
                setIsLoading(true);
                const body = {
                    user: {
                        email: emailSign.toLowerCase(),
                        password: passSign,
                        role: "customer",
                    },
                };

                const res = await api.post("/users/registerCustomer", body);
                setIsLoading(false);
                console.log("registerCustomer res.data.user >>>>>>>>>>>>>>>>>>>>", res.data.user);

                await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

                setCheckAnime(true);

                setTimeout(() => {
                    navigation.navigate("MainScreen");
                }, 1500);
            } catch (error) {
                console.log("registerCustomer error", error);
                setVisible(true);
                setDisplayMsg(error.message);
                // alert(`Error: ${error.message}`);
            }
        } else {
            setVisible(true);
            setDisplayMsg("Please fill all feilds");
        }
    };

    function handleCheckbox(val) {
        setCheck1(!check1);
    }

    var leftValue = useState(new Animated.Value(win.width))[0];
    var formValue = useState(new Animated.Value(win.width * 2))[0];
    var logoValue = useState(new Animated.Value(win.height / 3))[0];

    function moveCar() {
        Animated.timing(leftValue, {
            toValue: !checkAnime ? win.width / 20 : win.width / 20 - win.width * 2,
            duration: 1500,
            useNativeDriver: false,
        }).start();
    }

    moveCar();

    function moveForm() {
        Animated.timing(formValue, {
            toValue: !checkAnime ? win.width / 90 : win.width / 90 - win.width * 2,
            duration: 1500,
            useNativeDriver: false,
        }).start();
    }

    moveForm();

    function moveLogo() {
        Animated.timing(logoValue, {
            toValue: !checkAnime ? win.height / 17 : win.height / 17 - win.width * 2,
            duration: 2000,
            useNativeDriver: false,
        }).start();
    }

    moveLogo();

    return (
        <View style={styles.container}>
            {/* {isLoading && <ActivityIndicator size="large" color="purple" style={{ position: "absolute", zIndex: 2000 }} />} */}
            {/* <ImageBackground source={splashBackImg} resizeMode="contain" imageStyle={styles.} style={styles.image} imageStyle={styles.backgroundStyle}> */}
            <Animated.View style={{ position: "absolute", top: logoValue }}>
                <View style={styles.imageMid}>
                    <Image source={DealStrykerLogo} resizeMode="contain" style={styles.imageStyling} />
                </View>
            </Animated.View>
            <Animated.View
                style={{
                    width: win.width / 0.99,
                    alignItems: "center",
                    marginLeft: formValue,
                    zIndex: 1,
                }}
            >
                {screenToShow === "login" && (
                    <LoginComp setScreenToShow={setScreenToShow} setDisplayMsg={setDisplayMsg} setVisible={setVisible} goto={goto} />
                )}
                {screenToShow === "signup" && (
                    <SignupComp setScreenToShow={setScreenToShow} setDisplayMsg={setDisplayMsg} setVisible={setVisible} goto={goto} />
                )}
                {screenToShow === "forgetPassword" && (
                    <ResetPasswordComp
                        setScreenToShow={setScreenToShow}
                        setDisplayMsg={setDisplayMsg}
                        setVisible={setVisible}
                        setEmailForReset={setEmailForReset}
                    />
                )}
                {screenToShow === "otpScreen" && (
                    <OtpForm
                        setScreenToShow={setScreenToShow}
                        setDisplayMsg={setDisplayMsg}
                        setVisible={setVisible}
                        setOtpCode={setOtpCode}
                        emailForReset={emailForReset}
                    />
                )}
                {screenToShow === "newPassword" && (
                    <NewPasswordComp
                        setScreenToShow={setScreenToShow}
                        setDisplayMsg={setDisplayMsg}
                        setVisible={setVisible}
                        otpCode={otpCode}
                        emailForReset={emailForReset}
                    />
                )}
                {/* 
                <View style={[forSign ? styles.logForm : styles.signForm]}>
                    {forSign && !forForget && (
                        <View style={styles.inputWrap}>
                            <TextInput onChangeText={onChangeEmail} value={email} style={styles.input} placeholder="Enter Email" />

                            <MaterialIcons name="email" size={win.width / 18} color="#0F3749" />
                        </View>
                    )}

                    {forSign && !forForget && (
                        <View style={styles.inputWrap}>
                            <TextInput
                                onChangeText={onChangePass}
                                placeholder="Enter your password"
                                value={password}
                                style={styles.input}
                                secureTextEntry={true}
                            />
                            <Entypo name="lock" size={win.width / 18} color="#0F3749" />
                        </View>
                    )}

                    {!forSign && !forForget && (
                        <View style={styles.inputWrap}>
                            <TextInput onChangeText={onChangeUsername} placeholder="Enter Username" value={username} style={styles.input} />
                            <FontAwesome name="user" size={win.width / 18} color="#0F3749" />
                        </View>
                    )}
                    {!forSign && !forForget && (
                        <View style={styles.inputWrap}>
                            <TextInput onChangeText={onChangeEmailSign} placeholder="Email" value={emailSign} style={styles.input} />

                            <MaterialIcons name="email" size={win.width / 18} color="#0F3749" />
                        </View>
                    )}
                    {!forSign && !forForget && (
                        <View style={styles.inputWrap}>
                            <TextInput
                                type="password"
                                onChangeText={onChangePassSign}
                                placeholder="Password"
                                value={passSign}
                                style={styles.input}
                                secureTextEntry={true}
                            />
                            <Entypo name="lock" size={win.width / 18} color="#0F3749" />
                        </View>
                    )}
                    {!forSign && !forForget && (
                        <View style={styles.inputWrap}>
                            <TextInput
                                onChangeText={onChangeCPassSign}
                                placeholder="Confirm password"
                                value={cpassSign}
                                style={styles.input}
                                secureTextEntry={true}
                            />
                            <Entypo name="lock" size={win.width / 18} color="#0F3749" />
                        </View>
                    )}
                    {!forSign && !forForget && (
                        <View style={styles.agreeBox}>
                            <CheckBox
                                title="By signing up, i agree that i have read and accepted the Terms and Services to login now"
                                center
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                textStyle={{ color: "gray", fontWeight: "normal", fontSize: win.width / 38 }}
                                containerStyle={{ borderWidth: 0, backgroundColor: "white" }}
                                size={win.height / 40}
                                checked={check1}
                                onPress={() => handleCheckbox("check1")}
                            />
                        </View>
                    )}

                    {forSign && !forForget && (
                        <View style={styles.inpHeading}>
                            <Text></Text>
                            <Pressable onPress={() => setForForget(true)}>
                                <Text style={styles.forgetText}>Forgot Password?</Text>
                            </Pressable>
                        </View>
                    )}

                    {!forForget && (
                        <>
                            {forSign ? (
                                <Pressable style={styles.loginBtn} onPress={() => login()}>
                                    {isLoading === false && <Text style={styles.loginText}>Login</Text>}
                                    {isLoading && <ActivityIndicator size="small" color="white" style={{ marginLeft: win.width / 50 }} />}
                                </Pressable>
                            ) : (
                                <Pressable style={styles.loginBtn} onPress={() => registerCustomer()}>
                                    {isLoading === false && <Text style={styles.loginText}>Signup</Text>}
                                    {isLoading && <ActivityIndicator size="small" color="white" style={{ marginLeft: win.width / 50 }} />}
                                </Pressable>
                            )}
                        </>
                    )}

                    {!forForget && (
                        <View style={styles.loginBtnFb}>
                            <Image source={facebookIcon} />
                            {forSign ? (
                                <Text style={styles.loginTextFb}>Login with Facebook</Text>
                            ) : (
                                <Text style={styles.loginTextFb}>Signup with Facebook</Text>
                            )}
                        </View>
                    )}
                    {!forForget && (
                        <View style={styles.loginBtnGoogle}>
                            <Image source={googleIcon} />
                            {forSign ? (
                                <Text style={styles.loginTextGo}>Login with Google</Text>
                            ) : (
                                <Text style={styles.loginTextGo}>Signup with Google</Text>
                            )}
                        </View>
                    )}
                    {!forForget && (
                        <View>
                            {forSign ? (
                                <Pressable onPress={() => setForSign(false)}>
                                    <Text style={styles.createAcc}>
                                        Dont Have an Account? <Text style={styles.createAccInner}>SignUp</Text>
                                    </Text>
                                </Pressable>
                            ) : (
                                <Pressable onPress={() => setForSign(true)} style={styles.already}>
                                    <Text style={styles.createAcc}>
                                        Already Have an Account? <Text style={styles.createAccInner}>Login</Text>
                                    </Text>
                                </Pressable>
                            )}
                        </View>
                    )}
                    {!forSign && forForget && (
                        <View>
                            <Text style={styles.termN}>Terms and Conditions</Text>
                        </View>
                    )}
                    {forForget && (
                        <View style={styles.forgetFCont}>
                            {!forOtp && !forComfirm && (
                                <View style={styles.headingFCont}>
                                    <Text style={styles.subF1}>Forget Password</Text>
                                    <Text style={styles.subF2}>
                                        Enter your email for the verification process, we will send you 4 digit code to your email
                                    </Text>
                                </View>
                            )}
                            {forOtp && !forComfirm && (
                                <View style={styles.headingFCont}>
                                    <Text style={styles.subF1}>Enter 4 Digit Code</Text>
                                    <Text style={styles.subF2}>Enter 4 digit code that you receive in your email</Text>
                                </View>
                            )}
                            {forComfirm && (
                                <View style={styles.headingFCont}>
                                    <Text style={styles.subF1}>Reset Password</Text>
                                    <Text style={styles.subF2}>
                                        Set the new password for your account so you can login and access all the features
                                    </Text>
                                </View>
                            )}
                            {!forOtp && !forComfirm && (
                                <View style={styles.inputWrapF}>
                                    <TextInput onChangeText={onChangeEmail} placeholder="Enter Email" value={email} style={styles.inputF} />

                                    <MaterialIcons name="email" size={win.width / 18} color="#0F3749" />
                                </View>
                            )}
                            {forOtp && !forComfirm && (
                                <OTPComp
                                    pin1={pin1}
                                    setPin1={setPin1}
                                    pin2={pin2}
                                    setPin2={setPin2}
                                    pin3={pin3}
                                    setPin3={setPin3}
                                    pin4={pin4}
                                    setPin4={setPin4}
                                />
                            )}
                            {forComfirm && (
                                <Pressable>
                                    <View style={styles.inputWrapF}>
                                        <TextInput
                                            onChangeText={onChangeNewPass}
                                            placeholder="New Password"
                                            value={newPass}
                                            style={styles.inputF}
                                            secureTextEntry={true}
                                        />
                                        <Entypo name="eye" size={win.width / 18} color="#0F3749" />
                                    </View>
                                    <View style={styles.inputWrapF}>
                                        <TextInput
                                            onChangeText={onChangeCPassSign}
                                            placeholder="Confirm Password"
                                            value={cpassSign}
                                            style={styles.inputF}
                                            secureTextEntry={true}
                                        />

                                        <Entypo name="eye" size={win.width / 18} color="#0F3749" />
                                    </View>
                                </Pressable>
                            )}
                            {!forOtp && !forComfirm && (
                                <Pressable style={styles.loginBtnF} onPress={() => resetPasswordRequest()}>
                                    {isLoading === false && <Text style={styles.loginText}>Continue</Text>}
                                    {isLoading && <ActivityIndicator size="small" color="white" style={{ marginLeft: win.width / 50 }} />}
                                </Pressable>
                            )}
                            {forOtp && !forComfirm && (
                                <Pressable style={styles.loginBtnF} onPress={verifyOtp}>
                                    <Text style={styles.loginText}>Continue</Text>
                                </Pressable>
                            )}
                            {forComfirm && (
                                <Pressable style={styles.loginBtnF} onPress={passwordChangedNew}>
                                    <Text style={styles.loginText}>Continue</Text>
                                </Pressable>
                            )}
                        </View>
                    )}
                </View> */}
            </Animated.View>
            <Image source={splashBackImg} style={styles.image} resizeMode="contain" />
            {/* <Image source={carImg} style={styles.imageCar} resizeMode="contain" /> */}
            <Animated.View style={{ right: leftValue, position: "absolute", bottom: 0 }}>
                <Image source={carImg} style={styles.imageCar} resizeMode="contain" />
            </Animated.View>
            {/* </ImageBackground> */}
            <Snackbar visible={visible} onDismiss={() => setVisible(false)} style={{ backgroundColor: "crimson" }}>
                {displayMsg}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0e3749",
        alignItems: "center",
        justifyContent: "center",
        minHeight: Math.round(win.height),
    },
    image: {
        flex: 1,
        // opacity: 0.5,
        position: "absolute",
        bottom: "0%",
    },
    imageMid: {
        // flex: 1,
        // marginBottom: "40%",
        // position: "absolute",
        // top: win.height / 20,
    },
    imageStyling: {
        width: win.width / 2,
        height: win.height / 7,
    },
    imageCar: {
        flex: 1,

        // position: "absolute",
        // bottom: "0%",
        // right: "20%",
        width: win.width / 0.5,
        height: win.height / 3.2,
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
    signForm: {
        // flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        // position: "absolute",
        // top: "20%",
        height: win.height / 1.55,
        width: "80%",
        backgroundColor: "white",
        opacity: 1,
        borderRadius: 10,
        zIndex: 1000,
        marginBottom: win.height / 85,
        // marginTop:win.height/90,
        paddingVertical: win.height / 80,
    },
    userOpt: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "12%",
        // shadowColor: "rgba(0, 0, 0, 0.5);",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // borderRadius: 5,
        // elevation: 4,
        width: "85%",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
    },
    userOptInner: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#1F9DD9",
        height: "100%",
        alignItems: "center",
    },
    dealerOptInner: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "lightgray",
        height: "100%",
        alignItems: "center",
    },
    userOptInner2: {
        flexDirection: "row",
        justifyContent: "center",
        color: "#0F3749",
        width: "50%",
        textAlign: "center",
    },
    dealerOptInner2: {
        flexDirection: "row",
        justifyContent: "center",
        color: "#0F3749",
        width: "50%",
        textAlign: "center",
    },
    userOptText: {
        color: "white",
        width: "50%",
        textAlign: "center",
        fontSize: win.height / 60,
    },
    dealerOptText: {
        color: "#0F3749",
        width: "50%",
        textAlign: "center",
        fontSize: win.height / 60,
    },
    userOptText2: {
        color: "#0F3749",
        width: "50%",
        textAlign: "center",
        fontSize: win.height / 60,
    },
    dealerOptText2: {
        color: "white",
        width: "50%",
        textAlign: "center",
        fontSize: win.height / 60,
    },
    userOptTextSel: {
        color: "#0F3749",
        width: "50%",
        textAlign: "center",
    },
    dealerOptTextSel: {
        color: "#0F3749",
        width: "50%",
        textAlign: "center",
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
    inpHeading: {
        display: "flex",
        justifyContent: "space-between",

        width: "85%",
        flexDirection: "row",
    },

    loginBtn: {
        backgroundColor: "rgba(31, 157, 217, 1)",
        width: "85%",
        height: win.height / 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        flexDirection: "row",
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
    forgetText: {
        color: "rgba(31, 157, 217, 1)",
        fontSize: win.height / 62,
    },
    createAcc: {
        color: "lightgray",
        fontSize: win.height / 60,
    },
    createAccInner: {
        color: "#1F9DD9",
        fontWeight: "bold",
    },
    termN: {
        color: "#1F9DD9",
        fontSize: win.height / 60,
        fontWeight: "bold",
        marginVertical: win.height / 200,
    },

    agreeBox: {
        // backgroundColor:"crimson",
        paddingHorizontal: win.width / 50,
    },
    already: {
        marginTop: win.height / 130,
    },

    forgetFCont: {
        display: "flex",
        justifyContent: "space-between",
        // backgroundColor: "red",
        height: win.height / 2.5,
        alignItems: "center",
    },
    headingFCont: {},
    inputWrapF: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        alignItems: "center",
    },
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
});

export default SplashScreen;
