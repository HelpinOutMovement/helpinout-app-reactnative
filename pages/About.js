
import React, {useContext, useState} from 'react';
import { TouchableOpacity, TextInput} from 'react-native';
import { Container, Content, View, Text} from "native-base";
import translate from 'react-native-i18n';
import DeviceInfo from 'react-native-device-info';
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';

import HeaderComponent from './components/HeaderComponent';
import UserContext from '../misc/UserContext'

function About(props) {
    const appVersion = DeviceInfo.getVersion() +"."+ DeviceInfo.getBuildNumber();
    DeviceInfo.getLastUpdateTime().then((time) => {console.log(time)})
    console.log(appVersion)
    const { getAPIServer, setAPIServer } = useContext(UserContext);
    const [showServerModal, setShowServerModal] = useState(false);
    const [APIServerData, setAPIServerData] = useState("");

    const setAPIServerDataValue = () =>{
      setAPIServer(APIServerData);
      setShowServerModal(false);
    }
  return (
      <Container>
        <HeaderComponent {...props} title={translate.t("title_about")}/>
        <Content padder  >
          <View>
                <Text>Version : {DeviceInfo.getVersion()}</Text>
                <TouchableOpacity
                    onLongPress={() => setShowServerModal(true)}>
                      <Text></Text>    
                </TouchableOpacity>
                <Text>Build : {DeviceInfo.getBuildNumber()}</Text>              
          </View>
        </Content>

        <Modal
          testID={'modal'}
          isVisible={showServerModal}
          onBackdropPress={() => { setShowServerModal(false) }}
          onSwipeComplete={() => { }}
          style={{
              justifyContent: 'center',
              margin: 0,
              marginBottom: 2,
              position:"absolute",
              top:verticalScale(250),
              left:scale(25), 
              borderRadius:8,
              borderColor:"#EE6B6B",
          }}>
              <View style={{flex: 1, flexDirection: 'column', justifyContent: "space-evenly", width:scale(300), borderWidth:1, height:verticalScale(100), backgroundColor:"#FFFFFF", borderRadius:4 }}>
                  <View style={{paddingVertical:20, paddingHorizontal:20}}>
                    <Text>{"Server"}</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-evenly",}}>
                  <TextInput
                      placeholderTextColor="grey"
                      placeholder={"server"}
                      style={{ borderWidth: 1, borderRadius: 3, borderColor: "grey", height:verticalScale(30), width:scale(150), marginRight: 10, padding: 10, color: "#000000" }}
                      onChangeText={(val) => setAPIServerData(val)}
                      autoCapitalize = 'none'
                    ></TextInput>
                    <TouchableOpacity  style={{paddingHorizontal:scale(0), paddingVertical:verticalScale(0)}} onPress={() => { setAPIServerDataValue()}}>
                          <View style={{
                            backgroundColor:"#EE6B6B",
                            borderRadius:4,
                            //paddingHorizontal: 5,
                            //paddingVertical:10,
                            borderColor:"#EE6B6B",
                            borderWidth:1,
                            width:scale(100),
                            height:verticalScale(30) ,
                            alignItems:"center",
                            justifyContent:"center"
                          }}>
                            <Text adjustsFontSizeToFit={true} minimumFontScale={0.5} numberOfLines={1} style={{color: "rgba(245,245,245,1)",fontFamily: "roboto-regular",}}>{"submit"}</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
              </View>
        </Modal>

      </Container>
   
  );
}
export default About;