import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import carLogo1 from "../images/carLogo1.png";
import carLogo10 from "../images/carLogo10.png";
import carLogo11 from "../images/carLogo11.png";
import carLogo12 from "../images/carLogo12.png";
import carLogo13 from "../images/carLogo13.png";
import carLogo14 from "../images/carLogo14.png";
import carLogo15 from "../images/carLogo15.png";
import carLogo16 from "../images/carLogo16.png";
import carLogo17 from "../images/carLogo17.png";
import carLogo18 from "../images/carLogo18.png";
import carLogo19 from "../images/carLogo19.png";
import carLogo2 from "../images/carLogo2.png";
import carLogo20 from "../images/carLogo20.png";
import carLogo3 from "../images/carLogo3.png";
import carLogo4 from "../images/carLogo4.png";
import carLogo5 from "../images/carLogo5.png";
import carLogo6 from "../images/carLogo6.png";
import carLogo7 from "../images/carLogo7.png";
import carLogo8 from "../images/carLogo8.png";
import carLogo9 from "../images/carLogo9.png";
import carOne from "../images/carOne.png";
import { incrementbrand } from "../slices/brandSlice";
import { createSocket } from "./../socket.io";
// import axios from "axios";
// import { setBids } from "./../slices/handlers";
import { setBids } from "./../slices/handlers";
import api from "./../services/api";
import { userDetail } from "../slices/userSlice";
import { sendMessage } from "./../socket.io";
import axios from "axios";

const DATA = [
    {
        id: "001",
        carLogo: carLogo1,
        brand: "audi",
    },
    {
        id: "002",
        carLogo: carLogo2,
        brand: "bmw",
    },
    {
        id: "003",
        carLogo: carLogo3,
        brand: "buick",
    },
    {
        id: "004",
        carLogo: carLogo4,
        brand: "honda",
    },
    {
        id: "005",
        carLogo: carLogo5,
        brand: "hyundai",
    },
    {
        id: "006",
        carLogo: carLogo6,
        brand: "kia",
    },
    {
        id: "007",
        carLogo: carLogo7,
        brand: "mercedes-benz",
    },
    {
        id: "008",
        carLogo: carLogo8,
        brand: "suzuki",
    },
    {
        id: "009",
        carLogo: carLogo9,
        brand: "toyota",
    },
    {
        id: "0010",
        carLogo: carLogo10,
        brand: "volvo",
    },
    {
        id: "011",
        carLogo: carLogo11,
        brand: "bentley",
    },
    {
        id: "012",
        carLogo: carLogo12,
        brand: "gmc",
    },
    {
        id: "013",
        carLogo: carLogo13,
        brand: "lexus",
    },
    {
        id: "014",
        carLogo: carLogo14,
        brand: "subaru",
    },
    {
        id: "015",
        carLogo: carLogo15,
        brand: "acura",
    },
    {
        id: "016",
        carLogo: carLogo16,
        brand: "cadillac",
    },
    {
        id: "017",
        carLogo: carLogo17,
        brand: "infiniti",
    },
    {
        id: "018",
        carLogo: carLogo18,
        brand: "jaguar",
    },
    {
        id: "019",
        carLogo: carLogo19,
        brand: "jeep",
    },
    {
        id: "020",
        carLogo: carLogo20,
        brand: "mazda",
    },
    // {
    //     id: "021",
    //     carLogo: carLogo1,
    //     brand:"audi"
    // },
    // {
    //     id: "022",
    //     carLogo: carLogo2,
    //     brand:"audi"
    // },
    // {
    //     id: "023",
    //     carLogo: carLogo3,
    //     brand:"audi"
    // },
    // {
    //     id: "024",
    //     carLogo: carLogo4,
    // },
    // {
    //     id: "025",
    //     carLogo: carLogo5,
    // },
    // {
    //     id: "026",
    //     carLogo: carLogo6,
    // },
    // {
    //     id: "027",
    //     carLogo: carLogo7,
    // },
    // {
    //     id: "028",
    //     carLogo: carLogo8,
    // },
    // {
    //     id: "029",
    //     carLogo: carLogo9,
    // },
    // {
    //     id: "030",
    //     carLogo: carLogo10,
    // },
    // {
    //     id: "031",
    //     carLogo: carLogo11,
    // },
    // {
    //     id: "032",
    //     carLogo: carLogo12,
    // },
    // {
    //     id: "033",
    //     carLogo: carLogo13,
    // },
    // {
    //     id: "034",
    //     carLogo: carLogo14,
    // },
    // {
    //     id: "035",
    //     carLogo: carLogo15,
    // },
    // {
    //     id: "036",
    //     carLogo: carLogo16,
    // },
    // {
    //     id: "037",
    //     carLogo: carLogo17,
    // },
    // {
    //     id: "038",
    //     carLogo: carLogo18,
    // },
    // {
    //     id: "039",
    //     carLogo: carLogo19,
    // },
    // {
    //     id: "040",
    //     carLogo: carLogo20,
    // },
];

const win = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
    const [chooseYear, setChooseYear] = useState(2020);
    const dispatch = useDispatch();

    const carsSelect = useSelector((state) => state.counter.value);
    const userObject = useSelector((state) => state.user.value);

    const userId = userObject.Dealership?._id;
    const unreadLiveBids = userObject.Dealership?.unreadLiveBids;
    const bids = userObject.Dealership?.bids;

    useEffect(() => {
        getUserData();
        // startWS();
    }, []);

    // const startWS = async () => {
    //     const user = await AsyncStorage.getItem("user");

    //     console.log("user >>>>>>>>>>>>", user);

    //     const { id } = JSON.parse(user);
    //     // const { actions } = this.props;
    //     const callbacks = {
    //         get_userId: () => id,
    //         get_isDealer: () => false,
    //         // get_props: () => this.props,
    //         set_bids: setBids,
    //     };

    //     // console.log("callbacks >>>>>>>>", callbacks);
    //     // console.log("callbacks.set_bids >>>>>>>>", callbacks.set_bids);

    //     createSocket(id, callbacks);
    // };

    const getUserData = async () => {
        try {
            const { email, id, token } = JSON.parse(await AsyncStorage.getItem("user"));

            if (id) {
                const body = {
                    email: email,
                };

                const headers = {
                    Authorization: `Token ${token}`,
                };

                const res = await api.post("/users/getUserData", body, {
                    headers,
                });

                // console.log("getUserData res.data >>>>>>>>>>", res.data);

                if (res) {
                    await AsyncStorage.setItem("userAllData", JSON.stringify(res.data));

                    console.log("res.data >>>>>>>>>>>", res.data);

                    const userData = JSON.parse(await AsyncStorage.getItem("userAllData"));
                    dispatch(userDetail(userData));

                    const {
                        user: { bids: bidsArr },
                    } = userData;

                    const result = await axios.get(`https://alternator-staging.herokuapp.com/list-channels/${userData.user.email}`);
                    console.log("result.data >? ? > ? > ? > >", result.data);

                    createSocket(id, false, setBids);
                }
            }
        } catch (error) {
            console.log("getUserData error >>>>>>>>>>>>>", error);
        }
    };

    // setChooseYear(carsSelect)
    // navigation.navigate("Cars");
    function gotoCar(props) {
        dispatch(incrementbrand(props));

        // try{
        //     setChooseYear(carsSelect)

        //     let res = await axios.get(`https://www.dealstryker.com/turbo/${chooseYear}`)

        //  var carAbc = props
        //     var abcd =res.data[carAbc]
        //     var xyz= Object.values(abcd)[0]
        //     var lmn =xyz.map((data)=>data)
        //     dispatch(increment(chooseYear))
        //     dispatch(incrementcar(lmn))
        //     dispatch(incrementbrand(props))

        //  }catch(err){
        //      console.log(err)
        //  }

        navigation.navigate("Cars");
    }

    const renderItem = ({ item }) => (
        <Pressable style={styles.logoImg} onPress={() => gotoCar(item.brand)}>
            <Image source={item.carLogo} style={styles.carLogoImg} />
        </Pressable>
    );
    return (
        <View style={styles.main}>
            <View style={styles.imgWrap}>
                <View style={styles.imgWrapInner}>
                    <Image source={carOne} style={styles.imgStyle} />
                </View>
            </View>
            <Text style={styles.textHeading}>Select Manufacturer to Get Started</Text>
            <Pressable style={styles.logoImgWrap}>
                <FlatList numColumns={4} data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        paddingBottom: win.height / 15,
        height: "100%",
        // paddingBottom: "5%",
        // backgroundColor: "blue",
    },
    imgWrap: {
        width: "100%",
        // height: win.height / 4,
    },
    imgWrapInner: {
        // borderWidth: 1,
        height: win.height / 4,
    },
    imgStyle: {
        width: "100%",
        height: "100%",
        // height: win.height / 3.5,
        // resizeMode: "contain",
    },
    textHeading: {
        color: "#0F3749",
        textAlign: "center",
        marginVertical: win.height / 60,
        fontWeight: "bold",
        fontSize: win.height / 60,
    },
    logoImg: {
        backgroundColor: "white",
        // width: "100%",
        marginVertical: win.height / 50,
        marginHorizontal: win.width / 40,
        // borderWidth: 1,
        borderColor: "#CDCDCD",
        shadowColor: "#0F3749",
        shadowOffset: {
            width: 0,
            // height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        borderRadius: 5,
        elevation: 4,
    },
    logoImgWrap: {
        width: "100%",

        display: "flex",
        alignItems: "center",
        // height: "55%",
        height: win.height / 1.8,
        // paddingVertical: "10%",
    },
    carLogoImg: {
        width: win.width / 5,
        height: win.width / 5,
        resizeMode: "contain",
    },
});

export default HomeScreen;
