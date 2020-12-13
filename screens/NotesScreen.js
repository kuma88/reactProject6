import React, { useEffect, useState } from "react";
import {StyleSheet,Text,View,TouchableOpacity,FlatList,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

// const SAMPLE_NOTES = [
//   { title: "Feed the elephant", done: false, id: "0" },
//   { title: "Walk the elephant", done: false, id: "1" },
//   { title: "Shower the elephant", done: false, id: "2" },
// ];

const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);

  //This is to set up database , first run
  useEffect(() => {
    db.transaction( (tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS notes
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          done INT)
        `
      );
    });
  }, []);

  // This is to set up the top right button
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

  // Monitor route.params for changes
  useEffect(() => {
    if (route.params?.text) {
      const newNote = {
        title: route.params.text,
        done: false,
        id: notes.length.toString(),
      };
      setNotes([...notes, newNote]);
    }
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Screen");
    // let newNote = {
    //   title: "Sample new note",
    //   done: false,
    //   id: notes.length.toString(),
    // };
    // setNotes([...notes, newNote])
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
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
        renderItem={renderItem}
      />
    </View>
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
