import React from "react";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";

import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import ProfileOverViewScreen from "../screens/ProfileOverViewScreen";
import UserProfileView from "../user/UserProfileView";
import ActiveService from "../screens/ActiveService";
import Customers from "../screens/Customers";
import AuthScreen from "../user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import TripScreen from "../screens/Trip";
import Colors from "../constants/Color";
import * as authActions from "../store/actions/auth";
import NoService from "../screens/NoService";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primary : Colors.primary,
  },
  // headerTitleStyle: {
  //   textAlign: "center",
  //   flex: 1,
  // },
  headerTintColor: Platform.OS === "android" ? "white" : "white",
  headerTitleAlign: 'center',
};

const ScreenNavigator = createStackNavigator(
  {
    ProfileOverView: ProfileOverViewScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-car" : "ios-car"}
          size={23}
          color={Colors.peacockBlue}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ProfileNavigator = createStackNavigator(
  {
    UserProfile: UserProfileView,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-contact" : "ios-contact"}
          size={23}
          color={Colors.peacockBlue}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ActiveServiceNavigator = createStackNavigator(
  {
    ActiveProfile: ActiveService,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-lock" : "ios-lock"}
          size={23}
          color={Colors.peacockBlue}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const NoServiceNavigator = createStackNavigator(
  {
    NoServiceProfile: NoService,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-lock" : "ios-lock"}
          size={23}
          color={Colors.peacockBlue}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const CustomersNavigator = createStackNavigator(
  {
    CustomersProfile: Customers,
    //TripDetail: TripScreen,
    TripDetail: {
      screen: TripScreen,
    },
    // NoService: NoService,
    // Activate: ActiveService
    // TripDetail: {
    //   screen: TripScreen,
    //   navigationOptions: ({ navigation }) => ({
    //     //don't forget parentheses around the object notation
    //     title: "Trip Screen",
    //     headerLeft: () => (
    //       <HeaderBackButton onPress={() => (navigation.goBack(null)) }/>
    //     ),
    //   }),
    // },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-navigate" : "ios-navigate"}
          size={23}
          color={Colors.peacockBlue}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MenuNavigator = createDrawerNavigator(
  {
    Home: ScreenNavigator,
    User: ProfileNavigator,
    Activate: ActiveServiceNavigator,
    Customers: CustomersNavigator,
    // NoService: NoServiceNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      activeBackgroundColor: "#CCEDF1",
      inactiveTintColor: "#052C3B",
      inactiveBackgroundColor: "transparent",
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={
                Platform.OS === "android" ? Colors.primary : Colors.primary
              }
              disabled={false}
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Menu: MenuNavigator,
  // NoService: NoServiceNavigator,
});

export default createAppContainer(MainNavigator);
