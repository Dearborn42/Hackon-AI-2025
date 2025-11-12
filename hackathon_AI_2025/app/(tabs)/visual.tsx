import { Image } from 'expo-image';
import { Platform, StyleSheet, Button, View, Text, Pressable, TextInput  } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useEffect, useState } from 'react';
import { pictureGame } from '@/backend/fetchCalls';

export default function TabSevenScreen() {
    const [picture, setPicture] = useState<string>("");
    const [start, setStart] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>("");
    const [answerOptions, setAnswerOptions] = useState<string[]>([]);
    const [userQuess, setUserQuess] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(2);
    function changeDiff(){
        if(difficulty < 4)
            setDifficulty((prev)=> prev + 1)
        else if(difficulty == 4)
            setDifficulty(2);
        setUserQuess("");
        setAnswer("");
        setAnswerOptions([]);
        setPicture("");
        setStart(true);
    }
    function submitAnswer(quess: string):void{
        if(quess === ""){
            alert("Pick an option");
            return;
        }
        if(quess === answer){
            changeDiff();
        }else
            alert("try again");
    }
    function shuffleArray<T>(array: string[]): string[] {
        const newArray = [...array]; // copy so we don’t mutate the original
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // swap
        }
        return newArray;
    }
    useEffect(function(){
        console.log("Run UseEffect");
        if(start){
            console.log("Run Start" + " Difficulty: "+difficulty)
            pictureGame(difficulty).then((res) => {
                if(res.result && res.emotionOptions && res.emotionOptions.length > 0  && res.image){
                    setAnswer(res.emotionOptions[0]);
                    setAnswerOptions(shuffleArray(res.emotionOptions));
                    setPicture(res.image);
                    setStart(false);
                }else{
                    alert(res.error);
                    return;
                }
            })
        }
        return;
    }, [start])
    return (
        <View>
        <ThemedView style={styles.titleContainer}>
            {
                picture !== "" ? (
                    <Image
                        source={{ uri: picture }}
                        style={{ width: 300, height: 300 }}
                    />
                ) : (<></>)
            }
            {
                answerOptions.length > 1 ? (
                    <>
                        <View style={styles.container}>
                            {answerOptions.map((item, index) => (
                                <Pressable  key={index} style={styles.box} onPress={()=>setUserQuess(item)}>
                                    <Text style={styles.text}>{item}</Text>
                                </Pressable>
                            ))}
                        </View>
                        <Button
                            title="Submit answer"
                            onPress={() => submitAnswer(userQuess)}
                        />
                    </>
                ) : start ? (<></>) : (
                    <Button 
                        title="StartGame"
                        onPress={()=>setStart(true)}
                    />
                )
            }
        </ThemedView>
        </View>
    );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flexDirection: "row",     // lay boxes horizontally
    flexWrap: "wrap",         // wrap to next line if needed
    justifyContent: "center", // center if fewer than 4
    gap: 10,                  // requires RN 0.71+ (use margin otherwise)
    padding: 10,
  },
  box: {
    width: "45%",             // roughly 2 boxes per row
    maxWidth: 150,            // limit box width
    aspectRatio: 1,           // make it square
    backgroundColor: "#ADD8E6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
