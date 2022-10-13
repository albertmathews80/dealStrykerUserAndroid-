import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { useSelector } from "react-redux";
import io from "socket.io-client";
// import { setBids } from "../slices/handlers";
import { sendMessage } from "../socket.io";
import { setBids } from "./../slices/bidSlice";

const socket = io.connect("https://chassis-staging.herokuapp.com/socket.io");

const win = Dimensions.get("window");
function CarScreen({ navigation, carYear, route }) {
    const { newDat, carMod, carTrim, carColor, colorName } = route.params;

    const brandSelect = useSelector((state) => state.brand.value);
    const carsSelect = useSelector((state) => state.counter.value);

    // const [isSelected, setSelection] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [makeOffer, setMakeOffer] = useState("");
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);
    const [check6, setCheck6] = useState(false);
    const [userName, setUserName] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [travelRadius, setTravelRadius] = useState("");
    const [financePreference, setFinancePreference] = useState("");

    function handleCheckbox(val) {
        if (val === "check1") {
            setCheck1(true);
            setCheck2(false);
            setCheck3(false);
            setTravelRadius("30mil");
        }
        if (val === "check2") {
            setCheck1(false);
            setCheck2(true);
            setCheck3(false);
            setTravelRadius("50mil");
        }
        if (val === "check3") {
            setCheck1(false);
            setCheck2(false);
            setCheck3(true);
            setTravelRadius("100mil");
        }
        if (val === "check4") {
            setCheck4(true);
            setCheck5(false);
            setCheck6(false);
            setFinancePreference("Dealership");
        }
        if (val === "check5") {
            setCheck4(false);
            setCheck5(true);
            setCheck6(false);
            setFinancePreference("Outside");
        }
        if (val === "check6") {
            setCheck4(false);
            setCheck5(false);
            setCheck6(true);
            setFinancePreference("None");
        }
    }
    // sendMessage("OFFER_CREATED", requestData, (code, offer) => {
    //     if (code === 200 && offer) {
    //         message.success("Offer Was Sent!");
    //         let bidIndex;
    //         if (offer.parentBidId) {
    //             bidIndex = newBids.findIndex((bid) => offer.parentBidId === bid._id);
    //             if (bidIndex >= 0) {
    //                 newBids[bidIndex].responses = [...newBids[bidIndex].responses, offer];
    //                 actions.setBids([...newBids]);
    //             }
    //         }
    //     } else if (code === 201 && offer) message.success("Offer Was Updated!");
    //     else message.success(`Offer already made by your dealership ${code}`);
    // });

    async function submitOffer() {
        if (travelRadius !== "" && zipcode !== "" && financePreference !== "" && userName !== "") {
            try {
                const user = await AsyncStorage.getItem("user");
                const { id } = JSON.parse(user);
                const body = {
                    name: userName,
                    zip: zipcode,
                    distance: travelRadius,
                    financing: financePreference,
                    manufacturer: brandSelect,
                    year: carsSelect,
                    car: carMod,
                    model: carTrim,
                    color: colorName,
                    vehicleId: carTrim,
                    userId: id,
                };
                // console.log(body, "body >>>>>>>>>>>>>>>>>>>>");

                const userData = JSON.parse(await AsyncStorage.getItem("userAllData"));
                // console.log("getUserData res.data >>>>>>>>>>", res.data.user.bids);
                const {
                    user: { bids: bidsArr },
                } = userData;

                sendMessage("OFFER_REQUEST_CREATED", body, (code, offerRequest) => {
                    console.log("send message else log", body, code, offerRequest);
                    console.log("offerRequest--------------", offerRequest);
                    if (code === 200 && offerRequest) {
                        setBids([...bidsArr, offerRequest]);
                        // this.navigateToMainSite(0);
                        navigation.navigate("HomeScreen");
                    } else if (code === 400) {
                        // message.info("Sorry, we are not in your area yet. Sign up to be notified when we are", 5);
                        // this.navigateToMainSite(1.5);
                        setTimeout(() => {
                            navigation.navigate("HomeScreen");
                        }, 1500);
                    } else if (code === 409) {
                        // message.error("Limited to 3 bids at a time", 5);
                        // this.navigateToMainSite(1.5);
                        setTimeout(() => {
                            navigation.navigate("HomeScreen");
                        }, 1500);
                    }
                });
                navigation.navigate("HomeScreen");
            } catch (err) {
                console.log(err);
                navigation.navigate("HomeScreen");
            }
        } else {
            alert("Please fill all fields");
        }
    }

    return (
        <View style={styles.main}>
            {isLoading === false && (
                <>
                    <View style={styles.carModel}>
                        <View style={styles.carImg}>
                            <Image source={{ uri: `https://d2axpdwbeki0bf.cloudfront.net/${carColor}` }} style={styles.carImgInner} />
                        </View>
                        <View style={styles.carImgInfo}>
                            {/* <Image source={carLogo10} style={styles.carImgLogo} /> */}
                            <Text style={styles.carTextHeading}>{carTrim}</Text>
                            <Text style={styles.carTextHeading}>{carMod}</Text>
                            {/* <Text style={styles.carText}>T5 4dr Wagon AWD</Text> */}
                            <Text style={styles.carText}>{carsSelect}</Text>
                        </View>
                    </View>
                    <View style={styles.carDetail}>
                        <View style={styles.inputWrap}>
                            <Text style={styles.inputText}>Name</Text>
                            <TextInput style={styles.input} value={userName} onChangeText={setUserName} placeholder="Mike Tyson" />
                        </View>
                        <View style={styles.inputWrap}>
                            <Text style={styles.inputText}>Zip Code</Text>
                            <TextInput style={styles.input} value={zipcode} onChangeText={setZipcode} placeholder="81048" />
                        </View>
                        <View style={styles.radioWrap}>
                            <Text style={styles.radioWrapText}>Travel radius</Text>
                            <View style={styles.inputRadio}>
                                <View style={styles.inputRadioInner}>
                                    <CheckBox
                                        title="30 Miles"
                                        center
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        textStyle={{ color: "#0F3749", fontWeight: "normal", fontSize: win.width / 38 }}
                                        containerStyle={{ borderWidth: 0, backgroundColor: "white" }}
                                        // onValueChange={setSelection}
                                        // value={isSelected}
                                        checked={check1}
                                        onPress={() => handleCheckbox("check1")}
                                    />
                                </View>
                                <View style={styles.inputRadioInner}>
                                    <CheckBox
                                        title="50 Miles"
                                        center
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        textStyle={{ color: "#0F3749", fontWeight: "normal", fontSize: win.width / 38 }}
                                        containerStyle={{ borderWidth: 0, backgroundColor: "white" }}
                                        // onValueChange={setSelection}
                                        // value={isSelected}
                                        checked={check2}
                                        onPress={() => handleCheckbox("check2")}
                                    />
                                </View>
                                <View style={styles.inputRadioInner}>
                                    <CheckBox
                                        title="100 Miles"
                                        center
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        textStyle={{ color: "#0F3749", fontWeight: "normal", fontSize: win.width / 38 }}
                                        containerStyle={{ borderWidth: 0, backgroundColor: "white" }}
                                        // onValueChange={setSelection}
                                        // value={isSelected}
                                        checked={check3}
                                        onPress={() => handleCheckbox("check3")}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.radioWrap}>
                            <Text style={styles.radioWrapText}>Financing Preference</Text>
                            <View style={styles.inputRadio}>
                                <View style={styles.inputRadioInner}>
                                    <CheckBox
                                        title="Dealership"
                                        center
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        textStyle={{ color: "#0F3749", fontWeight: "normal", fontSize: win.width / 38 }}
                                        containerStyle={{ borderWidth: 0, backgroundColor: "white" }}
                                        checked={check4}
                                        onPress={() => handleCheckbox("check4")}
                                    />
                                </View>
                                <View style={styles.inputRadioInner}>
                                    <CheckBox
                                        title="Outside"
                                        center
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        textStyle={{ color: "#0F3749", fontWeight: "normal", fontSize: win.width / 38 }}
                                        containerStyle={{ borderWidth: 0, backgroundColor: "white" }}
                                        checked={check5}
                                        onPress={() => handleCheckbox("check5")}
                                    />
                                </View>
                                <View style={styles.inputRadioInner}>
                                    <CheckBox
                                        title="None"
                                        center
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        textStyle={{ color: "#0F3749", fontWeight: "normal", fontSize: win.width / 38 }}
                                        containerStyle={{ borderWidth: 0, backgroundColor: "white" }}
                                        checked={check6}
                                        onPress={() => handleCheckbox("check6")}
                                    />
                                </View>
                            </View>
                        </View>
                        <Pressable style={styles.btnSubmit} onPress={() => submitOffer()}>
                            <Text style={styles.btnText}>Submit</Text>
                        </Pressable>
                    </View>
                </>
            )}
            {isLoading && (
                <ActivityIndicator size="large" color="#0F3749" style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: "100%",
        backgroundColor: "#FBFBFB",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    carModel: {
        height: win.height / 2.9,
        width: "94%",
        backgroundColor: "white",
        borderRadius: 10,
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
    },
    carDetail: {
        height: win.height / 2,
        width: "94%",
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "space-evenly",
        paddingHorizontal: win.width / 90,
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
    },
    carImg: {
        width: "100%",
        height: "50%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    carImgInner: {
        height: win.height / 6.5,
        width: win.width / 1.4,
    },
    carImgInfo: {
        width: "100%",
        height: "50%",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    carImgLogo: {
        height: win.width / 7,
        width: win.width / 7,
    },
    carTextHeading: {
        color: "#0F3749",
        fontSize: win.height / 35,
        fontWeight: "bold",
    },
    carText: {
        color: "#0F3749",
        fontSize: win.height / 40,
        fontWeight: "bold",
    },
    inputRadio: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    radioWrap: {},
    radioWrapText: {
        color: "#0F3749",
        marginHorizontal: win.width / 40,
        fontSize: win.height / 60,
        fontWeight: "bold",
    },
    input: {
        height: win.height / 20,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#0F3749",
        paddingLeft: win.width / 35,
        marginHorizontal: win.width / 50,
    },
    inputText: {
        color: "#0F3749",
        marginVertical: win.width / 80,
        marginHorizontal: win.width / 40,
        fontSize: win.height / 60,
        fontWeight: "bold",
    },
    inputRadioInner: {
        width: "33%",
        // backgroundColor: "crimson",
    },
    btnSubmit: {
        height: win.height / 20,
        backgroundColor: "#1F9DD9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginHorizontal: win.width / 50,
    },
    btnText: {
        color: "white",
        fontSize: win.height / 50,
    },
});

export default CarScreen;
