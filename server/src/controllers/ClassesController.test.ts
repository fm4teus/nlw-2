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

test('Valor Limite R$19,00: valor inválido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:19,
        name:"Akali",
        subject:"Biologia",
        whatsapp:"32984444445",
        schedule:[]
    };
    expect(async () => {await validate(body)}).rejects.toBe(`invalid class value; use a value between 20 and 200 BRL`);
});

test('Valor Limite R$20,00: valor inválido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:20,
        name:"Akali",
        subject:"Biologia",
        whatsapp:"32984444445",
        schedule:[]
    };
    expect(validate(body)).resolves.toBe(true);
});

test('Valor Limite R$21,00: valor inválido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:21,
        name:"Akali",
        subject:"Biologia",
        whatsapp:"32984444445",
        schedule:[]
    };
    expect(validate(body)).resolves.toBe(true);
});

test('Valor Limite R$199,00: valor inválido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:199,
        name:"Akali",
        subject:"Biologia",
        whatsapp:"32984444445",
        schedule:[]
    };
    expect(validate(body)).resolves.toBe(true);
});

test('Valor Limite R$200,00: valor inválido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:200,
        name:"Akali",
        subject:"Biologia",
        whatsapp:"32984444445",
        schedule:[]
    };
    expect(validate(body)).resolves.toBe(true);
});

test('Valor Limite R$201,00: valor inválido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:201,
        name:"Akali",
        subject:"Biologia",
        whatsapp:"32984444445",
        schedule:[]
    };
    expect(async () => {await validate(body)}).rejects.toBe(`invalid class value; use a value between 20 and 200 BRL`);
});

test('Valor Limite whatsapp 9 digitos: valor inválido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:199,
        name:"Arthur Silva",
        subject:"Biologia",
        whatsapp:"219999999",
        schedule:[]
    };
    expect(async () => {await validate(body)}).rejects.toBe(`invalid whatsapp number`);
});
test('Valor Limite whatsapp 10 digitos: valor válido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:199,
        name:"Arthur Silva",
        subject:"Biologia",
        whatsapp:"2199999999",
        schedule:[]
    };
    expect(validate(body)).resolves.toBe(true);
});
test('Valor Limite whatsapp 11 digitos: valor válido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:199,
        name:"Arthur Silva",
        subject:"Biologia",
        whatsapp:"21999999999",
        schedule:[]
    };
    expect(validate(body)).resolves.toBe(true);
});
test('Valor Limite whatsapp 12 digitos: valor válido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:199,
        name:"Arthur Silva",
        subject:"Biologia",
        whatsapp:"21999999999",
        schedule:[]
    };
    expect(validate(body)).resolves.toBe(true);
});
test('Valor Limite whatsapp 13 digitos: valor inválido', ()=> {
    let body: ReqBody = {
        avatar: "",
        bio: "uma bio",
        cost:199,
        name:"Arthur Silva",
        subject:"Biologia",
        whatsapp:"0219999999992",
        schedule:[]
    };
    expect(async () => {await validate(body)}).rejects.toBe(`invalid whatsapp number`);
});


export default null;