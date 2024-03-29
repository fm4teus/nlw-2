import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

function translateError(e:string){
    if(e.includes("field name should not be empty")){
        return "Nome não preenchido"
    }
    if(e.includes("field bio should not be empty")){
        return "Biografia não preenchida"
    }
    if(e.includes("field subject should not be empty")){
        return "Matéria não preenchida"
    }
    if(e.includes("invalid whatsapp number")){
        return "Número de whatsapp inválido"
    }
    if(e.includes("class already exists")){
        return "Já existe um anúncio parecido"
    }
    if(e.includes("invalid class value; use a value between 20 and 200 BRL")){
        return "Valor inválido, deve estar entre R$20 e R$200"
    }
}

function TeacherForm(){

    const history = useHistory();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");
    
    const [subject, setSubject] = useState("");
    const [cost, setCost] = useState("");

    const [ scheduleItems , setScheduleItems ] = useState([
        {week_day: 0, from: "", to: ""}
    ]);

    function handleCreateClass(event: FormEvent){
        event.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(()=>{alert("cadastro realizado com sucesso"); history.push('/')}).catch((err)=>{alert(`Erro no cadastro: ${translateError(err.response.data.error)}`)})

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        });
    }

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from:"",
                to:""
            }
        ]);
    }

    function setScheduleItemValue( position: number, field: string, value: string ){
        const updatedScheduleItems = scheduleItems.map( (scheduleItem, index) => {
            if (index === position)
                return { ...scheduleItem, [field]: value }
            return scheduleItem;
        } );
        setScheduleItems( updatedScheduleItems );
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas"
                description = "O primeiro passo é preencher esse formulário de inscrição"        
            />
            
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input 
                            name="name" 
                            label="Nome Completo" 
                            value={name} 
                            onChange={(event)=>{ setName(event.target.value) }} 
                        />
                        <Input 
                            name="avatar"  
                            label="Avatar"
                            value={avatar}
                            onChange={(event)=>{ setAvatar(event.target.value) }} 
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(event)=>{ setWhatsapp(event.target.value) }} 
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={(event)=>{ setBio(event.target.value) }} 
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            name="subject" 
                            label="Matéria" 
                            options={[
                                { value: "Artes", label: "Artes" },
                                { value: "Biologia", label: "Biologia" },
                                { value: "Física", label: "Física" },
                                { value: "Matemática", label: "Matemática" },
                                { value: "Química", label: "Química" },
                                { value: "Português", label: "Português" },
                            ]}
                            value={subject}
                            onChange={(event)=>{ setSubject(event.target.value) }}
                        />
                        <Input 
                            name="cost" 
                            label="Custo da aula por hora"
                            value={cost}
                            onChange={(event)=>{setCost(event.target.value)}}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return(
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select 
                                    name="week_day" 
                                    label="Dia da semana"
                                    value={scheduleItem.week_day}
                                    onChange={event => setScheduleItemValue(index,"week_day",event.target.value)}
                                    options={[
                                        { value: "0", label: "Domingo" },
                                        { value: "1", label: "Seginda-feira" },
                                        { value: "2", label: "Terça-feira" },
                                        { value: "3", label: "Quarta-feira" },
                                        { value: "4", label: "Quinta-feira" },
                                        { value: "5", label: "Sexta-feira" },
                                        { value: "6", label: "Sábado" },
                                    ]}
                                />
                                <Input 
                                    name="from" 
                                    label="Das" 
                                    type="time"
                                    onChange={event => setScheduleItemValue(index,"from",event.target.value)} 
                                />
                                <Input name="to" 
                                    label="Até" 
                                    type="time"
                                    onChange={event => setScheduleItemValue(index,"to",event.target.value)} 
                                />
                            </div>);
                        })}
                        
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Importante"/>
                            Importante! <br/>
                            Preencha todos os dados.
                        </p>
                        <button type="submit">Salvar Cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;