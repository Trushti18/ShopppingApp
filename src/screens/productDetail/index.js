import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/COLORS';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetail = ({route, navigation}) => {
  let productInfo = route?.params?.item;

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
        <View style={{flexDirection: 'row', gap: 5}}>
          <TouchableOpacity
            onPress={() =>
              Share.share({
                message: productInfo?.image,
              })
            }>
            <Image
              source={require('../../assets/share.png')}
              style={{height: 30, width: 30}}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('cart')}>
            <Image
              source={require('../../assets/cart.png')}
              style={{height: 30, width: 30}}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onAddCart = () => {
    AsyncStorage.getItem('cartList').then(value => {
      if (value === null) {
        AsyncStorage.setItem('cartList', JSON.stringify([productInfo]));
      } else {
        let oldData = JSON.parse(value);
        let data = [...oldData, productInfo];
        AsyncStorage.setItem('cartList', JSON.stringify(data));
      }
    });
  };

  return (
    <View style={styles.mainContainer}>
      {renderHeader()}
      <ScrollView>
        <Image
          source={{uri: productInfo?.image}}
          style={{height: heightPercentageToDP(60), width: '100%'}}
          resizeMethod="resize"
          resizeMode="contain"
        />

        <View style={styles.headerContainer}>
          <View style={{width: '65%'}}>
            <Text style={styles.title} numberOfLines={1}>
              {productInfo?.title}
            </Text>
            <Text style={styles.subTitle}>${productInfo?.price}</Text>
          </View>
          <View style={styles.ratingConatiner}>
            <Image
              source={require('../../assets/star.png')}
              style={{height: 15, width: 15, marginRight: 5}}
              resizeMethod="resize"
              resizeMode="contain"
            />
            <Text style={styles.count}>{`${productInfo?.rating?.rate} `}|</Text>
            <Text style={styles.count}>{` ${productInfo?.rating?.count}`}</Text>
          </View>
        </View>
        <Text style={styles.description}>{productInfo?.description}</Text>

        <TouchableOpacity style={styles.buttonContainer} onPress={onAddCart}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  subTitle: {
    opacity: 0.7,
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    color: COLORS.black,
  },
  ratingConatiner: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary5,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  count: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14,
    color: COLORS.primary,
  },
  description: {
    opacity: 0.5,
    fontSize: 14,
    fontWeight: '100',
    lineHeight: 14,
    color: COLORS.black,
    marginHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: COLORS.primary5,
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPercentageToDP(8),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
