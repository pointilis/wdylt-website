import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, Firestore, getDoc, orderBy, query, Timestamp, updateDoc } from '@angular/fire/firestore';
import {  Observable, of } from 'rxjs';
import { UserService } from '../../../auth/services/user/user.service';
import { IFilter } from '../../learn.model';
import { get, getDatabase, onValue, ref } from '@angular/fire/database';

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
   * Update learn
   */
  public updateLearn(docId: string, uid: string, data: any): Observable<any> {
    const updateAt = Timestamp.now().toMillis();
    data = {
      ...data,
      updateAt: updateAt,
    }

    return new Observable(observer => {
      updateDoc(doc(this.collectionPreference, uid, 'learns/' + docId), data)
        .then(value => {
          console.log(value);
          observer.next(data);
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  /**
   * Delete learn
   */
  public deleteLearn(docId: string, uid: string): Observable<any> {
    return new Observable(observer => {
      deleteDoc(doc(this.collectionPreference, uid, 'learns/' + docId))
        .then(() => {
          observer.next('Deleted!');
        })
        .catch(error => {
          observer.error(error);
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

  /**
   * Retrieve single learn
   * 
   * @param docId string
   * @param uid string
   */
  getLearn(docId: string, uid: string): Observable<any> {
    return new Observable(observer => {
      getDoc(doc(this.collectionPreference, uid, 'learns/' + docId))
        .then(value => {
          observer.next(value.data());
        })
        .catch(error => {
          observer.error(error);
        })
      });
  }

}
