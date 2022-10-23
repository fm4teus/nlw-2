import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem{
    week_day: number;
    from: string;
    to: string;
}

interface ReqBody{
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
    subject: string;
    cost: number;
    schedule: ScheduleItem[];
}

export default class ClassesController {
    async index( request: Request, response: Response ){
        const filters = request.query;

        const subject = filters.subject as string;
        const time = filters.time as string;
        const week_day = filters.week_day as string;

        
        const timeInMinutes = convertHourToMinutes(time);
        
        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .modify((queryBuilder)=>{
                    week_day ?
                    queryBuilder.whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]) :
                    {}
                } ) 
                .modify((queryBuilder)=>{
                    timeInMinutes ?
                    queryBuilder.whereRaw('`class_schedule`.`from` <= ??', [Number(timeInMinutes)])
                    .whereRaw('`class_schedule`.`to` > ??', [Number(timeInMinutes)]) :
                    {}
                } ) 
            })
            .modify((queryBuilder)=>{
                subject ?
                queryBuilder.where('classes.subject', '=', subject) :
                {}
            } ) 
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);
            response.json( classes );       
    }

    async create( request: Request, response: Response ){
    
        let {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

    try{
        // remove common characteres from whatsapp number
        whatsapp = whatsapp.replace(/[\s\-\(\)]/g,'')

        // set default avatar
        if(!avatar){
            avatar = "https://t3.ftcdn.net/jpg/01/71/25/36/240_F_171253635_8svqUJc0BnLUtrUOP5yOMEwFwA8SZayX.jpg"
        }

        await validate({name,avatar,bio,cost,schedule,subject,whatsapp})
    }catch(err){
        return response.status(400).json({
            error: `Invalid request body: ${err}`
        })
    }

    const trx = await db.transaction();

    try{
        const insertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
        });

        const user_id = insertedUsersIds[0];

        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id,
        });

        const class_id = insertedClassesIds[0];

        const classSchedule = schedule.map( (scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to)
            }
        } )

        await trx('class_schedule').insert(classSchedule);

        await trx.commit();

        return response.status(201).send();
    } catch (err) {
        await trx.rollback();
        return response.status(400).json({
            error: `Unexpected error while creating new ClassSchedule: ${err}`
        })
    }
}
}

async function validate({name,bio,cost,subject,whatsapp}: ReqBody){
    const wrapIfEmpty = (s: string, field: string) => {if (!s) throw `field ${field} should not be empty` }

    // validate empty fields
    wrapIfEmpty(name,"name")
    wrapIfEmpty(bio,"bio")
    wrapIfEmpty(subject,"subject")

    // validate whatsapp
    if(!whatsapp.match(/^[0-9]{10,12}$/)){
        throw 'invalid whatsapp number'
    }

    // validate existing class (subject+whatsapp)
    const classes = await db.raw("SELECT u.name, u.whatsapp FROM users u INNER JOIN classes c ON u.id = c.user_id WHERE u.whatsapp = ? AND subject = ?;",[whatsapp,subject])
    if(classes.length > 0){
        throw 'class already exists'
    }

    // validate cost
    if(cost<20 || cost>200){
        throw 'invalid class value; use a value between 20 and 200 BRL'
    }
}   