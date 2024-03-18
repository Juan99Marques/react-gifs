import { render } from "@testing-library/react";
import { GifItem } from "../../src/components/GifItem";

describe('Pruebas en <GifItem />', () => {
    test('debe de hacer match con el snapshot', () => {

        const title = 'Un titulo';
        const url = 'https://localhost/algo.jpg';
        const {wrapper} = render(<GifItem title={title} url={url}/>);
        expect(wrapper).toMatchSnapshot();
    })

    test('deber mostrar la imagen con el URL', () => {
        const title = 'Un titulo';
        const url = 'https://localhost/algo.jpg';
        const { getByText, getByAltText } = render(<GifItem title={title} url={url} />);
        const img = getByAltText(title);
        expect(img.src).toBe(url);
        expect(img.alt).toBe(title);

    })

    test('debe mostrar el titulo', () => {
        const title = 'Un titulo';
        const url = 'https://localhost/algo.jpg';
        const { getByText } = render(<GifItem title={title} url={url} />);
        expect(getByText(title)).toBeTruthy();
    })
})