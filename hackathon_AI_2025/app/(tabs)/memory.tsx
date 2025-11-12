import { FlatList, StyleSheet, TouchableOpacity, View, Text, Button, Dimensions } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { giveTip } from '@/backend/fetchCalls';



export default function TabThreeScreen() {
    const [pattern, setPattern] = useState<number[]>([0, 1, 1, 0, 0, 1, 1, 0]);
    const [pressedIndexes, setPressedIndexes] = useState<number[]>([]);
    const [inGame, setInGame] = useState(false);
    const [tip, setTip] = useState('This is a tip')

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


    async function giveTips(lost: boolean) {
        setTip(await giveTip(lost));
    }

    const showPattern = async () => {
        setPressedIndexes([]);

        for (let i = 0; i < pattern.length; i++) {
            setPressedIndexes([i]);
            await delay(500);
        }

        setPressedIndexes([]);
    };

    const startGame = async () => {
        if (inGame) return;

        await showPattern();
        setInGame(true);
    };

    function reset(lost: boolean) {
        setPattern([Math.floor(Math.random() * 2), Math.floor(Math.random() * 2), Math.floor(Math.random() * 2), Math.floor(Math.random() * 2), Math.floor(Math.random() * 2), Math.floor(Math.random() * 2), Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)])
        setPressedIndexes([]);
        setInGame(false);
        giveTips(lost)

    }

    const handlePress = (index: number) => {
        const newPressed = [...pressedIndexes, index];
        setPressedIndexes(newPressed);

        if (pattern[index] === 0) {
            setTimeout(() => reset(true), 500);

            alert("You lost :( try again");
            return;
        }

        const allRight =
            newPressed.filter(i => pattern[i] === 1).length === pattern.filter(v => v === 1).length &&
            newPressed.every(i => pattern[i] === 1);

        if (allRight) {
            alert("You got it!");
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
                    { backgroundColor: isPressed ? (item === 1 ? 'blue' : 'red') : 'gray' },
                ]}
            >
                <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.topBar}>
                <ThemedText style={styles.text}>Memory Game</ThemedText>
            </View>
            <ThemedText style = {styles.text}>{tip}</ThemedText>
            <FlatList
                data={pattern}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                numColumns={4}
                contentContainerStyle={styles.grid}
            />

            <Button title="Start Game" onPress={startGame} disabled={inGame} />
        </ThemedView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    topBar: {
        height: 100,
        width: '100%',
        backgroundColor: '#028090',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#025964',
        marginBottom: 20,
    },
    text: {
        color: 'white',
        fontSize: 36,
        fontWeight: '700',
    },
    button: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    grid: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
