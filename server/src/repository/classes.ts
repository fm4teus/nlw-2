import db from '../database/connection';

export default class ClassRepository {
    async filter(subject: string, timeInMinutes: (number|false), weekDay: string){
        const classes = await db('classes')
        .whereExists(function(){
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .modify((queryBuilder)=>{
                weekDay ?
                queryBuilder.whereRaw('`class_schedule`.`week_day` = ??', [Number(weekDay)]) :
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

        return classes;
    }

    
}