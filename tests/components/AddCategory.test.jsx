import { render, screen, fireEvent } from "@testing-library/react";
import { AddCategory } from "../../src/components/AddCategory";

describe('pruebas en addCategory', () => {

    // test('debe de mostrarse correctamente', () => {
    //     const onNewCategory = jest.fn();
    //     const wrapper = render(<AddCategory onNewCategory={onNewCategory}/>);
    //     expect(wrapper).toMatchSnapshot();
    // }
    // );

    test('debe de mostrarse correctamente el valor comparando valores', () => {
        const onNewCategory = jest.fn();
        const wrapper = render(<AddCategory onNewCategory={onNewCategory}/>);
        const input = wrapper.getByPlaceholderText('Buscar gifs...');
        input.value = 'Hola mundo';
        const realValue = wrapper.getByPlaceholderText('Buscar gifs...').value;
        expect(input.value).toBe(realValue);
    }
    );

    test('Debe de cambiar el valor del input', () => {
        render(<AddCategory onNewCategory={() => {}}/>);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'Hola mundo'}});
        expect(input.value).toBe('Hola mundo');
    }
    );

    test('Debe de llamar al onsSubmit', () => {
        const onNewCategory = jest.fn();
        const wrapper = render(<AddCategory onNewCategory={onNewCategory}/>);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'Hola mundo'}});
        const form = screen.getByRole('form');
        fireEvent.submit(form);
        expect(onNewCategory).toHaveBeenCalled();
    });

    test('No debe de llamar al onsSubmit', () => {
        const onNewCategory = jest.fn();
        render(<AddCategory onNewCategory={onNewCategory}/>);

        const form = screen.getByRole('form');
        fireEvent.submit(form);
        
        expect(onNewCategory).not.toHaveBeenCalled();
    });

});
