import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { useEffect, useRef, useState } from 'react';
import { Asset } from 'expo-asset';
import { StatusBar } from 'expo-status-bar';
import { ButtonsContainer } from './src/components/ButtonsContainer/ButtonsContainer';

export default function App() {
  const [html, setHtml] = useState<string | null>(null);
  const [useDarkMode, setUseDarkMode] = useState<'light' | 'dark'>('light');
  const webViewRef = useRef<any>(null);

  useEffect(() => {
    const loadHtml = async () => {
      const asset = Asset.fromModule(require('./front-end/build/index.html'));
      await asset.downloadAsync();
      const fileContent = await FileSystem.readAsStringAsync(asset.localUri!);
      setHtml(fileContent);
    };
    loadHtml();
  }, []);

  if (!html) {
    return (
      <View style={styles().loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <View style={styles(useDarkMode).container}>
      <ButtonsContainer
        useDarkMode={useDarkMode}
        setUseDarkMode={() => setUseDarkMode((prev) => prev === 'light' ? 'dark' : 'light')}
        webViewRef={webViewRef}
      />
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html }}
        style={styles(useDarkMode).webview}
      />
      <StatusBar style={useDarkMode === 'light' ? 'dark' : 'light'} />
    </View>
  );
}

const styles = (useDarkMode?: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: useDarkMode === 'light' ? '#fff' : '#141414',
  },
  webview: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 4,
    backgroundColor: useDarkMode === 'light' ? '#fff' : '#141414',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    top: 68,
    zIndex: 1000,
    width: '100%'
  },
  background: {
    backgroundColor: useDarkMode === 'light' ? '#fff' : '#2c2c2c',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    paddingHorizontal: 42,
    paddingVertical: 24,
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.5
      },
      android: {
        elevation: 5,
      }
    }),
  },
  button: {
  }
});
