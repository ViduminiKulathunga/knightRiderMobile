import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { getCustomers } from "../store/actions/data";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../constants/Color";
import HeaderButton from "../components/UI/HeaderButton";
import { LinearGradient } from "expo-linear-gradient";

import CustomerItem from "../components/customer/CustomerItem";
import ActiveTrip from "../components/ActiveTrip/ActiveTrip";

import { x } from "../firebase";

const Customers = (props) => {
  const [error, setError] = useState();

  const customers = useSelector((state) => state.data.customers);
  console.log(customers , " customers customers")
  const dispatch = useDispatch();

  const loadCustomers = useCallback(
    async (customersData) => {
      setError(null);
      console.log(customersData, " customersData");
      try {
        await dispatch(getCustomers(customersData));
      } catch (err) {
        setError(err.message);
      }
    },
    [dispatch, setError]
  );

  useEffect(() => {
    //dispatch(getCustomers());
    
    x().onSnapshot((doc) => {
      let customer = [];
      

      doc.forEach((querySnapshot) => {
        console.log(`Found document at ${querySnapshot.ref.path}`);
        let pathStr = querySnapshot.ref.path;
        let splitStrUserId = pathStr.substring(pathStr.indexOf("/") + 1);

        console.log(splitStrUserId);
        console.log(querySnapshot.data().commission, " commission");
        console.log(querySnapshot.data().distance, " distance");
        //console.log(querySnapshot.ref.path.data().id, " username");
        //console.log(querySnapshot);

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
      // customersData.customer = [];
      // data.forEach((doc) => {
      //   customersData.customer.push({
      //     userId: doc.id,
      //     fullname: doc.data().fullname,
      //     phone: doc.data().phone,
      //     commission: doc.data().commission,
      //     end: doc.data().end,
      //     username: doc.data().username,
      //     imageUrl: doc.data().imageUrl,
      //     email: doc.data().email,
      //     distance: doc.data().distance,
      //     start: doc.data().start,
      //     createdAt: doc.data().createdAt,
      //   });
      // });
      console.log("working");
    //loadCustomers(customersData);
    dispatch(getCustomers(customer));
    });
    
  }, []);

  const renderGridItem = (itemData) => {
    return (
      <View>
        <Text>{itemData.item.username}</Text>
      </View>
    );
  };

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

  return (
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
      <ActiveTrip/>
    </LinearGradient>
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
});

export default Customers;
