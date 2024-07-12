import Colors from '@/src/constants/Colors'
import { Image, StyleSheet, Text, View } from 'react-native'
import products from '@/assets/data/products'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: products[0].image}} style={styles.image}/>
      {/* <Image src={products[0].image} style={styles.image}/> */}
      <Text style={styles.title}>{products[0].name}</Text>
      <Text style={styles.price}>${products[0].price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'red',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  }
});
