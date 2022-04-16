import { 
  Dimensions, 
  Animated,
} from "react-native";

type typesSquare ={
  scrollX:any
}

const {width, height} = Dimensions.get('screen');
import { style } from "./styles";

export const Square = ({scrollX}:typesSquare)=>{

  let YOLO =Animated.modulo(Animated.divide(
    Animated.modulo(scrollX, width),
    new Animated.Value(width)
  ),1);

  let rotate = YOLO.interpolate({
    inputRange:[0, 0.5, 1],
    outputRange:['35deg', '0deg','35deg']
  });

  let translateX = YOLO.interpolate({
    inputRange:[0, 0.5, 1],
    outputRange:[0, -height, 0]
  });

  return (
  <Animated.View
  style={
    [style.Container,
      {
        width:height,
        height:height,
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [{rotate,},{translateX}]
      } 
    ]
  }>
  </Animated.View>
  )
}