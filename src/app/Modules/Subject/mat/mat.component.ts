import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mat',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './mat.component.html',
  styleUrl: './mat.component.css'
})
// export class MatComponent {

//   isModalOpen = false;

//   openModal() {
//     this.isModalOpen = true;
//   }

//   closeModal() {
//     this.isModalOpen = false;
//   }
  
// }

export class MatComponent implements OnInit{

  subjectID: number | null = null;
  moduleID: any;
  moduleTitle: any;
  LessonDetails:any;
  storedSubjectID:any;
  lessons:any;
  selectLessonID:any;

  constructor(
    private apiserv: ApiserviceService, 
    private router: Router, 
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  isModalOpen = false;
  newLessonTitle = '';
  newLessonName = '';
  newLessonDesc = '';
  newLessonHandout = '';

  ngOnInit(): void {
    const storedSubjectID = localStorage.getItem('subjectID');
    const storedModuleID = localStorage.getItem('moduleid');
    const storedModuleTitle = localStorage.getItem('moduletitle');
    

    // Retrieve the subjectID from localStorage
 
    if (storedSubjectID) {
      this.subjectID = +storedSubjectID;  // Convert the string to a number
      this.moduleID = storedModuleID;  // Convert the string to a number
      this.moduleTitle = storedModuleTitle;  // Convert the string to a number
      this.apiserv.getLessons(this.moduleID).subscribe((response: any) => {
        this.lessons = response;
        console.log('Lesson: ', this.lessons);
      });
      console.log('Retrieved Subject ID from localStorage:', this.subjectID);
    } else {
      console.error('No subjectID found in localStorage.');
    }
  }

  getLessons(id: number) {
    this.apiserv.getLessons(id).subscribe(
      (response) => {
        this.lessons = response;   
        this.LessonDetails = response;
        this.cdr.detectChanges();  
        console.log('Lessons Details:', this.LessonDetails);
      },
      (error) => {
        console.error('Error fetching lesson details:', error);
      }
    );
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleDropdown(lesson: any) {
    lesson.isDropdownOpen = !lesson.isDropdownOpen;
  }

  
  updateLesson(modules_id: any) {
    this.selectLessonID = modules_id;
    console.log('Selected Lesson ID', this.selectLessonID);
    localStorage.setItem('Lesson Id', this.selectLessonID )
    // this.router.navigate(['/main/subject', this.subjectID, 'modules', this.moduleID, 'upadateLesson', lessonID]);
  }

  uploadFile(modules_id: any) {
    this.selectLessonID = modules_id;
    console.log('Selected Lesson ID', this.selectLessonID);
    localStorage.setItem('Lesson Id', this.selectLessonID )
  }
  
  deleteLesson(lesson_id: number) {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure you want to delete this lesson?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      // If user confirms deletion
      if (result.isConfirmed) {
        // Call the delete API
        this.apiserv.deleteLesson(lesson_id).subscribe(
          (response) => {
            // Success response handling
            console.log('Lesson deleted:', response);
            // Remove the deleted lesson from the list
            this.lessons = this.lessons.filter((lesson: any) => lesson.lesson_id !== lesson_id);
            this.cdr.detectChanges();
  
            // Show success alert
            Swal.fire({
              title: "Deleted!",
              text: "The lesson has been deleted.",
              icon: "success"
            });
          },
          (error) => {
            // Error response handling
            console.error('Error deleting lesson:', error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the lesson. Please try again.",
              icon: "error"
            });
          }
        );
      }
    });
  }
  

  deleteFile(lesson_id: number) {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure you want to delete this file?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      // If user confirms deletion
      if (result.isConfirmed) {
        // Call the delete API for file deletion
        this.apiserv.deleteFile(lesson_id).subscribe(
          (response) => {
            // Success response handling
            console.log('File deleted:', response);
            
            // Find the lesson in the lessons array and set its file property to null
            const lesson = this.lessons.find((lesson: any) => lesson.lesson_id === lesson_id);
            if (lesson) {
              lesson.file = null; // Remove the file content
            }
            this.cdr.detectChanges();  // Manually trigger change detection
  
            // Show success alert
            Swal.fire({
              title: "Deleted!",
              text: "The file has been deleted.",
              icon: "success"
            });
          },
          (error) => {
            // Error response handling
            console.error('Error deleting file:', error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the file. Please try again.",
              icon: "error"
            });
          }
        );
      }
    });
  }  
}
