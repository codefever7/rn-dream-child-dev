import React, { PureComponent } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
const { Value, timing } = Animated;

import { View, StatusBar, Platform, BackHandler } from 'react-native';
import styles from './styles';
import PlayerControls from './Controls';
import { fullScreenInterpolate, VideoSize } from './Utils';
import Orientation from 'react-native-orientation-locker';
import YoutubeIframePlayer from 'react-native-youtube-iframe';
import { IS_IPHONE_X } from '@app/constants/constant';

const IsAndroid = Platform.OS === 'android';

export default class Player extends PureComponent {
  static defaultProps;

  constructor(props) {
    super(props);
    this.state = {
      ready: true,
      layoutReady: !IsAndroid,
      fullScreen: false,
      play: this.props.autoPlay,
      duration: 0,
      currentTime: 0,
      layout: {
        top: 0,
        left: 0,
      },
    };
    // this.player = React.createRef();
  }
  player;

  _width = new Value(VideoSize.inline.width);
  _isUserUsingIconToFullScreen = false;

  componentDidMount() {
    Orientation.addOrientationListener(this.onRotated);

    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonClick);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.onRotated);
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonClick);
    if (this.interval) clearInterval(this.interval);
  }

  onStartTimer = () => {
    this.interval = setInterval(async () => {
      if (this.player?.getCurrentTime) {
        const elapsed_sec = await this.player?.getCurrentTime(); // this is a promise. dont forget to await
        this.setState({ currentTime: elapsed_sec });
      }
    }, 1000);
  };

  // listeners
  onDurationReady = (duration) => {
    this.setState({ duration });
    if (this.props.onDurationReady) this.props.onDurationReady(duration);
    if (this.props.onStart) this.props.onStart();
  };

  // listeners
  setDuration = async () => {
    if (this.player && this.player?.getDuration) {
      const duration = await this.player?.getDuration();
      this.onDurationReady(duration);
      this.onStartTimer();
    }
  };

  onPlaying = (currentTime) => {
    this.setState({ currentTime });
    if (this.props.onPlaying) this.props.onPlaying(currentTime);
  };

  onReady = () => {
    this.setState({ ready: true });
    if (this.props.onReady) this.props.onReady();
    this.setDuration();
  };

  onError = () => {
    if (this.props.onError) this.props.onError();
  };

  onEnd = () => {
    const { onEnd, loop } = this.props;
    if (onEnd) onEnd();
    if (loop) {
      if (this.seekTo) this.seekTo(0);
      if (this.playVideo) this.playVideo();
    }
  };

  onStateChange = (state) => {
    this.props.onStateChange(state);
  };
  onPlaybackRateChange = () => {};
  onPlaybackQualityChange = () => {};

  playVideo = () => {
    this.setState({ play: true });
  };
  seekTo = (s) => {
    this.setState({ currentTime: s });
    this.player?.seekTo(s);
  };

  pauseVideo = () => {
    this.setState({ play: false });
  };

  toggleFS = () => {
    this._isUserUsingIconToFullScreen = true;
    setTimeout(() => {
      this._isUserUsingIconToFullScreen = false;
    }, 2000);
    const rotateToFullScreen = true;
    this.setState({ fullScreen: !this.state.fullScreen }, () => {
      if (this.state.fullScreen) {
        this.goToFullScreen();
        if (rotateToFullScreen) {
          Orientation.lockToLandscapeLeft();
        }
      } else {
        this.goToInlineScreen();
        if (rotateToFullScreen) Orientation.lockToPortrait();
        // setTimeout(() => {
        //   Orientation.unlockAllOrientations();
        // }, 2000);
      }
    });
  };

  onRotated = (orientation) => {
    if (this._isUserUsingIconToFullScreen) return;
    // Orientation.unlockAllOrientations();
    const rotateToFullScreen = true;
    if (rotateToFullScreen) {
      if (
        orientation === 'LANDSCAPE' ||
        orientation === 'LANDSCAPE-LEFT' ||
        orientation === 'LANDSCAPE-RIGHT' ||
        orientation === 'PORTRAIT-UPSIDEDOWN'
      ) {
        if (this.state.fullScreen) return;
        this.setState({ fullScreen: true }, () => {
          this.goToFullScreen();
          // Orientation.unlockAllOrientations();
        });
        return;
      } else {
        if (!this.state.fullScreen) return;

        this.setState(
          {
            fullScreen: false,
          },
          () => {
            this.goToInlineScreen();
          },
        );
        return;
      }
    } else {
      this.goToInlineScreen();
    }
  };
  onBackButtonClick = () => {
    if (this.state.fullScreen) {
      this.toggleFS();
      return true;
    }

    return false;
  };

  goToFullScreen = () => {
    this.props.onFullScreen(true);
    timing(this._width, {
      toValue: VideoSize.fullScreen.width + 2,
      duration: 10,
      easing: Easing.inOut(Easing.ease),
    }).start(() => StatusBar.setHidden(true));
  };
  goToInlineScreen = () => {
    this.props.onFullScreen(false);
    timing(this._width, {
      toValue: VideoSize.inline.width,
      duration: 10,
      easing: Easing.inOut(Easing.ease),
    }).start(() => StatusBar.setHidden(false));
  };
  onLayout = ({
    nativeEvent: {
      layout: { x, y },
    },
  }) => {
    this.setState({ layoutReady: true, layout: { top: y, left: x } });
  };

  render() {
    const { fullScreen } = this.state;
    const { height, top, left } = fullScreenInterpolate(this._width, this.state.layout);

    const VideoStyle = fullScreen
      ? { ...styles.fullScreen }
      : {
          ...styles.inline,
        };

    const AbsoluteStyle = IsAndroid ? { ...this.state.layout } : {};

    const { videoId, topBar, showFullScreenButton } = this.props;
    const style = {
      ...VideoStyle,
      ...AbsoluteStyle,
      width: this._width,
      height,
      top,
      left,
      // transform: [
      //   { translateY },
      //   { translateX },
      //   { rotateZ: concat(rotate as any, "deg" as any) }
      // ],
    };
    const iPhoneWidthAdjustment = IS_IPHONE_X ? 200 : 0;
    const widthAdjustment = Platform.OS === 'ios' ? iPhoneWidthAdjustment : 78;
    return (
      <React.Fragment>
        <View style={styles.wrapper} onLayout={this.onLayout} />
        {this.state.layoutReady && (
          <Animated.View style={style} removeClippedSubviews={true}>
            <View style={fullScreen ? { alignSelf: 'center' } : null}>
              <YoutubeIframePlayer
                ref={(player) => (this.player = player)}
                width={fullScreen ? VideoSize.fullScreen.width - widthAdjustment : VideoSize.inline.width}
                height={fullScreen ? VideoSize.fullScreen.height : VideoSize.inline.height}
                play={this.state.play}
                onError={this.onError}
                onReady={this.onReady}
                onPlaying={this.onPlaying}
                videoId={videoId}
                initialPlayerParams={{
                  controls: false,
                  showClosedCaptions: false,
                  rel: false,
                  modestbranding: true,
                  cc_lang_pref: false,
                }}
              />
            </View>
            <PlayerControls
              {...{
                playVideo: this.playVideo,
                seekTo: this.seekTo,
                pauseVideo: this.pauseVideo,
                toggleFS: this.toggleFS,
                topBar,
                showFullScreenButton,
                ...this.state,
              }}
              play={this.state.play}
              playVideo={this.playVideo}
              pauseVideo={this.pauseVideo}
            />
          </Animated.View>
        )}
      </React.Fragment>
    );
  }
}
