import RoundButton from '@app/components/RoundButton';
import TextView from '@app/components/TextView';
import { isIOS } from '@app/constants/constant';
import { fromBase64 } from '@app/helpers/helpers';
import { colors } from '@app/styles';
import React from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import s from './styles';

const Infomation = ({ onCloseModal, data }) => {
  const { width } = useWindowDimensions();
  return (
    <KeyboardAvoidingView style={s.keybordWrapper} behavior={isIOS && 'padding'}>
      <View style={s.modalWrapper}>
        <Text style={s.closeModal} onPress={onCloseModal}></Text>
        <View style={s.rectView}></View>
        <View style={s.modalBox}>
          <View style={s.modalHeader}>
            <TextView style={s.modalTitle} type={'body-two'} text={data?.object_name} />
            <RoundButton
              onPress={onCloseModal}
              style={s.closeIcon}
              icon={'x'}
              size={24}
              iconSize={18}
              isFeatherIcon={true}
              iconColor={colors.white}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity>
              <RenderHTML
                contentWidth={width}
                source={{ html: fromBase64(data?.object_info) }}
                tagsStyles={s.tagStyles}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Infomation;
