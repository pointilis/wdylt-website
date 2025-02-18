import { inject } from "@angular/core";
import { Auth, getAuth } from "@angular/fire/auth";
import { Timestamp } from "@angular/fire/firestore";
import { getDownloadURL, getStorage, ref, Storage, uploadBytes } from "@angular/fire/storage";
import { FileLoader, UploadAdapter, UploadResponse } from "ckeditor5/src/upload.js";

type DomFileReader = globalThis.FileReader;


export class XAdapter implements UploadAdapter {

    /**
	 * `FileLoader` instance to use during the upload.
	 */
	public loader: FileLoader;

	public reader?: DomFileReader;

	/**
	 * Creates a new adapter instance.
	 */
	constructor( loader: FileLoader ) {
		this.loader = loader;
	}

    public upload(): Promise<UploadResponse> {
        const storage = getStorage();
        const auth = getAuth();

        return this.loader.file
			.then( file => new Promise( ( resolve, reject ) => {
                // 'file' comes from the Blob or File API
				console.log(file);

                if (file) {
                    const timestamp = Timestamp.now().toMillis();
                    const storageRef = ref(storage, `${auth.currentUser?.uid}/learns/images/${timestamp}-${file.name}`);
                    uploadBytes(storageRef, file).then(async (snapshot) => {
                        console.log('Uploaded a blob or file!');
                        const downloadURL = await getDownloadURL(snapshot.ref);
                        resolve({
                            default: downloadURL,
                        });
                    });
                }
			} ) );
    }

}