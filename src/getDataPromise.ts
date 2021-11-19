import {IUser} from './IUser'

type GetDataPromiseCallBack = (a: IUser[]) => void 
export const getDataPromise = (fn: GetDataPromiseCallBack) => (skip:number, limit:number) =>
    fetch(`http://localhost:4000/users/${skip}/${limit}`)
    .then(res => res.json())
    .then(fn)   
