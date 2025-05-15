import React from 'react';
import {View, Image, Animated} from 'react-native';
import {CarouselData} from 'constants/carouselData';

import Style from './style';

const Carousel = () => {
  const renderItem = ({item}) => (
    <Image source={item.image} style={Style.image} />
  );

  return (
    <View style={Style.container}>
      <Animated.FlatList
        data={CarouselData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={item => item.id}
        style={Style.list}
      />
    </View>
  );
};

export default Carousel;
