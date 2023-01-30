import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { ImagesAssets } from '../assets/img/ImagesAssets';

import Homepage from '../components/homepage/Homepage';
import DiscoveryPage from '../components/stickers/DiscoveryPage';
import UserProfilePage from '../components/access/UserProfilePage';
import CreatePack from '../components/stickers/CreatePackPage';
import Favorites from '../components/stickers/FavoritesPage';

import { navbarStyle } from '../styles/Navbar';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

/**
 * Handles the navigation between Homepage, Favourites, CreatePack, DiscoveryPage, UserProfilePage.
 * Homepage then uses the StackNavigator to control the navigation between this TabNavigator and the SingleSticker page.
 */
export const TabNavigator = () => (
  <Tabs.Navigator screenOptions={{headerShown: false}} tabBar={Navbar} >
    <Tabs.Screen name="Homepage" component={Homepage} initialParams={{icon: ImagesAssets.iconHome}} />
    <Tabs.Screen name="Favourites" component={Favorites} initialParams={{icon: ImagesAssets.iconStar}} />
    <Tabs.Screen name="CreatePack" component={CreatePack} initialParams={{icon: ImagesAssets.iconDocument}} />
    <Tabs.Screen name="DiscoveryPage" component={DiscoveryPage} initialParams={{icon: ImagesAssets.iconDiscovery}} />
    <Tabs.Screen name="UserProfilePage" component={UserProfilePage} initialParams={{icon: ImagesAssets.iconUser}} />
  </Tabs.Navigator>
);

/**
 * Navbar component that defines the appearance of the bottom navigation bar.
 */
const Navbar = ({state, descriptors, navigation}: {state: any, descriptors: any, navigation: any}) => (
  <View style={navbarStyle.background}>
    {
      state.routes.map((route:any, index:any) => {
        const buttons = state.routes.length;
        const middleButton = (buttons % 2 === 0 ? buttons : buttons - 1) / 2;
        const navigate = () => {
          navigation.navigate({
            name: route.name,
            merge: true
          });
        }
        return index === middleButton ? (
          <View style={navbarStyle.circleButton} key={index} >
            <TouchableOpacity onPress={navigate} >
              <Image source={route.params.icon} style={navbarStyle.alignCenter} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={navbarStyle.expand} onPress={navigate} key={index} >
            <Image source={route.params.icon} style={navbarStyle.alignCenter} />
          </TouchableOpacity>
        );
      })
    }
  </View>
);
