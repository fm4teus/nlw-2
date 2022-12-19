import {describe, expect, test} from '@jest/globals';
import ClassRepository from './classes';

const classRepository = new ClassRepository();

test('Sem professores', ()=> {
    expect(classRepository.filter("Matemática",1000,"4")).resolves.toHaveLength(0);
});

test('Sem filtros - todos os professores', ()=> {
    expect(classRepository.filter("",false,"")).resolves.toHaveLength(3);
});

test('Professores de biologia', ()=> {
    expect(classRepository.filter("Biologia",false,"")).resolves.toHaveLength(2);
});

const listContainingAtila = [{
    id: 2,
    subject: 'Biologia',
    cost: 50,
    user_id: 2,
    name: 'Atila Iamarino',
    avatar: 'https://f.i.uol.com.br/fotografia/2020/04/07/15862815425e8cbc46c9d75_1586281542_1x1_th.jpg',
    whatsapp: '21 9999 9999',
    bio: 'Doutor em ciências pela USP, fez pesquisa na Universidade de Yale. É divulgador científico no YouTube em seu canal pessoal e no Nerdologia'
  }]

//17*60+59 = 17:59 em minutos
test('Valor limite 5:59PM - nenhum professor', ()=> {
    expect(classRepository.filter("",17*60+59,"")).resolves.toHaveLength(0);
});

//18*60 = 18:00 em minutos
test('Valor limite 6:00PM - prof. Atila', async ()=> {
    const classes = await classRepository.filter("",18*60,"");
    expect(classes).toEqual(listContainingAtila);
});

//18*60+1 = 18:01 em minutos
test('Valor limite 6:01PM - prof. Atila', async ()=> {
    const classes = await classRepository.filter("",18*60+1,"");
    expect(classes).toEqual(listContainingAtila);
});

//20*60+58 = 20:58 em minutos
test('Valor limite 8:58PM - prof. Atila', async ()=> {
    const classes = await classRepository.filter("",20*60+58,"");
    expect(classes).toEqual(listContainingAtila);
});

//20*60+59 = 20:59 em minutos
test('Valor limite 8:59PM - prof. Atila', async ()=> {
    const classes = await classRepository.filter("",20*60+59,"");  
    expect(classes).toHaveLength(1);
    expect(classes).toEqual(listContainingAtila);
});

//21*60 = 21:00 em minutos
test('Valor limite 9:00PM - nenhum Professor', ()=> {
    expect(classRepository.filter("",21*60,"")).resolves.toHaveLength(0);
});

export default null;