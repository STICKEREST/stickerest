import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';

import { styles } from './../assets/style/styleHomepage';

import { SearchBar } from '../components/SearchBar';
import { SmallStickerCarousel, BigStickerCarousel } from '../components/StickerCarousel';

import { Sticker } from '../core/types';


const HomePageSection = ({title, linkData, carousel} : {title: string, linkData: string, carousel: (stickers: Sticker[]) => React.ReactNode}) => {
 
  const [queriedStickers, setQueriedStickers] = React.useState<Sticker[]>([]);
  //it's always updated (every 8 seconds) because there could be also new additions of sticker packs and we
  //may want to see them. For example: create a pack and directly search for it on the store!
  React.useEffect(() => {
    fetch(linkData)
      .then(response => response.json())
      .then(result => setQueriedStickers(result))
      .catch(error => console.log(error));
    const interval = setInterval(() => {
      fetch(linkData)
        .then(response => response.json())
        .then(result => setQueriedStickers(result))
        .catch(error => console.log(error));
    }, 8000);
    return () => clearInterval(interval);
  }, [linkData]);
  return (
    <View>
    <Text style={styles.header}>{title}</Text>
    {
      carousel(queriedStickers)
    }
    </View>
  );
}

/**
 * Component used to display the homepage when the user is not typing in the sarch bar.
 */
const DefaultHomePage = () => (
  <>
    <HomePageSection title="Recommended" linkData = "https://stickerest.herokuapp.com/stickers/most-favorited" carousel={(stickers: Sticker[]) => <BigStickerCarousel stickers={stickers} />} />
    <HomePageSection title="Trending" linkData = "https://stickerest.herokuapp.com/stickers/most-downloaded" carousel={(stickers: Sticker[]) => <SmallStickerCarousel stickers={stickers} />} />
    <HomePageSection title="Inspirational" linkData = "https://stickerest.herokuapp.com/stickers/most-saved" carousel={(stickers: Sticker[]) => <SmallStickerCarousel stickers={stickers} />} />
  </>
);

/**
 * Component used to display the homepage when something is typed into the sarch bar.
 */
const SearchHomePage = ({query} : {query: string}) => (
  <>
    <HomePageSection title="By Name" linkData = {`https://stickerest.herokuapp.com/stickers/name-${query}`} carousel={(stickers: Sticker[]) => <BigStickerCarousel stickers={stickers} />} />
    <HomePageSection title="By Tags" linkData = {`https://stickerest.herokuapp.com/stickers/tags-${query}`} carousel={(stickers: Sticker[]) => <SmallStickerCarousel stickers={stickers} />} />
  </>
);

/**
 * Homepage component function.
 * Used in tab navigator.
 */
export default function Homepage() {
  const [searchText, setSearchText] = React.useState<string>("");
  return (
    <View style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <View style={styles.innerContainer}>
        <ScrollView fadingEdgeLength={40} keyboardDismissMode={"on-drag"} showsVerticalScrollIndicator={false} overScrollMode={"never"} >
        {
          searchText === "" ? <DefaultHomePage /> : <SearchHomePage query = {searchText} />
        }
        </ScrollView>
      </View>
    </View>
  );
}
