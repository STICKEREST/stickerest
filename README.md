<div align="center">
  <a href="https://github.com/STICKEREST/stickerest">
    <img src="https://i.imgur.com/Iq6flLX.png" alt="Logo" width="80" height="80" style="border-radius: 10px">
  </a>

<h3 align="center"> <strong> STICKEREST </strong> </h3>

  <p align="center">
    Stick to it!
    </p>
</div>

## Table of Contents
  * [What is Stickerest?](#what-is-stickerest)
  * [Run](#run)
     + [Warnings](#warnings)
  * [Features](#features)
  * [Development](#development)
    + [Frontend](#frontend)
    + [Backend](#backend)
    + [Database](#database)
    + [API](#api)
    + [Tasks](#tasks)
  * [Future](#future)
  * [Creators](#creators)
  * [License](#license)

## What is Stickerest

Stickerest is a Mobile APP for iOS and Android which allows people to explore their own and others creativity! People can make their own sticker packs uploading the images they want and they will automatically be on everybody's homepage and available to be found! Stickers can be imported on Telegram and everybody can save their favorite, drop a like and much more!

## Run

To run the project you have to clone the repository.
Then open the project, go in the code directory and run:

```
npm install
```

and then

```
npm start
```
After this a QR code will be displayed on your console and you can scan it with the Expo mobile app.

### Warnings

IMPORTANT! The hosting service is free and it's not super performant and sometimes it presents error of "memory exceeded", which is not super always clear why it does. Sometimes it needs a manual restarting, please in this case contact [Francesco](https://github.com/francescomazzini), we'll find a new host sooner or later!

IMPORTANT! To be able to import the sticker packs you create on telegram, you have first to add in your profile page your TELEGRAM ID, which is a unique number assigned to everybody. It's possible to see it by going on Telegram, search @userinfobot and asking it. We found out that some Ids might not work (which might depend on when you joined Telegram for the first time), if this is the case you can use this Id (which works for sure) at the moment: 427889331. (Keep in mind the field for inserting telegram ID accepts ONLY numbers)

## Features
Stickerest provides several features. In particular, user can:
- Sign Up 
- Log In
- See on the homepage all the sticker packs made available by every users (in which each section promotes the bests in such a category, considering things like downloads, likes, saved,...)
- Search sticker packs by name and tags
- Open whatever sticker pack you see and see all of the stickers that compose it
- Import sticker packs on telegram, if their creator has allowed the possibility
- Drop a like on a sticker pack
- Save stickers as favorite
- See your saved favorite stickers
- Create sticker packs, by adding a title, a maximum of 9 tags and your favorite images
- You can discover new stickers on the Discovery section by turning quickly your device around
- You can see your personal information in Profile section and update them / change them

<br/>

![features screen 1](https://i.imgur.com/sPjpCQI.png)

<br/>

![features screen 2](https://i.imgur.com/l4GM71c.png)

<br/>


## Development

The project has been developed by accomplishing three main tasks: creation of frontend, backend and database.
### Frontend

The frontend is built with React Native using typescript (and javascript just combined with css for styling) and it exploits some APIs for providing all the features for the user. [It is under the folder "code"](https://github.com/STICKEREST/stickerest/tree/main/code).

The internal structure we followed is basically:  
- assets, it contains all the external resources needed that have nothing to do with code, like images, fonts,...   
- core, which contains mainly: "middleware" files that speak with its API or backend and provide a higher level functions to be used directly in the frontend; utility files that provide utility functions to be used in the frontend that are mainly used for handling data.  
- navigation, which contains components for the type of navigations needed and provided in the application  
- UI, which contains mainly the style sheets of the frontend and all the components used. These ones are divided for their purpose, for what they are used to. So there is a folder with all typescript components and pages for the Access to the application (login, registering, ...), for the Homepage, for the Stickers and a general one. 

### Backend

The backend is built with Nodejs using typescript (in the most cases, when it was not too problematic, also due to some libraries not being well defined for typescript and due to our little experience with Backend technologies). It provides all the functions needed from the frontend to get and post information. [It is under the folder "stickerest-backend"](https://github.com/STICKEREST/stickerest-backend/tree/main).

The internal structure we followed is basically:  
- controllers, it contains all the files that provide functions to be performed on the database  
- middlewares, which contains the middlewares files and functions that allow to do something between the call done by the frontend and the actual execution of this function. Like for example checkin that a User is logged.  
- routes, which contains all the routes available by the application to be called by the frontend.      

Other than this there is a singleton file for getting the Database connection and the App file which is the entry point for the backend.  

### Database

It was initially realized for PostgresSQL so it required some convertions and changes also due to decisions made during the app creation process and due to its hosting, PlanetScale which uses MySQL and has some constraints, like not to use foreign keys, for a security reason. [It can be found under the folder "database"](https://github.com/STICKEREST/stickerest/tree/main/database).

Although the original idea of stickerest was composed of many tables for many future possible features, only a part of them has been kept for the current state of the application. The tables used are:  
- Utilizer, for keeping all user information
- WhatsappStickerPack, for keeping all information regarding the sticker packs
- Image, which represents a sticker, therefore one of the images of which the stickerpack is composed of
- Favorites, for keeping track which user has liked which sticker pack
- Saved, for keeping track which user has saved which sticker pack
- Tags, for saving the tags assigned to each sticker pack
- sessions, used from the API for managing backend session of users

### API

Even though the application may seem not too complicated, its core and the main difficult issues behind its development mainly lie in the connection through all the various and several APIs used. This was in fact usually source of errors and problems, it required reading a lot of documentation and understanding which of the possibilities offered were the best (considering the "Typescript Barrier" as well).

Here's a brief description.

For the frontend  
- expo-image-picker, for picking images from users' phone
- expo-sensors, to exploit the Gyroscope in the Discovery page
- react-native-animated-spinkit, to have an animated gif for loading  

plus much more used a bit everywhere and Telegram and Backend linking for which we wrote the methods handling the connection with the API.

For the backend  
- bcrypt, for password encrypting / decrypting
- cloudinary, for image uploading and hosting 
- express, for managing all the routes and controllers for them  
- mysql2, for managing the connection to the Database
- passport, for managing the user log in and session
- sharp, for managing images conversion and their resolution before they get uploaded (also to respect limits imposed by Telegram API)

### Tasks

We have worked in a very agile way since the beginning, in order to try to do the most of the things quickly with few resources available (since our knowledge were limited at the beginning). 

We defined a MoSCoW scheme (Must, Should, Could, Won't have), where we decided which were the most important things to be done for the project, the must have, then what we would have liked to have, and in the end other features that most likely we wouldn't have had time to do but at least to know what we could make more.

After this phase, we started dividing all the jobs in smaller ones, so  that we could have had the possibility to work on different areas, things, depending on us, our progress and our availability. Initial ones have focused mainly on doing research and informing ourselves, then we started making our hands dirty and at the end we started refining everything, ensuring functional programming principles and a clean code structure.

We used github development tables for managing these tasks and their progress status and for being able to transform them directly into project issues and to address them creating a separated branch. Every task can be seen [here](https://github.com/orgs/STICKEREST/projects/1). Even though the way we chose the tasks was arbitrary and free, there has been a general tendency that can be summed up in:
- Francesco, took care about everything that concerned Database, Backend (including hosting), frontend-backend and telegram linking, frontend representation of sticker packs and the page for seeing all the details about them. Plus, general code reorganization and cleaning, with separation of Logic and UI. [Here all his assigned tasks.](https://github.com/orgs/STICKEREST/projects/1/views/1?filterQuery=assignee%3Afrancescomazzini)
- Simone, took care of the Homepage structure, Favourites page, Carousels and Album representation of the sticker packs, the Creation Page for Sticker Packs (with Tag Input and Picking Image system). Plus refinition of this code and its style [Here all his assigned tasks.](https://github.com/orgs/STICKEREST/projects/1/views/1?filterQuery=assignee%3ASimoneFerraris)  
- Nicholas, took care of the Navbar, Searchbar, Homepage, all Navigation (both stack and tab) part, Telegram methods for communicating with the API. Plus general code and style reorganization and cleaning. [Here all his assigned tasks.](https://github.com/orgs/STICKEREST/projects/1/views/1?filterQuery=assignee%3AHexagonNico)  
- Alice, took care of Login, Registration and User Profile pages, the Discovery by shaking page (with Sensor usage) and the Loading Page. Plus refinition of this code and its style. [Here all her assigned tasks.](https://github.com/orgs/STICKEREST/projects/1/views/1?filterQuery=assignee%3AAliceFrezza01)  

## Future

Stickerest is a project will be continued with the aim to be published on the App store and Play store. Therefore there will be still some things to do and to be addressed before this. Here's some of the future needs
- [ ] Use Google login system, more secure and reliable; 
- [ ] Implement Whatsapp import API;
- [ ] Implement Image editing directly in the App;
- [ ] Find new hosting service with better capabilities;
- [ ] Add a page for creators, so to see all the sticker packs, just by clicking their names with some stats;
- [ ] Get information about all that is needed to do to publish the app;

## Creators
- [@francescomazzini](https://github.com/francescomazzini)
- [@HexagonNico](https://github.com/HexagonNico)
- [@SimoneFerraris](https://github.com/SimoneFerraris)
- [@AliceFrezza01](https://github.com/AliceFrezza01)

## License

[MIT](./LICENSE.md)

