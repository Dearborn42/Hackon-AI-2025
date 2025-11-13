import { FlatList, StyleSheet, TouchableOpacity, View, Text, Button, Dimensions, Image } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useEffect, useState } from 'react';
import { giveTip } from '@/backend/fetchCalls';



export default function TabThreeScreen() {
    const [wrong, setWrong] = useState<boolean>(false);
    const [correct, setCorrect] = useState<boolean>(false);
    const [start, setStart] = useState<boolean>(false);
    const [pattern, setPattern] = useState<number[]>([]);
    const [pressedIndexes, setPressedIndexes] = useState<number[]>([]);
    const [inGame, setInGame] = useState(false);
    const [tip, setTip] = useState('')
    const [level, setLevel] = useState(1)
    const [showing, setShowing] = useState(false);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));



    async function giveTips(lost: boolean) {
        setTip(await giveTip(lost));
    }

    const showPattern = async (patternToShow = pattern) => {
        setPressedIndexes([]);
        setShowing(true)
        for (let i = 0; i < patternToShow.length; i++) {
            setPressedIndexes([i]);
            await delay(500);
            setPressedIndexes([]);
            await delay(200);
        }
        setShowing(false)
    };
    const startGame = async () => {
        if (inGame) return;
        setPressedIndexes([]);

        const newPattern = [];
        for (let i = 0; i < level + 3; i++) {
            newPattern.push(Math.floor(Math.random() * 2));
        }

        setPattern(newPattern);
        await showPattern(newPattern);
        setInGame(true);
    };

    function reset(lost: boolean) {
        setInGame(false)
        setPressedIndexes([]);
        giveTips(lost)

    }

    const handlePress = (index: number) => {
        const newPressed = [...pressedIndexes, index];
        setPressedIndexes(newPressed);

        if (pattern[index] === 0) {
            setWrong(true);
            setTimeout(() => {
                setWrong(false);
            }, 1000);
            setTimeout(() => reset(true), 500);

            setTip('Incorrect! Try again.')
            return;
        }

        const allRight =
            newPressed.filter(i => pattern[i] === 1).length === pattern.filter(v => v === 1).length &&
            newPressed.every(i => pattern[i] === 1);

        if (allRight) {
            setTip('Correct!')
            setLevel(level < 13 ? level + 1 : level);

            setCorrect(true);
            setTimeout(() => {
                setCorrect(false);
            }, 1000);
            reset(false);
        }

    };

    const renderItem = ({ item, index }: { item: number; index: number }) => {
        const isPressed = pressedIndexes.includes(index);
        return (
            <TouchableOpacity
                onPress={() => handlePress(index)}
                disabled={!inGame}
                style={[
                    styles.button,
                    { backgroundColor: isPressed ? (item === 1 ? '#0099db' : '#a22633') : '#a6a6a6' },
                ]}
            >
                <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        for (let i = 0; i < level + 3; i++) {
            setPattern(prev => [...prev, Math.floor(Math.random() * 2)]);
        }

    }, [])


    return (<>
        <View style={styles.topBar}>
            <ThemedText style={styles.textHeader}>Memory - Lvl: {level}</ThemedText>
        </View>
        <ThemedView style={styles.container}>

            {
                start == false ? (<>
                    <View style={styles.tutorialContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.tutorialTextHeader}>Tutorial:</Text>
                            <Text style={styles.tutorialText}>1. You will be given a pattern to memorize with BLUE being correct and RED being incorrect.</Text>
                            <Text style={styles.tutorialText}>2. Repeat the pattern by pressing the buttons in the correct order.</Text>
                            <Text style={styles.tutorialText}>3. If you are correct, you will move to the next level with a pattern!</Text>
                            <Text style={styles.tutorialText}>4. Try to get as far as you can!</Text>
                        </View>
                        <TouchableOpacity style={styles.startButton} onPress={() => setStart(true)} >
                            <Text style={styles.tutorialText}>Start Game</Text>
                        </TouchableOpacity>
                    </View>
                </>) :
                    (
                        <>
                            {
                                wrong && <Image source={require('../../assets/images/Wrong.png')} style={styles.icons} />
                            }
                            {
                                correct && <Image source={require('../../assets/images/Correct.png')} style={styles.icons} />
                            }
                            <ThemedText style={styles.text}>{tip}</ThemedText>
                            <View>
                                <FlatList
                                    data={pattern}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={renderItem}
                                    numColumns={4}
                                    scrollEnabled={false}
                                    contentContainerStyle={[styles.grid, { flexGrow: 0 }]}
                                />
                            </View>

                            <TouchableOpacity style={styles.startButton} onPress={startGame} disabled={inGame || showing}>
                                <Text style={styles.tutorialText}
                                >Play Pattern</Text>
                            </TouchableOpacity>
                        </>
                    )
            }
        </ThemedView>
    </>

    );
}



const styles = StyleSheet.create({
    icons: {
        width: 200,
        height: 200,
        marginBottom: 20,
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
    }, tutorialContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    tutorialText: {
        fontSize: 16,
        color: "#0099db",
        fontFamily: "Font",
            textAlign:"center",

    },
    tutorialTextHeader: {
        fontSize: 22,
        color: "#0099db",
        fontFamily: "Font",
            textAlign:"center",


    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },

    topBar: {
        height: 100,
        width: '100%',
        backgroundColor: '#0099db',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#007db3',
    },
    text: {
        color: '#0099db',
        fontSize: 24,
        fontFamily: "Font",
        alignSelf: 'center',
        padding: 20,
        textAlign:"center",
    },
    textHeader: {
        color: 'white',
        fontSize: 34,
        fontFamily: "Font",
    },
    button: {
        width: 80,
        height: 80,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#0099db',
        fontWeight: 'bold',
        fontSize: 10,
        fontFamily: "Font",

    },
    grid: {
        width: "95%",
        marginBottom: 20
    },
});
