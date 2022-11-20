import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

//FOR TESTING PURPOSES:
import SingleSticker from './components/pages/stickers/SingleSticker';
import Loading_page from './components/pages/Loading_page';
import Login_page from './components/pages/Login_page';

import DicoveryPage from './components/pages/discovery/DiscoveryPage';

export default function App() {

  return (
    <View>
        {/*put your page here*/}
        <SingleSticker/>
    </View>
  );
  
}
