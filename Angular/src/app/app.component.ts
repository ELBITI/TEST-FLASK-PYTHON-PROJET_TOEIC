import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  template: `
    <h1>Test de liaison PHP-Flask-Angular</h1>
    <input type="file" (change)="onFileSelected($event)" />
    <button (click)="uploadImage()">Envoyer</button>
    <div *ngIf="response">
      <h2>Réponse :</h2>
      <p>{{ response.message }}</p>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: File | null = null;
  response: any = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http.post('http://localhost/php_test/test.php', formData).subscribe(
        (res: any) => {
          this.response = res;
        },
        (err) => {
          console.error(err);
        }
      );
    }
    
  }
}
