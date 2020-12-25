/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppNavigator } from './src/components/navigator';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>

      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default App;
