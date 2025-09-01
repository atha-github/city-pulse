import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './src/localization/i18n';
import AppNav from './src/navigation';
import CToast from './src/components/molecules/CToast';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNav />
      <CToast />
    </GestureHandlerRootView>
    
  );
}

export default App;