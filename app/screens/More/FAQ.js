import { View, useWindowDimensions, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import s from './styles';
import TextView from '@app/components/TextView';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import { getFaq } from '@app/services/userService';
import Loading from '@app/components/Loading';
import RenderHTML from 'react-native-render-html';

const FAQScreens = () => {
  const userSelector = useSelector((state) => state.user);
  const { faq } = userSelector;
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const [loading, setLoading] = useState(false);
  const [expandQuestion, setExpandQuestion] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(
    async (isrefreshing = false) => {
      try {
        if (isrefreshing) setIsRefreshing(true);
        setLoading(true);
        const result = await dispatch(getFaq());
        if (result) {
          if (isrefreshing) setIsRefreshing(false);
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderItem = useCallback(
    ({ item }) => {
      return expandQuestion !== item?.faq_id ? (
        <TouchableOpacity
          style={s.boxSection}
          onPress={() => {
            setExpandQuestion(item?.faq_id);
          }}>
          <View style={s.faqRow}>
            <TextView text={item?.faq_que} type={'body-one'} style={s.faqhead} />
            <SvgIcon svgs={svgs} name={'faqpluse-icon'} width={20} height={20} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={s.boxWhiteSec}>
          <TouchableOpacity
            style={s.bgprimary}
            onPress={() => {
              setExpandQuestion();
            }}>
            <TextView text={item?.faq_que} type={'body-one'} style={s.faqheadWhite} />
            <SvgIcon svgs={svgs} name={'faqminus-icon'} width={20} height={20} />
          </TouchableOpacity>
          <View style={s.captinBox}>
            <RenderHTML contentWidth={width} source={{ html: item?.faq_ans }} tagsStyles={s.tagsStyles} />
            {/* <TextView
              text={'જો આપ અંગ્રેજી ભાષા નથી જાણતા, તો કોઇની મદદ લઈ આ તમામ સૂચના ધ્યાનપૂર્વક સમજો.'}
              type={'body-one'}
              style={s.faqcaption}
            />
            <TextView
              text={'જો આપ અંગ્રેજી ભાષા નથી જાણતા, તો કોઇની મદદ લઈ આ તમામ સૂચના ધ્યાનપૂર્વક સમજો.'}
              type={'body-one'}
              style={s.faqcaptionLast}
            /> */}
          </View>
        </View>
      );
    },
    [expandQuestion, width],
  );

  return loading ? (
    <Loading />
  ) : (
    <View style={s.mainbg}>
      <View style={s.mainroot}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}
          keyExtractor={(item, index) => `FAQ_Item_${item?.faq_id}_index_${index}`}
          renderItem={renderItem}
          data={faq}
        />
        {/* <View style={s.boxSection}>
          <View style={s.faqRow}>
            <TextView text={'એપ કઈ ભાષામાં છે ? કયા મોબાઈલ માટે છે ?'} type={'body-one'} style={s.faqhead} />
            <SvgIcon svgs={svgs} name={'faqpluse-icon'} width={20} height={20} />
          </View>
        </View>
        <View style={s.boxWhiteSec}>
          <View style={s.bgprimary}>
            <TextView text={'વર્કશોપમાં શું આવશે ?'} type={'body-one'} style={s.faqheadWhite} />
            <SvgIcon svgs={svgs} name={'faqminus-icon'} width={20} height={20} />
          </View>
          <View style={s.captinBox}>
            <TextView
              text={'જો આપ અંગ્રેજી ભાષા નથી જાણતા, તો કોઇની મદદ લઈ આ તમામ સૂચના ધ્યાનપૂર્વક સમજો.'}
              type={'body-one'}
              style={s.faqcaption}
            />
            <TextView
              text={'જો આપ અંગ્રેજી ભાષા નથી જાણતા, તો કોઇની મદદ લઈ આ તમામ સૂચના ધ્યાનપૂર્વક સમજો.'}
              type={'body-one'}
              style={s.faqcaptionLast}
            />
          </View>
        </View>
        <View style={s.boxSection}>
          <View style={s.faqRow}>
            <TextView text={'એપ કઈ ભાષામાં છે ? કયા મોબાઈલ માટે છે ?'} type={'body-one'} style={s.faqhead} />
            <SvgIcon svgs={svgs} name={'faqpluse-icon'} width={20} height={20} />
          </View>
        </View>
        <View style={s.boxSection}>
          <View style={s.faqRow}>
            <TextView text={'એપ કઈ ભાષામાં છે ? કયા મોબાઈલ માટે છે ?'} type={'body-one'} style={s.faqhead} />
            <SvgIcon svgs={svgs} name={'faqpluse-icon'} width={20} height={20} />
          </View>
        </View>
        <View style={s.boxSection}>
          <View style={s.faqRow}>
            <TextView text={'એપ કઈ ભાષામાં છે ? કયા મોબાઈલ માટે છે ?'} type={'body-one'} style={s.faqhead} />
            <SvgIcon svgs={svgs} name={'faqpluse-icon'} width={20} height={20} />
          </View>
        </View>
        <View style={s.boxSection}>
          <View style={s.faqRow}>
            <TextView text={'એપ કઈ ભાષામાં છે ? કયા મોબાઈલ માટે છે ?'} type={'body-one'} style={s.faqhead} />
            <SvgIcon svgs={svgs} name={'faqpluse-icon'} width={20} height={20} />
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default FAQScreens;
