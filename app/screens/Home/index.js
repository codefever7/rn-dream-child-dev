import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import TextView from '../../components/TextView';
import styles from './styles';

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <StatusBar translucent barStyle={'dark-content'} />
      <SafeAreaView style={styles.root}>
        <TextView type={'body'} text='Dashboard Content Here' />
      </SafeAreaView>
    </>
  );
};
export default HomeScreen;
