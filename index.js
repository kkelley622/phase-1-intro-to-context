// Your code here

// function createEmployeeRecord (employee) {

//     return {
//         firstName: employee[0],
//         familyName: employee[1],
//         title: employee[2],
//         payPerHour: employee[3],
//         timeInEvents: [],
//         timeOutEvents: []
//     }
// }

// function createEmployeeRecords (employees) {
//     return employees.map(employee => createEmployeeRecord(employee))

// }

// function createTimeInEvent(event) {
//     let hour = timeInEvents[0],
//     let date = timeInEvents[]
//     let eventObj = {
//         type: "TimeIn",
//         hour,
//         date
//     }

// this.timeInEvents.push(eventObj)
//     return this 
// }

const createEmployeeRecord = (recArray) => {
    return  {
        firstName: recArray[0],
        familyName: recArray[1],
        title: recArray[2],
        payPerHour: recArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = function (employeeObject, dateStamp) {
    // const [date, hour] = dateStamp.split(" ")
    // const dateStampString = dateStamp.toString()
    const [date, hour] = dateStamp.split(" ")
    // console.log("this is the date", date)
    // console.log("this is the hour", hour)
    const inEvent =
     {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }

    employeeObject.timeInEvents.push(inEvent)

    return employeeObject
}

const createTimeOutEvent = function (employeeObject, dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    const outEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }

    employeeObject.timeOutEvents.push(outEvent)
    return employeeObject
}

const hoursWorkedOnDate = function (employeeObject, targetDate) {
    const hoursIn = employeeObject.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const hoursOut = employeeObject.timeOutEvents.find(outEvent => outEvent.date === targetDate)
    return (hoursOut.hour - hoursIn.hour) / 100
    // if(targetDate === employeeObject.timeInEvents.date) {
    //     return employeeObject.timeInEvents.hour - employeeObject.timeOutEvents.hour
    // }
}

const wagesEarnedOnDate = function (employeeObject, targetDate) {
    const earnedWages =  hoursWorkedOnDate(employeeObject, targetDate) * employeeObject.payPerHour 
    return earnedWages 
}

const allWagesFor = function (employeeObject) {
    const eligibleDates = employeeObject.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employeeObject, d)
    }.bind(employeeObject), 0)

    return payable 
}

const calculatePayroll = function(recordsArray){
    return recordsArray.reduce((total, rec) => {
       return total + allWagesFor(rec)
    }, 0)
    
}