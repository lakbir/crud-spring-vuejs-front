<template>
    <div class="card mt-2">
        <div class="card-header">New Tutorial</div>
        <div class="card-body">
            <form @submit.prevent="onAddTutorial" v-if="!isAdded">
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input type="text" v-model="tutorial.title" id="title" name="title" class="form-control" :class="{ 'is-invalid': submitted && $v.tutorial.title.$error }" placeholder="Title" />
                                <div v-if="submitted && !$v.tutorial.title.required" class="invalid-feedback">Title is required</div>
                                <div v-if="submitted && !$v.tutorial.title.minLength" class="invalid-feedback">Title must have at least {{$v.tutorial.title.$params.minLength.min}} letters</div>
                                <div v-if="submitted && !$v.tutorial.title.maxLength" class="invalid-feedback">The title must have max {{$v.tutorial.title.$params.maxLength.max}} letters</div>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea v-model="tutorial.description" rows="4" id="description" name="description" class="form-control" :class="{ 'is-invalid': submitted && $v.tutorial.description.$error }" placeholder="Description"></textarea>
                                <div v-if="submitted && !$v.tutorial.description.required" class="invalid-feedback">Description is required</div>
                                <div v-if="submitted && !$v.tutorial.description.minLength" class="invalid-feedback">Description must have at least {{$v.tutorial.description.$params.minLength.min}} letters</div>
                                <div v-if="submitted && !$v.tutorial.description.maxLength" class="invalid-feedback">The title must have max {{$v.tutorial.description.$params.maxLength.max}} letters</div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-success btn-sm float-right">Register</button>
                            </div>
            </form>
            <div v-else>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>SUCCESS !</strong> a new tutorial added with success.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <router-link class="btn btn-warning text-white btn-sm" to="/">List tutorials</router-link>
                <button class="btn btn-primary btn-sm float-right" @click.prevent="newTutorial">Add new tutorial</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, minLength, maxLength } from "vuelidate/lib/validators";
    import TutorialDataService  from '../services/TutorialDataService.ts';

    export default {
        name: "AddTutorial",
        data() {
            return {
                tutorial: {
                    title: "",
                    description: ""
                },
                submitted: false,
                isAdded: false
            };
        },
        validations: {
            tutorial: {
                title: { required, minLength: minLength(10), maxLength: maxLength(50) },
                description: { required, minLength: minLength(20), maxLength: maxLength(250) }               
            }
        },
        methods: {
            onAddTutorial(e) {
                this.submitted = true;

                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                var data = {
                    title: this.tutorial.title,
                    description: this.tutorial.description
                }
                TutorialDataService.create(data).then(
                    resp => {
                        console.log(resp);
                        this.isAdded = true;
                    }, err =>{
                        console.log(err);
                    }
                )

                
            },
            newTutorial () {
                this.tutorial = {};
                this.isAdded = false;
                this.submitted = false;
            }
        }
    };
</script>