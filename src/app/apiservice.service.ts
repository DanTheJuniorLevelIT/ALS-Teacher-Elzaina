import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private url = "http://localhost:8000/";
  token = localStorage.getItem('authToken')

  constructor(private http: HttpClient) {}

  // Dan Work Services
  // Example: loginAdmin does not need an authorization token
  verifyAdmin(login: any){
    return this.http.post(this.url + 'api/loginAdmin', login);
  }

  // Use the token for authorized requests
  outAdmin(token: string){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/logoutAdmin', {}, { headers });
  }

  // Home and Subjects Services
  // Example for getSubjects with authorization
  getSubjects(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects', { headers });
  }

  getSpecSubjects(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/${id}`, { headers });
  }

  getTeacherSubjects(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/teacherSub/${id}`, { headers });
  }

  getAllSubjects(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects/showAll', { headers });
  }

  getSubModules(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/modules/${id}`, { headers });
  }

  getAllTeacherSubjects(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/allSubjects/${id}`, { headers });
  }

  // END

  // Assessment Services
  createAssess(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/subjects/create', data, { headers });
  }

  getAssessment(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects/assessment', { headers });
  }

  getAssessmentDetails(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/showAssessment/${id}`, { headers });
  }

  createQuestion(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/subjects/createQuestion', data, { headers });
  }

  getQuestion(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/showQuestion/${id}`, { headers });
  }

  getCompletionStats(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/getCompleted/${id}`, { headers });
  }

  editQuestion(data: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.put(`${this.url}api/subjects/editQuestion/${data.question_id}`, data, { headers });
  }

  // END


  // User
  createUser(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/users', data, { headers });
  }

  // END

  //Elzaina Work Services

  createMods(data: any) {
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/modules/create', data, { headers });
    // return this.http.post(this.url + 'api/modules/create', data,);
  }
  
  getModules(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/modules/showModules/${id}`, { headers });
  }

  createTopic(data: FormData) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/modules/createLesson`, data, { headers });
  }
  
  getLessons(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/modules/showLessons/${id}`, { headers });
  }
  getLesson(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/modules/getlessonid/${id}`, { headers });
  }
  getLeson(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/modules/getLesid/${id}`, { headers });
  }
  updateLessonInfo(id: number, data: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.patch(`${this.url}api/modules/updateLessonInfo/${id}`, data, { headers });
  }
  
  deleteLesson(id: number): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.delete(`${this.url}api/modules/deleteLesson/${id}`, { headers });
  }

  uploadFile(lessonId: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('lesson_id', lessonId);
    formData.append('file', file);

    return this.http.post(`${this.url}api/modules/uploadMedia`, formData);
  }
  
  deleteFile(id: number): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.delete(`${this.url}api/modules/deleteFile/${id}`, { headers });
  }

  
  
  
  
  






  //Mark Lemuel Work Services







  
}

