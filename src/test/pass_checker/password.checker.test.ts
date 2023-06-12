import { PasswordChecker, PasswordErrors } from "../../app/pass_checker/password.checker"




describe('PasswordChecker test suits', () => {

    let sut:PasswordChecker

    beforeEach(() => {
        sut = new PasswordChecker()
    })

    it('password less than 8 characters is invalid', () => {
       const actual =  sut.checkPassword('1234567')
       expect(actual.valid).toBe(false)
       expect(actual.reasons).toContain(PasswordErrors.SHORT)
    })
    it('password more than 8 characters is ok', () => {
        const actual =  sut.checkPassword('123456789Aa')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).not.toContain(PasswordErrors.SHORT)
     })
     it('password with no upper case letter is invalid', () => {
        const actual =  sut.checkPassword('12345abcd')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE)
     })
     it('password with upper case letter is valid', () => {
        const actual =  sut.checkPassword('12345abcdA')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE)

     })

     it('password with no lower case letter is invalid', () => {
        const actual =  sut.checkPassword('12345ABCD')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE)
     })
     it('password with lower case letter is valid', () => {
        const actual =  sut.checkPassword('12345ABCDa')
        expect(actual.valid).toBe(true)
        expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE)
     })
     
     it('Complex passwrod is valid', () => {
        const actual = sut.checkPassword('1234abcD')
        expect(actual.reasons).toHaveLength(0)
        expect(actual.valid).toBe(true)
     })

     it('Admin password with no number is invalid', () => {
        const actual = sut.checkAdminPassword('ascdABCD')
        expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER)
        expect(actual.valid).toBe(false)
     })
     it('Admin password no number is valid', () => {
        const actual = sut.checkAdminPassword('ascdABCD7')
        expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER)
       
     })
})