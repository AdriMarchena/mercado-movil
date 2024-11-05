import { View, Text, FlatList, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import React ,{useRef, useState} from 'react'
import slides from '../data/slides'
import {OnboardingItem, Paginator} from './elements'
import { COLORS } from '../assets/theme/theme';
import { Feather } from '@expo/vector-icons';

export default function onBoardingComponent({changeShowOnboarding}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({viewableItems})=>{
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef(({viewAreaCoveragePercentThreshold : 50})).current;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{position : 'absolute', width : 60, right:0, height:60, paddingHorizontal:10, top:0, justifyContent : 'center', alignItems : 'center', zIndex:200}} onPress={changeShowOnboarding}>
        <Feather name="x" size={24} color={COLORS.negro} />
      </TouchableOpacity>
      <View style={{ flex:3 }}>
        <FlatList
              data={slides}
              renderItem={({item})=><OnboardingItem key={item.id} item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              bounces={false}
              keyExtractor={(item)=>item.id}
              onScroll={Animated.event([{nativeEvent : {contentOffset : {x : scrollX}}}],{
                useNativeDriver : false,
              })}
              scrollEventThrottle={32}
              onViewableItemsChanged={viewableItemsChanged}
              viewabilityConfig={viewConfig}
              ref={slidesRef}
              key={2}
          />
      </View>
      <Paginator data={slides} scrollX={scrollX}/>
    </View>
  )
};
const styles = StyleSheet.create({
    container : {
      height:"100%",
      justifyContent : 'center',
        alignItems : 'center',
        position : 'absolute',
        backgroundColor:COLORS.blanco,
        zIndex:100
    }
})