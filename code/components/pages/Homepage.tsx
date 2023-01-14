import { View, ScrollView, Text } from 'react-native';

import { styles } from './../../assets/style/styleHomepage';

import { SearchBar } from '../subcomponents/SearchBar';
import CarouselSticker from '../subcomponents/stickers-carousel/CarouselSticker';
import { useEffect, useState } from 'react';
import { Sticker } from '../../core/types';
import { StringLiteral } from 'typescript';
import React from 'react';


const HomePageSection = ({title, linkData, type} : {title : string, linkData : string, type : "big" | "small"}) => {

	const [queriedStickers, setQueriedStickers] = useState<Sticker[]>([]);

	useEffect(() => {
		
		fetch(linkData)
		.then((response) => response.json())
		.then((result) => setQueriedStickers(result));

	  }, []);

	return (
		<View>
			<Text style={styles.header}>
				{title}
			</Text>
			{
				type === "small" ? 	
				<CarouselSticker stickers = {queriedStickers} type="small"/>	
				: (type === "big" ? <CarouselSticker stickers = {queriedStickers} type="big"/> : <View></View>)
			}
			
		</View>
	);

}

export const Homepage = () => {

	return (
		<View style={styles.container}>
			<SearchBar/>
			<View style={styles.innerContainer}>
				<ScrollView fadingEdgeLength={40} keyboardDismissMode={"on-drag"} showsVerticalScrollIndicator={false} overScrollMode={"never"} >
					
					<HomePageSection title="Recommended" 
						linkData = "https://stickerest.herokuapp.com/stickers/most-favorited"
						type="big"/>
					<HomePageSection title="Trending" 
						linkData = "https://stickerest.herokuapp.com/stickers/most-downloaded"
						type="small"/>
					<HomePageSection title="Inspirational" 
						linkData = "https://stickerest.herokuapp.com/stickers/most-saved"
						type="small"/>
				</ScrollView>
			</View>
		</View>
	);
}
