import { SmallStickerPackBox } from "../SmallStickerPack";
import { BigStickerPack } from '../BigStickerPack';
import { ImagesAssets } from '../../../assets/ImagesAssets';
import { styleCarousel } from "../../../assets/style/styleCarousel";

import { View, StyleSheet, FlatList } from "react-native";

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
    }, {
        id: 'comp4',
        description: "Sticker Name 4",
    }, {
        id: 'comp5',
        description: "Sticker Name 5",
    }
];

const mapOfComponents = {
    comp1: <BigStickerPack img={ImagesAssets.computer} title =""/>,
    comp2: <BigStickerPack img={ImagesAssets.computer} title =""/>,
    comp3: <BigStickerPack img={ImagesAssets.computer} title =""/>,
    comp4: <BigStickerPack img={ImagesAssets.computer} title =""/>,
    comp5: <BigStickerPack img={ImagesAssets.computer} title =""/>
  };

export default function Carousel() {

    return (// style={styles.container}>
        <View style={styleCarousel.container}> 
            <FlatList
                horizontal
                ItemSeparatorComponent={() => <View style={{marginRight: 25}} />}
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
