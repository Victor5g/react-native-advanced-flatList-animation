
import { 
  Dimensions, 
  Animated, 
  View 
} from "react-native";

import { style } from './styles'

type typesIndicator = {
  scrollX:any,
  DATA:any
}

const { width } = Dimensions.get('screen');

export const Indicator=({scrollX, DATA}:typesIndicator) => {

  return (
  <View style={style.Container}>

     {
     DATA.map((_: any, i: number) => {
        let inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        let scale = scrollX.interpolate({
          inputRange,
          outputRange:[0.8, 1.4, 0.8],
          extrapolate:'clamp'
        });

        let opacity = scrollX.interpolate({
          inputRange,
          outputRange:[0.4, 0.9, 0.4],
          extrapolate:'clamp'
        });

  return(
  <Animated.View 
    key={`indicator-${i}`} 
    style={[
             style.Indicator,
             {
               opacity, 
               transform: [{scale}]
              }
            ]
          } 
    />)
    }
  )
    }
  </View>
  )
}