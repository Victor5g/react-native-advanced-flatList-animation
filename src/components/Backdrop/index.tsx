import { 
  Dimensions, 
  Animated,
  StyleSheet
} from "react-native";

type typesBackdrop = {
  scrollX:any,
  bgs:Array<string>
}

const { width } = Dimensions.get('screen');

export const Backdrop =({scrollX, bgs}:typesBackdrop) => {
  
  const backgroundColor = scrollX.interpolate({
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
/>
);
}