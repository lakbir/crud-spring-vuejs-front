<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Tutorials</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">List Tutorials</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/new-tutorial">New Tutorial</router-link>
          </li>         
        </ul>
      </div>
    </nav>
    <div class="container" style="margin-top: 5%">
      <router-view/>
    </div>
  </div>
</template>

<style>

</style>


