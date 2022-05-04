import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from "axios";

@Component({
  selector: 'app-add-articles',
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.css']
})
export class AddArticlesComponent implements OnInit {
  file: any;
  constructor() { }

  ngOnInit(): void {
  }
  /** Ajouter un article **/
  addAnArticle(form:NgForm) {
    const title = form.value['title'];
    const price= form.value['price'];
    const titleFirst = form.value['titleFirst'];
    const priceFirst = form.value['priceFirst'];
    const titleScnd = form.value['titleScnd'];
    const priceScnd = form.value['priceScnd'];
    const titleThird = form.value['titleThird'];
    const priceThird = form.value['priceThird'];
    const dimensionFirst = form.value['dimensionFirst'];
    const dimensionScnd = form.value['dimensionScnd'];
    const dimensionThird = form.value['dimensionThird'];
    console.log(title); 
    console.log(price); 
    console.log(titleFirst); 
    console.log(priceFirst); 
    console.log(titleScnd); 
    console.log(priceScnd); 
    console.log(titleThird); 
    console.log(priceThird); 
    console.log(dimensionFirst);
    console.log(dimensionScnd);
    console.log(dimensionThird);
    
    const formData = new FormData();
    formData.append('title', title)
    formData.append('price', price)
      if (titleFirst != undefined) {
        formData.append('titleFirst', titleFirst);
      }
      if(dimensionFirst != undefined) {
        formData.append('dimensionFirst', dimensionFirst);
      }
      if (priceFirst != "") {
        formData.append('priceFirst', priceFirst);
      }
      if (titleScnd != "") {
        formData.append('titleScnd', titleScnd);
      }
      if(dimensionScnd != undefined) {
        formData.append('dimensionScnd', dimensionScnd);
      }
      if (priceScnd != "") {
        formData.append('priceScnd', priceScnd);
      }
      if (titleThird != "") {
        formData.append('titleThird', titleThird);
      }
      if(dimensionThird != undefined) {
        formData.append('dimensionThird', dimensionThird);
      }
      if (priceThird != "") {
        formData.append('priceThird', priceThird);
      }
      if(this.file > 0 ){  
        for (var index = 0; index < this.file; index++) {
          formData.append("image",  (<HTMLInputElement>document.getElementById('file')).files[index]);
        }
      }    
      console.log(formData);
      const token:any = localStorage.getItem('token');
      const monObjet : any = JSON.parse(token);
      let auth = 'bearer' + " " + monObjet.token;
      console.log(auth);
        axios.post("http://localhost:3000/api/article/articlenewProject", formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': auth
          }
      })
        .then(function (response) {
          console.log(response.data);
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
  /** Ajout de fichier **/
  onFilesAdded(event:Event){
      this.file = (event.target as HTMLInputElement).files.length;
      console.log(this.file)
      return this.file
  }
}
