import {describe, expect, test} from '@jest/globals';
import {validate, ReqBody} from './ClassesController';

test('Sem nome', ()=> {
    let body: ReqBody = {
        avatar: "teste",
        bio: "",
        cost:0,
        name:"",
        subject:"",
        whatsapp:"",
        schedule:[]
    };
    expect(async () => {await validate(body)}).rejects.toBe(`field name should not be empty`);
});

test('Sem nome', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "",
        cost:0,
        name:"Akali",
        subject:"",
        whatsapp:"",
        schedule:[]
    };
    expect(async () => {await validate(body)}).rejects.toBe(`field bio should not be empty`);
});

test('Já existe um anúncio parecido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:64,
        name:"Akali",
        subject:"Biologia",
        whatsapp:"32984444444",
        schedule:[]
    };
    expect(async () => {await validate(body)}).rejects.toBe(`class already exists`);
});



export default null;