
            import React from 'react'
            import { Dimensions, ImageBackground } from 'react-native';
            import { StyleSheet, Text, View, Image } from 'react-native';

            import Loading_page from './components/Loading_page';

            import { useFonts } from 'expo-font';

            import{ ImagesAssets } from './assets/ImagesAssets';

            import SingleSticker from './components/pages/stickers/SingleSticker';

            import BigStickerCarousel from './components/subcomponents/stickers-carousel/CarouselBigSticker';

            import StickerCarousel from './components/subcomponents/stickers-carousel/CarouselSticker';

            import HomePage from './components/pages/homepage/Homepage';
            //                    code\components\Loading_page.tsx
            //                    ./components/pages/homepage/Homepage
            export default function App() {

              return (
                <View>
                <StickerCarousel/>
                <BigStickerCarousel/>
                </View>
              );
              
            }
