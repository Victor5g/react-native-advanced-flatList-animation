import { useRef } from 'react';
import { 
  StatusBar, 
  Animated, 
  Text, 
  Image, 
  View, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  FlatList,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];

//Order Images
// 1-controll, 2-lightning, 2-can of paint ,4-pelican

//Example
import IllustrationControl from './assets/images/game-controller.png'
import IllustrationLightning from './assets/images/earrings.png'
import IllustrationCanOfPaint from './assets/images/hair-spray.png'
import IllustrationPelican from './assets/images/flamingo.png'

const DATA = [
  {
    "key": "3571572",
    "title": "Multi-lateral intermediate moratorium",
    "description": "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    "image": IllustrationControl
  },
  {
    "key": "3571747",
    "title": "Automated radical data-warehouse",
    "description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    "image": IllustrationLightning
  },
  {
    "key": "3571680",
    "title": "Inverse attitude-oriented system engine",
    "description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    "image": IllustrationCanOfPaint
  },
  {
    "key": "3571603",
    "title": "Monitored global data-warehouse",
    "description": "We need to program the open-source IB interface!",
    "image": IllustrationPelican
  }
]



const Indicator=({scrollX})=>{
  return <View style={{position:'absolute', bottom:100, flexDirection:'row'}}>
    {DATA.map((_, i)=>{
      return<View key={`indicator-${i}`} 
      style={{
        height:10,
        width: 10,
        borderRadius:5,
        backgroundColor:'#333',
        margin:10,

      }} />
    })}
  </View>
}

const Backdrop =({scrollx})=>{
  const backgroundColor = scrollx.interpolate({
    inputRange:bgs.map((_,i) => i * width),
    outputRange:bgs.map((bg)=>bg),
  });

  return(<Animated.View 
  style={[
    StyleSheet.absoluteFillObject,
    {
      backgroundColor,
  }
]} 
/>)
}

export default function App() {

  const scrollX = useRef(new Animated.Value(0)).current;



  return (
    <View style={styles.container}>
    
    <StatusBar hidden />

    <Backdrop scrollx={scrollX}/>

     <Animated.FlatList
      data={DATA}
      keyExtractor={(item)=>item.key}
      horizontal
      scrollEventThrottle={32}
      onScroll={ Animated.event(
        [{ nativeEvent: { contentOffset:{ x:scrollX } } } ],
        { useNativeDriver:false } 
        )}
     contentContainerStyle={{paddingBottom:100}}
     showsHorizontalScrollIndicator={false}
     pagingEnabled
     renderItem={({item})=>{
       return( 

       <View style={{width, alignItems:'center'}} >

         <View style={{flex:0.7, padding:20}} >
            <Image 
              source={item.image} 
              style={{ width: width / 2, height: height / 2, resizeMode:'contain'}}
             />
         </View>

         <View style={{flex:0.3}}>
           <Text style={{color:'#FFFF',fontWeight:'800', fontSize:28, marginBottom:10}} >{item.title}</Text>
           <Text style={{fontWeight:'300'}} >{item.description}</Text>
         </View>

       </View>

       )}}
       />

       <Indicator scrollX={scrollX}/>

  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
