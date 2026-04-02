import EvilIcons from '@expo/vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function NotesScreen() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    const saved = await AsyncStorage.getItem('notes');
    setNotes(saved ? JSON.parse(saved) : []);
  };

  const deleteNote = (id) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = notes.filter(n => n.id !== id);
            setNotes(updated);
            await AsyncStorage.setItem('notes', JSON.stringify(updated));
          }
        }
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No notes yet</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteText} numberOfLines={4}>
              {item.text}
            </Text>

            <View style={styles.actions}>

              <TouchableOpacity
                // style={styles.deleteBtn}
                onPress={() => deleteNote(item.id)}
              >
                <EvilIcons name="trash" size={24} color="#f19085ff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push('/notes')}
      >
        <Text style={styles.addText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f8fa'
  },

  empty: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
    color: '#888'
  },

  noteCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    // Android shadow
    elevation: 3
  },

  noteText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#111'
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12
  },

  editBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: '#e8f0ec',
    marginRight: 10
  },

  deleteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: '#f19085ff'
  },

  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0b3d2e'
  },

  addBtn: {
    position: 'absolute',
    right: 22,
    bottom: 22,
    backgroundColor: '#0b3d2e',
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6
  },

  addText: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 2
  }
});
