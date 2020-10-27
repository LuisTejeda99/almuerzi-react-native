import React from "react";
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";
import useFetch from "../hooks/useFetch";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default ({ navigation }) => {
  const id = navigation.getParam("_id");
  const { loading, data } = useFetch(
    `https://serverless-rose-three.vercel.app/api/meals/${id}`
  );
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        {loading ? (
          <Text>Cargando...</Text>
        ) : (
          <>
            <Text> {data._id} </Text>
            <Text> {data.name} </Text>
            <Text> {data.desc} </Text>
            <View>
              <Button
                title="Aceptar"
                onPress={() => {
                  AsyncStorage.getItem("token").then((x) => {
                    if (x) {
                      fetch(
                        "https://serverless-rose-three.vercel.app/api/orders",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            authorization: x,
                          },
                          body: JSON.stringify({
                            meal_id: id,
                          }),
                        }
                      ).then(() => {
                        alert("La orden fue generada con éxito");
                        navigation.navigate("Meals");
                      });
                    }
                  });
                }}
              />
              <Button
                title="Cancelar"
                onPress={() => navigation.navigate("Meals")}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};
