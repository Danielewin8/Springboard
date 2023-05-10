const { sqlForPartialUpdate } = require("./sql");

const jsToSql = {
    test1: "test1",
    test2: "test2"
}

describe("sqlForPartialUpdate", () => {
    test("works: correct key/values", () => {
        const testData = {"key1": "value1"}
        const testResults = sqlForPartialUpdate(testData, jsToSql)
        expect(testResults).toEqual({"setCols": '"key1"=$1', "values": ["value1"]})
    })
    test("works: correct key/values for multiple", () => {
        const testData = {
            "key1": "value1",
            "key2": "value2",
            "key3": "value3",
        }
        const testResults = sqlForPartialUpdate(testData, jsToSql)
        expect(testResults).toEqual({"setCols": '"key1"=$1, "key2"=$2, "key3"=$3', "values": ["value1", "value2", "value3"]})
    })
})

