import React from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const BtnComponent = (props) => {
  return (
    <View style={styles.buttonWrapper}>
      {props.status === 0 ? (
        <LinearGradient
          colors={["#00ae7c", "#00ae7c"]}
          // colors={["#052C3B", "#239B56"]}
          // colors={["#02ad7d", "#00ae7c"]}
          style={styles.customGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.button}>
            <Text onPress={props.start} style={styles.custom}>
              Start Trip
            </Text>
          </View>
        </LinearGradient>
      ) : null}

      {props.status === 1 ? (
        <View>
          <LinearGradient
            colors={["#C0392B", "#C0392B"]}
            style={styles.customGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.button}>
              <Text onPress={props.stop} style={styles.custom}>
                End Trip
              </Text>
            </View>
          </LinearGradient>
        </View>
      ) : null}

      {props.status === 2 ? (
        <View>
          <View>
            <LinearGradient
              colors={["#ed8c00", "#ffb100"]}
              style={styles.customGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.button}>
                <Text onPress={props.reset} style={styles.custom}>
                  Trip Complete 
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      ) : null}

      {props.status === 3 ? (
        <LinearGradient
          colors={["#00ae7c", "#00ae7c"]}
          // colors={["#052C3B", "#239B56"]}
          // colors={["#02ad7d", "#00ae7c"]}
          style={styles.customGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.button}>
            {props.disableButton ? (
              <TouchableOpacity
                disabled={props.disableButton}
                
              >
                <Text style={styles.custom}>Processing..</Text>
              </TouchableOpacity>
            ) : (
              <Text onPress={props.newCustomerWindow} style={styles.custom}>
                New Trip
              </Text>
            )}
          </View>
        </LinearGradient>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  custom: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    textTransform: "uppercase",
  },
  button: {
    padding: 25,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    marginBottom: 5,
  },
  customGradient: {
    borderRadius: 10,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BtnComponent;
