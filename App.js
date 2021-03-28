import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { Images, Colors } from './App/Themes'
import APIRequest from './App/Config/APIRequest'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Plants from './App/Components/Plants'
import Search from './App/Components/Search'
import Logo from './App/Components/Logo'


const Tab = createBottomTabNavigator();
export default function App() {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="listing" component={PlantStack}/>
        <Tab.Screen name="settings" component={SettingsTab}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


//Plant Tab
const Stack = createStackNavigator();
function PlantStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="listing" component={ListingScreen}/>
      <Stack.Screen name="details" component={DetailsScreen}/>
    </Stack.Navigator>
  );
}

//Listing Screen
function ListingScreen({route, navigation}){
  console.log("I did something")

  const [loading, setLoading] = useState(false);
  const [plants, setPlants] = useState([]);
  const [searchPlantTerm] = useState("");
  const [searchSpeciesTerm] = useState("");

  // retrieve lists of plants
  const loadPlants = async (plantSearch = '', plantFilter = '') => {
    setLoading(true);
    setPlants([]);
    let results = [];
    // if there is no search term, then get list of plants
    if (plantSearch !== '') {
      results = await APIRequest.requestSearchPlants(plantSearch);
    } else {
      results = await APIRequest.requestPlantList(plantFilter);
    }
    console.log(results);
    setLoading(false);
    setPlants(results);
  }

  useEffect(() => { loadPlants() }, []);

  let contentDisplayed = null;

  if (loading) {
    contentDisplayed = (
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large" color="black" />
    )
  } else {
    contentDisplayed = <Plants plants={plants} navigation={navigation}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Search getQuery={loadPlants} />
      <View style={{ flex: 7 }}>
        {contentDisplayed}
      </View>

    </SafeAreaView>
  );
}

//Details Screen
function DetailsScreen({route, navigation}){
  const{plant} = route.params;
  console.log(plant)

  return(
    <View>
      <Text>Details</Text>
    </View>
  );
  //Text Items that display the following info

  //Common Name
  //Scientific Name
  //Family
  //Genus
  //The Image
  //year


}



//Settings Tab
function SettingsTab({route, navigation}){

  return(
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
  //Checkbox for filter Vegetable
  //Checkbox for filter Edible
  //Picker for Flower Color
  //Drop down list for Fruit Color
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
