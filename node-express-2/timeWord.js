function timeWord(hour, minute) {
    
    let count = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty one", "twen two", "twenty three", "twenty four", "twenty five", "twenty six", "twenty seven", "twenty eight", "twenty nine", "thirty"]

    let ampm = "am";

    // IF MINUTE IS EQUAL TO 1
    if (minute === 1 && hour === 12) {
        ampm = "pm"
        return count[minute] + " minute past " + count[hour] + ` ${ampm}`;
    } else
    if (minute === 1 && hour > 12) {
        ampm = "pm"
        return count[minute] + " minute past " + count[hour - 12] + ` ${ampm}`;
    } else
    if (minute === 1 && hour <= 11) {
        if (hour === 0) {
            hour = 12
        }
        return count[minute] + " minute past " + count[hour] + ` ${ampm}`;
    }

    // IF MINUTE IS EQUAL TO 59
    if (minute === 59 && hour >= 12) {
        ampm = "pm"
        return count[60 - minute] + " minute to " + count[hour + 1 - 12] + ` ${ampm}`;
    } else
    if (minute === 59 && hour === 11) {
        ampm = "pm"
        return count[60 - minute] + " minute to " + count[hour + 1] + ` ${ampm}`;
    } else
    if (minute === 59 && hour <= 10) {
        return count[60 - minute] + " minute to " + count[hour + 1] + ` ${ampm}`;
    } 
    if (minute === 59 && hour === 0) {
        hour = 12
        return count[60 - minute] + " minute to " + count[hour + 1 - 12] + ` ${ampm}`;
    } 

    // IF MINUTE EQUALS 0
    if (minute === 0 && hour < 12) {
        if (hour === 0) {
            hour = 12
        }
        return count[hour] + ` o'clock ${ampm}`;
    } else
    if (minute === 0 && hour >= 12) {
        ampm = "pm"
        return count[hour - 12] + ` o'clock ${ampm}`;
    }

    // IF MINUTE IS LESS THAN 30 BUT NOT ONE
    if (minute < 30 && minute != 1 && hour < 12) {
        if (hour === 0) {
            hour = 12
        }
        return count[minute] + " minutes past " + count[hour] + ` ${ampm}`;
    } else
    if (minute < 30 && minute != 1 && hour === 12) {
        ampm = "pm"
        return count[minute] + " minutes past " + count[hour] + ` ${ampm}`;
    } else
    if (minute < 30 && minute != 1 && hour > 12) {
        ampm = "pm"
        return count[minute] + " minutes past " + count[hour - 12] + ` ${ampm}`;
    } 

    // IF MINUTE IS GREATER THAN 30 BUT NOT 59
    if (minute > 30 && minute != 59 && hour <= 10) {
        return count[60 - minute] + " minutes to " + count[hour + 1] + ` ${ampm}`;
    } else
    if (minute > 30 && minute != 59 && hour === 0) {
        hour = 12
        return count[60 - minute] + " minute to " + count[hour + 1 - 12] + ` ${ampm}`;
    } else
    if (minute > 30 && minute != 59 && hour === 11) {
        ampm = "pm"
        return count[60 - minute] + " minutes to " + count[hour + 1] + ` ${ampm}`;
    } else
    if (minute > 30 && minute != 59 && hour >= 12) {
        ampm = "pm"
        return count[60 - minute] + " minutes to " + count[hour + 1 - 12] + ` ${ampm}`;
    } 

    // IF MINUTE EQUALS 30
    if (minute === 30 && hour <= 11) {
        if (hour === 0) {
            hour = 12
        }
        return "Half past " + count[hour] + ` ${ampm}`;
    } else
    if (minute === 30 && hour === 12) {
        ampm = "pm"
        return "Half past " + count[hour] + ` ${ampm}`;
    } else
    if (minute === 30 && hour > 12) {
        ampm = "pm"
        return "Half past " + count[hour - 12] + ` ${ampm}`;
    }
}

module.exports = timeWord