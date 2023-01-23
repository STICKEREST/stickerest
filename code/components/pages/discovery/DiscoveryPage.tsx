import React, {useState, useEffect} from 'react'
import { Dimensions, ImageBackground,  Pressable,  TouchableHighlight } from 'react-native';
import { Text, View, Image } from 'react-native';

import { styleSingleSticker } from "../../../assets/style/styleSingleSticker";
import { ImagesAssets } from '../../../assets/ImagesAssets';

import { Gyroscope } from 'expo-sensors';
import { BigStickerPack } from '../../subcomponents/BigStickerPack';
import { SimpleStickerPack } from '../../../core/types';
import { useNavigation } from '@react-navigation/native';

const IconPack = ({id}:{id:number}) => {
    
    return (
        <View>
            <Image style={{height: 200, width: 300, borderRadius: 20}} source={{uri: "https://picsum.photos/id/" + id + "/200/300"}}/>
        </View>
    );
}

const Sticker = ({icon}:{icon:Image}) => {

    return (

        <View style={[styleSingleSticker.stickerView, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 15}]}>
            <Image source={ImagesAssets.computer} style={{height: 70, width: 90, marginLeft: 10}} />
        </View>

    );
}


const MainStickerView = () => {

    const defaultPack : SimpleStickerPack = {
        ID: -1,
        name: "??",
        logo: "https://res.cloudinary.com/hv5jgvu0r/image/upload/v1673819674/white-question-mark-svgrepo-com_1_rsozbh.png"
    }

    const [randomPack, setRandomPack] = useState<SimpleStickerPack>(defaultPack);

    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
     });
    const [subscription, setSubscription] = useState(null);

    let sensitivity = 8

    useEffect(() => {
          if (y>sensitivity)
          {
            fetch("https://stickerest.herokuapp.com/stickers/random")
            .then(result => result.json())
            .then((stickerResults : SimpleStickerPack[]) => setRandomPack(Object.create({ ID: -1,
                name: sensitivity,
                logo: "https://picsum.photos/id/" + Math.floor(Math.random() * 100) + 1 + "/200/300"})))
            .catch(error => console.log(error));
          }
    }, [y>sensitivity]);

    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener(gyroscopeData => {
            setData(gyroscopeData);
            })
        );
    };

    const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
    };
    
    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []); 

    const navigation = useNavigation();

    const openStickerPack = (id : number) => {
        //@ts-ignore
        navigation.navigate("SingleSticker", {id: id});
    }


    return (
        <View style={[styleSingleSticker.mainStickerView, {alignItems: 'center', justifyContent: 'center', padding: 20}]} >
            
            <Pressable onPress={() => {
                if(randomPack.ID !== -1)
                    openStickerPack(randomPack.ID) }
                }
            > 
                <BigStickerPack img={randomPack.logo} title={randomPack.name} />      
            </Pressable>
        </View>
    )
}



export default function DiscoveryPage() {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styleSingleSticker.container}>
        <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}>
        </ImageBackground>

        <View style={{marginTop: 30}}>

            <Text style={{fontFamily: "popblack", fontSize: 25, paddingTop: 20, paddingBottom:5}}>Discovery</Text>
            <Text style={{/*fontFamily: "poppinsLight",*/ fontSize: 15, paddingBottom:20}}>Turn around the device for a random sticker pack</Text> 

            <MainStickerView/>
        </View>
    </View>
  );
}
