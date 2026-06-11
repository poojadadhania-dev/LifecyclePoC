import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import LifecycleDemoClass from './components/LifecycleDemoClass';
import LifecycleDemoFunctional from './components/LifecycleDemoFunctional';

export default function App() {
  const [activeTab, setActiveTab] = useState<'class' | 'functional'>('class');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>React Native Lifecycle Demo</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Class Component"
            onPress={() => setActiveTab('class')}
            color={activeTab === 'class' ? '#007AFF' : '#999'}
          />
          <Button
            title="Functional Component"
            onPress={() => setActiveTab('functional')}
            color={activeTab === 'functional' ? '#007AFF' : '#999'}
          />
        </View>

        {activeTab === 'class' && <LifecycleDemoClass />}
        {activeTab === 'functional' && <LifecycleDemoFunctional />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});