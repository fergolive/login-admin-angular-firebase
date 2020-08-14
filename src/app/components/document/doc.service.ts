import { Injectable } from '@angular/core';
//firebase calls
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
//rxjs
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
//models interfaces
import { DocI } from 'src/shared/models/doc.interface';
import { FileI } from 'src/shared/models/file.interface';


@Injectable({
  providedIn: 'root'
})
export class DocService {
  private docsCollection: AngularFirestoreCollection<DocI>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { 
    this.docsCollection = afs.collection<DocI>('docs');
  }

  public getAllDocs(): Observable<DocI[]> {
    return this.docsCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as DocI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getOnePost(id: DocI): Observable<DocI> {
    return this.afs.doc<DocI>(`posts/${id}`).valueChanges();
  }

  public deletePostById(post: DocI) {
    return this.docsCollection.doc(post.id).delete();
  }

  public editPostById(post: DocI, newImage?: FileI) {
    if (newImage) {
      this.uploadImage(post, newImage);
    } else {
      return this.docsCollection.doc(post.id).update(post);
    }
  }

  public preAddAndUpdateDoc(post: DocI, image: FileI): void {
    this.uploadImage(post, image);
  }

  private savePost(post: DocI) {
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downloadURL,
      fileRef: this.filePath,
      tagsPost: post.tagsPost
    };

    if (post.id) {
      return this.docsCollection.doc(post.id).update(postObj);
    } else {
      return this.docsCollection.add(postObj);
    }

  }

  private uploadImage(post: DocI, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.savePost(post);
          });
        })
      ).subscribe();
  }
}
