import axios from 'axios'



const axiosPublic =axios.create({
    baseURL: 'https://sodium-cafe-mongoose.onrender.com'
   
})



const useAxios = () => {
  return axiosPublic
}

export default useAxios