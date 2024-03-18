import { getGifs } from "../../src/helpers/getGifs";

describe('Pruebas en getGifs Fetch', () => {
    test('debe de traer 10 elementos', async () => {
        const gifs = await getGifs('One Punch');
        expect(gifs.length).toBe(10);
    })

    test('debe de traer 0 elementos', async () => {
        const gifs = await getGifs('');
        expect(gifs.length).toBe(0);
    })

    test('debe de traer un array con valores correctos', async () => {
        const gifs = await getGifs('One Punch');
        expect(gifs.length).toBe(10);
        expect(gifs[0]).toHaveProperty('id');
        expect(gifs[0]).toHaveProperty('title');
        expect(gifs[0]).toHaveProperty('url');        
    })
})