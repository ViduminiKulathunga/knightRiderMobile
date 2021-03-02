import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableHighlight,
} from "react-native";
import Colors from "../../constants/Color";

const AlertCtm = ({ removeOverlay }) => {
  return (
    <View style={styles.centeredView}>
      <Modal transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Unauthorized Access!</Text>
            <Text style={styles.modalText}>
              Please Enter Valid Credentials..
            </Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: Colors.primary }}
              onPress={(e) => removeOverlay()}
            >
              <Text style={styles.textStyle}>Okay</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AlertCtm;
