function convertHourToMinutes( time: string ){
    if(!time)
        return false;
    const [hours, minutes] = time.split(':').map(Number);
    return 60*hours + minutes;
}
export default convertHourToMinutes;