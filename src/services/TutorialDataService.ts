import axios from "../http-common";

class TutorialDataService {
    getAll() {
        return axios.get("/tutorials");
      }
    
      get(id) {
        return axios.get(`/tutorials/${id}`);
      }
    
      create(data) {
        return axios.post("/tutorials", data);
      }
    
      update(id, data) {
        return axios.put(`/tutorials/${id}`, data);
      }
    
      delete(id) {
        return axios.delete(`/tutorials/${id}`);
      }
    
      deleteAll() {
        return axios.delete(`/tutorials`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }

      changeStatus(id) {
        return axios.put(`/tutorials/published?id=${id}`);
      }

      publishedUnpublishedAll(status) {
        return axios.put(`/tutorials/status?status=${status}`);
      }

      getTutorialsByStatus(status) {
        return axios.get(`tutorialsbypublished?status=${status}`)
      }
}
export default new TutorialDataService();