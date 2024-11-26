import axios from 'axios'



export const post =  async(path, data)=>{
    const token = localStorage.getItem('access_token');
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
    const token = localStorage.getItem('access_token');
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
    const token = localStorage.getItem('access_token');
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