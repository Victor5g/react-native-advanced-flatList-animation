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
     
     const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

     const scale = scrollX.interpolate({
        inputRange,
        outputRange:[0.8, 1.4, 0.8],
        extrapolate:'clamp'
     });

     const opacity = scrollX.interpolate({
      inputRange,
      outputRange:[0.4, 0.9, 0.4],
      extrapolate:'clamp'
   });

      return<Animated.View key={`indicator-${i}`} 
      style={{
        height:10,
        width: 10,
        borderRadius:5,
        backgroundColor:'#FFFF',
        margin:10,
        opacity,
        transform: [
          {
            scale
          }
        ]

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


const Square = ({scrollX})=>{
  const YOLO =Animated.modulo(Animated.divide(
    Animated.modulo(scrollX, width),
    new Animated.Value(width)
  ),1);

  const rotate = YOLO.interpolate({
    inputRange:[0, 0.5, 1],
    outputRange:['35deg', '0deg','35deg']

  })

  const translateX = YOLO.interpolate({
    inputRange:[0, 0.5, 1],
    outputRange:[0, -height, 0]

  })

  return (
  <Animated.View
  style={{
    width:height,
    height:height,
    backgroundColor: '#FFF',
    borderRadius:86,
    top: -height * 0.6,
    left: -height * 0.3,
    position:'absolute',
    transform: [
      {
      rotate,

    },{
      translateX
    }]

  }}>

  </Animated.View>
  )

}

export default function App() {

  const scrollX = useRef(new Animated.Value(0)).current;



  return (
    <View style={styles.container}>
    
    <StatusBar hidden />

    <Backdrop scrollx={scrollX}/>
     <Square scrollX={scrollX} />
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
           <Text style={{fontWeight:'300', color:'#FFF'}} >{item.description}</Text>
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
