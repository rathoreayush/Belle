import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Style from './Style';
import CustomHeader from '../../../components/customHeader/customHeader';

const Scheme = () => {
  return (
    <SafeAreaView style={Style.screenContainer}>
      <CustomHeader label="Scheme" />
      <View style={Style.textContainer}>
        <Text style={Style.text}>
          India is at the forefront of a startup boom and this has picked up a
          relentless pace since mid-2018. With the BJP government’s stance
          fostering the startup culture; the Startup India- Standup India action
          plan has become a blessing for the Indian entrepreneur/ retailer. A
          fervour that was unveiled in 2016; most startups today are in the
          midst of exponential growth with innumerable policies have boosted the
          growing startup ecosystem. For a budding entrepreneur, this is
          probably the best time for you to kickstart your venture and make it
          happen. ‘culture’ of entrepreneurship among Indians. Here are the top
          five government schemes for the retail business.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Scheme;
