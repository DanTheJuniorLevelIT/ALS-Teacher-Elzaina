import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  sub: any;
  shl: any;
  authtoken: any;
  teacherid: any;


  // constructor(private apiserv: ApiserviceService){}

  isModalOpen = false;
  currentDate: Date;

  notificationsOpen = false;
  notifications = [
    { message: 'Ava Garcia sent a message Aug 9, 2024', },
    { message: 'Emma Johnson sent a message Aug 10, 2024' },
    { message: 'Liam Smith sent a message Aug 11, 2024' }
  ];

  
  constructor(private apiserv: ApiserviceService, private route: Router) {
    this.currentDate = new Date();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleNotifications(): void {
    this.notificationsOpen = !this.notificationsOpen;
  }

  ngOnInit() {
    const id = localStorage.getItem('id');
    this.teacherid = id;
    this.apiserv.getTeacherSubjects(this.teacherid).subscribe(
      (response: any) => {
        this.sub = response.subject;
        this.shl = response.school;
        console.log(this.sub);
        console.log(this.shl);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  navigateToModules(subjectID: number) {
    localStorage.setItem('subjectID', subjectID.toString());
    this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID]);
  }
}
