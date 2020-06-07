import axios from 'axios'
import router from '../../router'

const apiUrl = 'http://127.0.0.1:8000/'

const moduleBooks = {
  state: () => ({
    bookList: [],
    loadingBooks: false,
    error: {},
    test: 'hola',
    newName: '',
    newAuthorsFirstname: '',
    newAuthorsLastname: '',
    newGenres: ''
  }),
  mutations: {
    getBooksRequest (state) {
      state.loadingBooks = true
      state.error = null
    },
    getBooksSuccess (state, payload) {
      console.log('hola', payload)
      state.loadingBooks = false
      state.bookList = payload
    },
    getBooksFailure (state, payload) {
      state.loadingBooks = false
      state.error = payload
    },
    setBookName: (state, payload) => {
      state.newName = payload.newName
    },
    setBookAuthorsFirstname: (state, payload) => {
      state.newAuthorsFirstname = payload.newAuthorsFirstname
    },
    setBookAuthorsLastname: (state, payload) => {
      state.newAuthorsLastname = payload.newAuthorsLastname
    },
    setBookGenres: (state, payload) => {
      state.newGenres = payload.newGenres
    },
    postNewBook: (state, payload) => {
      console.log('name', state.newName)
      console.log('authors', state.newAuthorsFirstname)
      console.log('authors', state.newAuthorsLastname)
      console.log('genres', state.newGenres)
      console.log('user', payload)
    },
    resetBookFields: state => {
      state.newName = ''
      state.newAuthorsFirstname = ''
      state.newAuthorsLastname = ''
      state.newGenres = ''
    }
  },
  actions: {
    async getAllBooks (context, searchParams) {
      context.commit('getBooksRequest')
      return axios({
        method: 'get',
        baseURL: apiUrl,
        url: '/books/',
        params: {
          name: searchParams.searchParams.name
        }
      })
        .then(({ data }) => {
          const books = data.map(book => {
            return {
              name: book.name,
              authors: book.authors
                .map(author => `${author.first_name} ${author.last_name}`)
                .join(),
              genres: book.genres.map(genre => `${genre.genre}`).join()
            }
          })
          context.commit('getBooksSuccess', books)
        })
        .catch(e => {
          context.commit('getBooksFailure', e)
        })
    },
    async postBook (context) {
      context.commit('postNewBook', context.rootState.user)
      return axios({
        method: 'post',
        baseURL: apiUrl,
        url: '/books/',
        data: {
          name: context.state.newName,
          authorsFirstname: context.state.newAuthorsFirstname,
          authorsLastname: context.state.newAuthorsLastname,
          genres: context.state.newGenres,
          userToken: context.rootState.user
        }
      })
        .then(async ({ response }) => {
          console.log(response)
          context.commit('resetBookFields')
          await context.dispatch('getAllBooks', { searchParams: '' })
          router.push('/my-books')
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}

export default moduleBooks
