import SingleSticker from "../../pages/stickers/SingleSticker";
import { BigStickerPack } from '../../subcomponents/BigStickerPack';
import { ImagesAssets } from '../../../assets/ImagesAssets';

import { View, StyleSheet, FlatList } from "react-native";

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22,
     paddingLeft: 22
    },
    item: {
      padding: 15,
    },
  })


const data= [
    {
        id: 'comp1',
        description: "Sticker Name 1",
    }, {
        id: 'comp2',
        description: "Sticker Name 2",
    }, {
        id: 'comp3',
        description: "Sticker Name 3",
    }
];

const mapOfComponents = {
    comp1: <BigStickerPack img={ImagesAssets.computer} title="sample"/>,
    comp2: <BigStickerPack img={ImagesAssets.computer} title="sample"/>,
    comp3: <BigStickerPack img={ImagesAssets.computer} title="sample"/>
  };

export default function Carousel() {

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data = {data}
                renderItem={({ item }) => {
                    return (
                      mapOfComponents[item.id]
                    )
                }
                }
                keyExtractor={item => item.id}
            />
        </View>
    );
    
}
