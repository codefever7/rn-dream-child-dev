import { View, Image, Platform, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import s from './styles';
import HeaderButton from '@app/components/HeaderButton';
import screens from '@app/constants/screens';
import { colors } from '@app/styles';
import TextView from '@app/components/TextView';
import AppStyles from '@app/styles/AppStyles';
import { TextInput } from 'react-native-paper';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail, isStirng, toastNotification } from '@app/helpers/helpers';
import { addContactInquiry } from '@app/services/userService';

const CounsellingAskScreens = ({ route, navigation }) => {
  const { item } = route.params;
  const userSelector = useSelector((state) => state.user);
  const { currentUser, loading } = userSelector;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            onPress={() => navigation.navigate(screens.More)}
            color={colors.dimGray}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={item?.contact_type_name} type={'body-two'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [item?.contact_type_name, navigation]);

  const onSubmit = useCallback(async () => {
    let err_message;
    if (!name || name?.trim() === '') {
      err_message = 'Name is required';
    } else if (name && !isStirng(name)) {
      err_message = 'Please enter only english alphabet';
    } else if (!email || email?.trim() === '') {
      err_message = 'Email is required';
    } else if (!isEmail(email)) {
      err_message = 'Please enter valid email';
    } else if (!message) {
      err_message = 'Message is required';
    }
    if (err_message) {
      toastNotification(err_message);
      return;
    }
    const payload = {
      ContactTypeId: item?.contact_type_id,
      MobileNo: currentUser?.User_Detail?.UserMobileNo,
      ContactPersonName: name,
      Message: message,
      EmailId: email,
    };
    const result = await dispatch(addContactInquiry(payload));
    if (result) {
      navigation.goBack();
    }
  }, [currentUser?.User_Detail?.UserMobileNo, dispatch, email, item?.contact_type_id, message, name, navigation]);

  return (
    <View style={s.mainbg}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.mainrootask}>
          <View style={s.imgview}>
            <Image style={s.imgcounselling} source={require('../../assets/img/counselling.png')} resizeMode='contain' />
          </View>
          <TextView
            text={'Leave us a message, we will get contact you as soon as possible.'}
            type={'body'}
            style={s.counselltext}
          />
          <View style={s.inputlist}>
            <View style={s.inputview}>
              <TextInput
                dense={true}
                theme={{ roundness: 6 }}
                style={s.inputstyle}
                mode='outlined'
                label='Name *'
                placeholder='Enter your first name'
                selectionColor={colors.primary}
                outlineColor={colors.borderColor}
                activeOutlineColor={colors.primary}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            </View>
            <View style={s.inputview}>
              <TextInput
                dense={true}
                theme={{ roundness: 6 }}
                style={s.inputstyle}
                mode='outlined'
                label='Email Address *'
                placeholder='Enter Your Email Address'
                selectionColor={colors.primary}
                outlineColor={colors.borderColor}
                activeOutlineColor={colors.primary}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
            </View>
            <View style={s.inputview}>
              <TextInput
                dense={true}
                theme={{ roundness: 6 }}
                style={s.inputtextarea}
                multiline={true}
                numberOfLines={4}
                mode='outlined'
                label='Message *'
                placeholder='What do you want to tell us about'
                selectionColor={colors.primary}
                outlineColor={colors.borderColor}
                activeOutlineColor={colors.primary}
                value={message}
                onChangeText={(text) => {
                  setMessage(text);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={s.btnbttomview}>
        <Button style={s.btn} onPress={onSubmit} isLoading={loading} disabled={loading}>
          <TextView style={s.btntext} type={'body-head'} text='Submit' />
          <Icon name='chevron-right' size={24} color={colors.white} style={s.btnicon} />
        </Button>
      </View>
    </View>
  );
};

export default CounsellingAskScreens;
