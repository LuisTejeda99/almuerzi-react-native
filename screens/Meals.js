import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import ListItem from "../components/ListItem";
import useFetch from "../hooks/useFetch";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  list: {
    alignSelf: "stretch",
  },
});

const Meals = ({ navigation }) => {
  const { loading, data } = useFetch(
    "https://serverless-rose-three.vercel.app/api/meals"
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(x) => x._id}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => navigation.navigate("Modal", { _id: item._id })}
              name={item.name}
            />
          )}
        />
      )}
    </View>
  );
};

Meals.navigationOptions = {
  title: "Comidas disponibles",
};

export default Meals;
