import { render, screen, fireEvent } from "@testing-library/react";
import { GifGrid } from '../../src/components/GifGrid';
import { useFetchGifs } from '../../src/hooks/useFetchGIfs';
jest.mock('../../src/hooks/useFetchGIfs');

describe('pruebas en GifGrid', () => {


    const category = 'One Punch';
    test('debe de mostrarse correctamente', () => {

        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true
        });
        
        const wrapper = render(<GifGrid category={category}/>);
        expect(screen.getAllByText(category)).toBeTruthy();
    }
    );

    test('debe de mostrar items cuando se cargan imagenes useFetchGifs', () => {
        const gifs = [
            {
                id: 'ABC',
                url: 'https://localhost/cualquier/cosa.jpg',
                title: 'Cualquier cosa'
            }, 
            {
                id: '123',
                url: 'https://localhost/cualquier/cosa.jpg',
                title: 'Cualquier cosa'
            },
            {
                id: '456',
                url: 'https://localhost/cualquier/cosa.jpg',
                title: 'Cualquier cosa'
            }

        ];
        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: true
        });
        const wrapper = render(<GifGrid category={category}/>);
        expect(screen.getByText('Cargando...')).toBeTruthy();
    }
    );

}
);