import { SmallStickerPackBox } from "../SmallStickerPack";
import { BigStickerPack } from '../BigStickerPack';
import { ImagesAssets } from '../../../assets/ImagesAssets';
import { styleCarousel } from "../../../assets/style/styleCarousel";

import { View, StyleSheet, FlatList, SafeAreaView, Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

export default function CarouselVertical() {

    return (// style={styles.container}>
    <SafeAreaView>
    <View style={[styleCarousel.container, {height: windowHeight*0.4}]}> 
        
        <FlatList
            ItemSeparatorComponent={() => <View style={{marginRight: 25}} />}
            showsHorizontalScrollIndicator={false}
            data = {data}
            renderItem={({ item }) => {
                return (
                    <View style={{padding: 15}}>
                        {mapOfComponents[item.id]}
                    </View>
                )
            }
            }
        
            keyExtractor={item => item.id}
            style={{height: windowHeight*0.3, marginBottom: 40}}
        />
    </View>
    </SafeAreaView>
    );
    
}

/*<SafeAreaView>
<View style={[styleCarousel.container, {height: windowHeight*0.4}]}> 
    
    <FlatList
        ItemSeparatorComponent={() => <View style={{marginRight: 25}} />}
        showsHorizontalScrollIndicator={false}
        data = {data}
        renderItem={({ item }) => {
            return (
                <View>
                    {mapOfComponents[item.id]}
                </View>
            )
        }
        }
    
        keyExtractor={item => item.id}
        style={{height: windowHeight*0.4}}
    />
</View>
</SafeAreaView>*/