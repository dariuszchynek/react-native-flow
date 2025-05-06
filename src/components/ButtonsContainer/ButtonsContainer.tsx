import { Dimensions, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect } from "react";

export const ButtonsContainer = ({
  useDarkMode,
  setUseDarkMode,
  webViewRef,
}: {
  useDarkMode: 'light' | 'dark',
  setUseDarkMode: any,
  webViewRef: any
}) => {
  useEffect(() => {
    sendColorMode(useDarkMode);
  }, [useDarkMode]);

  const sendColorMode = (mode: 'light' | 'dark') => {
    const msg = JSON.stringify({ type: 'setColorMode', mode });
    webViewRef.current?.postMessage(msg);
  };

  const sendRefreshDiagram = () => {
    const msg = JSON.stringify({ type: 'refreshDiagram' });
    webViewRef.current?.postMessage(msg);
  };

  const addNewNode = () => {
    const msg = JSON.stringify({
      type: 'addNewNode',
      screen: { x: Dimensions.get('window').width, y: Dimensions.get('window').height }
    });
    webViewRef.current?.postMessage(msg);
  };

  return (
    <View style={styles(useDarkMode).buttonsContainer}>
      <View style={styles(useDarkMode).background}>
        <TouchableOpacity
          style={styles().button}
          onPress={addNewNode}
        >
          <MaterialIcons name="add" size={24} color={useDarkMode === "light" ? "black" :"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles().button}
          onPress={sendRefreshDiagram}
        >
          <MaterialIcons name="autorenew" size={24} color={useDarkMode === "light" ? "black" :"white"}  />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles().button}
          onPress={setUseDarkMode}
        >
          {
            useDarkMode === "dark"
              ? <MaterialIcons name="sunny" size={24} color={"white"} />
              : <MaterialIcons name="bedtime" size={24} color={"black"} />
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = (useDarkMode?: 'light' | 'dark') => StyleSheet.create({
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
})