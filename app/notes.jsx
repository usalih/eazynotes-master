import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function NewNote() {
  const [text, setText] = useState('');
  const router = useRouter();

  const saveNote = async () => {
    if (!text.trim()) return;

    const saved = await AsyncStorage.getItem('notes');
    const notes = saved ? JSON.parse(saved) : [];

    notes.unshift({
      id: Date.now().toString(),
      text
    });

    await AsyncStorage.setItem('notes', JSON.stringify(notes));
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write your note..."
        value={text}
        onChangeText={setText}
        style={styles.input}
        multiline
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saveNote}>
        <Text style={styles.saveText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8
  },
  saveBtn: {
    backgroundColor: '#0b3d2e',
    padding: 15,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
    top: '-10%'
  },
  saveText: { color: '#fff', fontSize: 16 }
});
