import * as React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarsScreen from "../screens/CarsScreen";
import CarScreen from "../screens/CarScreen";
import CarModelScreen from "../screens/CarModelScreen";
import volvoIcon from "../images/volvoIcon.png";
import YearsScreen from "../screens/YearsScreen";
import TrimScreen from "../screens/TrimScreen";
import { Feather } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import ColorsScreen from "../screens/ColorsScreen";
const Stack = createNativeStackNavigator();
const win = Dimensions.get("window");

function CarStack({ route, navigation }) {
    const brandSelect = useSelector((state) => state.brand.value);
    return (
        <Stack.Navigator
            screenOptions={
                {
                    // headerShown: false,
                }
            }
        >
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#0F3749",
                    },
                    headerTintColor: "white",
                    headerTitle: (props) => (
                        <View style={styles.headerWrap}>
                            {/* <Image source={volvoIcon} /> */}
                            {/* <Text style={styles.brandHeading}>{brandSelect}</Text> */}
                            <View></View>
                            <View></View>
                            <Feather name="settings" size={24} color="white" onPress={() => navigation.navigate("Settings")} />
                        </View>
                    ),
                }}
                name="YearsScreen"
                component={YearsScreen}
                initialParams={route}
            />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#0F3749",
                    },
                    headerTintColor: "white",
                    headerTitle: (props) => (
                        <View style={styles.headerWrap}>
                            {/* <Image source={volvoIcon} /> */}
                            {/* <Text style={styles.brandHeading}>{brandSelect}</Text> */}
                            <View></View>
                            <View></View>
                            <Feather name="settings" size={24} color="white" onPress={() => navigation.navigate("Settings")} />
                        </View>
                    ),
                }}
                name="TrimScreen"
                component={TrimScreen}
                initialParams={route}
            />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#0F3749",
                    },
                    headerTintColor: "white",
                    headerTitle: (props) => (
                        <View style={styles.headerWrap}>
                            {/* <Image source={volvoIcon} /> */}
                            {/* <Text style={styles.brandHeading}>{brandSelect}</Text> */}
                            <View></View>
                            <View></View>
                            <Feather name="settings" size={24} color="white" onPress={() => navigation.navigate("Settings")} />
                        </View>
                    ),
                }}
                name="ColorsScreen"
                component={ColorsScreen}
                initialParams={route}
            />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#0F3749",
                    },
                    headerTintColor: "white",
                    headerTitle: (props) => (
                        <View style={styles.headerWrap}>
                            {/* <Image source={volvoIcon} /> */}
                            {/* <Text style={styles.brandHeading}>{brandSelect}</Text> */}
                            <View></View>
                            <View></View>
                            <Feather name="settings" size={24} color="white" onPress={() => navigation.navigate("Settings")} />
                        </View>
                    ),
                }}
                name="CarsScreen"
                component={CarsScreen}
                initialParams={route}
            />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#0F3749",
                    },
                    headerTintColor: "white",
                    headerTitle: (props) => (
                        <View style={styles.headerWrap}>
                            {/* <Image source={volvoIcon} /> */}
                            <Text style={styles.brandHeading}>Variants | Colors</Text>
                        </View>
                    ),
                }}
                name="CarModelScreen"
                component={CarModelScreen}
                initialParams={route}
            />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#0F3749",
                    },
                    headerTintColor: "white",
                    headerTitle: (props) => (
                        <View style={styles.headerWrap}>
                            {/* <Image source={volvoIcon} /> */}
                            <View></View>
                            <Text style={styles.brandHeading}>Selected Car</Text>
                            <View></View>
                            <View></View>
                        </View>
                    ),
                }}
                name="CarScreen"
                component={CarScreen}
                initialParams={route}
            />

            {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerWrap: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: "crimson",
        width: "89%",
    },
    brandHeading: {
        fontWeight: "bold",
        color: "white",
        fontSize: win.width / 20,
        // fontFamily: "verdana",
    },
});
export default CarStack;
