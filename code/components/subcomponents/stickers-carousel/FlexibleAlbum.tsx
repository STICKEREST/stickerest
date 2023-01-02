import { Dimensions, ImageSourcePropType, ScrollView, View } from "react-native";
import { SmallStickerPackBox } from "../SmallStickerPack";
import { styleCreatePack } from "../../../assets/style/styleCreatePack";
import React, {useState} from "react";

const windowWidth = Dimensions.get('window').width;

const [colIndex, setColIndex] = useState(0);
const [col, setCol] = useState([]);
const [row, setRow] = useState([]);

const addRow = () => {
    return (
        <View style={[styleCreatePack.scrollView, {marginLeft: windowWidth*0.07}]}>{col}</View>
    )
}

const addColumn = (img: ImageSourcePropType) => {
    return (
        <View style={{marginRight: 4}}>
            <SmallStickerPackBox img={img}/>
        </View>
    )
}

function addImage(img: ImageSourcePropType) {
    if(colIndex < 3) {
        setCol(prevState => { 
                return[...prevState, addColumn(img)]
            }
        );
    } else {
        setCol([]);
        setRow(prevState => {
                return [...prevState, addRow];
            }
        );
    }
    setColIndex(colIndex + 1);
}

const FlexibleAlbum = ({images} : {images : ImageSourcePropType[]}) => {

    images.map((value) => {
        addImage(value);
    });
    return (
        <ScrollView>
            {row}
        </ScrollView>
    );
  }

  export{FlexibleAlbum}