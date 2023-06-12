import { StringUtils, getStringInfo, toUpperCase } from "../app/util"

// 테스트 함수들을 그룹화하여 실행할수있다.
describe('utils test suit', () => {


    describe.only('StringUtils test', () => {
        //hook 은 기본적으로 실행 컨텍스트 룰을 따르며 가장 좋은 방법은 사용하고자 하는 context단계에 두는것이 best임(describe안에 두는게 젤좋음)
        let sut:StringUtils;

        beforeEach(() => {
            sut = new StringUtils();
            console.log('setup')
        })

        it('should throw Error on invalid argument - function',() => {
            function expectError(){
                const actual = toUpperCase('')
            }
            expect(expectError).toThrow()
            expect(expectError).toThrowError('arg가 없습니다.')
        })

        it('should throw Error on invalid argument - arrow function',() => {
            expect(() => {
                sut.toUpperCase('')
            }).toThrowError('arg가 없습니다.')
        })


        it('should throw Error on invalid argument - try catch',(done) => {
            try {
                //it의 콜백함수를 넣어주면 callback함수가 fail을 호출한다. 실패지점에 done을 호출함으로서 fail을 유도한다.
                sut.toUpperCase('')
                done('arg가 없습니다.')
            }catch(e){
                expect(e).toBeInstanceOf(Error)
                expect(e).toHaveProperty('message','arg가 없습니다.')
                done()
            }
        })

        it('should return correct UpperCase',() => {
            const sut = new StringUtils()

            const actual = sut.toUpperCase('abc')
        
            expect(actual).toBe('ABC')
            console.log('actual test')
        })
    })
    it('should return uppercase', () => {
        //arragne:
        const sut = toUpperCase
        const expected = 'ABC'

        //act:
        const actual = sut('abc')


        //assert:
        expect(actual).toBe(expected)
    })

    describe('ToUpperCase example', () => {
        // each 키워드를 통해서 매개변수를 지정하고 $key이름을 통해 지정된 값들을 가져올수있다.
        it.each([
            {input:'abc', expected:'ABC'},
            {input:'My-String', expected:'MY-STRING'},
            {input:'def', expected:'DEF'}
        ])('$input toUpperCase should be $expected', ({input, expected}) => {
            const actual = toUpperCase(input)
            expect(actual).toBe(expected)
        })
    })

    //각 테스트는 다른 테스트와 독립적이어야 하기때문에 따로 잡아주는것이 좋다. => 각 각 의미가 다른 테스트 들은 서로 다른 test case안에 넣어주라는 말임
    describe('getStringInfo for arg My-String should', () => {
        test('return right length', () => {
        const actual = getStringInfo('My-String')

        expect(actual.characters).toHaveLength(9)
        });
        test('return right lowercase ', () => {
            // primitive types(string, number, boolean etc...)는 toBe를 사용하는것이 맞으나 complex type(array, object)는 toEqual이 되야한다.
            const actual = getStringInfo('My-String')
            expect(actual.lowerCase).toBe('my-string')
        });
        test('return right uppercase ', () => {
            const actual = getStringInfo('My-String')
            expect(actual.upperCase).toBe('MY-STRING')
        });
        test('return right characters', () => {
            const actual = getStringInfo('My-String')
        //length 전용 메소드가 있으니 primitive type(number)라고 해도 length를 구할때는 length전용 메소드를 사용해보자

            expect(actual.characters).toHaveLength(9)

            expect(actual.characters).toEqual(['M','y','-','S','t','r','i','n','g'])
            //toContain === include랑 비슷한 기능으로 보면됨 (해당 파라미터가 배열에 있는지 확인)
            expect(actual.characters).toContain<string>('M')
            expect(actual.characters).toEqual(
                expect.arrayContaining(['S','t','r','i','n','g','M','y','-'])
            )
        });
        test('return define extraInfo', () => {
            const actual = getStringInfo('My-String')
            expect(actual.extraInfo).toBeDefined()
        });
        test('return right extran info', () => {
            const actual = getStringInfo('My-String')
            expect(actual.extraInfo).toEqual({})
        })
    })
})