import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../utils/COLORS';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const CartScreen = ({navigation}) => {
  const [cartList, setCartList] = useState([]);
  const [cartValue, setCartValue] = useState();

  useEffect(() => {
    AsyncStorage.getItem('cartList').then(value => {
      if (value !== null) {
        let data = JSON.parse(value);
        setCartList(data);
        let total = 0;
        data?.map(item => {
          total += Number(item.price);
        });
        setCartValue(total);
      }
    });
  }, [cartList]);

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/backArrow.png')}
            style={{height: 30, width: 30}}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
      </View>
    );
  };
  const onDeletePress = item => {
    let newData = cartList.filter(cart => {
      return cart?.id != item?.id;
    });
    setCartList(newData);
    AsyncStorage.setItem('cartList', JSON.stringify(newData));
  };
  const renderCartItem = ({item, index}) => {
    return (
      <View key={item?.id} style={styles.cartConntainer}>
        <Image
          source={{uri: item?.image}}
          style={{
            height: heightPercentageToDP(15),
            width: widthPercentageToDP(30),
          }}
          resizeMethod="resize"
          resizeMode="contain"
        />
        <View style={{width: '65%', marginLeft: 10, gap: 7}}>
          <Text style={[styles.productName]} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.priceText}>${item?.price}</Text>
          <TouchableOpacity onPress={() => onDeletePress(item)}>
            <Image
              source={require('../../assets/delete.png')}
              style={{
                height: 30,
                width: 30,
                alignSelf: 'flex-end',
              }}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      {renderHeader()}

      <FlatList
        data={cartList}
        keyExtractor={(index, item) => index?.toString()}
        renderItem={renderCartItem}
        showsHorizontalScrollIndicator={false}
      />

      <View
        style={{
          backgroundColor: COLORS.borderColorGray,
          margin: 20,
          padding: 20,
          gap: 5,
        }}>
        <View style={styles.flexRow}>
          <Text style={styles.subTitle}>Cart value</Text>
          <Text style={styles.subTitle}>{cartValue}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.subTitle}>Delivery</Text>
          <Text style={styles.subTitle}>$5.00</Text>
        </View>
        <View
          style={{height: 1, width: '100%', backgroundColor: COLORS.black}}
        />
        <View style={styles.flexRow}>
          <Text style={styles.title}>Total</Text>
          <Text style={styles.title}>${cartValue + 5}</Text>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '200',
    color: COLORS.black,
    opacity: 0.6,
    marginLeft: 10,
  },
  cartConntainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderBottomWidth: 0.5,
    borderColor: COLORS.borderColorGray,
    padding: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
    color: COLORS.black,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 14,
    color: COLORS.black,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
