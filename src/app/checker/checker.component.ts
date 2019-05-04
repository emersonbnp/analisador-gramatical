import { Component, OnInit } from '@angular/core';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition-service';
import { GrammerCheckerService } from '../services/grammar-checker-service';

const self = this;
@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.css']
})
export class CheckerComponent implements OnInit {

  showSearchButton: boolean;
  speechData: string;
  correto: boolean;
  feedback: string;
  modelo = {nome: 'aeee', value: 1};
  /*
  * Stage 1: waiting for 'try' command
  * Stage 2: listening sentence
  * Stage 3: feedback given - waiting for 'try' again
  */
  stage = 1;
  phrase: string;
  classifiedPhrase = new Array();
  speech = new SpeechSynthesisUtterance();

  constructor(private speechRecognitionService: SpeechRecognitionService,
    private checkerService: GrammerCheckerService) {
    this.showSearchButton = true;
    this.speechData = "";
  }


  ngOnInit() {
    const voices = window.speechSynthesis.getVoices();
    this.speech.voice = voices[1]; // Note: some voices don't support altering params
    this.speech.volume = 1; // 0 to 1
    this.speech.rate = 1; // 0.1 to 10
    this.speech.pitch = 1; //0 to 2
    this.speech.lang = 'pt-br';
    this.activate();
  }

  ngOnDestroy() {
    this.speechRecognitionService.destroySpeechObject();
  }

  activate(): void {

    this.speechRecognitionService.record()
      .subscribe(
        //listener
        (value) => {
          this.classifiedPhrase = [];
          this.speechData = value;
          if (this.stage !== 2 && this.speechData.toLowerCase().trim().includes('começar')) {

            this.stage = 2
          } else if (this.stage === 2) {

            this.phrase = this.speechData;

            this.checkerService.check(this.phrase).subscribe(response => {

              this.classifiedPhrase = response.tokens;
              this.speak(response.suggestion);
              console.log(response.suggestion);
              this.correto = response.correct;
              this.feedback = response.suggestion;
            });

            this.stage = 3;
          }
        },
        //errror
        (err) => {
          console.log(err);
          if (err.error == "no-speech") {
            console.log("--restatring service--");
            this.activate();
          }
        },
        //completion
        () => {
          console.log("--complete--");
          this.activate();
        });
  }

  speak(str) {

    this.speech.text = str;
    speechSynthesis.speak(this.speech);
  }

  obterValorNaoNulo(obj: any) {

    if (obj.artigo) {

      return 'artigo'
    } else if (obj.substantivo) {

      return 'substantivo'
    } else if (obj.verbo) {

      return 'verbo'
    } else if (obj.preposicao) {

      return 'preposição'
    } else if (obj.adverbio) {

      return 'advérbio'
    } else if (obj.pronome) {

      return 'pronome'
    }
  }

  obterNome(obj: any) {

    if (obj.artigo) {

      return obj.artigo.nome
    } else if (obj.substantivo) {

      return obj.substantivo.nome
    } else if (obj.verbo) {

      return obj.verbo.nome;
    } else if (obj.preposicao) {

      return obj.preposicao.nome;
    } else if (obj.adverbio) {

      return obj.adverbio.nome;
    } else if (obj.pronome) {

      return obj.pronome.nome;
    }
  }

  change() {
    console.log('pai: ' + this.modelo);
  }

}
