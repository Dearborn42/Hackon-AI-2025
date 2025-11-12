import { Button, StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Text } from 'react-native';
import * as Speech from 'expo-speech'
import { getRandomSentence, gradeSentence } from "../../backend/fetchCalls"
import { useAudioPlayer } from 'expo-audio';
import { useSettings } from '@/components/settings-context';


export default function TabFiveScreen() {

  const [textToSpeech, setTextToSpeech] = useState('');
  const [answer, setAnswer] = useState('');
  const [sentence, setSentence] = useState(getRandomSentence());
  const [instructions, setInstructions] = useState('Press listen and enter the sentence below');
  const { settings } = useSettings(); 

  const volume = settings.volume / 100;

  const players = [useAudioPlayer(require("../../sounds/backgroundnoise1.mp3")), useAudioPlayer(require("../../sounds/backgroundnoise2.mp3"))];

  async function isSpeaking(): Promise<boolean> {
    return await Speech.isSpeakingAsync();
  }

  function playBackgroundSound() {
    const rand = Math.floor(Math.random() * players.length);
    const player = players[rand];
    player.volume = volume
    player.play();

    return player
  }

  const speakText = async () => {
    const speaking = await isSpeaking();

    if (textToSpeech && !speaking) {

      const player = playBackgroundSound()
      Speech.getAvailableVoicesAsync().then(voices => {console.log(voices)})
      Speech.speak(textToSpeech, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.8,
        voice: 'com.apple.voice.enhanced.en-US.Evan',
        volume: volume,
        onDone: () => {
          player.pause();

          player.seekTo(0)
        },
        onStopped: () => {
          player.pause();      
          player.seekTo(0)
        },
        onError: () => {
          player.pause();      
          player.seekTo(0)
        },
      });
    }
  };

  function changeSentence() {
    const newSentence = getRandomSentence();
    setSentence(newSentence);
    setTextToSpeech(newSentence);
    setAnswer('');
  }

  useEffect(() => {
    setTextToSpeech(sentence)
  }, []);

  async function submitAnswer() {
    setInstructions("Grading...")
    await gradeSentence(answer, sentence) == true ? alert("Correct!") : alert("Not Correct :(")
    changeSentence()
    setInstructions("Press listen and enter your answer below")
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <Text style={styles.text}>Audio Game</Text>
      </View>
      <View style={styles.centerContainer}>
        <ThemedText>{instructions}</ThemedText>
        <TextInput
          value={answer}
          style={styles.textInput}
          onChangeText={value => setAnswer(value)}
          placeholder='Enter Answer'
        />
        <View style={styles.buttonRow}>
          <Button title="Submit" onPress={submitAnswer} />
          <View style={{ width: 20 }} />
          <Button title="Listen" onPress={speakText} />
        </View>
      </View>
    </ThemedView>
  );

}

const styles = StyleSheet.create({
  topBar: {
    height: 100,
    width: "100%",
    backgroundColor: "#028090",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#025964",
  },
  text: {
    color: "white",
    fontSize: 48,
    fontWeight: "700",
  },


  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textInput: {
    width: "60%", // reduced width
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
    backgroundColor: "white",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

