import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';

// const HomeScreen = () => {
//   return <Redirect href={'/allocations'} />;
// };

const HomeScreen = () => {
  return (
    <View>
        <Redirect href={'/allocations'}/>
    </View>
  )
}

export default HomeScreen;
