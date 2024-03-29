import React from 'react'
import { Alert, Dimensions, ImageBackground, StyleSheet} from 'react-native';
import { Text, View, } from 'react-native';

import { styles } from "../../styles/Styles";
import { userProfilePageStyle } from '../../styles/UserProfilePage';

import{ ImagesAssets } from '../../../assets/img/ImagesAssets';

import { ButtonToSign, FieldComponent } from './Access';
import { getData, prepareCredentials, update } from '../../../core/access/profile';
import { validateCredentials } from '../../../core/access/accessUtilities';
import { SetNumber, SetString, User } from '../../../core/types';
import { errorAlert, successAlert } from '../general/GeneralComponents';

/**
 * This class takes care of the UI implementation of the UserProfilePage
 */

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const stylesDimension = StyleSheet.create({
  fullSize: {
    width: windowWidth, 
    height: windowHeight
  },
  marginHeight: {
    marginTop: windowHeight*0.04,
  },
  marginHeight007: {
    marginTop: windowHeight*0.07,
  },
  marginHeight003: {
    marginTop: windowHeight*0.3,
  },
  paddingHeight: {
    paddingTop: windowHeight/6
  }
});

const updateUI = (form : string) => {

  update(form)
  .then(() => successAlert("The Profile Information have been updated successfully")
  ).catch(error => errorAlert(error.message));

}

const attemptUpdate = (nickname: string, telegramId : number): void => {
  if(validateCredentials(nickname) && typeof telegramId === "number") {
    const form : string = prepareCredentials(nickname, telegramId);
    updateUI(form);
  }else {
    errorAlert("Missing information! Some of the fields are empty");    
  }
}

const TextFields = ({email, setEmail, nickname, setNickname, telegramId, setTelegramId} : {email : string, setEmail : SetString, nickname : string, setNickname : SetString, telegramId : number, setTelegramId : SetNumber}) => {

    React.useEffect(() => {

      getData()
      .then((result : User) => {
        setEmail(result.email);
        setNickname(result.nickname);
        setTelegramId(result.telegram);

        console.log(result);
      })

    }, []);

    const processTelegramId = (text : string) => {
      if(Number.isNaN(+text)) 
        setTelegramId(0); 
      else
        setTelegramId(+text);
    }

    const messageFieldHelp = "This is your unique Telegram Id. It is used to publish sticker packs on Telegram when you upload them on Stickerest. Send a message to @userinfobot to know your id.";

    return (
        <>
          <Text>Personal information</Text>
            <View style={[styles.center, userProfilePageStyle.inputContainer]}>
                <FieldComponent name={nickname} placeholder={null} setName={setNickname} picture={"person-outline"} hide={false}/>
                <FieldComponent name={email} placeholder={null} setName={setEmail} picture={"mail-outline"} hide={false} disabled={true}/>
            </View>
          <Text>Stickers upload</Text>
            <View style={[styles.center, userProfilePageStyle.inputContainer]} >
                <FieldComponent name={telegramId.toString()} setName={processTelegramId} hide={false} placeholder={'Telegram id'} 
                picture={'paper-plane'} messageHelp={messageFieldHelp} />
            </View>
        </>
    );

}

const ButtonUpdate = ({nickname, telegramId} : {nickname : string, telegramId : number}) => {
  return (
    <View style={[userProfilePageStyle.signInButton, stylesDimension.marginHeight007]}>
      <ButtonToSign functionToExecute={() => attemptUpdate(nickname, telegramId)} nameOfButton="Save"/>
    </View>
  )
}

export default function UserProfilePage() {
    const [email, setEmail] = React.useState<string>("name.surname@gmail.com");
    const [nickname, setNickname] = React.useState<string>("nickname");
    const [telegramId, setTelegramId] = React.useState<number>(0);

    return (
        <View style={styles.center}>
            <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={stylesDimension.fullSize}>
                <View style={styles.center}>
                    <Text style={[styles.textHeader1, stylesDimension.paddingHeight]}>Your Profile</Text>
                </View>
                <View style={[styles.absolutePosition, stylesDimension.marginHeight003]}>
                    <TextFields email={email} setEmail={setEmail} nickname={nickname} setNickname={setNickname} telegramId={telegramId} setTelegramId={setTelegramId} />
                    <ButtonUpdate nickname={nickname} telegramId={telegramId}/>
                </View>
            </ImageBackground>
        </View>
    );
}
