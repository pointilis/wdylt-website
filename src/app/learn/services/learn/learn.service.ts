import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, Firestore, orderBy, query, Timestamp } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from '../../../auth/services/user/user.service';

export const MIME_TYPE = ['text', 'audio'];

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  private firestore: Firestore = inject(Firestore);
  private userService = inject(UserService);
  collectionPreference!: CollectionReference;

  constructor() { 
    this.collectionPreference = collection(this.firestore, 'learns');
  }

  /**
   * Add learn
   * 
   * @param mimeType string valid value 'text' or 'audio'
   */
  public addLearn(data: Object, mimeType: string = 'text'): Observable<any> {
    if (!MIME_TYPE.includes(mimeType)) {
      return of(Error('Invalid mime type.'));
    }

    return new Observable((observer) => {
      const createAt = Timestamp.now();
      
      this.userService.getUser().then(user => {
        const uid = user.uid;
        data = {
          ...data,
          uid: uid,
          mimeType: mimeType,
          createAt: createAt,
          updateAt: createAt,
        }

        addDoc(this.collectionPreference, data)
          .then(doc => {
            data = {
              ...data,
              id: doc.id,
            }
            observer.next(data)
          })
          .catch(error => observer.error(error));
      });
    });
  }

  /**
   * Load learns
   */
  getLearns(): Observable<any> {
    const q = query(this.collectionPreference, orderBy('createAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<any>
  }

}
