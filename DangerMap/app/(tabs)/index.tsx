import { Link } from "expo-router"; 
import { Text, View, StyleSheet} from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>DANGERRA MAP DEMO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#1e1e1e",
  },
  text:{
    color:"white",
  },
  button:{
    fontSize:20,
    textDecorationLine:"underline",
    color:"red",
  },
});

