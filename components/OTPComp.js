import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable, Image, ScrollView, TextInput, Button } from "react-native";

const win = Dimensions.get("window");
const OTPComp = ({pin1, setPin1 , pin2, setPin2 , pin3, setPin3 ,pin4, setPin4 }) => {
    const pinref1 = useRef(null);
    const pinref2 = useRef(null);
    const pinref3 = useRef(null);
    const pinref4 = useRef(null);

    // const [pin1, setPin1] = useState("");
    // const [pin2, setPin2] = useState("");
    // const [pin3, setPin3] = useState("");
    // const [pin4, setPin4] = useState("");

    return (
        <View style={styles.cont}>
            <TextInput
                ref={pinref1}
                maxLength={1}
                keyboardType={'ascii-capable'}
                onChangeText={(pin1) => {
                    setPin1(pin1);
                    if (pin1 !== "") {
                        pinref2.current.focus();
                    }
                }}
                style={styles.otpInp}
            />
            <TextInput
                ref={pinref2}
                maxLength={1}
                keyboardType={'ascii-capable'}
                onChangeText={(pin2) => {
                    setPin2(pin2);
                    if (pin2 !== "") {
                        pinref3.current.focus();
                    }
                }}
                style={styles.otpInp}
            />
            <TextInput
                ref={pinref3}
                maxLength={1}
                keyboardType={'ascii-capable'}
                onChangeText={(pin3) => {
                    setPin3(pin3);
                    if (pin3 !== "") {
                        pinref4.current.focus();
                    }
                }}
                style={styles.otpInp}
            />
            <TextInput
                ref={pinref4}
                maxLength={1}
                keyboardType={'ascii-capable'}
                onChangeText={(pin4) => {
                    setPin4(pin4);
                }}
                style={styles.otpInp}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    cont: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: win.width / 1.5,
    },
    otpInp: {
        width: win.width / 8,
        height: win.width / 8,
        // backgroundColor:"red",
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 10,
        textAlign: "center",
    },
});

export default OTPComp;
