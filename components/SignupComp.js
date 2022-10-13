import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import facebookIcon from "../images/facebookIcon.png";
import googleIcon from "../images/googleIcon.png";
// import axios from "axios";
import api from "../services/api";

import { Entypo } from "@expo/vector-icons";

const win = Dimensions.get("window");

function SignupComp({
  setScreenToShow,
  navigation,
  setDisplayMsg,
  setVisible,
  goto,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSign, onChangeEmailSign] = useState("");
  const [passSign, onChangePassSign] = useState("");

  const [cpassSign, onChangeCPassSign] = useState("");
  const [check1, setCheck1] = useState(false);
  const [username, onChangeUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleCheckbox(val) {
    setCheck1(!check1);
  }
  const registerCustomer = async () => {
    if (
      emailSign !== "" &&
      passSign !== "" &&
      username !== "" &&
      cpassSign !== ""
    ) {
      setIsLoading(true);
      try {
        // setIsLoading(true);
        const body = {
          user: {
            email: emailSign.toLowerCase(),
            password: passSign,
            role: "customer",
          },
        };

        const res = await api.post("/users/registerCustomer", body);
        console.log(
          "registerCustomer res.data.user >>>>>>>>>>>>>>>>>>>>",
          res.data.user
        );

        if (res) {
          await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

          setIsLoading(false);

          goto();
        }
      } catch (error) {
        console.log("registerCustomer error", error);
        setVisible(true);
        setDisplayMsg(error.message);
        setIsLoading(false);
        // alert(`Error: ${error.message}`);
      }
    } else {
      setVisible(true);
      setDisplayMsg("Please fill all feilds");
    }
  };
  return (
    <View style={styles.signForm}>
      <View style={styles.inputWrap}>
        <TextInput
          onChangeText={onChangeUsername}
          placeholder="Username"
          value={username}
          style={styles.input}
        />
        <FontAwesome name="user" size={win.width / 18} color="#0F3749" />
      </View>
      <View style={styles.inputWrap}>
        <TextInput
          onChangeText={onChangeEmailSign}
          placeholder="Email Address"
          value={emailSign}
          style={styles.input}
        />

        <MaterialIcons name="email" size={win.width / 18} color="#0F3749" />
      </View>
      <View style={styles.inputWrap}>
        {showPassword ? (
          <>
            <TextInput
              type="password"
              onChangeText={onChangePassSign}
              placeholder="Password"
              value={passSign}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(false)}>
              <Entypo
                name="eye-with-line"
                size={win.width / 18}
                color="#0F3749"
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              type="password"
              onChangeText={onChangePassSign}
              placeholder="Password"
              value={passSign}
              style={styles.input}
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => setShowPassword(true)}>
              <Entypo name="eye" size={win.width / 18} color="#0F3749" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.inputWrap}>
        {showPassword ? (
          <>
            <TextInput
              onChangeText={onChangeCPassSign}
              placeholder="Confirm Password"
              value={cpassSign}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(false)}>
              <Entypo
                name="eye-with-line"
                size={win.width / 18}
                color="#0F3749"
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              onChangeText={onChangeCPassSign}
              placeholder="Confirm Password"
              value={cpassSign}
              style={styles.input}
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => setShowPassword(true)}>
              <Entypo name="eye" size={win.width / 18} color="#0F3749" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.agreeBox}>
        <CheckBox
          title="By signing up, i agree that i have read and accepted the Terms and Services to login now"
          center
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          textStyle={{
            color: "gray",
            fontWeight: "normal",
            fontSize: win.width / 38,
          }}
          containerStyle={{ borderWidth: 0, backgroundColor: "white" }}
          size={win.height / 40}
          checked={check1}
          onPress={() => handleCheckbox("check1")}
        />
      </View>
      <Pressable style={styles.loginBtn} onPress={() => registerCustomer()}>
        {isLoading === false && <Text style={styles.loginText}>Signup</Text>}
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{ marginLeft: win.width / 50 }}
          />
        )}
      </Pressable>
      <View style={styles.loginBtnFb}>
        <Image source={facebookIcon} />

        <Text style={styles.loginTextFb}>Signup with Facebook</Text>
      </View>
      <View style={styles.loginBtnGoogle}>
        <Image source={googleIcon} />

        <Text style={styles.loginTextGo}>Signup with Google</Text>
      </View>
      <Pressable onPress={() => setScreenToShow("login")}>
        <Text style={styles.createAcc}>
          Already Have an Account?{" "}
          <Text style={styles.createAccInner}>Login</Text>
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
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
    color: "gray",
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
  createAcc: {
    color: "gray",
    fontSize: win.height / 60,
  },
  createAccInner: {
    color: "#1F9DD9",
    fontWeight: "bold",
  },
  agreeBox: {
    // backgroundColor:"crimson",
    paddingHorizontal: win.width / 50,
  },
});
export default SignupComp;
