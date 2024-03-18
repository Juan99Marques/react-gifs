import {GifExpertApp} from '../src/GifExpertApp';
import { AddCategory } from '../src/components/AddCategory';
import {render , screen, fireEvent} from '@testing-library/react';

describe('pruebas en GifExpertApp', () => {

    test('debe de mostrarse correctamente', () => {
        const wrapper = render(<GifExpertApp/>);
        expect(wrapper).toMatchSnapshot();
    }
    );

    test('debe de mostrar una lista de categorias', () => {
        const categories = ['One Punch', 'Dragon Ball'];
        const onNewCategory = jest.fn();
        const wrapper = render(<GifExpertApp  />);
        screen.debug();
        expect(wrapper).toMatchSnapshot();


    }
    );

})