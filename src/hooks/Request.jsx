import axios from 'axios'

const token = localStorage.getItem('access_token');

export const post =  async(path, data)=>{
    try{
        const res = await axios.post(
            `${process.env.REACT_APP_BACKEND}${path}`,
            data,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res;
    }catch(err){
        console.log(err)
    }
}
export const get = async(path)=>{
    try{
        const res = await axios.get(
            `${process.env.REACT_APP_BACKEND}${path}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res;
    }catch(e){
        console.log("error fetch api");
    }
}
export const remove = async(path)=>{
    try{
        const res = await axios.delete(
            `${process.env.REACT_APP_BACKEND}${path}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res;
    }catch(e){
        console.log("delete error");
    }
}

 const AuthorizationAxios = {
    post, get, remove
}

export default AuthorizationAxios;