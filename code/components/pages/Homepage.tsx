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
			.then((result) => setQueriedStickers(result))
			.catch(error => console.log(error));
		
		const intervalId = setInterval(() => {
			
			fetch(linkData)
			.then((response) => response.json())
			.then((result) => setQueriedStickers(result))
			.catch(error => console.log(error));
			
		  }, 5000);
	  
		  return () => clearInterval(intervalId);

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

const DefaultHomePage = () => {

	return (
		<>
			<HomePageSection title="Recommended" 
				linkData = "https://stickerest.herokuapp.com/stickers/most-favorited"
				type="big"/>
			<HomePageSection title="Trending" 
				linkData = "https://stickerest.herokuapp.com/stickers/most-downloaded"
				type="small"/>
			<HomePageSection title="Inspirational" 
				linkData = "https://stickerest.herokuapp.com/stickers/most-saved"
				type="small"/>
		</>
	);

}

const SearchHomePage = ({query} : {query : string}) => {

	return (
		<>
			<HomePageSection title="By Name" 
				linkData = {`https://stickerest.herokuapp.com/stickers/name-${query}`}
				type="big"/>
			<HomePageSection title="By Tags" 
				linkData = {`https://stickerest.herokuapp.com/stickers/tags-${query}`}
				type="small"/>
		</>
	);

}


//separa la logica poi grzzz

export const Homepage = () => {

	const [searchText, setSearchText] = useState<string>("");

	return (
		<View style={styles.container}>
			<SearchBar searchText={searchText} setSearchText={setSearchText} />
			<View style={styles.innerContainer}>
				<ScrollView fadingEdgeLength={40} keyboardDismissMode={"on-drag"} showsVerticalScrollIndicator={false} overScrollMode={"never"} >
					{
						searchText === "" ?
						<DefaultHomePage />
						:
						<SearchHomePage query = {searchText} />
					}
				</ScrollView>
			</View>
		</View>
	);
}
