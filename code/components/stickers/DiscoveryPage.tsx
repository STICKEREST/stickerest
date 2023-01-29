import React from 'react'
import { Alert, Dimensions, ImageBackground, Pressable, Text, View } from 'react-native';

import { ImagesAssets } from '../../assets/img/ImagesAssets';

import { styles } from '../../styles/Styles';

import { BigStickerPack } from './StickerPack';

import { SimpleStickerPack } from '../../core/types';

import { Gyroscope } from 'expo-sensors';

import { useNavigation } from '@react-navigation/native';
import { getRandomSticker } from '../../core/stickers/stickerUtilities';

/**
 * Component representing the sticker in the middle of the discovery page.
 */
const MainStickerView = () => {
  const defaultPack: SimpleStickerPack = {
    ID: -1,
    name: "??",
    logo: "https://res.cloudinary.com/hv5jgvu0r/image/upload/v1673819674/white-question-mark-svgrepo-com_1_rsozbh.png"
  }

  const [randomPack, setRandomPack] = React.useState<SimpleStickerPack>(defaultPack);
  //gyroscop data, we are only interested in the y variable
  const [{ x, y, z }, setData] = React.useState({x: 0, y: 0, z: 0});
  const [subscription, setSubscription] = React.useState(null);

  //this variable represents how much one has to tilt the smartphone.
  //The smaller the value, the more sensible it is.
  let sensitivity = 8;

  React.useEffect(() => {
        if(y > sensitivity) {
          getRandomSticker()
            .then((result) => setRandomPack(result))
            .catch((error) => Alert.alert("Error", error.message));
        }
  }, [y > sensitivity]);

  const _subscribe = () => {
    setSubscription(Gyroscope.addListener(gyroscopeData => {
      setData(gyroscopeData);
    }));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  React.useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const navigation = useNavigation();

  const openStickerPack = (id: number) => {
      //@ts-ignore
      navigation.navigate("SingleSticker", {id: id});
  }

  return (
    <View style={[styles.center, styles.padding]} >
      <Pressable onPress={() => {
        if(randomPack.ID !== -1)
          openStickerPack(randomPack.ID)
        }} 
      >
        <BigStickerPack image={randomPack.logo} title={randomPack.name} />
      </Pressable>
    </View>
  );
}

/**
 * Discovery page component that allows by turning around the device to get a random sticker pack
 */
export default function DiscoveryPage() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View>
      <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}} />
      <Text style={[styles.textHeader2, styles.marginTop]} >
        Discovery
      </Text>
      <Text style={styles.textHeader4} >
        Turn around the device for a random sticker pack
      </Text>
      <MainStickerView/>
    </View>
  );
}
