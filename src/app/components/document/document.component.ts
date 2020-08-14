import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocI } from 'src/shared/models/doc.interface';
import { DocService } from './doc.service';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  private image: any;

 

  constructor(private docSvc:DocService) { }

  public newDocForm = new FormGroup({
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });
  
  ngOnInit(): void {
  }

  addDoc(data: DocI) {
    this.docSvc.preAddAndUpdateDoc(data, this.image);
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }


}
