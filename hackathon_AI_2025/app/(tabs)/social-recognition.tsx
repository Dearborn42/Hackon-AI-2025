import { Image } from 'expo-image';
import { Platform, StyleSheet, Button, View, Text, TouchableOpacity, TextInput  } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useEffect, useState } from 'react';
import { pictureGame } from '@/backend/fetchCalls';
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6';

export default function TabSevenScreen() {
    const [load, setLoad] = useState<boolean>(false);
    const [wrong, setWrong] = useState<boolean>(false);
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
            setDifficulty(4);
        setUserQuess("");
        setAnswer("");
        setAnswerOptions([]);
        setPicture("");
        setStart(true);
    }
    function submitAnswer(quess: string):void{
        setLoad(false);
        if(quess === ""){
            alert("Pick an option");
            return;
        }
        if(quess === answer){
            setWrong(false);
            changeDiff();
        }else{
            setWrong(true);
            setTimeout(() => {
                setWrong(false);
            }, 1500)
        }
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
        <ThemedView style={styles.titleContainer}>
            <View style={styles.topBar}>
                {/* <Image source={require('../../assets/images/Fire.png')} style={{ width: iconSize, height: iconSize}}/> */}
                <Text style={styles.textHeader}>Social Cues</Text>
            </View>
            {wrong && 
                    <Image source={require('../../assets/images/Wrong.png')} style={styles.wrong}/>
            }
            <View style={styles.container}>
            {
                picture !== "" ? (
                    <Image
                        source={{ uri: picture }}
                        style={styles.face}
                    />
                ) : (<></>)
            }
            {
                answerOptions.length > 1 ? (
                    <>
                        <View style={styles.optionsContainer}>
                            {answerOptions.map((item, index) => {
                                    const isSelected = userQuess === item;
                                    return(
                                        <TouchableOpacity key={index} style={[styles.box, isSelected && styles.selected]} onPress={()=>{
                                    setUserQuess(item)
                                }
                                }>
                                    <Text style={[styles.optionsText, isSelected && styles.selected]}>{item}</Text>
                                </TouchableOpacity>
                                    )
                            })}
                        <TouchableOpacity style={styles.startButton} onPress={() => submitAnswer(userQuess)}>
                            <Text style={styles.text}>Submit Answer</Text>
                        </TouchableOpacity>
                        </View>
                        
                    </>
                ) : start ? (<>

                {
                    load ? (<>
                    <Image source={require('../../assets/images/Loading.png')} style={{ width: 200, height: 200, alignSelf:"center", marginTop:"60%"}}/>
                    <Text style={{fontSize:28,fontFamily:"Font", color:"#0099db", alignSelf:"center", marginTop:10}}>Loading...</Text>
                
                        </>
                ) : (
                    <>
                    <Image source={require('../../assets/images/Correct.png')} style={{ width: 200, height: 200, alignSelf:"center", marginTop:"60%"}}/>

                    <Text style={{fontSize:28,fontFamily:"Font",  color:"#0099db", alignSelf:"center", marginTop:10}}>Correct!</Text>
                    </>
                )
                }

                </>) : (
                    <View style={styles.tutorialContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.tutorialTextHeader}>Tutorial:</Text>
                            <Text style={styles.tutorialText}>1. You will see a face showing an emotion.</Text>
                            <Text style={styles.tutorialText}>2. Select the emotion you think the face is showing from the options below.</Text>
                            <Text style={styles.tutorialText}>3. If you are correct, you will move to the next level with a new face and more options!</Text>
                            <Text style={styles.tutorialText}>4. Try to get as far as you can!</Text>
                        </View>
                        <TouchableOpacity style={styles.startButton} onPress={() => { 
                            setStart(true);
                            setLoad(true);     
                            }}>
                            <Text style={styles.text}>Start Game</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            </View> 
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    wrong:{
        height:200,
        width:200,
        position:"absolute",
        top:"30%",
        left:"25%",
        zIndex:10,
    },
    selected:{
        color:"white",
        borderColor:"#007db3",
        backgroundColor:"#0099db",
    },
    tutorialContainer:{
    justifyContent:"center",
    alignItems:"center",
    flex:1,
  }, 
  tutorialText:{
    fontSize:16,
    fontFamily:"Font",
    color:"#0099db",
  },
  tutorialTextHeader:{
    fontSize:22,
    color:"#0099db",    
    fontFamily:"Font",

  },
    textContainer:{
    justifyContent:"center",
    marginBottom:20,
    paddingHorizontal:20,
  },   
  startButton:{
    borderWidth:2,  
    borderColor:"#a6a6a6",
    paddingVertical:10,
    width:"75%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
  },
  face:{
    flex:1,
    marginHorizontal:40,
    marginTop:20,
  },
  titleContainer: {
    flex: 1,
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
    flex: 1,
  },
  optionsContainer: {
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
    backgroundColor: "none",
    justifyContent: "center",
    alignItems: "center",
    borderWidth:2,  
    borderColor:"#a6a6a6",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontFamily:"Font",
    color: "#0099db",
  },
  optionsText: {
    fontSize: 12,
    fontFamily:"Font",
    color: "#0099db",
  },
  bgContainer: {
    height:"100%",
    backgroundColor:"white",
  },
  topBar:{
    height:100,
    width:"100%", 
    backgroundColor:"#0099db",
    flexDirection:"row",
    alignItems:"center",
    paddingLeft:10,
    borderBottomWidth:2,
    borderBottomColor:"#007db3",
  },
  icons:{
    color:"white",
    marginRight:10,
  },
  textHeader:{
    color:"white",
    fontSize:40,
    fontFamily:"Font",
  },
});
