import * as React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import screens from '../../constants/screens';
import LoadingScreen from '../../screens/LoadingScreen';
import NavigationTabs from '../navigationTabs';
import LoginScreen from '../../screens/Membership/Login/Login';
import SignupScreen from '../../screens/Membership/Signup/Signup';
import ResetPasswordScreen from '@app/screens/Membership/ResetPassword/ResetPassword';
import ForgotPasswordScreen from '@app/screens/Membership/ForgotPassword/ForgotPassword';
import WelcomeScreen from '@app/screens/Welcome';
import AddNumberScreen from '../../screens/Membership/AddNumber/AddNumber';
import EnterOtpScreen from '@app/screens/Membership/EnterOtp/EnterOtp';
import SelectLanguageScreen from '@app/screens/Membership/SelectLanguage/SelectLanguage';
import BasicInformationScreen from '@app/screens/Membership/BasicInformation/BasicInformation';
import StartPregnancyScreen from '@app/screens/Dashboard/StartPregnancy/StartPregnancy';
import DemoScreen from '@app/screens/Report/Demo/Demo';
import PhysicalScreen from '@app/screens/Report/ActivityScreens/Physical';
import IntellectualScreen from '@app/screens/Report/ActivityScreens/Intellectual';
import EmotionalScreen from '@app/screens/Report/ActivityScreens/Emotional';
import SpiritualScreen from '@app/screens/Report/ActivityScreens/Spiritual';
import MediaFileScreens from '@app/screens/MediaFiles/MediaFile';
import PdfDetailsScreens from '@app/screens/MediaFiles/PdfDetails';
import WorkShopPurchaseScreen from '@app/screens/Dashboard/WorkShop/WorkShopPurchase';
import WorkshopScreen from '@app/screens/Dashboard/WorkShop/WorkShop';
import ClassPurchaseScreen from '@app/screens/Dashboard/Class/ClassPurchase';
import ClassScreen from '@app/screens/Dashboard/Class/Class';
import BackupClassScreens from '@app/screens/Dashboard/Class/BackupClass';
import AnnoncementsScreens from '@app/screens/Notification/Annoncements';
import AboutUsScreens from '@app/screens/More/AboutUs';
import ContactUsScreens from '@app/screens/More/ContactUs';
import MyOrdersScreens from '@app/screens/More/MyOrders/MyOrders';
import OrderDetailScreens from '@app/screens/More/MyOrders/OrderDetail';
import ChangeLanguageScreens from '@app/screens/More/ChangeLanguage';
import CounsellingAskScreens from '@app/screens/More/CounsellingAsk';
import PrivacyPolicyScreens from '@app/screens/More/PrivacyPolicy';
import FAQScreens from '@app/screens/More/FAQ';
import UpdateProfileScreens from '@app/screens/More/UpdateProfile';
import DailyActivityScreen from '@app/screens/Dashboard/DailyActivity/DailyActivity';
import FolderViewScreen from '@app/screens/FolderView/FolderView';
import NotificationDetailScreen from '@app/screens/Notification/NotificationDetail';
import PaymentScreen from '@app/screens/Payment/Payment';
import SelectAddressScreen from '@app/screens/More/MyOrders/SelectAddress';
import AddAddressScreen from '@app/screens/More/MyOrders/AddAddress';
import OrderSummaryScreen from '@app/screens/More/MyOrders/OrderSummary';
import NewUpdate from '@app/screens/NewUpdate/NewUpdate';
import CartScreen from '@app/screens/More/MyOrders/Cart';
import TermsConditionScreens from '@app/screens/More/TermsCondition';
import AddProductScreen from '@app/screens/More/MyOrders/AddProduct';
import PaymentSuccessScreen from '@app/screens/Payment/PaymentSuccess';
import PremiumPlanScreen from '@app/screens/Payment/PremiumPlan';
import DailyActivityPurchaseScreen from '@app/screens/Dashboard/DailyActivity/DailyActivityPurchase';
import UnderMaintenance from '@app/components/AllEmptyScreen/UnderMaintenance';
import PaymentMaintenance from '@app/screens/Payment/PaymentMaintenance';
import ChatWithUs from '@app/screens/More/ChatWithUs/ChatWithUs';
const Stack = createStackNavigator();

export const navigationRef = React.createRef();
export const navigate = (name, params) => {
  navigationRef?.current?.navigate(name, params);
};
export const navigationReset = (name, params) => {
  navigationRef?.current?.reset({
    index: 0,
    routes: [
      {
        name: name,
        params,
      },
    ],
  });
};
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={screens.Splash}
      headerMode='screen'
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name={screens.Splash} component={LoadingScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.Welcome} component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.Login} component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.Signup} component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.NavigationRoot} component={NavigationTabs} options={{ headerShown: false }} />
      <Stack.Screen name={screens.ResetPassword} component={ResetPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.ForgotPassword} component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.AddNumber} component={AddNumberScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.EnterOtp} component={EnterOtpScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.SelectLanguage} component={SelectLanguageScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.StartPregnancy} component={StartPregnancyScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.Demo} component={DemoScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.Physical} component={PhysicalScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.Intellectual} component={IntellectualScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.Emotional} component={EmotionalScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.Spiritual} component={SpiritualScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.MediaFile} component={MediaFileScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.PdfDetails} component={PdfDetailsScreens} options={{ headerShown: true }} />
      <Stack.Screen
        name={screens.WorkShopPurchase}
        component={WorkShopPurchaseScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name={screens.WorkShop} component={WorkshopScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.ClassPurchase} component={ClassPurchaseScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.Class} component={ClassScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.BackupClass} component={BackupClassScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.Annoncements} component={AnnoncementsScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.AboutUS} component={AboutUsScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.ContactUS} component={ContactUsScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.MyOrders} component={MyOrdersScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.OrderDetail} component={OrderDetailScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.ChangeLanguage} component={ChangeLanguageScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.CounsellingAsk} component={CounsellingAskScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.PrivacyPolicy} component={PrivacyPolicyScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.FAQ} component={FAQScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.UpdateProfile} component={UpdateProfileScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.DailyActivity} component={DailyActivityScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.Payment} component={PaymentScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name={screens.NotificationDetail}
        component={NotificationDetailScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={screens.BasicInformations}
        component={BasicInformationScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name={screens.FolderView} component={FolderViewScreen} options={{ headerShown: true, title: '' }} />
      <Stack.Screen name={screens.SelectAddress} component={SelectAddressScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.AddAddress} component={AddAddressScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.OrderSummary} component={OrderSummaryScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.NewUpdate} component={NewUpdate} options={{ headerShown: false }} />
      <Stack.Screen name={screens.Cart} component={CartScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.TermsCondition} component={TermsConditionScreens} options={{ headerShown: true }} />
      <Stack.Screen name={screens.AddProduct} component={AddProductScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.PaymentSuccess} component={PaymentSuccessScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.PremiumPlan} component={PremiumPlanScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name={screens.DailyActivityPurchase}
        component={DailyActivityPurchaseScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name={screens.UnderMaintenance} component={UnderMaintenance} options={{ headerShown: false }} />
      <Stack.Screen name={screens.PaymentMaintenance} component={PaymentMaintenance} options={{ headerShown: true }} />
      <Stack.Screen name={screens.ChatWithUs} component={ChatWithUs} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}
