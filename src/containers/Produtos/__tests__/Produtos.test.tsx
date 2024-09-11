import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react'

import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'

const mocks = [
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
  },
  {
    id: 3,
    categoria: 'ação',
    imagem: '',
    plataformas: ['ps5', 'xboxS'],
    preco: 150,
    precoAntigo: 200,
    titulo: 'gotham knights'
  },
  {
    id: 4,
    categoria: 'aventura',
    imagem: '',
    plataformas: ['nintendo switch'],
    preco: 189.9,
    precoAntigo: 299.9,
    titulo: 'donkey kong'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('deve renderizar corretamente com o texto de carregando', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('deve renderizar corretamente com a listagem de jogos', async () => {
    const { debug } = renderizaComProvider(<Produtos />)
    await waitFor(() => {
      debug()
      expect(screen.getByText('donkey kong')).toBeInTheDocument()
    })
  })
})
