import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { OPENAI_API_KEY } from "../.env"; 

const AIChatScreen = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: query }],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      const data = await res.json();

      if (data.choices?.[0]?.message?.content) {
        setResponse(data.choices[0].message.content.trim());
      } else {
        setResponse('দুঃখিত, AI থেকে কোনো উত্তর পাওয়া যায়নি।');
      }
    } catch (error) {
      setResponse('⚠️ সমস্যা হয়েছে, আবার চেষ্টা করুন।');
      console.error('OpenAI API error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>🤖 AI এর কাছে প্রশ্ন করুন</Text>
      <TextInput
        style={styles.input}
        placeholder="আপনার প্রশ্ন লিখুন..."
        value={query}
        onChangeText={setQuery}
        multiline
        editable={!loading}
      />
      <Button title="জিজ্ঞাসা করুন" onPress={askAI} disabled={loading || !query.trim()} />
      {loading && <ActivityIndicator size="large" color="#667eea" style={{ marginTop: 20 }} />}
      <ScrollView style={styles.responseContainer}>
        <Text style={styles.responseText}>{response}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  responseContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    maxHeight: 300,
  },
  responseText: {
    fontSize: 16,
    color: '#444',
  },
});

export default AIChatScreen;
