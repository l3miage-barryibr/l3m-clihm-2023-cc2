import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QCM, Student } from '../promo.service';

@Injectable()
export class QcmService {
  qcm: Observable<QCM> = of({
    id: "qcm-1",
    question: "Quelle était la couleur du cheval blanc d'Henri IV ?",
    propositions: ['Rouge', 'Noir', 'Blanc', 'Vert']
  })
  student: Observable<Student> = of({
    id: 'étudiant 1',
    name: 'John Dorian'
  })

  submitResponse(student: Student, qcm: QCM, L: readonly number[]): void {
    console.log("réponse pour", student, qcm, L)
  }

}