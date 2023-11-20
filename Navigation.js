import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "./screens/tabScreens/Feed";
import Settings from "./screens/tabScreens/Settings";
import Notification from "./screens/tabScreens/Notification";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TweetDetailScreen from "./screens/homeStack/TweetDetailsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Payments from "./screens/drawerScreens/Payments";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image, Pressable, StatusBar, useColorScheme } from "react-native";
import HeaderLeft from "./components/HeaderLeft";

// Top Tab
const TopTab = createMaterialTopTabNavigator();

function TopTabsGroup() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Feed" component={Feed} />
      <TopTab.Screen name="Payments" component={Payments} />
    </TopTab.Navigator>
  );
}

// Stack
const Stack = createNativeStackNavigator();

function HomeStackGroup() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="TabGroup"
        component={TabGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TweetDetailScreen"
        component={TweetDetailScreen}
        options={{
          presentation: "fullScreenModal",
          animation: "fade_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
}

// Drawer
const Drawer = createDrawerNavigator();

function DrawerGroup() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="TopTabsGroup"
        component={TopTabsGroup}
        options={{
          headerLeft: () => <HeaderLeft />,
        }}
      />
      <Drawer.Screen name="Payments" component={Payments} />
    </Drawer.Navigator>
  );
}

// Tab Bottom
const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "ios-settings-outline";
          } else {
            iconName = focused ? "ios-notifications" : "notifications-outline";
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="DrawerGroup"
        component={DrawerGroup}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Notification" component={Notification} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const currentTheme = useColorScheme();

  return (
    <NavigationContainer
      theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <StatusBar
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={currentTheme === "dark" ? "black" : "white"}
      />
      <HomeStackGroup />
    </NavigationContainer>
  );
}
