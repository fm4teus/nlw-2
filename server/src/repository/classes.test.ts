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

export default null;