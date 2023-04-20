import { Injectable } from '@angular/core';

export interface Student {
  readonly id: string
  readonly name: string
}

export interface Promotion {
  readonly label: string
}

export interface QCM {
  readonly id: string;
  readonly question: string
  readonly propositions: readonly string[]
}

export interface QCM_response {
  readonly student: Student
  readonly qcm: QCM
  readonly responses: readonly string[]
}

@Injectable()
export class PromoService {

  constructor() {}

  /**
   * 
   */
  async getStudentsResponses(): Promise<readonly QCM_response[]> {
    console.log("getStudentsResponses")
    const [students, qcms] = await Promise.all([
      Promise.all( (await this.getStudentsID()).map( id => this.getStudent(id) ) ),
      Promise.all( (await this.getQCMsID    ()).map( id => this.getQCM    (id) ) ),
    ]);

    console.log("Student and Qcm", students, qcms);
    const L: Promise<QCM_response>[] = students.map( 
      student => qcms.map( qcm => this.getStudentResponse(student, qcm) ) 
    ).reduce( 
      (L, responses) => [...L, ...responses], [] 
    );

    return Promise.all(L);
  }

  // Méthodes fournies
  async getStudentResponse(student: Student, qcm: QCM): Promise<QCM_response> {
    console.log("start getStudentResponse", student.id, qcm.id)
    return new Promise( r => setTimeout( () => {
      console.log("end getStudentResponse", student.id, qcm.id)
      r({student, qcm, responses: []});
    }, 100*Math.random()))
  }

  async getStudentsID(): Promise<readonly string[]> {
    console.log("start getStudentsID")
    return new Promise( r => setTimeout( () => {
      const L = ['A', 'B', 'C'];
      console.log("end getStudentsID", L)
      r(L)
    }, 100) );
  }

  async getStudent(id: string): Promise<Student> {
    console.log("start getStudent", id)
    return new Promise( r => setTimeout( () => {
      console.log("end getStudent", id)
      r({id, name: `bob ${id}`})
    }, 100 * Math.random() ) );
    return {id, name: `bob ${id}`};
  }

  async getQCM(id: string): Promise<QCM> {
    console.log("start getQCM", id)
    return new Promise( r => setTimeout( () => {
      console.log("end getQCM", id)
      r({id, question: "", propositions: []})
    }, 100*Math.random()))
  }
  
  async getQCMsID(): Promise<readonly string[]> {
    console.log("start getQCMsID")
    return new Promise( r => setTimeout( () => {
      const L = ['1', '2'];
      console.log("end getQCMsID", L)
      r(L)
    }, 100) );
  }


}