import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { QcmService } from './cc2/qcm/qcm.service';
import { QCM, Student } from './cc2/promo.service';
import { combineLatest, map, Observable } from 'rxjs';
import { Cc2Module } from './cc2/cc2.module';

interface STATE {
  student: Student;
  qcm: QCM;
}

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [Cc2Module, CommonModule],
  providers: [QcmService],
  templateUrl: './main.html',
})
export class App {
  stateObs: Observable<STATE>;

  constructor(private qcmsrv: QcmService) {
    this.stateObs = combineLatest([qcmsrv.student, qcmsrv.qcm]).pipe(
      map(([student, qcm]) => ({ student, qcm }))
    );
  }

  repondre(student: Student, qcm: QCM, L: readonly number[]): void {
    this.qcmsrv.submitResponse(student, qcm, L);
  }
}

bootstrapApplication(App);
