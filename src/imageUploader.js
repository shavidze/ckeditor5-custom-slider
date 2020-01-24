// class ImageUploadAdapter {

//     constructor(private loader: any,
//                 private http: HttpClient,
//                 private uploadUrl: string) {
//     }

//     upload() {
//         return this.loader.file.then(file => new Promise((resolve, reject) => {
//             this.doUpload(this.uploadUrl, file, {}).subscribe(res => {
//                 if (res.type === HttpEventType.UploadProgress) {
//                     this.loader.uploadTotal = res.total;
//                     this.loader.uploaded = res.loaded;
//                     return;
//                 }

//                 if (res.type === HttpEventType.Response) {
//                     console.log('res', res.body);
//                     resolve({
//                         default: res.body.src
//                     });
//                     return;
//                 }
//             }, error => {
//                 reject(error);
//             });
//         }));
//     }

//     abort() {
//         // if ( this.xhr ) {
//         //     this.xhr.abort();
//         // }
//     }

//     private doUpload(endpoint: string, file: File, options: any): Observable<HttpEvent<{ src: string }>> {
//         return this.requestUpload(endpoint, options).pipe(switchMap((uploadUrl: string) => this.finishUpload(uploadUrl, file)));
//     }

//     private requestUpload(endpoint: string, params: any): Observable<string> {
//         const formData: FormData = new FormData();
//         formData.append('data', JSON.stringify(params));
//         return this.http.post<{ uploadUrl: string }>(endpoint, params).pipe(map(res => res.uploadUrl));
//     }

//     private finishUpload(uploadUrl: string, file: File): Observable<HttpEvent<{ src: string }>> {
//         const formData: FormData = new FormData();
//         const headers: HttpHeaders = new HttpHeaders();
//         formData.append('file', file, file.name);
//         headers.set('Content-Type', 'multipart/form-data');
//         return this.http.post<{ src: string }>(uploadUrl, formData, {
//             headers,
//             reportProgress: true,
//             observe: 'events',
//         });
//     }
// }
