import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable, FlatList, SafeAreaView, TextInput, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OfferComp from "../components/OfferComp";
import { BottomSheet } from "react-native-btr";
import api from "./../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { handleLoading } from "../slices/addUnreadSlice";
import { removeUnread } from "./../slices/allHandlers";
import { setBids } from "./../slices/handlers";

const win = Dimensions.get("window");

const DATA = [
    { id: "01", name: "Toyota corolla Hybrid", subName: "LE 4dr Sedan Blueprint", year: "2021" },
    { id: "02", name: "V60 Cross Country", subName: "T5 4dr Wagon AWD Fusion Red Mettalic", year: "2021" },
    { id: "03", name: "V60 Cross Country", subName: "T5 4dr Wagon AWD Fusion Red Mettalic", year: "2021" },
    { id: "04", name: "Toyota corolla Hybrid", subName: "LE 4dr Sedan Blueprint", year: "2021" },
    { id: "05", name: "V60 Cross Country", subName: "T5 4dr Wagon AWD Fusion Red Mettalic", year: "2021" },
    { id: "06", name: "V60 Cross Country", subName: "T5 4dr Wagon AWD Fusion Red Mettalic", year: "2021" },
];

function OffersScreen({ navigation }) {
    // const dispatch = useDispatch();
    const userObject = useSelector((state) => state.user.value);
    const bids = userObject.user.bids;

    console.log("bids ?>?>>?>?>", bids);

    const userId = userObject.user._id;
    const unreadLiveBids = userObject.unreadLiveBids;

    // console.clear();

    console.log(`userObject`, userObject);
    console.log(`userObject.user["_id"]`, userObject.user["_id"]);
    console.log(`userObject.unreadLiveBids`, userObject.unreadLiveBids);

    const [visible, setVisible] = useState(false);

    const filteredBid = bids.filter((bid) => !bid.isClosed);

    console.log("filteredBid >>>>>>>>", filteredBid);

    const renderItem = ({ item }) => (
        <Pressable onLongPress={() => setVisible(true)}>
            <OfferComp item={item} navigation={navigation} />
        </Pressable>
    );

    function handlerLongClick() {
        setVisible(true);
    }

    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };

    /* const markAsRead = async () => {
        const user = await AsyncStorage.getItem("user");
        const { id } = JSON.parse(user);
        const body = { userId: id, id: "bidId" };
        socket.emit("MARK_AS_READ", body);
    }; */

    useEffect(() => {
        // listOfAllChannels();
        // markAsRead()
    }, []);

    const listOfAllChannels = async () => {
        const user = await AsyncStorage.getItem("user");
        const { email } = JSON.parse(user);
        console.log(email);
        try {
            let res = await api.get(`https://dealstryker-alternator.herokuapp.com/list-channels/${email}`);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const setBidClosed = (bidId) => {
        console.log("bidId >>>>>>>>", bidId);

        // const newLiveBids = [...bids];

        // const bidIndex = newLiveBids.findIndex((bid) => bid._id === bidId);
        // if (bidIndex >= 0) {
        //     newLiveBids[bidIndex].isClosed = true;
        //     const offersArr = newLiveBids[bidIndex].responses;
        //     if (offersArr && offersArr.length)
        //         newLiveBids[bidIndex].responses.forEach((offer) => {
        //             offer.isClosed = true;
        //             removeUnread({ id: offer._id });
        //         });
        // }

        // setBids(newLiveBids);
    };

    const handleMarkRead = (id) => {
        console.log("userId >>>>>>>", userId);
        console.log("id >>>>>>>", id);

        // console.log("before sendMessage");

        // sendMessage("MARK_AS_READ", { userId, id }, (res) => {
        //     console.log("inner sendMessage");
        //     if (res === true) {
        //         actions.removeUnread({ id });
        //     }
        // });
    };

    /* sendMessage("MARK_AS_READ", { userId, id: unreadLiveBids }, (res) => {
        if (res === true) {
            removeUnread({ id: unreadLiveBids });
        }

        console.log("res >???>?>?>>?>", res);
    }); */

    return (
        <>
            {bids.length > 0 ? (
                <View style={styles.main}>
                    <View style={styles.headingWrap}>
                        <Text style={styles.heading}>Offers</Text>
                    </View>
                    <ScrollView style={styles.wrap}>
                        {filteredBid.map((bid, i) => {
                            console.log("bid ?????????????????", bid);

                            return (
                                <View key={i} style={{ marginHorizontal: win.width / 20 }}>
                                    <OfferComp
                                        key={bid._id}
                                        id={bid._id}
                                        unreadLiveBids={unreadLiveBids}
                                        handleMarkRead={handleMarkRead}
                                        userId={userId}
                                        requestInfo={bid}
                                        setBidClosed={setBidClosed}
                                        // loading={isLoading}
                                    />
                                </View>
                            );
                        })}
                        {/* <FlatList numColumns={1} data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} /> */}
                    </ScrollView>

                    <SafeAreaView style={styles.container}>
                        <View style={styles.container}>
                            <BottomSheet
                                visible={visible}
                                onBackButtonPress={toggleBottomNavigationView}
                                onBackdropPress={toggleBottomNavigationView}
                            >
                                {/*Bottom Sheet inner View*/}
                                <View style={styles.bottomNavigationView}>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "column",
                                            justifyContent: "space-evenly",
                                        }}
                                    >
                                        <Pressable onPress={toggleBottomNavigationView} style={styles.sheetBtnEnd}>
                                            <Text style={styles.sheetBtnTextEnd}>End Campaign</Text>
                                        </Pressable>

                                        <Pressable onPress={toggleBottomNavigationView} style={styles.sheetBtn}>
                                            <Text style={styles.sheetBtnText}>Cancel</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </BottomSheet>
                        </View>
                    </SafeAreaView>
                </View>
            ) : (
                <View style={styles.emptyTextWrap}>
                    <AntDesign name="inbox" size={win.width / 5} color="lightgray" />
                    <Text style={styles.emptyText}>Sorry no offers are available right now, please check back later!</Text>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        flex: 1,
        paddingBottom: win.height / 80,
    },
    heading: {
        fontSize: win.height / 30,
        color: "#0F3749",
    },
    wrap: {
        // marginHorizontal: win.width / 20,
    },
    headingWrap: {
        height: win.height / 15,
        justifyContent: "center",
        paddingHorizontal: win.width / 25,
    },

    container: {
        flex: 1,
        margin: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E0F7FA",
    },
    bottomNavigationView: {
        backgroundColor: "#fff",
        width: "100%",
        height: win.height / 4,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    sheetInput: {
        borderWidth: 1,
        borderColor: "lightgray",
        width: win.width / 1.3,
        borderRadius: 10,
        paddingLeft: win.width / 20,
        height: win.height / 15,
    },
    sheetBtn: {
        backgroundColor: "#1F9DD9",
        height: win.height / 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        width: win.width / 1.3,
    },
    sheetBtnEnd: {
        borderWidth: 1,
        borderColor: "#1F9DD9",
        height: win.height / 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        width: win.width / 1.3,
    },
    sheetBtnText: {
        color: "white",
        fontSize: win.height / 40,
    },
    sheetBtnTextEnd: {
        color: "#1F9DD9",
        fontSize: win.height / 40,
    },
    emptyTextWrap: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: win.height / 1.3,
        width: win.width,
    },
    emptyText: {
        color: "#0F3749",
        fontSize: win.width / 30,
        paddingHorizontal: win.width / 10,
        textAlign: "center",
    },
    emptyStyle: {
        height: win.width / 4,
        borderWidth: 1,
    },
});

export default OffersScreen;
