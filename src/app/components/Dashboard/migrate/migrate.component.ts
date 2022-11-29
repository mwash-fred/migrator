import { AfterViewInit } from '@angular/core';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {
  AccountsSheet
} from 'src/app/interfaces/accounts-sheet';
import {
  CustomResponse
} from 'src/app/interfaces/custom-response';
import {
  CustomerKYC
} from 'src/app/interfaces/customer-kyc';
import {
  MigrationService
} from 'src/app/services/migration.service';

@Component({
  selector: 'app-migrate',
  templateUrl: './migrate.component.html',
  styleUrls: ['./migrate.component.scss']
})
export class MigrateComponent implements OnInit, AfterViewInit {

  // Variable to store shortLink from api response
  shortLink: string = "";
  customersLoading: boolean = false; // Flag variable
  accountsLoading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  data!: CustomResponse;
  customerColumns: string[] = ['title', 'firstName', 'middleName', 'surname', 'identification', 'dob', 'gender', 'maritalStatus', 'branch', 'mobile',  'Remove'];
  accountsColumns: string[] = ['customerId', 'principal', 'disbursementDate', 'repaymentPeriod', 'product', 'balance', 'branchCode', 'accountManager', 'Remove'];
  customerData!: CustomerKYC[];
  accountsData!: AccountsSheet[];
  accountsLength!: number;
  customersLength!: number;
  customerDataSource : MatTableDataSource<CustomerKYC>;
  accountsDataSource : MatTableDataSource<AccountsSheet>;

  @ViewChild(MatTable) customerTable: MatTable <CustomerKYC>;
  @ViewChild(MatTable) accountsTable: MatTable <AccountsSheet>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private migrationService: MigrationService, private _snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {}

  onChange(event) {
    this.file = event.target.files[0];
  }

  customers() {
    this.customersLoading = !this.customersLoading;
    this.migrationService.migrateCustomers(this.file).subscribe(
      (data) => {
        this.customersLength = data.data.length
        this.data = {...data}
        this.customerData = [...this.data.data]
        this.customerDataSource = new MatTableDataSource(this.customerData);
        this.customerDataSource.paginator = this.paginator;
        this._snackBar.open(data.message, 'Close',{
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
        this.customersLoading = false; // Flag variable
      },
      (error)=> {
        this.customersLoading = false;
        this._snackBar.open(error.error.error, 'Close',{
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      });
  }

  accounts() {
    this.accountsLoading = !this.accountsLoading;
    this.migrationService.migrateAccounts(this.file).subscribe(
      (data) => {
        this.accountsLength = data.data.length
        this.data = {...data}
        this.accountsData = [...this.data.data]
        this.accountsDataSource = new MatTableDataSource(this.accountsData);
        this.accountsDataSource.paginator = this.paginator;
        this._snackBar.open(data.message, 'Close',{
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
        this.accountsLoading = false; // Flag variable 
      },
      (error)=>{
        this.accountsLoading = false;
        this._snackBar.open(error.error.error, 'Close',{
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      }
    );
  }

  removeAccountRecord(row){
    this.accountsData = this.accountsData.filter(account => account !== row);
    this.accountsDataSource = new MatTableDataSource(this.accountsData);
    this.customerTable.renderRows();
  }

  removeCustomerRecord(row){
    this.customerData = this.customerData.filter(customer => customer !== row);
    this.customerDataSource = new MatTableDataSource(this.customerData);
    this.customerTable.renderRows();
  }

  persistAccounts(records : AccountsSheet[]){
    this.accountsLoading = !this.accountsLoading;
    this.migrationService.persistAccounts(records).subscribe(
      data => {
        this._snackBar.open(data.message, 'Close', {
          horizontalPosition: 'end'})
        this.accountsLoading = false;
      },
      error => {
        this._snackBar.open(error.error.error, 'Close', {
          horizontalPosition: 'end'});
        this.accountsLoading = false;
      }
    )
  }

  persistCustomers(records : CustomerKYC[]){

    this.migrationService.persistCustomers(records).subscribe(
      data => {
        this._snackBar.open(data.message, 'Close', {horizontalPosition: 'end'})
        this.accountsLoading = false;
      },
      error => {
        this._snackBar.open(error.error.error, 'Close', {horizontalPosition: 'end'})
        this.accountsLoading = false;
      }
    )
  }
}

