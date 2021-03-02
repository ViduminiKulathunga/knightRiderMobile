import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const DisplayComponent = (props) => {
  return (
    <View style={styles.timerWrapper}>
      <LinearGradient
        colors={["#aae4e3", "#04506f", "#051937"]}
        style={styles.gradientL}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ ...styles.timeStyles, ...styles.timePaddingL }}>
          <Text style={styles.textWhite}>
            {props.time.h >= 10 ? props.time.h : `0` + props.time.h} h:
          </Text>
        </View>
      </LinearGradient>
      <View style={{ ...styles.timeColor, ...styles.timeStyles }}>
        <Text style={styles.textWhite}>
          {props.time.m >= 10 ? props.time.m : `0` + props.time.m} min:
        </Text>
      </View>

      <View style={{ ...styles.timeColor, ...styles.timeStyles }}>
        <Text style={styles.textWhite}>
          {props.time.s >= 10 ? props.time.s : `0` + props.time.s} s:
        </Text>
      </View>

      <LinearGradient
        colors={["#051937", "#04506f", "#aae4e3"]}
        style={styles.gradientR}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ ...styles.timeStyles, ...styles.timePaddingR }}>
          <Text style={styles.textWhite}>
            {props.time.ms >= 10 ? props.time.ms : `0` + props.time.ms}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  timerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 6,
  },
  timeColor: {
    backgroundColor: "#051937",
  },
  timeStyles: {
    padding: 5,
    paddingRight: 0,
  },
  textWhite: {
    color: "#fff",
    fontSize: 17,
    
  },
  timePaddingL: {
    paddingLeft: 15,
    
  },
  timePaddingR: {
    paddingRight: 15,
  },
  gradientL:{
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  gradientR:{
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  }
});

export default DisplayComponent;
