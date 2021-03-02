import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

import Colors from "../../constants/Color";

const CustomerItem = (props) => {
  return (
    <View style={styles.item}>
      <View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.imageUrl }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.bold}>{props.fullName}</Text>
          <Text style={styles.bold}>
            Start: <Text style={styles.normal}> {props.start}</Text>
          </Text>
          <Text style={styles.bold}>
            End: <Text style={styles.normal}> {props.end}</Text>
          </Text>
          <Text style={styles.bold}>
            Trip Charge:
            <Text style={styles.normal}> Rs. {props.commission}</Text>
          </Text>
          <Text style={styles.bold}>
            Time:{" "}
            <Text style={styles.normal}>
              {new Date(props.createdAt).toLocaleDateString()},{" "}
              {new Date(props.createdAt).toLocaleTimeString("en-US", {
                timeStyle: "short",
              })}
            </Text>
          </Text>
        </View>
        <View style={styles.actions}>
          <View style={styles.button}>
            <Button
              disabled={props.buttonShow}
              color={Colors.primary}
              style={styles.button}
              onPress={props.onSelectCustomer}
              title="Accept Trip"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 400,
    margin: 20,
    width: 300,
    alignItems: "center",
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  details: {
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  bold: {
    fontWeight: "bold",
  },
  normal: { fontWeight: "normal" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 0,
  },
  button: {
    width: 110,
  },
});

export default CustomerItem;
