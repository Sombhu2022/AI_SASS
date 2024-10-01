export const  timeExpire =(expiretime)=>{
    const time = Date.now()
    const expire = new Date(expiretime).getTime()
    if (expire < time ) return true
    return false
}