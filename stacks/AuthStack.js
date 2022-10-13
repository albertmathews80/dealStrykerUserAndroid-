import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
// import LoginScreen from "./screens/LoginScreen";
import HomeStack from "./HomeStack";
import CarStack from "./CarStack";
import SettingStack from "./SettingStack";
import MainStack from "./MainStack";
import MessageStack from "./MessageStack";
import OfferStack from "./OfferStack";
import MapStack from "./MapStack";
import MakeOfferStack from "./MakeOfferStack";
import PrivateMsgStack from "./PrivateMsgStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const StackLogin = createNativeStackNavigator();

function AuthStack({ navigation }) {
    var getToken;
    useEffect(async () => {
        getToken = await AsyncStorage.getItem("user");
        console.log("sdsdsdsdsds", getToken);
    }, []);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {getToken !== null && <Stack.Screen name="SplashScreen" component={SplashScreen} />}

            <Stack.Screen name="MainScreen" component={MainStack} />
            <Stack.Screen name="HomeScreen" component={HomeStack} />
            <Stack.Screen name="OfferStack" component={OfferStack} />
            <Stack.Screen name="MessageStack" component={MessageStack} />
            <Stack.Screen name="Cars" component={CarStack} />
            <Stack.Screen name="Settings" component={SettingStack} />
            <Stack.Screen name="MapStack" component={MapStack} />
            <Stack.Screen name="MakeOfferStack" component={MakeOfferStack} />
            <Stack.Screen name="PrivateMsgStack" component={PrivateMsgStack} />
        </Stack.Navigator>
    );
}

export default AuthStack;
