const { mean, median, mode } = require('./helpers')

describe('test helpers', function () {
    test('test mean', function() {
        const nums = [1,3,5,7]
        const nums2 = [2,4,6,8]
        const nums3 = [1,1,3,5,7,7,7]

        expect(mean(nums)).toEqual(4)
        expect(mean(nums2)).toEqual(5)
        expect(mean(nums3)).toEqual(4)
    })
    test('test median', function() {
        const nums = [1,3,5,7]
        const nums2 = [2,4,6,8]
        const nums3 = [1,1,3,5.5,7,7,7]

        expect(median(nums)).toEqual(4)
        expect(median(nums2)).toEqual(5)
        expect(median(nums3)).toEqual(5)
    })
    test('test median', function() {
        const nums = [1,3,5,7]
        const nums2 = [2,4,6,8]
        const nums3 = [1,1,3,5.5,7,7,7]

        expect(mode(nums)).toEqual(1)
        expect(mode(nums2)).toEqual(2)
        expect(mode(nums3)).toEqual(7)
    })
})