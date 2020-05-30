<template>
   <div class="card mt-2">
        <div class="card-header">Update Tutorial</div>
        <div class="card-body">
            <form @submit.prevent="onUpdateTutorial" v-if="currentTutorial">
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input type="text" v-model="currentTutorial.title" id="title" name="title" class="form-control" :class="{ 'is-invalid': submitted && $v.currentTutorial.title.$error }" placeholder="Title" />
                                <div v-if="submitted && !$v.currentTutorial.title.required" class="invalid-feedback">Title is required</div>
                                <div v-if="submitted && !$v.currentTutorial.title.minLength" class="invalid-feedback">Title must have at least {{$v.currentTutorial.title.$params.minLength.min}} letters</div>
                                <div v-if="submitted && !$v.currentTutorial.title.maxLength" class="invalid-feedback">The title must have max {{$v.currentTutorial.title.$params.maxLength.max}} letters</div>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea v-model="currentTutorial.description" rows="4" id="description" name="description" class="form-control" :class="{ 'is-invalid': submitted && $v.currentTutorial.description.$error }" placeholder="Description"></textarea>
                                <div v-if="submitted && !$v.currentTutorial.description.required" class="invalid-feedback">Description is required</div>
                                <div v-if="submitted && !$v.currentTutorial.description.minLength" class="invalid-feedback">Description must have at least {{$v.currentTutorial.description.$params.minLength.min}} letters</div>
                                <div v-if="submitted && !$v.currentTutorial.description.maxLength" class="invalid-feedback">The title must have max {{$v.currentTutorial.description.$params.maxLength.max}} letters</div>
                            </div>
                            <div class="form-group">
                                <router-link class="btn btn-warning text-white btn-sm" to="/">List tutorials</router-link>
                                <button class="btn btn-success btn-sm float-right">Update</button>
                            </div>
            </form>
            <div v-if="isUpdated">
                <div class="alert alert-dismissible fade show" :class="{'alert-success' : updatedSuccess, 'alert-danger' : !updatedSuccess }" role="alert">
                    <strong>Info </strong> {{message}}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService.ts";
 import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
    name: 'Tutorial',
    data () {
      return {
              currentTutorial: null,
              message: '',
              isUpdated: false,
              updatedSuccess: false,
              submitted: false
      }
    },
    validations: {
            currentTutorial: {
                title: { required, minLength: minLength(10), maxLength: maxLength(50) },
                description: { required, minLength: minLength(20), maxLength: maxLength(250) }               
            }},
    methods: {
      getTutorialById (id) {
        TutorialDataService.get(id)
        .then( resp => {
          this.currentTutorial = resp.data;
          console.log('Get Tutorial : ' + resp.data);
          }, err => {
          console.log('Error Get Tutorial : ' + err); 
          })
        .catch(e => {
          console.log(e);
        });
      },

      onUpdateTutorial () {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
      .then(resp => {
        console.log('Update success ' + resp.data);
        this.message = 'The tutorial was updated successfully!';
        this.updatedSuccess = true;
        this.isUpdated = true;
      })
      .catch( err => {
        console.log('Update faild ' + err);
        this.message = 'The tutorial has error to updated, try again later !';
        this.updatedSuccess = false;
        this.isUpdated = true;        
      })

      }
    },
    mounted () {
      this.getTutorialById(this.$route.params.id);
    }
}
</script>