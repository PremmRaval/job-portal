import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate } from 'src/app/shared/models/candidate.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Candidate) {}

  ngOnInit(): void {}
}
