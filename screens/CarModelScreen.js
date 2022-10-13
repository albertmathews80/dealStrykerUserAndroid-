import * as React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable, Dimensions, Image } from "react-native";
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

function CarModelScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const { carIndex, carMod, carTrim } = route.params;
    console.log(">>>>>>>>>>>>>>>>> Trim", carTrim);
    // const [chooseYear, setChooseYear] = React.useState(2020);
    const [yoyo, setyoyo] = React.useState(null);
    const modelData = ["T5 4dr Wagon AWD", "T4 3dr Wagon SUV", "T2 4dt Wagon EBR"];
    const carsSelect = useSelector((state) => state.counter.value);
    const [DATA, setDATA] = React.useState([]);
    const carSelect = useSelector((state) => state.car.value);
    // const DATA = carSelect;
    const brandSelect = useSelector((state) => state.brand.value);
    // console.log(DATA, "aap");
    // console.log(carsSelect);
    const renderItem = ({ item }) => (
        <Pressable style={styles.carCard}>
            <View style={styles.containerMain}>
                <View style={styles.containerCar}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("CarScreen");
                        }}
                    >
                        <Image
                            source={{ uri: `https://d2axpdwbeki0bf.cloudfront.net/${item.image}` }}
                            style={{ width: win.width / 1.5, height: win.width / 3 }}
                        />
                    </Pressable>
                    <Text style={styles.brandName}>{carTrim}</Text>
                    <Text style={styles.brandName}>{item.model}</Text>

                    <View style={styles.optWrap2}>
                        <Pressable style={styles.arrowCont}>
                            <Image source={leftArr} />
                        </Pressable>

                        <Text style={styles.brandText}>{carsSelect}</Text>
                        <Pressable style={styles.arrowCont}>
                            <Image source={rightArr} />
                        </Pressable>
                    </View>
                    <View style={styles.colorWrap}>
                        {colorData.map((data, i) => (
                            <Pressable
                                key={data.id}
                                style={{
                                    width: win.width / 15,
                                    height: win.width / 15,
                                    backgroundColor: data.color,
                                    borderWidth: 1,
                                    borderRadius: win.width / 2,
                                }}
                            ></Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </Pressable>
    );

    async function carLogs() {
        try {
            // setChooseYear(carsSelect);
            // {console.log(carsSelect,"lagay")}
            // console.log(brandSelect)
            let res = await axios.get(`https://www.dealstryker.com/models/${carsSelect}/${brandSelect}`);
            // console.log(carsSelect);
            setDATA(Object.values(res.data));

            // console.log(Object.values(res))

            // console.log(carSelect,"kk")
            {
                // console.log(res);
            }
            // var carAbc = brandSelect;
            // var abcd = res.data[carAbc];
            // var xyz = Object.values(abcd)[0];
            // var lmn = xyz.map((data) => data);
            // dispatch(increment(carsSelect));
            // dispatch(incrementcar(lmn));
        } catch (err) {
            console.log(err);
        }
    }
    // carLogs();
    React.useEffect(() => {
        carLogs();
    }, [carsSelect]);

    // function handleYear(val) {
    //     if (val === 2020) {
    //         setChooseYear(2021);
    //         dispatch(increment(2021));
    //         // dispatch(incrementbrand(brandSelect));
    //         // carLogs();
    //     }
    //     if (val === 2021) {
    //         setChooseYear(2020);
    //         dispatch(increment(2020));
    //         // dispatch(incrementbrand(brandSelect));
    //         // carLogs();
    //     }
    // }
    function year2020() {
        // setChooseYear(2020);
        dispatch(increment(2020));
        // carLogs();
        // carLogs();
    }
    function year2021() {
        // setChooseYear(2021);
        dispatch(increment(2021));
        // carLogs();
        // carLogs();
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.yearCont}>
                <Pressable onPress={() => year2020()}>
                    <Text style={carsSelect === 2020 ? styles.yearWrap1 : styles.yearWrap1Select}>2020</Text>
                </Pressable>
                <Pressable onPress={() => year2021()}>
                    <Text style={carsSelect !== 2021 ? styles.yearWrap2 : styles.yearWrap2Select}>2021</Text>
                </Pressable>
            </View> */}
            {/* <View>
                <Text style={styles.headingText}>Variants | Colors</Text>
            </View> */}
            <ScrollView style={styles.wrap}>
                {/* <FlatList numColumns={1} data={DATA} renderItem={renderItem} keyExtractor={(item, i) => i} /> */}
                {/* {DATA.map((data) => console.log(data[carIndex].exteriors_colors))} */}
                {DATA.map((data) =>
                    data[carIndex].exteriors_colors.map((newDat, i) => (
                        <Pressable key={i} style={styles.carCard}>
                            {/* {console.log(newDat.rgb, "oppo")} */}
                            <View style={styles.containerMain}>
                                <View style={styles.containerCar}>
                                    <Pressable
                                        onPress={() => {
                                            navigation.navigate("CarScreen", { newDat, carMod, carTrim });
                                        }}
                                    >
                                        {newDat.image === "NA" && <Text style={styles.noPic}>Picture not available for now</Text>}
                                        {newDat.image !== "NA" && (
                                            <Image
                                                source={{ uri: `https://d2axpdwbeki0bf.cloudfront.net/${newDat.image}` }}
                                                style={{ width: win.width / 1.5, height: win.width / 3 }}
                                            />
                                        )}
                                    </Pressable>
                                    <Text style={styles.brandName}>{carTrim}</Text>
                                    <Text style={styles.brandName}>{newDat.name}</Text>

                                    <View style={styles.optWrap2}>
                                        <Pressable style={styles.arrowCont}>
                                            <Image source={leftArr} />
                                        </Pressable>

                                        <Text style={styles.brandText}>{carsSelect}</Text>
                                        <Pressable style={styles.arrowCont}>
                                            <Image source={rightArr} />
                                        </Pressable>
                                    </View>
                                    <View style={styles.colorWrap}>
                                        {colorData.map((data, i) => (
                                            <Pressable
                                                key={data.id}
                                                style={{
                                                    width: win.width / 15,
                                                    height: win.width / 15,
                                                    backgroundColor: data.color,
                                                    borderWidth: 1,
                                                    borderRadius: win.width / 2,
                                                }}
                                            ></Pressable>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )),
                )}
            </ScrollView>
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
    wrap: {
        // backgroundColor: "coral",
        // display: "flex",
        // flex: 1,
        // flexDirection: "column",
        height: "100%",
        // flexGrow:1
    },
    carCard: {},
    headingText: { textAlign: "center", fontWeight: "bold", fontSize: win.width / 20, color: "#0F3749", paddingBottom: win.height / 30 },
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
        paddingVertical: "10%",
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
export default CarModelScreen;
