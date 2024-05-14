import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../utils/COLORS';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
let Category = [
  'All',
  'Electronics',
  'Jewelery',
  "Men's clothing",
  "Women's clothing",
];
const HomeScreen = ({navigation}) => {
  const [selectedCategory, setselectedCategory] = useState(Category[0]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => {
        setLoading(false);
        setProductList(json);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.categoryContainer,
          {
            backgroundColor:
              selectedCategory === item ? COLORS.primary5 : COLORS.white,
            borderColor:
              selectedCategory === item
                ? COLORS.primary
                : COLORS.borderColorGray,
          },
        ]}
        onPress={() => setselectedCategory(item)}>
        <Text
          style={[
            styles.categoryHeading,
            {
              color: selectedCategory === item ? COLORS.primary : COLORS.black,
            },
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProductItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        key={index}
        onPress={() => {
          navigation.navigate('productDetail', {
            item: item,
          });
        }}>
        <Image
          source={{uri: item.image}}
          style={styles.image}
          resizeMethod="resize"
          resizeMode="contain"
        />
        <View style={{marginVertical: 5}}>
          <Text style={styles.productName} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.productPrice}>${item?.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{marginTop: 20, marginVertical: 10}}>
        <FlatList
          horizontal
          data={Category}
          keyExtractor={(index, item) => index?.toString()}
          renderItem={renderCategoryItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {!loading ? (
        <View style={{marginHorizontal: 10}}>
          <FlatList
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            data={productList}
            keyExtractor={(index, item) => index?.toString()}
            renderItem={renderProductItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: 'blue',
  },
  categoryHeading: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  image: {
    height: heightPercentageToDP(20),
    width: widthPercentageToDP(45),
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.black,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.black,
  },
  productContainer: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: COLORS.borderColorGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Adjust this value to add space between items vertically
    marginRight: 10,
  },
});
