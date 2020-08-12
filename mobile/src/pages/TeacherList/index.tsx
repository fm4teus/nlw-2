import React, { useState } from 'react';
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import PageHeader from '../../components/PageHeader';
import styles from './styles';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';

import {FontAwesome} from '@expo/vector-icons'
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){

    const[favorites, setFavorites] = useState<number[]>([]);

    const [isFiltersVisible,setFiltersVisible] = useState(false);

    function handleFiltersVisible(){
        setFiltersVisible(!isFiltersVisible);
    }

    useFocusEffect(()=>{
        //handleFiltersSubmit();
    })

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function handleFiltersSubmit(){
        loadFavorites();

        const response = await api.get('classes', {
            params:{
                subject,
                week_day,
                time
            }
        });
        setTeachers(response.data);
        console.log(response.data);
    }

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
          if (response) {
            const favoritedTeachers = JSON.parse(response)
            const favoritedTeachersIds = favoritedTeachers.map(
              (teacher: Teacher) => {
                return teacher.id;
              }
            );
    
            setFavorites(favoritedTeachersIds);
          }
        });
      }

    return(
        <View style={styles.container}>
            <PageHeader    
                title="Professores disponíveis" 
                headerRight={
                    <BorderlessButton 
                        style={styles.buttonSearch}
                        onPress={handleFiltersVisible}>
                        <FontAwesome 
                            name={isFiltersVisible ?
                                    'close':'search' } 
                            size={24} 
                            color='#fff'
                        />
                    </BorderlessButton>
                }>
                {isFiltersVisible && (
                <>
                <View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Qual é matéria?"
                        placeholderTextColor='#c1bccc'
                        
                        onChangeText={(text)=>setSubject(text)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <View style={styles.inputBlock}>
                        <Text style={styles.label}>Dia da semana</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Qual dia?"
                            placeholderTextColor='#c1bccc'
                            onChangeText={(text)=>setWeekDay(text)}
                        />
                    </View>
                    <View style={styles.inputBlock}>
                        <Text style={styles.label}>Horário</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Que horas?"
                            placeholderTextColor='#c1bccc'
                            onChangeText={(text)=>setTime(text)}
                        />
                    </View>
                </View>
                <RectButton style={styles.buttonSubmit} onPress={handleFiltersSubmit}>
                    <Text style={styles.buttonSubmitText} >Pesquisar</Text>
                </RectButton>
                </>)}
            </PageHeader>
            <ScrollView style={styles.teacherList}>
                { teachers.map(((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} favorited={favorites.includes(teacher.id)} teacher={teacher} />
                }))}
            </ScrollView>
        </View>
    );
}

export default TeacherList;