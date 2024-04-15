import React from 'react'
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useMenu = () => {

    const axiosPublic =useAxios();

   const {data: menu =[], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/menu');
            console.log(res.data);
            return res.data
        }
   })


  return [menu, loading, refetch]
}

export default useMenu