import { Platform, View, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import s from './styles';
import TextView from '@app/components/TextView';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';
import AppStyles from '@app/styles/AppStyles';
import Icon from '@app/components/Icon';
import Button from '@app/components/Button';
import { currencyWithDecimal, fromBase64 } from '@app/helpers/helpers';
import RenderHTML from 'react-native-render-html';

const AddProductScreen = ({ route, navigation }) => {
  const { params } = route;
  const { ProductList, AddedProductList } = params;
  const { width } = useWindowDimensions();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    setSelectedProducts(AddedProductList);
  }, [AddedProductList]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.goBack()}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'Add Product'} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const onPressSelectProduct = useCallback(
    (item) => {
      const products = JSON.parse(JSON.stringify(selectedProducts)) || [];
      products?.push(item);
      setSelectedProducts(products);
    },
    [selectedProducts],
  );

  const onPressAddProduct = useCallback(() => {
    const { onAddProduct } = params;
    if (onAddProduct) onAddProduct(selectedProducts);
    navigation.goBack();
  }, [navigation, params, selectedProducts]);

  const renderItem = useCallback(
    ({ item }) => {
      const selected = selectedProducts?.find((x) => x.product_id === item?.product_id);
      let description = fromBase64(item?.product_Description);
      return (
        <View style={s.boxview}>
          <View style={s.rowlist}>
            <TextView text={` ${item?.product_title}`} type={'body-head'} style={s.addHeadText} />
            {selected ? (
              <SvgIcon svgs={svgs} name={'check-right'} width={18} height={18} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  onPressSelectProduct(item);
                }}>
                <SvgIcon svgs={svgs} name={'uncheck-right'} width={18} height={18} />
              </TouchableOpacity>
            )}
          </View>
          <View style={s.spaceTop}>
            <RenderHTML contentWidth={width} source={{ html: description }} tagsStyles={s.tagstyles} />
          </View>

          <View style={s.priceview}>
            <TextView
              text={`₹ ${currencyWithDecimal(item?.final_data?.final_price)}`}
              type={'button-text'}
              style={s.prize}
            />
          </View>
        </View>
      );
    },
    [onPressSelectProduct, selectedProducts, width],
  );

  return (
    <>
      <View style={s.mainbg}>
        <View style={s.mainroot}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `{token_${item?.product_id}_index_${index}}`}
            renderItem={renderItem}
            data={ProductList}
            ListEmptyComponent={<TextView text={'No list found!'} type='body' style={s.emptyText} />}
          />
        </View>
        <View style={AppStyles.footerWrapper}>
          <Button style={s.btn} onPress={onPressAddProduct}>
            <TextView text={'Add Product'} style={s.btntext} type={'body-head'} />
            <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
          </Button>
        </View>
      </View>
    </>
  );
};

export default AddProductScreen;
