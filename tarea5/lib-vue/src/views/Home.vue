<template>
  <!-- <div class="home">
    <h1>Books!</h1>
    <SearchForm />
  </div> -->
  <div class="home">
    <div class="banner">
      <div class="tableSlogan">
      <div class="slogan">
        <div>Have fun and organize</div>
        <div>the books at home!</div>
      </div>
      </div>
      <div class="bannerImageContainer">
        <img class="bannerImage" src="@/assets/bg.png" alt="">
      </div>
    </div>
    <div class="cards-container">
      <div class="card" style="width: 20%">
          <img class="card-img-top" src="@/assets/freeTime.svg" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">Have some free time?</h5>
          <p class="card-text">This website will allow you to use your time productively!</p>
          <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
      </div>
      <div class="card" style="width: 20%">
          <img class="card-img-top" src="@/assets/flatList.svg" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">Easy to add</h5>
          <p class="card-text">You can easily create a new book and add it to your collection</p>
          <!-- <a href="#/my-books" class="btn btn-primary">My books</a> -->
          </div>
      </div>
      <div class="card" style="width: 20%">
          <img class="card-img-top" src="@/assets/search.svg" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">Easy to search</h5>
          <p class="card-text">You don't remember if you have a book? Don't worry. You can easily search on the books you have added.</p>
          <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
      </div>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import SearchForm from '@/components/SearchForm.vue'

export default {
  name: 'Home',
  components: {
    // SearchForm
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");

.banner{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: linear-gradient(to bottom left, transparent 0%, transparent 50%, #D8D3C3 50%, #D8D3C3 100%);
}
.bannerImageContainer{
  width: 50%;
}

img{
  width: auto;
  height: 400px;
}
.tableSlogan{
  display: table;
  width: 50%;
  height: 420px;
}
.slogan{
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  margin-bottom: 0;
  color: rgb(228, 71, 60);
  font-weight: bold;
  font-family:  "Lato", serif;
  font-size: 40px;
  text-shadow: 2px 0 0 rgba(255, 255, 255, 0.5), -2px 0 0 rgba(255, 255, 255, 0.5), 0 2px 0 rgba(255, 255, 255, 0.5), 0 -2px 0 rgba(255, 255, 255, 0.5), 3px 3px rgba(255, 255, 255, 0.5), -3px -3px 0 rgba(255, 255, 255, 0.5), 3px -3px 0 rgba(255, 255, 255, 0.5), -3px 3px 0 rgba(255, 255, 255, 0.5);
}

.cards-container{
  display: flex;
  justify-content: center;
}

.card{
margin: 40px;
}

@media (max-width: 600px) {
  .bannerImageContainer {
    width: 50%;
  }
  .slogan{
    font-size: 20px;
  }
  .tableSlogan{
    height: 200px;
  }
  img{
    width: 100%;
    height: auto;
  }
}

</style>
