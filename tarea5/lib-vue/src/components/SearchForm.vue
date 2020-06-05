<template>
  <div class="hello">

    <mu-container>
      <mu-form ref="searchForm" :model="form" class="mu-demo-form" label-width="100">
        <mu-form-item prop="name" label="Name">
          <mu-text-field v-model="form.name"></mu-text-field>
        </mu-form-item>

        <mu-form-item>
          <mu-button color="primary" @click="fetchBook">submit</mu-button>
        </mu-form-item>

      </mu-form>

      <mu-paper :z-depth="1">
        <mu-data-table :columns="columns" :data="books" no-data-text="No books">
          <template slot-scope="scope">
            <td>{{scope.row.name}}</td>
            <td>{{scope.row.authors}}</td>
            <td>{{scope.row.genres}}</td>
          </template>
        </mu-data-table>
      </mu-paper>

    </mu-container>

  </div>
</template>

<script>
import axios from 'axios'
const DEFAULT_PAGE_SIZE = 10

export default {
  name: 'SearchForm',
  data () {
    return {
      books: [],
      columns: [
        { title: 'Name', name: 'name' },
        { title: 'Authors', name: 'authors' },
        { title: 'Genres', name: 'genres' }
      ],
      page: 1,
      form: {
        name: ''
      }
    }
  },
  methods: {
    fetchBook () {
      this.$refs
        .searchForm
        .validate()
        .then((result) => {
          console.log('form valid: ', result)
          this.fetchBooks()
        })
    },
    getNewPage (actualPage, pageDirection) {
      if (pageDirection === 0) {
        return 1
      }
      return Math.max(actualPage + pageDirection, 1)
    },
    paginateRequest (newPage, searchParams) {
      Object.assign(searchParams, { page: newPage, page_size: DEFAULT_PAGE_SIZE })
      return searchParams
    },
    async fetchBooks (payload) {
      const searchParams = this.form
      console.log(searchParams)
      // const requestedPage = this.getNewPage(this.page, 0)
      // const paginatedSearchParams = this.paginateRequest(requestedPage, searchParams)
      // const response = await searchExams(paginatedSearchParams)
      axios({
        baseURL: 'http://127.0.0.1:8000/',
        url: '/books/',
        params: searchParams
      }).then((response) => {
        if (response.status === 200) {
          // const { previous, next, results, count } = response.data
          // console.log(response.data)
          let results = response.data
          // console.log(results)
          if (results) {
            results = results.map(book => {
              return {
                name: book.name,
                authors: book.authors.map(author => `${author.first_name} ${author.last_name}`).join(),
                genres: book.genres.map(genre => `${genre.genre}`).join()
              }
            })
          }
          this.books = results
        } else {
          console.log('err', response)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    }
  }
}

</script>
