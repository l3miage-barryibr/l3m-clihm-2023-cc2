import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PromoService, QCM } from '../promo.service';

@Component({
  selector: 'qcm[data]',
  templateUrl: './qcm.component.html',
  styleUrls: ['./qcm.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QcmComponent {
  responses: boolean[] = [];
  private _data!: QCM;
  @Input() 
  get data(): QCM {return this._data}
  set data(d: QCM) {
    this._data = d;
    this.responses = d.propositions.map( () => false );
  }
  @Output() submit = new EventEmitter<number[]>() // Les indexes des réponses choisies

  constructor(private s: PromoService) {
    s.getStudentsResponses().then(
      L => console.log(`end getStudentsResponses
\t* ${L.map( sr => `${sr.student.id} / ${sr.qcm.id}`).join("\n\t* ")}
`
    ))}
  submitResponses(): void {
    this.submit.emit( this.responses.reduce( (L, r, i) => r ? [...L, i] : L, []) )
  }
}