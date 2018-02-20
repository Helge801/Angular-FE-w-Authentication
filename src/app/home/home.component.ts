import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import * as Tone from 'tone';
import { Identifiers } from '@angular/compiler';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims : any;
  pointCollection : number[][];
  ctx : AudioContext;

  constructor(private router : Router, private userService : UserService) { 
    this.pointCollection = []
    this.musicLoop();
   }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data : any)=>{
      this.userClaims = data;
    });
  }

  Logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  findHeight(event){
    return Math.floor((36.0 / event.target.offsetHeight) * event.offsetY);
  }

  findWidth(event){
    return Math.floor((100.0 / event.target.offsetWidth) * event.offsetX);
  }

  musicLoop(){
    var synth = new Tone.Synth().toMaster();
    this.pointCollection.forEach((point)=>{
      setTimeout(() => {
        synth.triggerAttackRelease(this.translateTone(point[1]), '16n');
      },40.0*point[1]);
    });
    setTimeout(() => {
      this.musicLoop();
    }, 4000);
  }

  translateTone(height){
    return ["B5", "A#5", "A5", "G#5", "G5", "F#5", "F5", "E5", "D#5", "D5", "C#5", "C5", "B4", "A#4", "A4", "G#4", "G4", "F#4", "F4", "E4", "D#4", "D4", "C#4", "C4", "B3", "A#3", "A3", "G#3", "G3", "F#3", "F3", "E3", "D#3", "D3", "C#3", "C3"][height];
  }

  myEvent(event){
    this.pointCollection.push([this.findWidth(event),this.findHeight(event)]);
    console.log(this.pointCollection);
    event.target.insertAdjacentHTML('beforeend', `<div class="dot" style="left: ${event.offsetX}px; top: ${event.offsetY}px;"></div>`);
  }

}
