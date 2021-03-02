import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../constants/Color";

import HeaderButton from "../components/UI/HeaderButton";
import { Rating } from "react-native-elements";
import ProgressCircle from "react-native-progress-circle";

import { getDriverLog } from "../firebase";

const UserProfileView = (props) => {
  const [ranking, setRanking] = useState(3);
  const [month, setmonth] = useState("");
  const [year, setYear] = useState("");
  const [salary, setSalary] = useState("");
  const [drunkenPesentage, setDrunkenPesentage] = useState(0);
  const [drunkenPesentageText, setDrunkenPesentageText] = useState("");
  const [isLoading, setLoading] = useState(true);

  const credentials = useSelector((state) => state.auth.credentials);
  const dispatch = useDispatch();

  useEffect(() => {
    if (credentials.credentials.handle !== "") {
      const userHandle = credentials.credentials.handle;

      getDriverLog(userHandle).onSnapshot((doc) => {
        const data = doc.data();

        setDrunkenPesentage(Math.floor(data.drunkenPesentage));
        setDrunkenPesentageText(data.drunkenPesentage);
        setRanking(data.ranking);
        setmonth(data.month);
        setYear(data.year);
        setSalary(data.salary);
        setLoading(false);
      });
    }
  }, []);

  return (
    <LinearGradient
      colors={["#021618", "#021618", "#021618", "#04506f", "#01a0ac"]}
      style={styles.gradient}
    >
      <ScrollView>
        <View style={styles.authContainer}>
          <View style={styles.item}>
            <LinearGradient
              colors={[
                "#021618",
                "#021618",
                "#04506f",
                "#0BA29F",
                "#fff",
                "#fff",
              ]}
              style={styles.gradient}
            >
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: credentials.credentials.imageUrl }}
                />
              </View>

              <View style={styles.details}>
                <Text style={(styles.textWhite, styles.myName)}>
                  {credentials.credentials.handle}
                </Text>
                <Text style={styles.textWhite}>
                  {credentials.credentials.fullname}
                </Text>
                <Text style={styles.textWhite}>
                  {credentials.credentials.bio}
                </Text>
                <Text style={styles.textWhite}>
                  {credentials.credentials.phone}
                </Text>
                <Text style={styles.textWhite}>
                  {new Date(
                    credentials.credentials.createdAt
                  ).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.actions}>
                <ProgressCircle
                  percent={drunkenPesentage}
                  radius={30}
                  borderWidth={8}
                  color="#CD1F07"
                  shadowColor="#076669"
                  bgColor="#A6F0EF"
                >
                  <Text style={{ fontSize: 16, color: "#7E0234" }}>
                    {drunkenPesentage}%
                  </Text>
                </ProgressCircle>
              </View>
              <View style={styles.actions}>
                <LinearGradient
                  colors={["#052C3B", "#076669"]}
                  style={styles.customGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {/* <LinearGradient
                    colors={["rgb(38,189,206)", "rgb(247 ,292 ,1)"]}
                    style={styles.customGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  > */}
                  <View style={styles.button}>
                    {isLoading ? (
                      <ActivityIndicator size="small" color={Colors.white} />
                    ) : (
                      <View style={styles.buttonWrapper}>
                        <Text style={styles.custom}>
                          {credentials.credentials.handle}'s Salary for month{" "}
                          {month} {year}
                        </Text>
                        <Text style={styles.custom}>Rs. {salary}</Text>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </View>
              <Rating
                imageSize={20}
                type="custom"
                readonly
                startingValue={ranking}
                ratingBackgroundColor="transparent"
                style={styles.rating}
              />
              <View style={styles.actions}>
                <LinearGradient
                  colors={["rgb(38,189,206)", "rgb(247 ,292 ,1)"]}
                  style={styles.customGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                ></LinearGradient>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

UserProfileView.navigationOptions = (navData) => {
  return {
    headerTitle: "User Profile",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: Colors.peacockBlue,
    },
  };
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  gradient: {
    flex: 1,
  },
  item: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    width: 300,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  details: {
    alignItems: "center",
    height: 150,
    padding: 10,
  },
  textWhite: {
    color: "#fff",
    fontSize: 16,
    textTransform: "capitalize",
  },
  myName: {
    color: "#A7BFC5",
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    alignItems: "center",
    minWidth: 290,
  },
  buttonWrapper:{
    alignItems: "center",
  },
  customGradient: {
    borderRadius: 10,
  },
  custom: {
    color: "#fff",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
});

export default UserProfileView;
