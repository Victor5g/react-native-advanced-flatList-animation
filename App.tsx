import { 
  StatusBar, 
  View, 
  StyleSheet, 
} from 'react-native';

import { Onboarding } from './src/screens/Onboarding';

export default function App() {
  return (
    <View style={styles.container}>
        <StatusBar hidden />
      <Onboarding/>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
