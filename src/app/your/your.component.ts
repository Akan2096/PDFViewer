import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-your',
  templateUrl: './your.component.html',
  styleUrls: ['./your.component.css']
})
export class YourComponent implements OnInit {

  ngOnInit(): void {
  }

  @ViewChild('pdfViewerOnDemand', { static: true }) public pdfViewerOnDemand: any;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad : any;

  constructor(private http: HttpClient) {
    let url = "https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf";
      this.downloadFile(url).subscribe(
          (res: any) => {
              this.pdfViewerAutoLoad.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
              this.pdfViewerAutoLoad.refresh(); // Ask pdf viewer to load/refresh pdf
          }
      );
   }

   private downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' })
        .pipe(
            map((result: any) => {
                return result;
            })
        );
}

public openPdf() {
  let url = "https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf";

   this.downloadFile(url).subscribe(
  (res:any) => {
      this.pdfViewerOnDemand.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
      this.pdfViewerOnDemand.refresh(); // Ask pdf viewer to load/reresh pdf
    }
  );
}

public testBeforePrint() {
  console.log("testBeforePrint() successfully called");
}

public testAfterPrint() {
  console.log("testAfterPrint() successfully called");
}

public testPagesLoaded(count: number) {
  console.log("testPagesLoaded() successfully called. Total pages # : " + count);
}

public testPageChange(pageNumber: number) {
  console.log("testPageChange() successfully called. Total pages # : " + pageNumber);
}

}
