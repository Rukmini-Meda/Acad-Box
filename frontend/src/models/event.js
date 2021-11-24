class Event{
    static toDict(name, code, numStudents, percentage, start, end){
        return {
            courseName: name,
            courseCode: code,
            numberOfStudents: numStudents,
            percentageOfStudentsAllowed: percentage,
            startTime: start,
            endTime: end
        }
    }
}

export default Event