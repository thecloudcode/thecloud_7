import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DataScreen from '../components/back/back';


const Stack = createStackNavigator();

function Back() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Data" component={DataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Back;
