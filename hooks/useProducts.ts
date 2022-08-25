import useSWR, { SWRConfiguration } from 'swr'
import { IProducts } from '../interfaces/products';



//const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json())

export const useProducts = (url: string, config: SWRConfiguration={}) => {

    //const { data, error } = useSWR<IProducts[]>(`/api${url}`, fetcher, config)
    const { data, error } = useSWR<IProducts[]>(`/api${url}`, config)


    return {

        products: data || [],
        isLoading: !error && !data,
        isError: error

    }

}
