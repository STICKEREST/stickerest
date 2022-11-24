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
    comp1: <SmallStickerPackBox img={ImagesAssets.computer}/>,
    comp2: <SmallStickerPackBox img={ImagesAssets.computer}/>,
    comp3: <SmallStickerPackBox img={ImagesAssets.computer}/>,
    comp4: <SmallStickerPackBox img={ImagesAssets.computer}/>,
    comp5: <SmallStickerPackBox img={ImagesAssets.computer}/>
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
