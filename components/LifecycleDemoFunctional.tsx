import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface LifecycleEvent {
  id: string;
  event: string;
}

const LifecycleDemoFunctional = () => {
  const [count, setCount] = useState(0);
  const [lifecycleEvents, setLifecycleEvents] = useState<string[]>([
    '[INITIALIZED] - Functional component created',
  ]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showUserData, setShowUserData] = useState(false);

  const renderCountRef = useRef(0);
  renderCountRef.current++;

  console.log(`Functional Component Rendered ${renderCountRef.current} times`);

  // ✅ MOUNTING PHASE (runs once after first render)
  useEffect(() => {
    console.log('🎬 MOUNTING - useEffect with empty dependency array');
    setLifecycleEvents(prev => [
      '[MOUNTED] - Component mounted (useEffect with [])',
      ...prev,
    ]);

    // Simulate API call
    const timer = setTimeout(() => {
      const mockUser: UserData = {
        id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
      };
      setUserData(mockUser);
      setLifecycleEvents(prev => [
        '[DATA FETCHED] - User data loaded from API',
        ...prev,
      ]);
    }, 2000);

    // ✅ CLEANUP (like componentWillUnmount)
    return () => {
      console.log('🧹 CLEANUP - useEffect cleanup function');
      clearTimeout(timer);
    };
  }, []); // Empty dependency = only on mount

  // ✅ UPDATING PHASE (runs when dependencies change)
  useEffect(() => {
    console.log(`🔄 UPDATING - Count changed to ${count}`);
    if (count > 0) {
      setLifecycleEvents(prev => [
        `[UPDATED] - Count is now: ${count}`,
        ...prev,
      ]);
    }
  }, [count]); // Dependency: count

  // Methods
  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count - 1);

  const clearEvents = () => {
    setLifecycleEvents(['Events cleared']);
  };

  const eventData: LifecycleEvent[] = lifecycleEvents.map((event, index) => ({
    id: index.toString(),
    event,
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>⚛️ Functional Component with Hooks</Text>

      {/* Counter Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Counter Example</Text>
        <Text style={styles.counterText}>{count}</Text>
        <View style={styles.buttonRow}>
          <View style={styles.buttonWrapper}>
            <Button title="➕ Increment" onPress={incrementCount} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="➖ Decrement" onPress={decrementCount} />
          </View>
        </View>
      </View>

      {/* Render Count */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Render Count</Text>
        <Text style={styles.renderCountText}>{renderCountRef.current}</Text>
        <Text style={styles.smallText}>Total renders so far</Text>
      </View>

      {/* User Data Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Async Data (useEffect on mount)</Text>
        <Button
          title="Toggle User Data"
          onPress={() => setShowUserData(!showUserData)}
        />
        {showUserData && userData && (
          <View style={styles.userDataBox}>
            <Text style={styles.userData}>User ID: {userData.id}</Text>
            <Text style={styles.userData}>Name: {userData.name}</Text>
            <Text style={styles.userData}>Email: {userData.email}</Text>
          </View>
        )}
      </View>

      {/* Lifecycle Events Log */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lifecycle Events Log</Text>
        <Button title="Clear Events" onPress={clearEvents} />
        <FlatList
          data={eventData}
          renderItem={({ item }) => (
            <Text style={styles.eventLog}>{item.event}</Text>
          )}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          nestedScrollEnabled={true}
        />
      </View>

      {/* Hooks Diagram */}
      <View style={styles.diagramCard}>
        <Text style={styles.cardTitle}>🪝 Hooks Equivalent</Text>
        <Text style={styles.phaseText}>
          🎬 <Text style={styles.bold}>MOUNTING:</Text> useEffect with []
        </Text>
        <Text style={styles.phaseText}>
          🔄 <Text style={styles.bold}>UPDATING:</Text> useEffect with
          [dependencies]
        </Text>
        <Text style={styles.phaseText}>
          🧹 <Text style={styles.bold}>CLEANUP:</Text> return function in
          useEffect
        </Text>
      </View>

      {/* Comparison Table */}
      <View style={styles.diagramCard}>
        <Text style={styles.cardTitle}>📊 Class vs Functional</Text>
        <Text style={styles.comparisonText}>
          Class: componentDidMount{'\n'}
          Functional: useEffect(() =&gt; {'{}'}, [])
        </Text>
        <Text style={styles.comparisonText}>
          Class: componentDidUpdate{'\n'}
          Functional: useEffect(() =&gt; {'{}'}, [dependency])
        </Text>
        <Text style={styles.comparisonText}>
          Class: componentWillUnmount{'\n'}
          Functional: useEffect(() =&gt; () =&gt; {'{cleanup}'}, [])
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#FF6B6B',
  },
  renderCountText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFA500',
    marginVertical: 10,
  },
  smallText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
  userDataBox: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  userData: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  eventLog: {
    fontSize: 12,
    color: '#666',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontFamily: 'monospace',
  },
  diagramCard: {
    backgroundColor: '#f3e5f5',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  phaseText: {
    fontSize: 13,
    color: '#333',
    marginVertical: 8,
    lineHeight: 20,
  },
  comparisonText: {
    fontSize: 12,
    color: '#555',
    marginVertical: 10,
    fontFamily: 'monospace',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#9C27B0',
  },
});

export default LifecycleDemoFunctional;