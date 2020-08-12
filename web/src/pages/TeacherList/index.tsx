import React, { useState, FormEvent, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';

import './styles.css'
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList(){
    
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    
    async function searchTeachers( event?: FormEvent ){
        if(event)
            event.preventDefault();
        
        //const filterParams = {}
        
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

    useEffect(()=> {searchTeachers()},[]);

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os Proffy's disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers} >
                <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={event=>{setSubject(event.target.value)}}
                        options={[
                            { value: "Artes", label: "Artes" },
                            { value: "Biologia", label: "Biologia" },
                            { value: "Física", label: "Física" },
                            { value: "Matemática", label: "Matemática" },
                            { value: "Química", label: "Química" },
                            { value: "Português", label: "Português" },
                        ]}
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da Semana"
                        value={week_day}
                        onChange={event=>{setWeekDay(event.target.value)}} 
                        options={[
                            { value: "0", label: "Domingo" },
                            { value: "1", label: "Segunda-feira" },
                            { value: "2", label: "Terça-feira" },
                            { value: "3", label: "Quarta-feira" },
                            { value: "4", label: "Quinta-feira" },
                            { value: "5", label: "Sexta-feira" },
                            { value: "6", label: "Sábado" },
                        ]}
                    />
                    <Input 
                        type="time" 
                        name="time"
                        value={time}
                        onChange={event=>{setTime(event.target.value)}} 
                        label="Horário" 
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>
            <main>
                { teachers.map(((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                }))}
            </main>
        </div>
    );
}

export default TeacherList;