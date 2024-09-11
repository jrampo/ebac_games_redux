import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import Header from '..'
import { renderizaComProvider } from '../../../utils/tests'

describe('testes para o header', () => {
  test('deve renderizar corretamente', () => {
    renderizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('deve renderizar com 2 itens no carrinhos', () => {
    renderizaComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'rpg',
              imagem: '',
              plataformas: ['windows'],
              preco: 150.9,
              precoAntigo: 199.9,
              titulo: 'elden ring'
            },
            {
              id: 2,
              categoria: 'rpg',
              imagem: '',
              plataformas: ['windows', 'ps5', 'xboxS'],
              preco: 199.9,
              precoAntigo: 299.9,
              titulo: 'hogwarts legacy'
            }
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
