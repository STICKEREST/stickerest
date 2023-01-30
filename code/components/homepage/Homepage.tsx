import React from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';

import { homepageStyle } from '../../UI/styles/Homepage';
import { styles } from '../../UI/styles/Styles';

import { SearchBar } from './SearchBar';
import { SmallStickerCarousel, BigStickerCarousel } from '../general/StickerCarousel';

import { StickerPack } from '../../core/types';
import { getByName, getByTags, getMostDownloaded, getMostFavorited, getMostSaved } from '../../core/stickers/stickerUtilities';

/**
 * Component that represents a section of the homepage which is mainly composed of a title and a carousel of 
 * stickers derived from a query
 */
const HomePageSection = ({title, query, carousel} : {title: string, query: any, carousel: (stickers: StickerPack[]) => React.ReactNode}) => {
 
  const [queriedStickers, setQueriedStickers] = React.useState<StickerPack[]>([]);
  //it's always updated (every 8 seconds) because there could be also new additions of sticker packs and we
  //may want to see them. For example: create a pack and directly search for it on the store!
  React.useEffect(() => {
    console.log("Getting search results...");

    query()
      .then((result : StickerPack[]) => setQueriedStickers(result))
      .catch((error : Error) => Alert.alert("Error", error.message));

    const interval = setInterval(() => {

      query()
        .then((result : StickerPack[]) => setQueriedStickers(result))
        .catch((error : Error) => Alert.alert("Error", error.message));

    }, 10000);

    return () => clearInterval(interval);

  }, [query]);
  return (
    <View style={styles.marginTopSmall} >
      <Text style={styles.textHeader3}>{title}</Text>
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
    <HomePageSection title="Recommended" query = {getMostFavorited} carousel={(stickers: StickerPack[]) => <BigStickerCarousel stickers={stickers} />} />
    <HomePageSection title="Trending" query = {getMostDownloaded} carousel={(stickers: StickerPack[]) => <SmallStickerCarousel stickers={stickers} />} />
    <HomePageSection title="Inspirational" query = {getMostSaved} carousel={(stickers: StickerPack[]) => <SmallStickerCarousel stickers={stickers} />} />
  </>
);

/**
 * Component used to display the homepage when something is typed into the sarch bar.
 */
const SearchHomePage = ({query} : {query: string}) => (
  <>
    <HomePageSection title="By Name" query = {async () => await getByName(query)} carousel={(stickers: StickerPack[]) => <BigStickerCarousel stickers={stickers} />} />
    <HomePageSection title="By Tags" query = {async () => await getByTags(query)} carousel={(stickers: StickerPack[]) => <SmallStickerCarousel stickers={stickers} />} />
  </>
);

/**
 * Component that contains the content of the homapage body
 */
const HomePageContent = ({searchText} : {searchText : string}) => (
  <View style={homepageStyle.innerContainer}>
    <ScrollView fadingEdgeLength={40} keyboardDismissMode={"on-drag"} showsVerticalScrollIndicator={false} overScrollMode={"never"} >
    {
      searchText === "" ? <DefaultHomePage /> : <SearchHomePage query = {searchText} />
    }
    </ScrollView>
  </View>
)

/**
 * Homepage component function.
 * Used in tab navigator.
 */
export default function Homepage() {

  const [searchText, setSearchText] = React.useState<string>("");

  return (
    <View style={homepageStyle.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <HomePageContent searchText={searchText} />
    </View>
  );
}
