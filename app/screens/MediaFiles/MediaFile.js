import {
  View,
  Platform,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Linking,
  FlatList,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AppStyles from '@app/styles/AppStyles';
import HeaderButton from '@app/components/HeaderButton';
import { colors } from '@app/styles';
import s from './styles';
import TextView from '@app/components/TextView';
import WebView from 'react-native-webview';
import { CONTENT_TYPE, CONTENT_TYPE_TITLE, RESPONSE_STATUS, USER_STATUS } from '@app/constants/constant';
import RenderHTML from 'react-native-render-html';
import { downloadFile, fromBase64, getParameters, isEmpty, toastNotification } from '@app/helpers/helpers';
import { addQuestionActivityDoneReport, checkQuestionActivityDone } from '@app/services/planService';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modalbox';
import Infomation from './Infomation';
import ScreenCaptureSecure from 'react-native-screen-capture-secure';
import { PERMISSIONS, request } from 'react-native-permissions';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-blob-util';
import YoutubePlayer from '@app/components/YoutubePlayer';
import Orientation from 'react-native-orientation-locker';
import Pdf from 'react-native-pdf';
import ImageViewer from 'react-native-image-zoom-viewer';
import Loading from '@app/components/Loading';
import { trackActivity } from '@app/services/analyticsService';

const MediaFileScreens = ({ route, navigation }) => {
  const { item, onDoneActivity } = route.params;
  const planSelector = useSelector((state) => state.plan);
  const { questionActivity } = planSelector;
  const [isActivityDoneSucess, setIsActivityDoneSucess] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  const userSelector = useSelector((state) => state.user);
  const { currentUser } = userSelector;

  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const onCloseInfoModal = useCallback(() => {
    setIsInfoModalVisible(false);
  }, []);

  const onOpenInfoModal = useCallback(() => {
    setIsInfoModalVisible(true);
  }, []);

  const isDemo = useMemo(() => {
    return Number(item?.IsDemo) === Number(RESPONSE_STATUS.SUCCESS);
  }, [item?.IsDemo]);

  const isFileDownload = useMemo(() => {
    return Number(item?.is_file_download) === Number(RESPONSE_STATUS.SUCCESS);
  }, [item?.is_file_download]);

  const isFileShare = useMemo(() => {
    return Number(item?.is_file_share) === Number(RESPONSE_STATUS.SUCCESS);
  }, [item?.is_file_share]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerRight: () => {
        let url;
        if (Number(item?.content_type_id) === CONTENT_TYPE.IMAGE) {
          url = item?.content_image[imageIndex];
        } else if (Number(item?.content_type_id) === CONTENT_TYPE.PDF) {
          url = item?.content_pdf;
        }
        let fileInfo;
        if (item?.object_info) fileInfo = fromBase64(item?.object_info);
        return (
          <View style={{ flexDirection: 'row' }}>
            {isFileShare && (
              <HeaderButton
                type={1}
                iconName={'share-2'}
                color={colors.dimGray}
                style={s.fileHeaderIcon}
                onPress={() => {
                  onShare(item?.content_type_id, url);
                }}
                isFeather={Platform.OS === 'ios' ? false : true}
              />
            )}
            {isFileDownload && (
              <HeaderButton
                type={1}
                iconName={'download'}
                color={colors.dimGray}
                style={s.fileHeaderIcon}
                onPress={() => {
                  if (Platform.OS === 'ios') {
                    onShare(item?.content_type_id, url);
                  } else {
                    onPressDownloadFile(url);
                  }
                }}
                isFeather={Platform.OS === 'ios' ? false : true}
              />
            )}
            {!isEmpty(fileInfo) ? (
              <HeaderButton
                type={1}
                iconName={'alert-circle'}
                color={colors.dimGray}
                style={s.fileHeaderIcon}
                isFeather={Platform.OS === 'ios' ? false : true}
                onPress={onOpenInfoModal}
              />
            ) : null}
          </View>
        );
      },
      headerLeft: () => {
        let fileInfo;
        let textWidth = 280;
        if (item?.object_info) fileInfo = fromBase64(item?.object_info);
        if (isFileDownload || isFileShare || !isEmpty(fileInfo)) {
          textWidth = 230;
        }
        if (isFileDownload && isFileShare && !isEmpty(fileInfo)) {
          textWidth = 180;
        }
        return (
          <View style={s.headerIcons}>
            <HeaderButton
              type={1}
              iconName={'chevron-left'}
              onPress={navigation.goBack}
              color={colors.dimGray}
              style={s.addIcon}
              isFeather={Platform.OS === 'ios' ? false : true}
            />
            <TextView
              text={item?.object_name}
              type={'body-two'}
              numberOfLines={2}
              style={[s.headtext, { width: textWidth }]}
            />
          </View>
        );
      },
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [
    imageIndex,
    isFileDownload,
    isFileShare,
    item,
    item?.content_pdf,
    item?.content_type_id,
    item?.object_info,
    item?.object_name,
    navigation,
    onOpenInfoModal,
    onPressDownloadFile,
    onShare,
  ]);

  const loadData = useCallback(async () => {
    if (
      Number(item?.is_activity) === Number(RESPONSE_STATUS.SUCCESS) &&
      Number(currentUser?.User_Detail?.UserStatus) === Number(USER_STATUS.PREGNANT)
    ) {
      const payload = {
        FileId: item?.object_id,
        LanguageId: item?.language_id,
        PlanId: item?.PlanId,
        ActivityDay: item?.ActivityDay,
        PastActivityDay: item?.PastActivityDay,
        user_daily_work_flow: item?.user_daily_work_flow,
        plan_map_id: item?.plan_map_id,
      };
      await dispatch(checkQuestionActivityDone(payload));
    }
  }, [
    currentUser?.User_Detail?.UserStatus,
    dispatch,
    item?.ActivityDay,
    item?.PastActivityDay,
    item?.PlanId,
    item?.is_activity,
    item?.language_id,
    item?.object_id,
    item?.plan_map_id,
    item?.user_daily_work_flow,
  ]);

  useEffect(() => {
    let type = item?.plan_name;
    if (isDemo) {
      type = `demo ${item?.plan_name}`;
    }
    trackActivity('view: file', {
      type: type,
      title: item?.object_name,
      content: CONTENT_TYPE_TITLE[item?.content_type_id],
      language: currentUser?.User_Detail?.language_name,
    });
    loadData();
  }, [
    currentUser?.User_Detail?.language_name,
    isDemo,
    item?.content_type_id,
    item?.object_name,
    item?.plan_name,
    loadData,
  ]);

  const onPressDownloadFile = useCallback((url) => {
    let permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY;
    }
    request(permission).then((result) => {
      if (result === 'granted') {
        downloadFile(url);
      }
    });
  }, []);

  const footerComponent = useCallback(
    (currentIndex) => {
      const length = item?.content_image?.length || 0;
      const index = item?.content_image?.length > 0 ? currentIndex + 1 : 0;
      return (
        <SafeAreaView>
          {Number(item?.is_activity) === Number(RESPONSE_STATUS.SUCCESS) &&
            currentIndex === item?.content_image?.length - 1 && (
              <ActivityDone
                is_activity_done={questionActivity?.is_activity_done}
                isActivityDoneSucess={isActivityDoneSucess}
              />
            )}
          <View style={s.pageslide}>
            <View style={s.bgview}>
              <TextView text={`${index}`} type={'caption'} style={s.pagenumb} />
            </View>
            <TextView text={'Out of'} type={'caption'} style={s.midtext} />
            <View style={s.bgview}>
              <TextView text={length} type={'caption'} style={s.pagenumb} />
            </View>
          </View>
        </SafeAreaView>
      );
    },
    [isActivityDoneSucess, item?.content_image, item?.is_activity, questionActivity?.is_activity_done],
  );

  const loadingComponent = useCallback(() => {
    return (
      <View>
        <Loading />
      </View>
    );
  }, []);

  const onShare = useCallback(
    (type, url) => {
      let imagePath = null;
      let base64Type, shareOptions;
      const { config, fs } = RNFetchBlob;
      switch (Number(type)) {
        case CONTENT_TYPE.VIDEO:
        case CONTENT_TYPE.WEB:
          shareOptions = {
            message: item?.content_data,
          };
          Share.open(shareOptions)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              err && console.log('err', err);
            });
          break;
        case CONTENT_TYPE.IMAGE:
        case CONTENT_TYPE.PDF:
          if (Number(type) === CONTENT_TYPE.IMAGE) {
            base64Type = `image/png`;
          } else if (Number(type) === CONTENT_TYPE.PDF) {
            let filetype = item?.content_pdf?.substring(item?.content_pdf?.lastIndexOf('.') + 1);
            base64Type = `application/${filetype}`;
          }
          toastNotification('Please wait...', false);
          config({
            fileCache: true,
          })
            .fetch('GET', url)
            // the image is now dowloaded to device's storage
            .then((resp) => {
              imagePath = resp.path();
              return resp.readFile('base64');
            })
            .then((base64Data) => {
              // here's base64 encoded image
              var imageUrl = 'data:' + base64Type + ';base64,' + base64Data;
              let shareImage = {
                url: imageUrl,
                filename: item?.object_name,
              };
              Share.open(shareImage)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  err && console.log('err', err);
                });
              // remove the file from storage
              return fs.unlink(imagePath);
            });
          break;
        default:
          break;
      }
    },
    [item?.content_data, item?.content_pdf, item?.object_name],
  );

  const onPressDoneActivity = useCallback(async () => {
    const payload = {
      LanguageId: item?.language_id,
      FileId: item?.object_id,
      IsQuestionDone: 0,
      ProgressTypeId: item?.progress_type_id,
      ActivityPoints: item?.activity_points,
      IsActivityDone: item?.is_activity,
      PlanId: item?.PlanId,
      ActivityDay: item?.ActivityDay,
      user_daily_work_flow: item?.user_daily_work_flow,
      plan_map_id: item?.plan_map_id,
    };
    const result = await dispatch(addQuestionActivityDoneReport(payload));
    if (result) {
      trackActivity('activity marked as done', { title: item?.object_name });
      if (onDoneActivity) onDoneActivity();
      loadData();
      setIsActivityDoneSucess(true);
    }
  }, [
    dispatch,
    item?.ActivityDay,
    item?.PlanId,
    item?.activity_points,
    item?.is_activity,
    item?.language_id,
    item?.object_id,
    item?.object_name,
    item?.plan_map_id,
    item?.progress_type_id,
    item?.user_daily_work_flow,
    loadData,
    onDoneActivity,
  ]);

  const ActivityDone = useCallback(
    ({ is_activity_done, isActivityDoneSucess }) => {
      return (
        <View style={s.btmview}>
          {Number(is_activity_done) === Number(RESPONSE_STATUS.SUCCESS) ? (
            <Image style={s.primaryimg} source={require('../../assets/img/primaryright.png')} />
          ) : (
            Number(currentUser?.User_Detail?.UserStatus) === Number(USER_STATUS.PREGNANT) &&
            Number(item?.ActivityDay) === Number(item?.PastActivityDay) && (
              <TouchableOpacity style={s.iconRight} onPress={onPressDoneActivity}>
                <Image style={s.rightimg} source={require('../../assets/img/right.png')} />
              </TouchableOpacity>
            )
          )}
          {isActivityDoneSucess && (
            <View style={s.textview}>
              <TextView text={'Congratulation'} type={'body'} style={s.congtext} />
              <TextView text={'You`ve done activity successfully'} type={'body'} style={s.captiontext} />
            </View>
          )}
        </View>
      );
    },
    [currentUser?.User_Detail?.UserStatus, item?.ActivityDay, item?.PastActivityDay, onPressDoneActivity],
  );

  const onChangeFullscreen = useCallback(
    (isFullscreen) => {
      if (isFullscreen) {
        StatusBar.setHidden(true);
        navigation.setOptions({ headerShown: false });
      } else {
        navigation.setOptions({ headerShown: true });
        StatusBar.setHidden(false);
      }
    },
    [navigation],
  );

  useEffect(() => {
    if (Number(item?.content_type_id) !== CONTENT_TYPE.VIDEO) {
      ScreenCaptureSecure.enableSecure();
    }
    return () => {
      StatusBar.setHidden(false);
      Orientation.lockToPortrait();
      ScreenCaptureSecure.disableSecure();
    };
  }, [item?.content_type_id]);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={s.cardWraper}>
          <View style={s.imageBox}>
            <Image style={s.mulitiImg} source={{ uri: item?.attachments_image[0] }} resizeMode='cover' />
          </View>
          <View style={s.textWrap}>
            <RenderHTML
              contentWidth={width}
              source={{ html: fromBase64(item?.attachments_text) }}
              tagsStyles={s.imageTextTagsStyles}
            />
          </View>
        </View>
      );
    },
    [width],
  );

  const renderMediaFile = useMemo(() => {
    let url = '';
    let videoId = '';
    let images = [];
    const type = item?.content_type_id;
    switch (Number(type)) {
      case CONTENT_TYPE.VIDEO:
        url = item?.content_data;
        if (item?.content_data?.startsWith('https://www.youtube.com')) {
          const params = getParameters(item?.content_data);
          if (params?.v) {
            videoId = params?.v;
          }
        } else if (item?.content_data?.startsWith('https://youtu.be/')) {
          videoId = item?.content_data?.replace('https://youtu.be/', '');
        }
        return (
          <>
            <View style={s.imgview}>
              {videoId ? (
                <YoutubePlayer
                  videoId={videoId}
                  loop
                  autoPlay
                  showFullScreenButton={true}
                  onFullScreen={onChangeFullscreen}
                  onStart={() => console.log('onStart')}
                  onEnd={() => alert('on End')}
                />
              ) : (
                <WebView
                  source={{ uri: url }}
                  allowsFullscreenVideo={true}
                  javaScriptEnabled={true}
                  setBuiltInZoomControls={false}
                  mediaPlaybackRequiresUserAction={
                    Platform.OS !== 'android' || Platform.Version >= 17 ? false : undefined
                  }
                  userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
                />
              )}
            </View>
            {/* <View style={s.videoPlayerTopBar}></View> */}
            {!isEmpty(item?.content_description) && (
              <View style={{ maxHeight: isActivityDoneSucess ? '40%' : '50%' }}>
                <SafeAreaView>
                  <ScrollView>
                    <RenderHTML
                      contentWidth={width}
                      source={{ html: fromBase64(item?.content_description) }}
                      tagsStyles={s.videoTextTagsStyles}
                    />
                  </ScrollView>
                </SafeAreaView>
              </View>
            )}
          </>
        );

      case CONTENT_TYPE.TEXT:
        return (
          <View style={s.textView}>
            <RenderHTML
              contentWidth={width}
              source={{ html: fromBase64(item?.content_data) }}
              tagsStyles={s.tagsStyles}
            />
          </View>
        );

      case CONTENT_TYPE.IMAGE:
        images = item?.content_image?.map((img) => {
          return {
            url: img,
          };
        });
        return (
          <ImageViewer
            imageUrls={images}
            saveToLocalByLongPress={false}
            renderFooter={footerComponent}
            renderIndicator={() => {}}
            loadingRender={loadingComponent}
            backgroundColor={'white'}
            onChange={(index) => {
              setImageIndex(index);
            }}
          />
        );
      case CONTENT_TYPE.PDF:
        return (
          <View style={s.root}>
            <View style={s.pdfview}>
              <Pdf
                source={{
                  uri: item?.content_pdf,
                }}
                onLoadComplete={(numberOfPages) => {
                  setNumberOfPages(numberOfPages);
                }}
                onPageChanged={(page) => {
                  setCurrentPage(page);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  Linking.openURL(uri);
                }}
                style={s.pdf}
                horizontal={true}
                trustAllCerts={false}
                enablePaging={true}
                renderActivityIndicator={() => {
                  return <Loading />;
                }}
              />
            </View>
            <View style={s.pageslide}>
              <View style={s.bgview}>
                <TextView text={currentPage} type={'caption'} style={s.pagenumb} />
              </View>
              <TextView text={'Out of'} type={'caption'} style={s.midtext} />
              <View style={s.bgview}>
                <TextView text={numberOfPages} type={'caption'} style={s.pagenumb} />
              </View>
            </View>
          </View>
        );
      case CONTENT_TYPE.WEB:
        return (
          <View style={s.root}>
            <WebView
              source={{ uri: item?.content_data }}
              allowsFullscreenVideo={true}
              javaScriptEnabled={true}
              setBuiltInZoomControls={false}
              userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
            />
          </View>
        );
      case CONTENT_TYPE.TEXT_WITH_IMAGE:
        return (
          <View style={s.root}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `Image_With_Text_Item_${item?.object_id}_index_${index}`}
              renderItem={renderItem}
              style={s.boxWrapper}
              data={item?.content_list}
              ListEmptyComponent={
                <View>
                  <TextView text={'Data not Found'} type={'body-head'} style={s.headText} />
                </View>
              }
            />
          </View>
        );
      default:
        break;
    }
  }, [
    currentPage,
    footerComponent,
    isActivityDoneSucess,
    item?.content_data,
    item?.content_description,
    item?.content_image,
    item?.content_list,
    item?.content_pdf,
    item?.content_type_id,
    loadingComponent,
    numberOfPages,
    onChangeFullscreen,
    renderItem,
    width,
  ]);

  return (
    <>
      <View style={s.root}>
        {renderMediaFile}
        {Number(item?.content_type_id) !== CONTENT_TYPE.IMAGE &&
          Number(item?.is_activity) === Number(RESPONSE_STATUS.SUCCESS) && (
            <ActivityDone
              is_activity_done={questionActivity?.is_activity_done}
              isActivityDoneSucess={isActivityDoneSucess}
            />
          )}
      </View>
      <Modal
        style={s.modal}
        isOpen={isInfoModalVisible}
        entry={'bottom'}
        position={'bottom'}
        coverScreen={true}
        backdrop={true}
        swipeToClose={true}
        backdropOpacity={0.7}
        backdropColor={colors.darkColor}
        backButtonClose={true}
        onClosed={onCloseInfoModal}>
        <Infomation onCloseModal={onCloseInfoModal} data={item} />
      </Modal>
    </>
  );
};

export default MediaFileScreens;
