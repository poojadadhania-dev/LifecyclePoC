import React from 'react';
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

interface State {
  count: number;
  lifecycleEvents: string[];
  userData: UserData | null;
  showUserData: boolean;
}

class LifecycleDemoClass extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0,
      lifecycleEvents: ['[MOUNTED] - Component initialized'],
      userData: null,
      showUserData: false,
    };
    console.log('1️⃣ CONSTRUCTOR - Component is being created');
  }

  // ✅ MOUNTING PHASE
  componentDidMount() {
    console.log('2️⃣ COMPONENT DID MOUNT - Component inserted into DOM');
    this.setState({
      lifecycleEvents: [
        '[COMPONENT DID MOUNT] - After render, DOM ready',
        ...this.state.lifecycleEvents,
      ],
    });

    // Simulate API call
    this.fetchUserData();
  }

  fetchUserData = () => {
    setTimeout(() => {
      const mockUser: UserData = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };
      this.setState({
        userData: mockUser,
        lifecycleEvents: [
          '[DATA FETCHED] - User data loaded from API',
          ...this.state.lifecycleEvents,
        ],
      });
    }, 2000);
  };

  // ✅ UPDATING PHASE
  shouldComponentUpdate(nextProps: {}, nextState: State) {
    console.log(
      '3️⃣ SHOULD COMPONENT UPDATE - Deciding if re-render needed'
    );
    return nextState.count !== this.state.count;
  }

  componentDidUpdate(prevProps: {}, prevState: State) {
    console.log(
      '5️⃣ COMPONENT DID UPDATE - Component re-rendered after state/props change'
    );
    if (prevState.count !== this.state.count) {
      this.setState({
        lifecycleEvents: [
          `[UPDATED] - Count changed from ${prevState.count} to ${this.state.count}`,
          ...this.state.lifecycleEvents,
        ],
      });
    }
  }

  // ✅ UNMOUNTING PHASE
  componentWillUnmount() {
    console.log('6️⃣ COMPONENT WILL UNMOUNT - Component being removed');
  }

  // Methods
  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  };

  decrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }));
  };

  toggleUserData = () => {
    this.setState(prevState => ({
      showUserData: !prevState.showUserData,
    }));
  };

  clearEvents = () => {
    this.setState({
      lifecycleEvents: ['Events cleared'],
    });
  };

  render() {
    console.log('4️⃣ RENDER - Component is rendering/re-rendering');
    const { count, lifecycleEvents, userData, showUserData } = this.state;

    const eventData: LifecycleEvent[] = lifecycleEvents.map((event, index) => ({
      id: index.toString(),
      event,
    }));

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>📱 Class Component Lifecycle</Text>

        {/* Counter Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Counter Example</Text>
          <Text style={styles.counterText}>{count}</Text>
          <View style={styles.buttonRow}>
            <View style={styles.buttonWrapper}>
              <Button title="➕ Increment" onPress={this.incrementCount} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="➖ Decrement" onPress={this.decrementCount} />
            </View>
          </View>
        </View>

        {/* User Data Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Async Data (componentDidMount)</Text>
          <Button title="Toggle User Data" onPress={this.toggleUserData} />
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
          <Button title="Clear Events" onPress={this.clearEvents} />
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

        {/* Lifecycle Diagram */}
        <View style={styles.diagramCard}>
          <Text style={styles.cardTitle}>📊 Lifecycle Phases</Text>
          <Text style={styles.phaseText}>
            1️⃣ <Text style={styles.bold}>MOUNTING:</Text> Constructor →
            componentDidMount
          </Text>
          <Text style={styles.phaseText}>
            2️⃣ <Text style={styles.bold}>UPDATING:</Text> shouldComponentUpdate
            → componentDidUpdate
          </Text>
          <Text style={styles.phaseText}>
            3️⃣ <Text style={styles.bold}>UNMOUNTING:</Text>
            componentWillUnmount
          </Text>
        </View>
      </ScrollView>
    );
  }
}

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
    color: '#007AFF',
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#FF6B6B',
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
    backgroundColor: '#e3f2fd',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  phaseText: {
    fontSize: 13,
    color: '#333',
    marginVertical: 8,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

export default LifecycleDemoClass;