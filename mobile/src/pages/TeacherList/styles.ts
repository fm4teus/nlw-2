import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7'
    },
    teacherList:{
        marginTop: -40,
        padding: 10,
    },
    searchForm:{
        marginBottom: 8
    },
    label:{
        color: '#d4c2ff',
        fontFamily: 'Poppins_400Regular'
    },
    input:{
        height: 54,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal:16,
        marginTop: 4,
        marginBottom: 16
    },
    inputGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputBlock:{
        width: '48%'
    },
    buttonSearch:{
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonSubmit:{
        backgroundColor: '#04d361',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 8
    },
    buttonSubmitText:{
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 16
    }
});

export default styles;