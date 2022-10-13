import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../slices/counterSlice";

const win = Dimensions.get("window");

const YearsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const brandSelect = useSelector((state) => state.brand.value);

  console.log("branddd", brandSelect);

  const gotoCars = (year) => {
    navigation.navigate("CarsScreen");
    if (year === "2020") {
      dispatch(increment(2020));
    }
    if (year === "2021") {
      dispatch(increment(2021));
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Select Year to Continue</Text>
      </View>
      <View style={styles.Make}>
        <Text style={styles.MakeText}>{brandSelect}</Text>
      </View>
      <View style={styles.yearWrap}>
        <Pressable onPress={() => gotoCars("2020")}>
          <Text style={styles.yearWrapText}>2020</Text>
        </Pressable>
        <Pressable onPress={() => gotoCars("2021")}>
          <Text style={styles.yearWrapText}>2021</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: win.height },
  yearWrap: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: win.height / 8,
  },
  yearWrapText: {
    color: "#0F3749",
    fontSize: win.width / 12,
    borderWidth: 2,
    borderColor: "rgba(31, 157, 217, 1)",
    paddingVertical: win.width / 10,
    paddingHorizontal: win.width / 10,
    borderRadius: win.width / 30,
    shadowColor: "#0F3749",
    shadowOffset: {
      width: 0,
      // height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  heading: {
    fontSize: win.width / 16,
    color: "#0F3749",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: win.height / 15,
  },
  Make: {
    // backgroundColor: "rgba(31, 157, 217, 1)",
    // width: win.width / 4,
    // paddingVertical: win.height / 40,
    // paddingHorizontal: win.width / 40,
    // borderRadius: win.width / 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  MakeText: {
    color: "white",
    fontSize: win.width / 18,
    backgroundColor: "rgba(31, 157, 217, 1)",
    paddingVertical: win.height / 60,
    paddingHorizontal: win.width / 10,
    borderRadius: win.width / 40,
    textTransform: "capitalize",
  },
  startOver: {
    marginTop: win.height / 4,
    flexDirection: "row",

    // width: win.width / 3,
    justifyContent: "center",
  },
  startOverText: {
    color: "white",
    fontSize: win.width / 24,
    backgroundColor: "#ea6969",
    paddingVertical: win.height / 60,
    paddingHorizontal: win.width / 40,
    borderRadius: win.width / 45,
    textAlign: "center",
    width: win.width / 3,
  },
});
export default YearsScreen;
