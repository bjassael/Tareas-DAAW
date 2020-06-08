import router from '../../router'
import { getBooksByUser, newBook } from '@/api'

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
    async getAllBooksByUser (context, searchParams) {
      context.commit('getBooksRequest')
      return await getBooksByUser(searchParams)
        .then(({ data }) => {
          const books = data.map(book => {
            console.log(book)
            return {
              name: book.name,
              authors: book.authors
                .map(author => `${author.firstName} ${author.lastName}`)
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
      const bookData = {
        name: context.state.newName,
        authorsFirstname: context.state.newAuthorsFirstname,
        authorsLastname: context.state.newAuthorsLastname,
        genres: context.state.newGenres
      }
      const response = await newBook(bookData)
      try {
        console.log(response)
        context.commit('resetBookFields')
        await context.dispatch('getAllBooksByUser', { searchParams: '' })
        router.push('/my-books')
      } catch (e) {
        console.log('Request Error:', e)
        // throw e
      }
    }
  }
}

export default moduleBooks
