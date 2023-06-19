import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Image, TouchableOpacity, Platform, ActivityIndicator, Linking } from 'react-native';
import s from './styles';
import AppStyles from '../../styles/AppStyles';
import Button from '../../components/Button';
import TextView from '../../components/TextView';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../styles';
import screens from '@app/constants/screens';
import { CommonActions } from '@react-navigation/native';
import { logout } from '@app/services/authService';
import Icon from '@app/components/Icon';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import Modal from 'react-native-modalbox';
import { useDispatch, useSelector } from 'react-redux';
import AppAvtar from '@app/components/Avtar/AppAvtar';
import ConfirmationModal from '@app/components/ConfirmationModal';
import ImagePicker from 'react-native-image-crop-picker';
import { toastNotification } from '@app/helpers/helpers';
import { updateUserProfile } from '@app/services/userService';
import { CONTACT_TYPE, RESPONSE_STATUS, USER_STATUS_TYPE } from '@app/constants/constant';
import VersionNumber from 'react-native-version-number';
import HeaderButton from '@app/components/HeaderButton';
import InAppReview from 'react-native-in-app-review';
import { trackActivity } from '@app/services/analyticsService';

function MoreScreen({ navigation }) {
  const userSelector = useSelector((state) => state.user);
  const { currentUser, contactTypeList = [], appDetail } = userSelector;
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerRight: () => (
        <View style={s.headerIcons}>
          <Button textStyle={s.btnheadtext} style={s.btnhead} ButtonText={currentUser?.Marketing_Plan_Name} />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [currentUser?.Marketing_Plan_Name, navigation]);

  const onPressLogOut = useCallback(async () => {
    const mobileMo = currentUser?.User_Detail?.UserMobileNo;
    const result = await dispatch(logout());
    if (result) {
      trackActivity('more: user logout', { UserMobileNumber: mobileMo });
      onCloseLogoutModal();
      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: screens.AddNumber }] }));
    }
  }, [currentUser?.User_Detail?.UserMobileNo, dispatch, navigation, onCloseLogoutModal]);

  const onCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const onOpenMenu = useCallback(() => {
    setOpenMenu(true);
  }, []);

  const onCloseLogoutModal = useCallback(() => {
    setIsOpenLogoutModal(false);
  }, []);

  const onOpenLogoutModal = useCallback(() => {
    setIsOpenLogoutModal(true);
  }, []);

  const onUpdateUserProfile = useCallback(
    async (payload) => {
      setProfileLoading(true);
      const result = await dispatch(updateUserProfile(payload));
      if (result) {
        setProfileLoading(false);
      }
    },
    [dispatch],
  );

  const openFilePicker = useCallback(() => {
    try {
      ImagePicker.openPicker({
        width: 750,
        height: 560,
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        compressImageQuality: 0.8,
        cropping: true,
        multiple: false, //if you make it true then able to pick
        mediaType: 'photo',
        includeBase64: true,
      })
        .then(async (image) => {
          if (image) {
            const payload = {
              ...currentUser?.User_Detail,
              UserImage: image.data,
              IsImageUpdate: 1,
            };
            onUpdateUserProfile(payload);
          }
        })
        .catch((e) => {
          let permissionMsg =
            Platform.OS === 'ios'
              ? 'Cannot access images. Please allow access if you want to be able to select images.'
              : 'Required permission missing';
          if (e.message === 'Cannot find image data') {
            this.props.setOnboardingResponseError('Unsupportable image');
          } else if (e.message === permissionMsg) {
            toastNotification(
              'You need to grant permission to access photos in order to complete this operation. Please enable it from Settings',
            );
          } else {
            console.log('e', e);
          }
        });
    } catch (err) {
      console.log('err', err);
    }
  }, [currentUser?.User_Detail, onUpdateUserProfile]);

  const hasPaidUser = useMemo(() => {
    return currentUser?.User_Plan_Master?.length > 0;
  }, [currentUser?.User_Plan_Master?.length]);

  const isMyOrderEnable = useMemo(() => {
    if (!appDetail) return;
    return Number(appDetail?.AppDetail?.is_my_order_enable) === Number(RESPONSE_STATUS.SUCCESS);
  }, [appDetail]);

  const isPlanProductEnable = useMemo(() => {
    if (!appDetail) return;
    return Number(appDetail?.AppDetail?.is_plan_product_enable) === Number(RESPONSE_STATUS.SUCCESS);
  }, [appDetail]);

  const contact_type_list = useMemo(() => {
    if (!appDetail) return;
    return contactTypeList?.map((item, index) => {
      let menuShow = false;
      if (
        item?.contact_type_id === CONTACT_TYPE.FRANCHISE_ASK &&
        Number(appDetail?.AppDetail?.is_franchise_ask_enable) === 1
      ) {
        menuShow = true;
      } else if (
        item?.contact_type_id === CONTACT_TYPE.COUNSELING_ASK &&
        Number(appDetail?.AppDetail?.is_counseling_ask_enable) === 1
      ) {
        menuShow = true;
      } else if (
        item?.contact_type_id === CONTACT_TYPE.TRAINER_ASK &&
        Number(appDetail?.AppDetail?.is_trainer_ask_enable) === 1
      ) {
        menuShow = true;
      } else {
        menuShow = false;
      }
      return (
        menuShow && (
          <TouchableOpacity
            style={s.menulist}
            onPress={() => navigation.navigate(screens.CounsellingAsk, { item })}
            key={`contact_type_list_${item?.contact_type_id}_index_${index}`}>
            <View style={s.monurow}>
              <View style={s.iconBg8}>
                <SvgIcon svgs={svgs} name={'ask-icon'} width={16} height={16} />
              </View>
              <TextView text={item?.contact_type_name} style={s.listtext} />
            </View>
          </TouchableOpacity>
        )
      );
    }, []);
  }, [appDetail, contactTypeList, navigation]);

  const onPressRate = useCallback(() => {
    trackMoreActivity('more: rate us', 'I Love It!');
    InAppReview.isAvailable();
    InAppReview.RequestInAppReview()
      .then((hasFlowFinishedSuccessfully) => {
        if (hasFlowFinishedSuccessfully) {
          if (Platform.OS === 'android') {
            let appLink = 'https://play.google.com/store/apps/details?id=com.weapplinse.dreamchild';

            Linking.openURL(appLink);
          }
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [trackMoreActivity]);

  const trackMoreActivity = useCallback((activity, params) => {
    trackActivity(activity, params);
  }, []);

  useEffect(() => {
    trackActivity('view: more');
  }, []);

  const displayUserName = useMemo(() => {
    let name = currentUser?.User_Detail?.UserName;
    if (currentUser?.User_Detail?.UserMiddleName && currentUser?.User_Detail?.UserMiddleName?.trim() !== '') {
      name = `${name} ${currentUser?.User_Detail?.UserMiddleName || ''}`;
    }
    if (currentUser?.User_Detail?.UserLastName && currentUser?.User_Detail?.UserLastName?.trim() !== '') {
      name = `${name} ${currentUser?.User_Detail?.UserLastName || ''}`;
    }
    return name;
  }, [
    currentUser?.User_Detail?.UserLastName,
    currentUser?.User_Detail?.UserMiddleName,
    currentUser?.User_Detail?.UserName,
  ]);

  return (
    <>
      <View style={[AppStyles.root, AppStyles.rootListWithoutPadding]}>
        <ScrollView style={s.mainbg} showsVerticalScrollIndicator={false}>
          <View style={s.mainroot}>
            <View>
              <View>
                <View style={s.avtar}>
                  {profileLoading ? (
                    <ActivityIndicator size='large' color={colors.eminence} />
                  ) : (
                    <AppAvtar
                      Imgsrc={currentUser?.User_Detail?.UserImage}
                      Name={`${currentUser?.User_Detail?.UserName} ${currentUser?.User_Detail?.UserLastName}`}
                      Size={60}
                      TextType={'title'}
                    />
                  )}
                  <TouchableOpacity style={s.ProfileEdit} onPress={openFilePicker}>
                    <Icon name='edit-3' size={10} color={colors.white} style={s.btnicon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={s.rowview}>
                <TextView text={displayUserName} type={'head-line'} style={s.username} />
                <TouchableOpacity onPress={() => navigation.navigate(screens.UpdateProfile)}>
                  <Icon name='edit-3' size={20} color={colors.dimGray} style={s.btnicon} />
                </TouchableOpacity>
              </View>
              <TextView text={currentUser?.User_Detail?.UserEmail} type={'body-one'} style={s.gamiltext} />
            </View>
            <View style={s.userstatus}>
              <Button
                textStyle={s.btnStatustext}
                style={s.btnStatus}
                ButtonText={USER_STATUS_TYPE[currentUser?.User_Detail?.UserStatus]}
              />
            </View>
            <View style={s.allList}>
              <TextView text={'General'} type={'body'} style={s.default} />
              <TouchableOpacity
                style={s.menulist}
                onPress={() => {
                  trackMoreActivity('more: about us clicked');
                  navigation.navigate(screens.AboutUS);
                }}>
                <View style={s.monurow}>
                  <View style={s.iconBg}>
                    <SvgIcon svgs={svgs} name={'about-icon'} width={16} height={16} />
                  </View>
                  <TextView text={'About Us'} style={s.listtext} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.menulist}
                onPress={() => {
                  trackMoreActivity('more: contact us clicked');
                  navigation.navigate(screens.ContactUS);
                }}>
                <View style={s.monurow}>
                  <View style={s.iconBg2}>
                    <SvgIcon svgs={svgs} name={'call-icon'} width={16} height={16} />
                  </View>
                  <TextView text={'Contact Us'} style={s.listtext} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.menulist}
                onPress={() => {
                  onOpenMenu();
                }}>
                <View style={s.monurow}>
                  <View style={s.iconBg3}>
                    <SvgIcon svgs={svgs} name={'star-icon'} width={16} height={16} />
                  </View>
                  <TextView text={'Rate Us'} style={s.listtext} />
                </View>
              </TouchableOpacity>
              {isPlanProductEnable && (
                <TouchableOpacity
                  style={s.menulist}
                  onPress={() => {
                    trackMoreActivity('more: product & plan clicked');
                    navigation.navigate(screens.PremiumPlan);
                  }}>
                  <View style={s.monurow}>
                    <View style={[s.iconBg4, { backgroundColor: colors.bggreen }]}>
                      <Icon isFeather={true} name={'box'} color={colors.white} size={15} />
                    </View>
                    <TextView text={'Products & Plans'} style={s.listtext} />
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={s.menulist}
                // onPress={() => {
                //   Linking.openURL('https://wa.me/916356563262');
                // }}
                onPress={() => {
                  trackMoreActivity('more: chat with us clicked');
                  navigation.navigate(screens.ChatWithUs);
                }}>
                <View style={s.monurow}>
                  <View style={s.iconBg5}>
                    <SvgIcon svgs={svgs} name={'chat-icon'} width={16} height={16} />
                  </View>
                  <TextView text={'Chat with us'} style={s.listtext} />
                </View>
              </TouchableOpacity>
              {isMyOrderEnable && (
                <TouchableOpacity
                  style={s.menulist}
                  onPress={() => {
                    trackMoreActivity('more: my order clicked');
                    navigation.navigate(screens.MyOrders);
                  }}>
                  <View style={s.monurow}>
                    <View style={s.iconBg4}>
                      <SvgIcon svgs={svgs} name={'shop-icon'} width={16} height={16} />
                    </View>
                    <TextView text={'My Orders'} style={s.listtext} />
                  </View>
                </TouchableOpacity>
              )}
              {/* 
              <View style={s.menulist}>
                <View style={s.monurow}>
                  <View style={s.iconBg6}>
                    <SvgIcon svgs={svgs} name={'gift-icon'} width={16} height={16} />
                  </View>
                  <TextView text={'Gift this course'} style={s.listtext} />
                </View>
              </View> */}
              {!hasPaidUser && (
                <TouchableOpacity
                  style={s.menulist}
                  onPress={() => {
                    trackMoreActivity('more: change language clicked');
                    navigation.navigate(screens.ChangeLanguage);
                  }}>
                  <View style={s.monurow}>
                    <View style={s.iconBg7}>
                      <SvgIcon svgs={svgs} name={'earth-icon'} width={16} height={16} />
                    </View>
                    <TextView text={'Change Language'} style={s.listtext} />
                  </View>
                </TouchableOpacity>
              )}

              {contact_type_list}
            </View>
            <View style={s.allList}>
              <TextView text={'Other'} type={'body'} style={s.default} />
              <TouchableOpacity
                style={s.menulist}
                onPress={() => {
                  trackMoreActivity('more: privacy policy clicked');
                  navigation.navigate(screens.PrivacyPolicy);
                }}>
                <View style={s.monurow}>
                  <View style={s.iconBg9}>
                    <SvgIcon svgs={svgs} name={'privacy-icon'} width={16} height={16} />
                  </View>
                  <TextView text={'Privacy Policy'} style={s.listtext} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.menulist}
                onPress={() => {
                  trackMoreActivity('more: term and condition clicked');
                  navigation.navigate(screens.TermsCondition);
                }}>
                <View style={s.monurow}>
                  <View style={s.iconBgTermsAndCondition}>
                    <SvgIcon svgs={svgs} name={'termscondition-icon'} width={16} height={16} />
                  </View>
                  <TextView text={'Terms & Condition'} style={s.listtext} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.menulist}
                onPress={() => {
                  trackMoreActivity('more: faq clicked');
                  navigation.navigate(screens.FAQ);
                }}>
                <View style={s.monurow}>
                  <View style={s.iconBg10}>
                    <SvgIcon svgs={svgs} name={'faq-icon'} width={16} height={16} />
                  </View>
                  <TextView text={'FAQ'} style={s.listtext} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.menulist}
                onPress={() => {
                  trackMoreActivity('more: our parenting app clicked');
                  Linking.openURL('http://onelink.to/g6ej7s');
                }}>
                <View style={s.monurow}>
                  <View style={s.iconBg01}>
                    <SvgIcon svgs={svgs} name={'ourapp-icon'} width={16} height={16} />
                  </View>
                  <TextView text={'Our Parenting App'} style={s.listtext} />
                </View>
              </TouchableOpacity>
              {/* <View style={s.menulist}>
                <View style={s.monurow}>
                  <View style={s.iconBg02}>
                    <SvgIcon svgs={svgs} name={'and-icon'} width={16} height={16} />
                  </View>
                  <TextView text={'Start my App (after once she concived )'} style={s.listtext} />
                </View>
              </View> */}
              {/* <View style={s.menulist}>
                <View style={s.monurow}>
                  <View style={s.iconBg03}>
                    <SvgIcon svgs={svgs} name={'pause-icon'} width={16} height={16} />
                  </View>
                  <TextView text={'Pause App'} style={s.listtext} />
                </View>
              </View> */}
            </View>
            <Button style={s.btndefault} textStyle={s.logOutBtn} ButtonText={'Logout'} onPress={onOpenLogoutModal} />
            <View>
              <TextView text={`Version ${VersionNumber.appVersion}`} type={'caps-one'} style={s.versinText} />
            </View>
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        style={s.selectmodal}
        isOpen={openMenu}
        backdrop={true}
        entry={'center'}
        animationDuration={200}
        // easing={Easing.ease}
        backdropColor={'rgba(0, 0, 0, 0.3)'}
        coverScreen={true}
        backButtonClose={true}
        swipeArea={1}
        onClosed={onCloseMenu}>
        <View style={s.selectmodal}>
          <HeaderButton
            type={1}
            iconName={'x'}
            onPress={onCloseMenu}
            color={colors.dimGray}
            style={s.closeicon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <View style={s.modalroot}>
            <View style={s.imgrate}>
              <Image source={require('../../assets/img/rateus.png')} resizeMode='contain' style={s.rateusimg} />
            </View>
            <TextView text={'How do you like the app?'} type={'body-head'} style={s.modalHead} />
            <TextView
              text={
                'Your feedback helps us to make Dream Child Garbhsanskar app better, so let us know what you think.'
              }
              type={'body-head'}
              style={s.capsmodal}
            />
            <Button style={s.modalbtn} textStyle={s.modltextbtn} ButtonText='I Love It!' onPress={onPressRate} />
            <Button
              style={s.modalbtnSecond}
              textStyle={s.modltextbtnSec}
              ButtonText='It Needs Work'
              onPress={() => {
                trackMoreActivity('more: rate us', 'It Needs Work');
                onCloseMenu();
                navigation.navigate(screens.ChatWithUs, { message: 'Hello Dream Child Garbhsanskar Team' });
              }}
            />
          </View>
        </View>
      </Modal>
      <ConfirmationModal
        isOpen={isOpenLogoutModal}
        onClosed={onCloseLogoutModal}
        headerTitle={'Logout'}
        onPressCancel={onCloseLogoutModal}
        onPressConfirm={onPressLogOut}>
        <TextView text={'Are you sure want to Logout?'} type={'body-head'} style={s.captiontext} />
      </ConfirmationModal>
    </>
  );
}

export default MoreScreen;
