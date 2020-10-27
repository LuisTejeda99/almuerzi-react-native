import React from "react";
import { Text, TextInput, StyleSheet, View, Button, Alert } from "react-native";
import useForm from "../hooks/useForm";
const Register = ({ navigation }) => {
  const initialState = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    fetch("https://serverless-rose-three.vercel.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(values),
    })
      .then((x) => x.text())
      .then((x) => {
        if (x === "El usuario se ha creado correctamente") {
          return Alert.alert("Éxito", x, [
            {
              text: "Ir al inicio",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
          ]);
        }
        Alert.alert("Error", x);
      });
  };

  const { subscribe, handleSubmit, inputs } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Registro </Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={inputs.email}
        onChangeText={subscribe("email")}
        autoCapitalize={"none"}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={inputs.password}
        onChangeText={subscribe("password")}
        secureTextEntry={true}
        autoCapitalize={"none"}
      />

      <View style={styles.button}>
        <Button title="Registrarse" onPress={handleSubmit} />
        <Button
          title="Volver al inicio"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "stretch",
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    marginBottom: 20,
  },
  margin: {
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    alignSelf: "stretch",
    marginHorizontal: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

Register.navigationOptions = { title: "Almuerzi" };

export default Register;
