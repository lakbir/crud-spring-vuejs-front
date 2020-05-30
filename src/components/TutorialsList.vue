<template>
    <div class="ListTutorial mt-2">
        <div class="row">
          <div class="col-sm-7">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search by title" v-model="title"/>
                <div class="input-group-append">
                    <button class="btn btn-info mr-2" @click.prevent="searchTutorialsByTitle"> <i class="fas fa-search"></i> </button>
                    <button class="btn btn-info mr-2" @click.prevent="refreshTutorials" type="button"> <i class="fas fa-sync"></i> </button>
                </div>
            </div>
          </div>
          <div class="col-sm-5">
              <button class="btn btn-success btn-sm ml-1" @click.prevent="getTutorialsPublished"> <i class="fas fa-check mr-1"></i> Publisheds </button> 
              <button class="btn btn-warning text-white btn-sm ml-1" @click.prevent="getTutorialsUnpublished"> <i class="fas fa-power-off mr-1"></i> Unpublisheds </button> 
              <button class="btn btn-primary text-white btn-sm ml-1" @click.prevent="retrieveTutorials"> <i class="fa fa-globe mr-1"></i> All Tutorials </button> 
          </div>
        </div>
        <div class="row mt-2">
            <div class="col-sm-4 mb-3" v-for="(tuto, index) in tutorials" :key="index">
                <div class="card border-primary" style="width:95%">
                    <div class="card-body text-primary">
                        <h5 class="card-title">{{tuto.title}}</h5>
                        <p class="card-text">
                            <span>{{tuto.description}}</span><br>
                        </p>
                        <router-link  class="btn btn-info btn-sm float-right ml-2" :to="'tutorials/' + tuto.id"><i class="fas fa-pencil-alt"></i></router-link>
                        <button  class="btn btn-danger btn-sm float-right ml-2"  @click.prevent="showModalDelete(tuto)"><i class="fa fa-trash"></i></button>
                        <button  class="btn btn-success btn-sm float-right ml-2" @click.prevent="showModalInfo(tuto)"><i class="fas fa-info-circle"></i></button>
                        <button v-if="!tuto.published"  class="btn btn-primary btn-sm float-right " @click.prevent="showModalUnpublished(tuto)"><i class="fas fa-check"></i></button>
                        <button v-else class="btn btn-warning text-white btn-sm float-right" @click.prevent="showModalUnpublished(tuto)"><i class="fas fa-power-off"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row fixed-bottom mb-2">
          <div class="col-sm-8"></div>
          <div class="col-sm-4"> 
            <button class="btn btn-primary btn-sm ml-1" @click.prevent="showModalAll('modal-all-published-tutorials')"> <i class="fas fa-check mr-1"></i> Published All</button> 
            <button class="btn btn-warning text-white btn-sm ml-1" @click.prevent="showModalAll('modal-all-unpublished-tutorials')"><i class="fas fa-power-off mr-1"></i>Unpublished All</button> 
            <button class="btn btn-danger btn-sm ml-1" @click.prevent="showModalAll('modal-all-delete-tutorials')"><i class="fas fa-trash mr-1"></i>Delete All</button> 
            </div>
        </div>


        <!-- Modals -->
    <!-- The Modal Unpublished -->
    <modal name="modal-unpublished-tutorial" :width="600" :height="150">
        <div class="card">
        <div class="card-body">
        <h4 class="card-title">Unpublished Tutorial</h4>
        <p class="card-text">do you really want to change published status for this tutorial ?</p>
        <button @click="closeModal('modal-unpublished-tutorial')" class="btn btn-primary btn-sm float-right ml-2">Cancel</button>
        <button @click="UnpublishedTuto" class="btn btn-danger btn-sm float-right">Change Status</button>
        </div>
        </div>
    </modal>

        <!-- The Modal Delete -->
    <modal name="modal-delete-tutorial" :width="600" :height="150">
        <div class="card">
        <div class="card-body">
        <h4 class="card-title">Unpublished Tutorial</h4>
        <p class="card-text">do you really want to change published status for this tutorial ?</p>
        <button @click="closeModal('modal-delete-tutorial')" class="btn btn-primary btn-sm float-right ml-2">Cancel</button>
        <button @click="DeleteTuto" class="btn btn-danger btn-sm float-right">Delete</button>
        </div>
        </div>
    </modal>

            <!-- The Modal View -->
    <modal name="modal-view-tutorial" :width="600" :height="300" v-if="currentTutorial">
        <div class="card" style="height: 100%">
        <div class="card-body">
        <h4 class="card-title">{{currentTutorial.title}}</h4>
        <p class="card-text" style="height: 180px">{{currentTutorial.description}}</p>
        <i class="badge badge-warning text-white" v-if="!currentTutorial.published">Unpublished</i>
        <i class="badge badge-success" v-if="currentTutorial.published">published</i>
        <button @click="closeModal('modal-view-tutorial')" class="btn btn-primary btn-sm float-right ml-2" style="bottom: 10px;">Cancel</button>
        </div>
        </div>
    </modal>

            <!-- The Modal published All -->
    <modal name="modal-all-published-tutorials" :width="600" :height="150">
        <div class="card">
        <div class="card-body">
        <h4 class="card-title">Published All Tutorials</h4>
        <p class="card-text">do you really want to published all tutorials ?</p>
        <button @click="closeModal('modal-all-published-tutorials')" class="btn btn-primary btn-sm float-right ml-2">Cancel</button>
        <button @click="publishedAllTutorials" class="btn btn-warning text-white btn-sm float-right">Published All</button>
        </div>
        </div>
    </modal>

            <!-- The Modal delete All -->
    <modal name="modal-all-delete-tutorials" :width="600" :height="150">
        <div class="card">
        <div class="card-body">
        <h4 class="card-title">Deleted All Tutorials</h4>
        <p class="card-text">do you really want to delete all tutorials ?</p>
        <button @click="closeModal('modal-all-delete-tutorials')" class="btn btn-primary btn-sm float-right ml-2">Cancel</button>
        <button @click="deleteAllTutorials" class="btn btn-danger btn-sm float-right">Delete All</button>
        </div>
        </div>
    </modal>

                <!-- The Modal unpublished All -->
    <modal name="modal-all-unpublished-tutorials" :width="600" :height="150">
        <div class="card">
        <div class="card-body">
        <h4 class="card-title">Unpublished All Tutorials</h4>
        <p class="card-text">do you really want to Unpublished all tutorials ?</p>
        <button @click="closeModal('modal-all-unpublished-tutorials')" class="btn btn-primary btn-sm float-right ml-2">Cancel</button>
        <button @click="unPublishedAllTutorials" class="btn btn-warning text-white btn-sm float-right">Unpublished All</button>
        </div>
        </div>
    </modal>


    </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService.ts";

export default {
  name: "ListTutorial",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      title: ""
    };
  },
  methods: {
    getTutorialsPublished () {
        TutorialDataService.getTutorialsByStatus('true')
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getTutorialsUnpublished () {
        TutorialDataService.getTutorialsByStatus('false')
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    searchTutorialsByTitle () {
        TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshTutorials () {
        this.title = '';
        this.searchTutorialsByTitle();
    },
    showModalUnpublished (tuto) {
        this.currentTutorial = tuto;
        this.$modal.show('modal-unpublished-tutorial');
    },
    showModalAll (modal) {
      this.$modal.show(modal);
    },
    showModalDelete (tuto) {
        this.currentTutorial = tuto;
        this.$modal.show('modal-delete-tutorial');
    },
    showModalInfo (tuto) {
        this.currentTutorial = tuto;
        this.$modal.show('modal-view-tutorial');
    },
    closeModal (modal) {
        this.currentTutorial = null;
        this.$modal.hide(modal);
    },
    publishedAllTutorials () {
      TutorialDataService.publishedUnpublishedAll(true)
      .then( resp => {
        console.log('Success to published');
        this.retrieveTutorials();
        this.closeModal('modal-all-published-tutorials');

      })
      .catch( err => {
        console.log('Error to published all : ' + err);
      })
    },
    unPublishedAllTutorials () {
      TutorialDataService.publishedUnpublishedAll(false)
      .then( resp => {
        console.log('Success to unpublished');
        this.retrieveTutorials();
        this.closeModal('modal-all-unpublished-tutorials');
      })
      .catch( err => {
        console.log('Error to unpublished all : ' + err);
      })
    },
    deleteAllTutorials () {
      TutorialDataService.deleteAll()
      .then( resp => {
        console.log('Success delete all');
        this.retrieveTutorials();
        this.closeModal('modal-all-delete-tutorials');
      })
    },
    UnpublishedTuto () {
        TutorialDataService.changeStatus(this.currentTutorial.id)
        .then( resp => {
            console.log('Unpubished success');
            this.retrieveTutorials();
        }, err => {
            console.log('Unpubished faild ' + err);
        });
        this.closeModal('modal-unpublished-tutorial');

    },
    DeleteTuto () {
      console.log('Delete tutorial ' + this.currentTutorial.title);
      TutorialDataService.delete(this.currentTutorial.id).
      then( resp => {
            console.log('Delete success');
            this.retrieveTutorials();  
            this.closeModal('modal-delete-tutorial');  
      }, err => {
            console.log('Delete faild ' + err);
      })
    }
    
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>

<style>

</style>