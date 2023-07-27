import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pick from '../components/back/imagepicker';
const Stack = createStackNavigator();

function Picker() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pick" component={Pick} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Picker;
