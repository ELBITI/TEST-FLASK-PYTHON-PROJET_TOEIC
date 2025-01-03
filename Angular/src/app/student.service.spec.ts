import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './models/student'; // Importez le modèle

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/students';
  private apiAddUrl = 'http://localhost:5000/api/student';

  constructor(private http: HttpClient) {}

  
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }


  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiAddUrl, student);
  }
}
