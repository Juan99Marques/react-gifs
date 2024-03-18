 import { useFetchGifs } from "../../src/hooks/useFetchGIfs";
 import{renderHook, waitFor} from '@testing-library/react';

describe('Pruebas en el hook useFetchGifs', () => {

    test('Debe regresar el estado inicial', () => {
       
        const {result} = renderHook(()=>useFetchGifs('One Punch'));
        const {images,isLoading} = result.current;
        expect(images).toEqual([]);
        expect(isLoading).toBe(true);
    })

    test('Debe regresar un arreglo de imagenes y el loading en false', async() => {
        const {result,waitForNextUpdate} = renderHook(()=>useFetchGifs('One Punch'));
       await waitFor( 
            ()=> expect(result.current.images.length).toBe(10)
       );
       await waitFor( 
       ()=>expect(result.current.isLoading).toBe(false)
       )
        const {images,isLoading} = result.current;
        expect(images.length).toBe(10);
        expect(isLoading).toBe(false);
    })
    

})