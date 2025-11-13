import { Button, StyleSheet, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Text } from 'react-native';
import * as Speech from 'expo-speech'
import { getRandomSentence, gradeSentence } from "../../backend/fetchCalls"
import { useAudioPlayer } from 'expo-audio';
import { useSettings } from '@/components/settings-context';


export default function TabFiveScreen() {
  const [correct, setCorrect] = useState<boolean>(false);
  const [wrong, setWrong] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [textToSpeech, setTextToSpeech] = useState('');
  const [answer, setAnswer] = useState('');
  const [sentence, setSentence] = useState(getRandomSentence());
  const [instructions, setInstructions] = useState('Press listen and enter the sentence below');
  const [currentVoice, setCurrentVoice] = useState('com.apple.voice.enhanced.en-US.Evan')
  const [level, setLevel] = useState(1)

  const { settings } = useSettings();

  const volume = settings.volume / 100;

  const voices = [
    {
      voice: "english",
      identifier: "Google UK English Female"
    },
    {
      voice: "american",
      identifier: "Microsoft Mark - English (United States)"
    },
    {
      voice: "indian",
      identifier: "Google हिन्दी"
    },
    {
      voice: "african",
      identifier: "Google português do Brasil"
    }
  ]

  const players = [
    useAudioPlayer(require("../../sounds/backgroundnoise1.mp3")),
    // useAudioPlayer(require("../../sounds/backgroundnoise2.mp3")),
    // useAudioPlayer(require("../../sounds/backgroundnoise4.mp3")),
    // useAudioPlayer(require("../../sounds/backgroundnoise5.mp3"))
  ];

  async function isSpeaking(): Promise<boolean> {
    return await Speech.isSpeakingAsync();
  }

  function playBackgroundSound() {
    const rand = Math.floor(Math.random() * players.length);
    const player = players[rand];
    console.log(`Background volume: ${ 1 - Math.exp(-level / 5)}`)
    player.volume = 1 - Math.exp(-level / 5)

    player.play();

    return player
  }

  const speakText = async () => {
    const speaking = await isSpeaking();

    if (textToSpeech && !speaking) {

      const player = playBackgroundSound()
      Speech.getAvailableVoicesAsync().then(voices => { console.log(voices) })
      Speech.speak(textToSpeech, {
        language: 'en-US',
        pitch: 1.0,
        rate: 1,
        voice: currentVoice,
        volume: Math.exp(-level / 3),
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
    const localStreak = localStorage.getItem("value3");
    if (localStreak) {
      const result = JSON.parse(localStreak);
      setLevel(result.level[2]);
    }
    setTextToSpeech(sentence)
    const selectedVoice = voices.find(v => v.voice === settings.voice);
    if (selectedVoice) {
      setCurrentVoice(selectedVoice.identifier);
    }
  }, [settings.voice]);

  async function submitAnswer() {
    setInstructions("Grading...")
    await gradeSentence(answer, sentence) == true ? (
      setCorrect(true),
      setInstructions("Correct!"),
      setTimeout(() => {
        setCorrect(false);
        changeSentence();
        setInstructions("Press listen and enter your answer below");
        setLevel(level + 1);
        const localStreak = localStorage.getItem("value3");
        if (localStreak) {
          const result = JSON.parse(localStreak);
          var newResult = {...result};
          newResult.level[2] = level + 1;
          localStorage.setItem("value3", JSON.stringify(newResult));
        }
      }, 2000)
    ) : (
      setWrong(true),
      setInstructions("Incorrect! Try again."),
      setTimeout(() => {
        setWrong(false);
        setInstructions("Press listen and enter your answer below")
      }, 2000)
    )
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <Text style={styles.text}>Audio - Lvl: {level}</Text>
      </View>
      {start == false &&
        <View style={styles.tutorialContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.tutorialTextHeader}>Tutorial:</Text>
            <Text style={styles.tutorialText}>1. You will be given audio to listen to.</Text>
            <Text style={styles.tutorialText}>2. Enter the main point of the sentence as well as possible.</Text>
            <Text style={styles.tutorialText}>3. If you are correct, you will move to the next level with a new sentence!</Text>
            <Text style={styles.tutorialText}>4. Try to get as far as you can!</Text>
          </View>
          <TouchableOpacity style={styles.startButton} onPress={() => setStart(true)}>
            <Text style={styles.tutorialText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      }
      {start && <>

        <View style={styles.centerContainer}>
          {
            correct && (<Image source={require('../../assets/images/Correct.png')} style={styles.icons} />)
          }
          {
            !correct && !wrong && (<Image source={require('../../assets/images/Sound.png')} style={styles.icons} />)
          }
          {
            wrong && (<Image source={require('../../assets/images/Wrong.png')} style={styles.icons} />)
          }
          <ThemedText style={styles.tutorialText}>{instructions}</ThemedText>
          <TextInput
            value={answer}
            style={styles.textInput}
            onChangeText={value => setAnswer(value)}
            placeholder='Enter Answer'
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.box} onPress={speakText}>
              <Text style={styles.tutorialText}>Listen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={submitAnswer}>
              <Text style={styles.tutorialText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
      }
    </ThemedView>
  );

}

const styles = StyleSheet.create({
  icons: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  box: {
    borderWidth: 2,
    borderColor: "#a6a6a6",
    paddingVertical: 10,
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    fontFamily: "Font",
    marginHorizontal: 15,
  },
  topBar: {
    height: 100,
    width: "100%",
    backgroundColor: "#0099db",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#007db3",
  },
  text: {
    color: "white",
    fontSize: 36,
    fontFamily: "Font",
        textAlign:"center",

  },
  tutorialContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textInput: {
    width: "95%",
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#a6a6a6",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
    fontFamily: "Font",
    color: "#0099db",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialText: {
    fontSize: 16,
    color: "#0099db",
    fontFamily: "Font",
        textAlign:"center",
        marginBottom:10,

  },
  tutorialTextHeader: {
    fontSize: 22,
    color: "#0099db",
    fontFamily: "Font",
        textAlign:"center",


  },
  textContainer: {
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  startButton: {
    borderWidth: 2,
    borderColor: "#a6a6a6",
    paddingVertical: 10,
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    fontFamily: "Font",

  }
});

