
export const toUpperCase = (arg:string):string => {
    if(!arg) throw new Error('arg가 없습니다.')
    const result = arg.toUpperCase()
    return result
}

export type StringInfo = {
    lowerCase:string,
    upperCase:string,
    characters:string[],
    length:number,
    extraInfo:Object | undefined
}

export class StringUtils {
    public toUpperCase(arg:string){
        return toUpperCase(arg)
    }
}


export const getStringInfo = (arg:string):StringInfo => {
    return {
        lowerCase: arg.toLowerCase(),
        upperCase: arg.toUpperCase(),
        characters: Array.from(arg),
        length:arg.length,
        extraInfo:{}
    }
}