import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from '../pages/Favorites';
import TeacherList from '../pages/TeacherList';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs(){
    return(
        <Navigator
         tabBarOptions={{
             style:{
                elevation: 0,
                shadowOpacity: 0,
                height: 64
             },
             tabStyle:{
                 flexDirection: 'row',
                 justifyContent: 'center',
                 alignItems: 'center'
             },
             iconStyle:{
                 flex: 0,
                 height: 20,
                 width: 20,
             },
             labelStyle:{
                 fontFamily: 'Archivo_700Bold',
                 fontSize: 13,
                 marginLeft: 16,
             },
             inactiveBackgroundColor: '#fafafc',
             activeBackgroundColor: '#ebebf5',
             inactiveTintColor: '#c1bccc',
             activeTintColor: '#32264d',
         }}
        >
            <Screen 
                name="TeacherList" 
                component={TeacherList}
                options={{
                    tabBarLabel: "Professores",
                    tabBarIcon: ( {color, size, focused} )=>{
                        return <FontAwesome5 
                                    name={focused ? 'book-open' : 'book' } 
                                    size={size} 
                                    color={color} 
                                />
                    }}
                }
            />
            <Screen 
                name="Favorites" 
                component={Favorites} 
                options={{
                    tabBarLabel: "Favoritos",
                    tabBarIcon: ({size, color, focused}) => {
                        return <FontAwesome 
                                    name={ focused ? 'star' : 'star-o' } 
                                    size={size}
                                    color={color}
                                />
                    }
                    
                }}
            />
        </Navigator>
    );
}

export default StudyTabs;