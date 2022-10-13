import React from "react";

import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Pressable, Dimensions, ScrollView } from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const win = Dimensions.get("window");

function ColorsScreen({ navigation, route }) {
    const { carTrim, carMod } = route.params;
    console.log(carTrim, carMod, "mjknkjnkkn");
    const [DATA, setDATA] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const carsSelect = useSelector((state) => state.counter.value);
    const brandSelect = useSelector((state) => state.brand.value);

    async function carLogs() {
        setIsLoading(true);
        try {
            let res = await axios.get(`https://www.dealstryker.com/models/${carsSelect}/${brandSelect}`);
            // console.log("response ============", res);
            if (res) {
                setIsLoading(false);
            }

            setDATA(Object.values(res.data));
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
                <Text style={styles.heading}>Select Color to Continue</Text>
            </View>
            <ScrollView style={styles.wrap}>
                {DATA.map((data) =>
                    data.map((newData, ind) => (
                        <View key={ind}>
                            {newData.trim === carTrim &&
                                newData.exteriors_colors.map((color, i) => {
                                    // console.log("color ===============", color);

                                    return (
                                        <Pressable
                                            key={i}
                                            onPress={() =>
                                                navigation.navigate("CarScreen", {
                                                    carTrim,
                                                    carMod,
                                                    carColor: color.image,
                                                    colorName: color.name,
                                                })
                                            }
                                        >
                                            <View key={i} style={styles.containerMain}>
                                                <View
                                                    style={{
                                                        width: win.width / 4,
                                                        height: win.width / 4,
                                                        borderColor: "lightgray",
                                                        borderRadius: win.width / 2,
                                                        borderWidth: 1,
                                                        backgroundColor: `rgb(${color.rgb})`,
                                                    }}
                                                ></View>
                                                <Text style={styles.colorText}>{color.name}</Text>
                                            </View>
                                        </Pressable>
                                    );
                                })}
                        </View>
                    )),
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { height: win.height / 1.2 },
    heading: {
        fontSize: win.width / 16,
        color: "#0F3749",
        textAlign: "center",
        fontWeight: "bold",
        // marginVertical: win.height / 20,
        paddingVertical: "5%",
    },
    wrap: {
        // borderWidth:1
        marginHorizontal: win.width / 18,
        paddingHorizontal: win.width / 20,
    },
    containerMain: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",

        paddingVertical: win.height / 35,
        // borderWidth:1,
        marginVertical: win.height / 50,
        borderColor: "#0F3749",
        borderWidth: 1,
        // shadowColor: "#0F3749",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 1,
        borderRadius: win.width / 30,
        // elevation: 1,
    },
    colorText: {
        fontSize: win.width / 20,
        color: "#0F3749",
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
});
export default ColorsScreen;
