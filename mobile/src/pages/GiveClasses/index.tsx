import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import giveClassesBgImg from '../../assets/images/give-classes-background.png';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses(){
    const { navigate } = useNavigation();

    function handleOkButton(){
        navigate('Landing');
    }

    return(
        <View style={styles.container}>
            <ImageBackground 
                resizeMode="contain" 
                source={giveClassesBgImg} 
                style={styles.content} 
            >
                <Text style={styles.title} >Quer ser um professor?</Text>
                <Text style={styles.description}>
                    Para começar você deve se cadastrar na nossa plataforma web!
                </Text>
            </ImageBackground>
            <RectButton onPress={handleOkButton} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo Bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;