import { screen } from "@testing-library/react";

import Produto from "..";
import { renderizaComProvider } from "../../../utils/tests";

describe('testes para o componente produto', () => {
    test('deve renderizar corretamente', () => {
        const jogo = {
            id: 2,
            categoria: 'rpg',
            imagem: '',
            plataformas: ['windows', 'ps5', 'xboxS'],
            preco: 199.9,
            precoAntigo: 299.9,
            titulo: 'hogwarts legacy'
          }
        renderizaComProvider(<Produto game={jogo}/>)
        expect(screen.getByText('hogwarts legacy')).toBeInTheDocument()
    })
})