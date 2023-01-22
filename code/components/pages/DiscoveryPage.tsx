import React from 'react'
import { Dimensions, ImageBackground, Pressable, Text, View } from 'react-native';

import { ImagesAssets } from '../../assets/ImagesAssets';

import { styles } from '../../styles/Styles';

import { BigStickerPack } from '../subcomponents/BigStickerPack';

import { SimpleStickerPack } from '../../core/types';

import { Gyroscope } from 'expo-sensors';

import { useNavigation } from '@react-navigation/native';

/* Unused
const IconPack = ({id}: {id: number}) => (
  <View>
    <Image style={{height: 200, width: 300, borderRadius: 20}} source={{uri: "https://picsum.photos/id/" + id + "/200/300"}}/>
  </View>
);

const Sticker = ({icon}: {icon: Image}) => (
  <View style={[styleSingleSticker.stickerView, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 15}]}>
    <Image source={ImagesAssets.computer} style={{height: 70, width: 90, marginLeft: 10}} />
  </View>
);
*/

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
  const [{ x, y, z }, setData] = React.useState({x: 0, y: 0, z: 0});
  const [subscription, setSubscription] = React.useState(null);

  let sensitivity = 12

  React.useEffect(() => {
        if(y > sensitivity) {
          fetch("https://stickerest.herokuapp.com/stickers/random")
            .then(result => result.json())
            .then((stickerResults: SimpleStickerPack[]) => setRandomPack(stickerResults[0]))
            .catch(error => console.log(error));
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

  const openStickerPack = (id : number) => {
      //@ts-ignore
      navigation.navigate("SingleSticker", {id: id});
  }

  return (
    <View style={[styles.center, styles.padding]} >
      <Pressable onPress={() => {
        if(randomPack.ID !== -1)
          openStickerPack(randomPack.ID)
      }} >
        <BigStickerPack img={randomPack.logo} title={randomPack.name} />
      </Pressable>
    </View>
  );
}

/**
 * Discovery page component
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
      <Text style={styles.textHeader3} >
        Turn around the device for a random sticker pack
      </Text>
      <MainStickerView/>
    </View>
  );
}
