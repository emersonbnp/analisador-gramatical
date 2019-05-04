import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { CheckerComponent } from './checker/checker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpeechRecognitionService } from './services/speech-recognition-service';
import { HttpClientModule } from '@angular/common/http';
import { GrammerCheckerService } from './services/grammar-checker-service';
import { SearcherComponent } from 'src/app/searcher/searcher.component';
import { NgModel, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CheckerComponent,
    SearcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    SpeechRecognitionService,
    GrammerCheckerService
  ],
  exports: [
    SearcherComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
