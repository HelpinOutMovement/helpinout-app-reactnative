
import React from 'react';
import { Container, Content, View, Text} from "native-base";
import translate from 'react-native-i18n';
import DeviceInfo from 'react-native-device-info';

import HeaderComponent from './components/HeaderComponent';


function About(props) {
    const appVersion = DeviceInfo.getVersion() +"."+ DeviceInfo.getBuildNumber();
    DeviceInfo.getLastUpdateTime().then((time) => {console.log(time)})
    console.log(appVersion)
  return (
      <Container>
        <HeaderComponent {...props} title={translate.t("title_about")}/>
        <Content padder  >
          <View>
                <Text>Version : {DeviceInfo.getVersion()}</Text>
                <Text>Build : {DeviceInfo.getBuildNumber()}</Text>
                <Text>Memory user : {DeviceInfo.getReadableVersion()}</Text>
                
                
          </View>
        </Content>
      </Container>
   
  );
}
export default About;