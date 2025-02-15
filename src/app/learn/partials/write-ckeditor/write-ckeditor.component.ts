import { CommonModule } from '@angular/common';
import { afterNextRender, afterRender, Component, ViewEncapsulation } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Bold, CKFinder, CKFinderUI, CKFinderUploadAdapter, ClassicEditor, EditorConfig, Essentials, ImageInsertUI, Image as CKImage, ImageResize, ImageStyle, ImageToolbar, ImageUpload, Italic, Link, MediaEmbed, Paragraph, SimpleUploadAdapter, FontColor, FontFamily, Font, FontSize, List, TodoList, TodoListUI, TodoListEditing, Underline, UnderlineEditing, UnderlineUI } from 'ckeditor5';

@Component({
  selector: 'write-ckeditor',
  templateUrl: './write-ckeditor.component.html',
  styleUrl: './write-ckeditor.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    CKEditorModule,
  ],
})
export class WriteCkeditorComponent {
  
  public Editor = ClassicEditor;
  public config: EditorConfig = {
    licenseKey: 'GPL', // Or 'GPL'.
    placeholder: 'Use #hashtags to define a topic.',
    plugins: [ 
      Essentials, 
      Paragraph, 
      Bold, 
      Link,
      Italic,
      Font,
      FontColor,
      FontFamily,
      FontSize,
      CKImage,
      CKFinder,
      CKFinderUI,
      CKFinderUploadAdapter,
      ImageUpload,
      ImageInsertUI, 
      SimpleUploadAdapter,
      List,
      TodoList,
      TodoListUI,
      TodoListEditing,
      Underline,
      UnderlineEditing,
      UnderlineUI,
    ],
    toolbar: {
      items: [ 
        'undo', 'redo',
        'fontsize', 'fontColor',
        'bold', 'underline',
        'numberedList', 'bulletedList', 'todoList',
        'imageUpload'
      ],
    },
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: 'http://example.com',

      // Enable the XMLHttpRequest.withCredentials property.
      withCredentials: true,

      // Headers sent along with the XMLHttpRequest to the upload server.
      headers: {
        'X-CSRF-TOKEN': 'CSRF-Token',
        Authorization: 'Bearer <JSON Web Token>'
      }
    }
  }

  constructor() {
    afterRender(() => {
      
    });
  }

}
