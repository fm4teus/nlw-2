import React, { useState } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import styles from './styles'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';

function Favorites(){
    const [ favorites, setFavorites ] = useState([]);

    function loadFavorites() {
      AsyncStorage.getItem('favorites').then(response => {
        if (response) {
          const favoritedTeachers = JSON.parse(response)
          setFavorites(favoritedTeachers);
        }
      });
    }
  
    useFocusEffect(() => {
      loadFavorites();
    });
    return(
        <View style={styles.container}>
        <PageHeader title="Seus favoritos" />
        <ScrollView style={styles.teacherList}>
            {favorites.map((teacher: Teacher) => {
            return (
                <TeacherItem 
                key={teacher.id}
                teacher={teacher}
                favorited
                />
            );
            })}
        </ScrollView>
    </View>
    );
}

export default Favorites;