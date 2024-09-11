import { fireEvent, screen } from '@testing-library/react'

import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

const jogo = {
  id: 2,
  categoria: 'rpg',
  imagem: '',
  plataformas: ['windows', 'ps5', 'xboxS'],
  preco: 199.9,
  precoAntigo: 299.9,
  titulo: 'hogwarts legacy'
}

describe('testes para o componente produto', () => {
  test('deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)
    expect(screen.getByText('hogwarts legacy')).toBeInTheDocument()
  })

  test('deve adicionar um item ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)

    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
