import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";


const db = SQLite.openDatabase("notes.db");

const SAMPLE_NOTES = [
  {title: "Feed the elephant", done: false, id: "0"},
  {title: "Walk the elephant", done: false, id: "1"},
  {title: "Shower the elephant", done: false, id: "2"},
];

function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState(SAMPLE_NOTES);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "#fc6145",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  function addNote() {
    navigation.navigate("Add Screen");
    // let newNote = {
    //   title: "Sample new note",
    //   done: false,
    //   id: notes.length.toString(),
    // };
    // setNotes([...notes, newNote])
  }

  function renderItem({item}) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom:20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <Text>{item.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={notes} 
        renderItem={renderItem}>
      </FlatList>
    </View> 
  );
}

const InnerStack = createStackNavigator();

function NotesStack(){
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          headertitle: "Notes App",
          headerStyle: {
            backgroundColor: "#6fcacd",
            height: 100,
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowRadius: 5,
          },
          headerTintColor: "#f55",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
    </InnerStack.Navigator>
  );
}

function AddScreen({ navigation }){
  return (
    <View style={{ flex: 1, alignItems:"center", justifyContent: "center"}}>
      <Text>This is the add screen</Text>
      <TouchableOpacity
        style={{ 
          padding:10,
          backgroundColor: "orange",
          borderRadius: 5,
          marginTop: 30, 
        }}
        onPress={() => navigation.goBack()}
      >
        <Text>Dismiss</Text>
      </TouchableOpacity>
    </View>

  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" mode="modal">
        <Stack.Screen name="Notes Stack" component={NotesStack} />
        <Stack.Screen name="Add Screen" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8bdee0",
    alignItems: "center",
    justifyContent: "center",
  },
});
