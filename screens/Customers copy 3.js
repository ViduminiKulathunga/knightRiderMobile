import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { getCustomers, setRemoveCustomers } from "../store/actions/data";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../constants/Color";
import HeaderButton from "../components/UI/HeaderButton";
import { LinearGradient } from "expo-linear-gradient";

import CustomerItem from "../components/customer/CustomerItem";
import ActiveTrip from "../components/ActiveTrip/ActiveTrip";

import NoService from "../screens/NoService";

import { x } from "../firebase";

const Customers = (props) => {
  const [error, setError] = useState();
  const [hasTrip, setHasTrip] = useState(false);
  const [driverIsActive, setDriverIsActive] = useState(false);

  const customers = useSelector((state) => state.data.customers);
  const customer = useSelector((state) => state.data.customer);
  const onTrip = useSelector((state) => state.data.onTrip);
  const driverStatus = useSelector((state) => state.data.driverStatus);

  const dispatch = useDispatch();

  const loadCustomers = useCallback(
    async (customersData) => {
      setError(null);
      try {
        await dispatch(getCustomers(customersData));
      } catch (err) {
        setError(err.message);
      }
    },
    [dispatch, setError]
  );

  useEffect(() => {
    console.log("driverStatus ", driverStatus);
    if (driverStatus === "active") {
      setDriverIsActive(true);
      x().onSnapshot((doc) => {
        let customer = [];

        doc.forEach((querySnapshot) => {
          let pathStr = querySnapshot.ref.path;
          let splitStrUserId = pathStr.substring(pathStr.indexOf("/") + 1);

          customer.push({
            userId: splitStrUserId,
            fullname: querySnapshot.data().fullname,
            phone: querySnapshot.data().phone,
            commission: querySnapshot.data().commission,
            end: querySnapshot.data().end,
            username: querySnapshot.data().username,
            imageUrl: querySnapshot.data().imageUrl,
            email: querySnapshot.data().email,
            distance: querySnapshot.data().distance,
            start: querySnapshot.data().start,
            createdAt: querySnapshot.data().createdAt,
          });
        });

        dispatch(getCustomers(customer));
      });
    } else {
      setDriverIsActive(false);
      dispatch(setRemoveCustomers());
    }
  }, [driverStatus]);

  if (error) {
    return (
      <View>
        <Text>An Error Occured!</Text>
        <Button
          title="Try again"
          onPress={loadCustomers}
          color={Colors.primary}
        />
      </View>
    );
  }

  let activeScreen = (
    <LinearGradient
      colors={["#021618", "#04506f", "#01a0ac"]}
      style={styles.gradient}
    >
      <FlatList
        keyExtractor={(item) => item.id}
        numColumns={1}
        data={customers}
        renderItem={(itemData) => (
          <CustomerItem
            imageUrl={itemData.item.imageUrl}
            fullName={itemData.item.fullName}
            start={itemData.item.start}
            end={itemData.item.end}
            createdAt={itemData.item.createdAt}
            commission={itemData.item.commission}
            buttonShow={onTrip ? true : false}
            onSelectCustomer={() => {
              props.navigation.navigate({
                routeName: "TripDetail",
                params: {
                  customerId: itemData.item.userId,
                  start: itemData.item.start,
                  end: itemData.item.end,
                  commission: itemData.item.commission,
                  fullName: itemData.item.fullName,
                  phone: itemData.item.phone,
                },
              });
            }}
          />
        )}
      />

      {onTrip ? (
        <TouchableOpacity
          style={styles.activeTrip}
          onPress={() => {
            console.log("Pressed");
            props.navigation.navigate({
              routeName: "TripDetail",
              params: {
                customerId: customer.customerId,
                start: customer.start,
                end: customer.end,
                commission: customer.commission,
                fullName: customer.fullName,
                phone: customer.phone,
              },
            });
          }}
        >
          <ActiveTrip />
        </TouchableOpacity>
      ) : null}
    </LinearGradient>
  );

  return driverIsActive ? (
    activeScreen
  ) : (
    <NoService
      onSelectActivate={() => {
        props.navigation.navigate("Activate");
        // props.navigation.navigate({
        //   routeName: "Activate",
        // });
      }}
    />
  );
};

Customers.navigationOptions = (navData) => {
  return {
    headerTitle: "Customers",
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
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  UserView: {
    padding: 10,
    backgroundColor: "#87CEFA",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTrip: {
    position: "absolute",
    right: 10,
    bottom: 10,
    zIndex: 1,
  },
});

export default Customers;
