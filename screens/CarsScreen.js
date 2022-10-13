import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable, Dimensions, Image, Animated, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarOptionComp from "../components/CarOptionComp";
import car1 from "../images/car1.png";
import car2 from "../images/car2.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../slices/counterSlice";
import { incrementcar } from "../slices/carSlice";
import { incrementbrand } from "../slices/brandSlice";
import leftArr from "../images/leftArr.png";
import rightArr from "../images/rightArr.png";

const win = Dimensions.get("window");

// const DATA = [
//     {
//         id: "001",
//         car: car1,
//     },
//     {
//         id: "002",
//         car: car2,
//     },
//     {
//         id: "003",
//         car: car1,
//     },
// ];
const colorData = [
    { color: "red", id: "01" },
    { color: "gray", id: "02" },
    { color: "lightgray", id: "03" },
    { color: "#938E88", id: "04" },
    { color: "#000000", id: "05" },
    { color: "gray", id: "06" },
    { color: "lightgray", id: "07" },
    { color: "#DADADA", id: "08" },
    { color: "red", id: "09" },
];

function CarsScreen({ navigation, route }) {
    const dispatch = useDispatch();

    // const [chooseYear, setChooseYear] = React.useState(2020);
    const [yoyo, setyoyo] = React.useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const modelData = ["T5 4dr Wagon AWD", "T4 3dr Wagon SUV", "T2 4dt Wagon EBR"];
    const carsSelect = useSelector((state) => state.counter.value);
    const [DATA, setDATA] = React.useState([]);
    const [uniqueD, setUniqueD] = useState([]);
    const carSelect = useSelector((state) => state.car.value);
    // const DATA = carSelect;
    const brandSelect = useSelector((state) => state.brand.value);
    console.log("<<<<<<<<<<<<<<<<<<<<<<", carsSelect, brandSelect, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    async function carLogs() {
        setIsLoading(true);
        try {
            let res = await axios.get(`https://www.dealstryker.com/models/${carsSelect}/${brandSelect}`);

            if (res) {
                const uniqueval = Object.values(res.data);

                // const unique = [...new Set(uniqueval[0].map((item) => item.model))];

                // let arr = [];

                // for (let key in uniqueval[0]) {
                //     for (let model of unique) {
                //         if (key.model === model) {
                //             arr.push(uniqueval[0][key]);
                //         }
                //     }
                // }

                // console.log("arr >>>>>>>>>>>>>>>>>>", arr);

                // const uni = unique.map((data) => data.map((uniqueData) => letters.add(uniqueData.model)));
                // console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", uniqueval[0]);
                // // let obj = {};
                // // for (let iterator of uni) {
                // //     obj[iterator.model] = { ...iterator };
                // // }

                setDATA(Object.values(res.data));
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        carLogs();
    }, [carsSelect]);

    return (
        <View style={styles.container}>
            <View style={styles.yearCont}>
                <Text style={styles.heading}>Select Model to Continue</Text>
            </View>
            <ScrollView style={styles.wrap}>
              {DATA.map((data) => 
               data.map((newData, ind) => (
                    <Pressable key={ind} style={styles.carCard}>
                      
                        <View style={styles.containerMain}>
                            <View style={styles.containerCar}>
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("TrimScreen", {
                                            carIndex: ind,
                                            carMod: newData.model,
                                            carTrim: newData.trim,
                                        });
                                    }}
                                >
                                    {newData.image === "NA" && <Text style={styles.noPic}>Picture not available for now</Text>}
                                    {newData.image !== "NA" && (
                                        <Image
                                            source={{ uri: `https://d2axpdwbeki0bf.cloudfront.net/${newData.image}` }}
                                            style={{ width: win.width / 1.5, height: win.width / 3 }}
                                        />
                                    )}
                                </Pressable>

                                <Text style={styles.brandName}>{newData.model}</Text>
                            </View>
                        </View>
                    </Pressable>
                ))
                )} 
            </ScrollView>

            {isLoading && (
                <ActivityIndicator size="large" color="#0F3749" style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }} />
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBFBFB",
        // height: "100%",
        paddingVertical: "5%",
    },
    heading: {
        fontSize: win.width / 16,
        color: "#0F3749",
        textAlign: "center",
        fontWeight: "bold",
    },
    wrap: {
        // backgroundColor: "coral",
        // display: "flex",
        // flex: 1,
        // flexDirection: "column",
        height: win.height / 2,
        // flexGrow:1
    },
    carCard: {},
    yearCont: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: win.width / 30,
    },
    yearWrap1: {
        backgroundColor: "rgba(31, 157, 217, 1)",
        color: "white",
        fontSize: win.width / 20,
        paddingVertical: win.width / 60,
        paddingHorizontal: win.width / 8,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    yearWrap2: {
        backgroundColor: "gray",
        color: "white",
        fontSize: win.width / 20,
        paddingVertical: win.width / 60,
        paddingHorizontal: win.width / 8,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    yearWrap1Select: {
        backgroundColor: "gray",
        color: "white",
        fontSize: win.width / 20,
        paddingVertical: win.width / 60,
        paddingHorizontal: win.width / 8,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    yearWrap2Select: {
        backgroundColor: "rgba(31, 157, 217, 1)",
        color: "white",
        fontSize: win.width / 20,
        paddingVertical: win.width / 60,
        paddingHorizontal: win.width / 8,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
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
        // height: "50%",
        // flex: 1,
        // backgroundColor: "lightgray",
    },
    optWrap1: {
        flexDirection: "row",
        width: "70%",
        justifyContent: "space-between",
        paddingVertical: "2.55%",
        borderBottomColor: "#CDCDCD",
        borderBottomWidth: 1,
        borderTopColor: "#CDCDCD",
        borderTopWidth: 1,
        alignItems: "center",
    },
    optWrap2: {
        flexDirection: "row",
        width: "70%",
        justifyContent: "space-between",
        paddingVertical: "2.5%",
        alignItems: "center",
    },
    brandName: {
        color: "#0F3749",
        fontWeight: "bold",
        fontSize: 16,
        paddingVertical: "2.5%",
    },
    brandText: {
        color: "#0F3749",
        fontWeight: "100",
        fontSize: 15,
        opacity: 0.5,
    },
    colorWrap: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginVertical: win.height / 50,
    },
    colorWrapInner: {
        // width: win.width / 15,
        // height: win.height / 30,
        // backgroundColor: "red",
        // borderWidth: 1,
        // borderRadius: win.width / 2,
    },
    arrowCont: {
        width: win.width / 20,
        height: win.width / 20,
        alignItems: "center",
        justifyContent: "center",
    },
    containerMain: {
        width: "100%",
        alignItems: "center",
        // height: "50%",
        // backgroundColor: "lightgray",
        justifyContent: "center",
        // flex: 1,
        paddingVertical: win.height / 35,
    },
    noPic: {
        fontSize: win.width / 20,
        paddingVertical: win.height / 10,
        paddingHorizontal: win.width / 20,
        marginTop: win.height / 50,
        fontWeight: "bold",
        color: "#0F3749",
        backgroundColor: "lightgray",
        textAlign: "center",
    },
});
export default CarsScreen;
