import { CommonModule } from '@angular/common';
import { afterNextRender, afterRender, Component, EventEmitter, inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ChangeEvent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Bold, CKFinder, CKFinderUI, CKFinderUploadAdapter, ClassicEditor, EditorConfig, Essentials, ImageInsertUI, Image as CKImage, ImageResize, ImageStyle, ImageToolbar, ImageUpload, Italic, Link, MediaEmbed, Paragraph, SimpleUploadAdapter, FontColor, FontFamily, Font, FontSize, List, TodoList, TodoListUI, TodoListEditing, Underline, UnderlineEditing, UnderlineUI, UploadAdapter, UploadResponse, FileLoader, FileRepository, Base64UploadAdapter, Editor } from 'ckeditor5';
import { debounceTime, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../../auth/services/user/user.service';
import { XAdapter } from './upload-adapter';


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
export class WriteCkeditorComponent implements OnInit {
  
  private readonly userService = inject(UserService);
  @Output() public onChange: EventEmitter<any> = new EventEmitter<any>;
  private debouncer: Subject<string> = new Subject<string>();
  private accessToken: string = '';

  public data: any;
  public editor = ClassicEditor;
  public config!: EditorConfig;

  constructor() {
    this.debouncer
      .pipe(debounceTime(500), takeUntilDestroyed())
      .subscribe(value => this.onChange.emit(value));
  }

  async ngOnInit() {
    const user = await this.userService.getUser();
    this.accessToken = user.tokenResult.token;

    this.config = {
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
        uploadUrl: 'https://storage.googleapis.com/upload/storage/v1/b/wdylt-images/o',

        // Enable the XMLHttpRequest.withCredentials property.
        withCredentials: true,

        // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    }
  }

  /**
   * Listen editor changed
   */
  public editorChangeHandler( { editor }: ChangeEvent ) {
    if (editor) {
      const data = editor.getData();
      this.debouncer.next(data);
    }
  }

  /**
   * Trigger editor from outside
   */
  public setContent(content: any) {
    this.data = content;
  }

  /**
   * Editor ready
   */
  editorReadyHandler(editor: Editor) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      return new XAdapter( loader );
    };
  }

}
