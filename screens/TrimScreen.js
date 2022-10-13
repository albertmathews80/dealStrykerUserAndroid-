import React from "react";

import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Pressable, Dimensions, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const win = Dimensions.get("window");

function TrimScreen({ navigation, route }) {
    const { carTrim, carMod } = route.params;
    // console.log("carModel >>>>>>>>>>>>>>>", carTrim);
    // const [trimData, setTrimData] = useState([]);
    const [DATA, setDATA] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const carsSelect = useSelector((state) => state.counter.value);
    const brandSelect = useSelector((state) => state.brand.value);
    var globalData = [];
    async function carLogs() {
        setIsLoading(true);
        try {
            let res = await axios.get(`https://www.dealstryker.com/models/${carsSelect}/${brandSelect}`);
            // console.log("response ============", res);
            if (res) {
                setIsLoading(false);
            }

            setDATA(Object.values(res.data));
            // const trimmed = Object.values(res.data);
            // const moreTrim = trimmed.map((data) => data.filter((newData) => newData.model === carMod));

            // setTrimData(moreTrim);

            // console.log("SSSSSSSSSSSSSSSSSSSSSSSSS", moreTrim, "SSSSSSSSSSSSSSSSSSSSS");
            // console.log("VVVVVVVVVVVVVVVVVVVVVVVV", trimData, "VVVVVVVVVVVVVVVVVVVVVVV");
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        carLogs();
    }, []);
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Select Trim to Continue</Text>
            </View>
            <View>
                {isLoading === false && (
                    <ScrollView style={styles.wrap}>
                        {DATA.map((data) =>
                            data.map((newData, ind) => (
                                <View key={ind}>
                                    {newData.model === carMod && (
                                        <Pressable key={ind} style={styles.carCard}>
                                            <View style={styles.containerMain}>
                                                <View style={styles.containerCar}>
                                                    <Pressable
                                                        onPress={() => {
                                                            navigation.navigate("ColorsScreen", {
                                                                carMod: newData.model,
                                                                carTrim: newData.trim,
                                                            });
                                                        }}
                                                    >
                                                        <Image
                                                            source={{ uri: `https://d2axpdwbeki0bf.cloudfront.net/${newData.image}` }}
                                                            style={{ width: win.width / 1.5, height: win.width / 3 }}
                                                        />
                                                    </Pressable>

                                                    <Text style={styles.brandName}>{newData.trim}</Text>
                                                </View>
                                            </View>
                                        </Pressable>
                                    )}
                                </View>
                            )),
                        )}
                    </ScrollView>
                )}
            </View>
            {isLoading && (
                <ActivityIndicator size="large" color="#0F3749" style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { height: win.height },
    heading: {
        fontSize: win.width / 16,
        color: "#0F3749",
        textAlign: "center",
        fontWeight: "bold",
        // marginVertical: win.height / 20,
        paddingVertical: "5%",
    },
    wrap: {
        height: win.height / 1.4,
    },
    containerCar: {
        width: "90%",
        backgroundColor: "white",
        alignItems: "center",
        borderWidth: 0,
        borderColor: "#CDCDCD",
        shadowColor: "#0F3749",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        borderRadius: 5,
        elevation: 4,
        marginHorizontal: win.width / 50,
    },
    containerMain: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",

        paddingVertical: win.height / 35,
    },
    brandName: {
        color: "#0F3749",
        fontWeight: "bold",
        fontSize: 16,
        paddingVertical: "2.5%",
    },
});
export default TrimScreen;
