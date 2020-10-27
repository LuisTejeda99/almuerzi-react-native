import React from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  Alert,
  AsyncStorage,
} from "react-native";
import useForm from "../hooks/useForm";

const Login = ({ navigation }) => {
  const initialState = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    fetch("https://serverless-rose-three.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(values),
    })
      .then((x) => x.text())
      .then((x) => {
        try {
          return JSON.parse(x);
        } catch {
          throw x;
        }
      })
      .then((x) => {
        AsyncStorage.setItem("token", x.token);
        navigation.navigate("Meals");
      })
      .catch((e) => Alert.alert("Error", e));
  };

  const { subscribe, handleSubmit, inputs } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Iniciar Sesión </Text>

      <TextInput
        autoCapitalize={"none"}
        placeholder="Email"
        value={inputs.email}
        onChangeText={subscribe("email")}
        style={styles.input}
      />

      <TextInput
        autoCapitalize={"none"}
        placeholder="Password"
        value={inputs.password}
        onChangeText={subscribe("password")}
        style={styles.input}
        secureTextEntry={true}
      />

      <View style={styles.button}>
        <Button title="Iniciar sesión" onPress={handleSubmit} />
        <Button
          title="Registrarse"
          onPress={() => {
            navigation.navigate("Register");
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

Login.navigationOptions = { title: "Almuerzi" };

export default Login;
