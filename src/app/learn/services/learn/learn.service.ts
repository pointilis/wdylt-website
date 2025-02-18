import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, Firestore, getDoc, orderBy, query, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import {  Observable, of } from 'rxjs';
import { UserService } from '../../../auth/services/user/user.service';
import { IFilter } from '../../learn.model';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { getAuth } from '@angular/fire/auth';

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
  public addLearn(data: any): Observable<any> {
    if (!MIME_TYPE.includes(data.mimeType)) {
      return of(Error('Invalid mime type.'));
    }

    return new Observable((observer) => {
      const createAt = Timestamp.now().toMillis();
      
      this.userService.getUser().then(user => {
        const uid = user.uid;
        data = {
          ...data,
          uid: uid,
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
    let q = query(c, orderBy('createAt', 'desc'));

    if (filter.startDate && filter.endDate) {
      q = query(
        c,
        where('createAt', '>=', filter.startDate),
        where('createAt', '<=', filter.endDate),
        orderBy('createAt', 'desc')
      );
    }

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

  /**
   * Upload audio
   * 
   * @param mimeType string valid value 'text' or 'audio'
   */
  public uploadAudio(blob: Blob): Observable<any> {
    return new Observable((observer) => {
      const storage = getStorage();
      const auth = getAuth();
      const timestamp = Timestamp.now().toMillis();
      const storageRef = ref(storage, `${auth.currentUser?.uid}/learns/audios/${timestamp}-audio.wav`);

      uploadBytes(storageRef, blob)
        .then(async (snapshot) => {
          console.log('Uploaded a blob or file!');
          const downloadURL = await getDownloadURL(snapshot.ref);
          observer.next(downloadURL);
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

}
