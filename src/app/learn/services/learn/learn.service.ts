import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, Firestore, orderBy, query, Timestamp } from '@angular/fire/firestore';
import {  Observable, of } from 'rxjs';
import { UserService } from '../../../auth/services/user/user.service';
import { IFilter } from '../../learn.model';

export const MIME_TYPE = ['text', 'audio'];

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  private firestore: Firestore = inject(Firestore);
  private userService = inject(UserService);
  collectionPreference!: CollectionReference;

  constructor() { 
    this.collectionPreference = collection(this.firestore, 'users');
  }

  /**
   * Add learn
   * 
   * @param mimeType string valid value 'text' or 'audio'
   */
  public addLearn(data: any, mimeType: string = 'text'): Observable<any> {
    if (!MIME_TYPE.includes(mimeType)) {
      return of(Error('Invalid mime type.'));
    }

    return new Observable((observer) => {
      const createAt = Timestamp.now().toMillis();
      
      this.userService.getUser().then(user => {
        const uid = user.uid;
        data = {
          ...data,
          uid: uid,
          mimeType: mimeType,
          createAt: createAt,
          updateAt: createAt,
        }

        // users/{uid}/learns/{id}
        addDoc(collection(this.collectionPreference, uid, "learns"), data)
          .then((res) => {
            data = {
              ...data,
              id: res.id,
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
  getLearns(filter: IFilter): Observable<any> {
    const c = collection(this.collectionPreference, filter.uid, 'learns')
    const q = query(c, orderBy('createAt', 'desc'));

    return collectionData(q, { idField: 'id' }) as Observable<any>
  }

}
