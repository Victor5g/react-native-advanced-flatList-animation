import { useRef } from 'react';
import { 
  Animated, 
  Text, 
  Image, 
  View, 
  Dimensions
} from 'react-native';

import { styles } from './styles';

//components
import { Indicator } from '../../components/Indicator';
import { Backdrop } from '../../components/Backdrop';
import { Square } from '../../components/Square';

//data
import { DATA } from '../../utils/OnboardingData';

const { width, height } = Dimensions.get('screen');

const bgs = ['#1e00c7', '#dd55cd', '#7b00d3', '#a90081'];

const ContentList = ({item}:any) => {
  return( 
    <View style={{width, alignItems:'center'}}>
      <View style={{flex:0.7, padding:20}} >
         <Image 
           source={item.image} 
           style={{ width: width / 2, height: height / 2, resizeMode:'contain'}}
          />
      </View>
      <View style={{flex:0.3}}>
        <Text style={styles.titleList} >{item.title}</Text>
        <Text style={styles.dicriberList}>{item.description}</Text>
      </View>
    </View>
    )
};

export const Onboarding =() => {

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} bgs={bgs}/>
      <Square scrollX={scrollX}/>
      
     <Animated.FlatList
      data={DATA}
      keyExtractor={(item)=>item.key}
      horizontal
      scrollEventThrottle={32}
      contentContainerStyle={{paddingBottom:100}}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      renderItem={ContentList}
      onScroll={ 
        Animated.event(
        [{ nativeEvent: { contentOffset:{ x:scrollX } } } ],
        { useNativeDriver:false } 
        )
      }
       />
       <Indicator scrollX={scrollX} DATA={DATA} />
  </View>
  );
}