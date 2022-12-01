import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'g-dialog-confirm',
  templateUrl: './g-dialog-confirm.component.html',
  styleUrls: ['./g-dialog-confirm.component.scss']
})
export class GDialogConfirmComponent implements OnInit {

  constructor(
    public dialogConfigRef: MatDialogRef<GDialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogConfigRef.close()
  }
  onConfirm() {
    this.dialogConfigRef.close(true)
  }
}
