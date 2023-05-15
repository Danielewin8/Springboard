const timeWord = require('./timeWord');

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });
  
  // IF MINUTE IS EQUAL TO 1
  test('12:01, hour equal to twelve', () => {
    const result = timeWord(12, 1);
    expect(result).toEqual("one minute past twelve pm")
  })
  test('13:01, hour greater than twelve', () => {
    const result = timeWord(13, 1);
    expect(result).toEqual("one minute past one pm")
  })
  test('11:01, hour less than or equal to eleven', () => {
    const result = timeWord(11, 1);
    expect(result).toEqual("one minute past eleven am")
  })
  test('0:01, hour equal to 0', () => {
    const result = timeWord(0, 1);
    expect(result).toEqual("one minute past twelve am")
  })

  // IF MINUTE IS EQUAL TO 59
  test('12:59, hour equal to twelve', () => {
    const result = timeWord(12, 59);
    expect(result).toEqual("one minute to one pm")
  })
  test('14:59, hour greater than twelve', () => {
    const result = timeWord(14, 59);
    expect(result).toEqual("one minute to three pm")
  })
  test('11:59, hour equal to eleven', () => {
    const result = timeWord(11, 59);
    expect(result).toEqual("one minute to twelve pm")
  })
  test('10:59, hour less than or equal to ten', () => {
    const result = timeWord(10, 59);
    expect(result).toEqual("one minute to eleven am")
  })
  test('0:59, hour equal to 0', () => {
    const result = timeWord(0, 59);
    expect(result).toEqual("one minute to one am")
  })

  // IF MINUTE EQUALS 0
  test('6:00, hour less than twelve', () => {
    const result = timeWord(6, 0);
    expect(result).toEqual("six o'clock am")
  })
  test('0:00, hour less than twelve but zero', () => {
    const result = timeWord(0, 0);
    expect(result).toEqual("twelve o'clock am")
  })
  test('13:00, hour greater than twelve', () => {
    const result = timeWord(13, 0);
    expect(result).toEqual("one o'clock pm")
  })

  // IF MINUTE IS LESS THAN 30 AND NOT 1
  test('2:29, hour less than twelve', () => {
    const result = timeWord(2, 29);
    expect(result).toEqual("twenty nine minutes past two am")
  })
  test('0:29, hour less than twelve but zero', () => {
    const result = timeWord(0, 29);
    expect(result).toEqual("twenty nine minutes past twelve am")
  })
  test('12:29, hour equal to twelve', () => {
    const result = timeWord(12, 29);
    expect(result).toEqual("twenty nine minutes past twelve pm")
  })
  test('13:29, hour greater than twelve', () => {
    const result = timeWord(13, 29);
    expect(result).toEqual("twenty nine minutes past one pm")
  })
  
  // IF MINUTE IS GREATER THAN 30 BUT NOT 59
  test('10:45, hour equal to or less than ten', () => {
    const result = timeWord(10, 45);
    expect(result).toEqual("fifteen minutes to eleven am")
  })
  test('0:45, hour equal to or less than ten but zero', () => {
    const result = timeWord(0, 45);
    expect(result).toEqual("fifteen minutes to one am")
  })
  test('11:31, hour equal to eleven', () => {
    const result = timeWord(11, 31);
    expect(result).toEqual("twenty nine minutes to twelve pm")
  })
  test('12:31, hour equal to or greater than twelve', () => {
    const result = timeWord(12, 31);
    expect(result).toEqual("twenty nine minutes to one pm")
  })

  // IF MINUTE EQUALS 30
  test('11:30, hour equal to or less than eleven', () => {
    const result = timeWord(11, 30);
    expect(result).toEqual("Half past eleven am")
  })
  test('0:30, hour equal to 0', () => {
    const result = timeWord(0, 30);
    expect(result).toEqual("Half past twelve am")
  })
  test('12:30, hour equal to twelve', () => {
    const result = timeWord(12, 30);
    expect(result).toEqual("Half past twelve pm")
  })
  test('13:30, hour greater than 12', () => {
    const result = timeWord(13, 30);
    expect(result).toEqual("Half past one pm")
  })

});