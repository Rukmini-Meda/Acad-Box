export default class CalendarEvent{
    static toDict(id, start, end, courseName, courseCode){
        return {
            id: id,
            start: start,
            end: end,
            title: courseName + " " + courseCode
        }
    }
}