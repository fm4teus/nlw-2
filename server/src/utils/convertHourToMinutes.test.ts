import {describe, expect, test} from '@jest/globals';
import convertHourToMinutes from './convertHourToMinutes';

test('10:30 são 630 minutos', ()=> {
    expect(convertHourToMinutes("10:30")).toBe(630);
});

test('12:00 são 720 minutos', ()=> {
    expect(convertHourToMinutes("12:00")).toBe(720);
});

export default null;