<template>
  <div class="hello">
    <mu-container>
      <mu-form ref="searchForm" :model="form" class="mu-demo-form search-form" label-width="100">
        <mu-form-item prop="name" label="Book name">
          <mu-text-field v-model="form.name" placeholder="Search.."></mu-text-field>
        </mu-form-item>

        <mu-form-item>
          <mu-button color="primary" @click="fetchBooksStore">Search</mu-button>
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
export default {
  name: 'SearchForm',
  data () {
    return {
      books: this.$store.state.books.bookList,
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
    async fetchBooksStore (page) {
      const searchParams = this.form
      await this.$store.dispatch('getAllBooks', { searchParams })
        .then(() => {
          this.books = this.$store.state.books.bookList
        })
    }
  },
  mounted: async function () {
    await this.$store.dispatch('getAllBooks', { searchParams: '' })
      .then(() => {
        this.books = this.$store.state.books.bookList
      })
  }
}

</script>
