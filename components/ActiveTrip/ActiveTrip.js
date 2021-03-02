import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Trip from "../../assets/images/preview.jpg";

const ActiveTrip = () => {
  return (
    <View style={styles.item}>
      <View style={styles.logoWrapper}>
        <Image style={styles.preview} source={Trip} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 80,
    height: 80,
    borderRadius: 50,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#e1ecff",
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOpacity: 0.9,
    elevation: 8,
    shadowRadius: 2,
    shadowOffset: { width: 50, height: 50 },
  },
  preview: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});

export default ActiveTrip;
