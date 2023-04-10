import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Candidate } from '../../../shared/models/candidate.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

type AdminTableColumns = {
  columnDef: string;
  header: string;
  cell: (element: Candidate) => string;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  columns: AdminTableColumns[] = [
    {
      columnDef: 'name',
      header: 'name',
      cell: (element: Candidate) => `${element.name}`,
    },
    {
      columnDef: 'email',
      header: 'email',
      cell: (element: Candidate) => `${element.email}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);
  userDataSource = new MatTableDataSource<Candidate>();

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsersInProcessState();
  }

  private getUsersInProcessState() {
    this.dataService
      .getUsersInProcess()
      .pipe(
        map((result) => {
          return result.users.map((candidate) => {
            const {
              id,
              first_name,
              last_name,
              email,
              phone,
              password,
              age,
              account_status,
              resume_path,
              certificate_path,
            } = candidate;
            return new Candidate(
              id,
              first_name,
              last_name,
              email,
              phone,
              password,
              age,
              account_status,
              resume_path,
              certificate_path
            );
          });
        })
      )
      .subscribe((data) => {
        this.userDataSource.data = data;
      });
  }

  openDialog(row: Candidate): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result: Candidate) => {
      if (result) {
        this.dataService.setAccountStatus(result.id, 1).subscribe((res) => {
          this.snackBar.open(res.message, 'close', {
            duration: 3000,
          });
          this.getUsersInProcessState();
        });
      }
    });
  }
}
