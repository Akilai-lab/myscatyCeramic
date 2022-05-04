import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from "axios";

@Component({
  selector: 'app-form-connection',
  templateUrl: './form-connection.component.html',
  styleUrls: ['./form-connection.component.css']
})
export class FormConnectionComponent implements OnInit {

  actionConnect : boolean;
  constructor() {
    this.actionConnect = false;
   }

  ngOnInit(): void {
  }
  closewindow() {
    window.location.replace('/**');
  }
  connect() {
    this.actionConnect = true;
  }
  onSignup(form:NgForm) {
    const mail = form.value['mail'];
    const password= form.value['password'];
    console.log(mail);
    console.log(password);
    const params = new URLSearchParams();
      if (password != "") {
        params.append('password', password);
      }
      else {
        console.log('error password')
      }
      if (mail != "") {
        params.append('email', mail);
      }
      else {
        console.log('error email')
      }
      console.log(params);
      if(
        (mail.value != "")
        && (password.value != "")
        ) {
        axios.post("http://localhost:3000/api/user/login", params)
        .then(function (response) {
          console.log(response.data);
          const token = JSON.stringify(response.data);
          console.log(token);
          localStorage.setItem('token',token);
          console.log(response.data.status)
          localStorage.setItem('status',response.data.status)
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        })
        .then(()=>{
          document.location.replace('/**')
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  }
  onSignin(form:NgForm) {
    const mail = form.value['mail'];
    const password= form.value['password'];
    console.log(mail);
    console.log(password);
    const params = new URLSearchParams();
      if (password != "") {
        params.append('password', password);
      }
      else {
        console.log('error password')
      }
      if (mail != "") {
        params.append('email', mail);
      }
      else {
        console.log('error email')
      }
      console.log(params);
      if(
        (mail.value != "")
        && (password.value != "")
        ) {
          console.log(params);
          axios.post("http://localhost:3000/api/user/signin", params)
          .then(function (response) {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
          })
          .catch(error => {
            console.log(error)
          })
        }
    }
}
