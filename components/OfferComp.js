import * as React from "react";
import { View, Text, StyleSheet, Dimensions, Pressable, FlatList, Image, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import avatarImg from "../images/avatarImg.png";
import io from "socket.io-client";

const socket = io.connect("https://chassis-staging.herokuapp.com/socket.io");

const win = Dimensions.get("window");
const DATA = [
    { name: "Dealer Name", price: "$10,000", id: "01" },
    { name: "Dealer Name", price: "$15,000", id: "02" },
];
function OfferComp({ navigation, key, id, unreadLiveBids, handleMarkRead, userId, requestInfo, setBidClosed }) {
    const { _id } = requestInfo;

    console.log("key >>>", key);
    console.log("id >>>", id);
    console.log("unreadLiveBids >>>", unreadLiveBids);
    console.log("handleMarkRead >>>", handleMarkRead);
    console.log("userId >>>", userId);
    console.log("requestInfo >>>", requestInfo);
    console.log("setBidClosed >>>", setBidClosed(_id));

    const onClickEndCampaign = () => {
        sendMessage("END_CAMPAIGN", { userId, bidId: _id }, (res) => {
            if (!res.error) {
                setBidClosed(_id);
            }
        });
    };

    /* const offerAccepted = () => {
        const bidId = "";
        socket.emit("OFFER_ACCEPTED", bidId);
        navigation.navigate("MessageStack");
    }; */

    return (
        <View style={styles.main}>
            {/* <View style={styles.topWrap}>
                <Text style={styles.heading}>{item.name}</Text>
                <Text style={styles.subheading}>{item.subName}</Text>
                <Text style={styles.subheading}>{item.year}</Text>
            </View> */}
            {/* <View style={styles.bottomWrap}>
                {DATA?.map((item) => (
                    <View style={styles.listWrap} key={item.id}>
                        <View style={styles.listWrapInner}>
                            <Image source={avatarImg} />
                            <View>
                                <Text style={styles.dealerName}>{item.name}</Text>
                                <Text style={styles.dealerPrice}>{item.price}</Text>
                            </View>
                        </View>
                        <View style={styles.listWrapInner}>
                            <Pressable onPress={() => navigation.navigate("MapStack")}>
                                <Text style={styles.viewMap}>View Map</Text>
                            </Pressable>
                            <View onPress={() => offerAccepted()}>
                                <Text style={styles.viewChat}>Chat</Text>
                            </View>
                        </View>
                    </View>
                ))}
                <Pressable onPress={() => navigation.navigate("OfferStack", { item: item })}>
                    <Text style={styles.listDealers}>View All Dealers</Text>
                </Pressable>
            </View> */}
            <View style={styles.cardTop}>
                <Text style={styles.heading}>Toyota Corolla Hybrid</Text>
                <Text style={styles.subheading}>LE 4dr Sedan Blueprint 2021</Text>
                <Text style={styles.endCampaignBtn}>End campaign</Text>
            </View>
            <View style={styles.cardBottom}>
                <View style={styles.innerWrap}>
                    <Image source={avatarImg} />
                    <View style={styles.innerText}>
                        <Text style={styles.innerTextName}>Dealer Name</Text>
                        <Text style={styles.innerTextPrice}>$10,000</Text>
                    </View>
                </View>
                <Text style={styles.chatBtn}>Chat</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        // flex: 1,
        height: win.height / 4.3,
        backgroundColor: "white",

        marginVertical: win.height / 60,
        borderWidth: 0,
        borderColor: "#CDCDCD",
        shadowColor: "#0F3749",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        borderRadius: win.width / 40,
        elevation: 4,
    },

    //////////////////////////////
    cardTop: {
        height: "50%",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderBottomWidth: 0.5,
        borderBottomColor: "#E8E8E8",
    },
    cardBottom: {
        height: "50%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: win.width / 20,
    },
    heading: {
        fontSize: win.width / 21,
        fontWeight: "bold",
        color: "#0F3749",
    },
    subheading: {
        fontSize: win.width / 30,
        color: "#0F3749",
        paddingBottom: win.width / 80,
    },
    innerWrap: {
        flexDirection: "row",
        alignItems: "center",
    },
    innerText: {
        paddingHorizontal: win.width / 40,
    },
    endCampaignBtn: {
        color: "#fff",
        backgroundColor: "#1F9DD9",
        padding: win.width / 80,
        paddingHorizontal: win.width / 20,
        marginVertical: win.width / 90,
        borderRadius: win.width / 20,
        fontSize: win.width / 35,
        fontWeight: "bold",
    },
    chatBtn: {
        color: "#fff",
        backgroundColor: "#1F9DD9",
        padding: win.width / 50,
        paddingHorizontal: win.width / 12,
        borderRadius: win.width / 20,
        fontSize: win.width / 30,
    },
    innerTextName: {
        fontSize: win.width / 30,
        color: "#0F3749",
    },
    innerTextPrice: {
        fontSize: win.width / 25,
        fontWeight: "bold",
        color: "#0F3749",
    },
});

export default OfferComp;
