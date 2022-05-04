import {FormBuilder, FormGroup} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import axios from "axios";
@Component({
  selector: 'app-descript-an-article',
  templateUrl: './descript-an-article.component.html',
  styleUrls: ['./descript-an-article.component.css']
})
export class DescriptAnArticleComponent implements OnInit {
  content :any;
  img : any;
  price : number;
  title : "";
  objectOne : any;
  objectScnd: any;
  objectThird: any;
  arrayImages:any;
  image:any;
  propertieDetails:any;
  ArrayDescript:any;
  ListDescript:any;
  isAddBefore: boolean;
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
    var url = window.location.href;
    var idArticle =  url.slice(30) ;
    this.img = [];
    this.image = [];
    this.ArrayDescript = [];
    this.ListDescript = [];
    this.isAddBefore = false;
    this.content = [];
    function visualArticles (tab:any, price :any, title:any,ArrayImg:any, first: any, scnd : any, third: any,images:any,img:any,propertiesArticle:any,detailsDescript:any) {
      console.log(idArticle)
      console.log(typeof(tab))
      axios.get("http://localhost:3000/api/article/OneArticle",{ params: { answer: idArticle } })
      .then( (response) => {
        console.log(response.data) 
        tab = response.data; 
        console.log(tab)
        console.log(tab.id)
        console.log(tab.price)
        price = tab.price; 
        title = tab.title; 
        console.log(tab.firstObject)
        images = JSON.parse("["+tab.img+"]")
        for (let obj = 0 ; obj < images.length; obj++) {
          console.log(obj)
          for(let item of images[obj]) {
            console.log(item)
            const idDetailPicture = {
              id : obj++,
              img : item
            }
            ArrayImg.push(idDetailPicture)
          }
        }
        console.log(ArrayImg[0].img)
        console.log(ArrayImg)
        console.log(typeof(tab.firstObject)) 
        console.log(JSON.parse(tab.scndObject)) 

        if(tab.firstObject!==null && tab.scndObject!==null && tab.thirdObject!==null) {
          price = tab.price; 
          title = tab.title; 
          first = JSON.parse(tab.firstObject);
          scnd = JSON.parse(tab.scndObject); 
          third = JSON.parse(tab.thirdObject);
          console.log(first)
          console.log(scnd)
          console.log(third)
          propertiesArticle = { 
            'title' : title,
            'price' : price,
            'first' : first,
            'scnd' : scnd, 
            'third' : third
          }
          console.log(propertiesArticle)
          detailsDescript.push(propertiesArticle)
        }
        else {
          price = tab.price; 
          title = tab.title; 
          propertiesArticle = { 
            'title' : title,
            'price' : price,
          }
          console.log(propertiesArticle)
          detailsDescript.push(propertiesArticle)
          console.log(detailsDescript)
          return detailsDescript 
        }  
      })
      .then(()=> {
        console.log(detailsDescript)
        document.getElementById('picture').style.backgroundImage = "url("+ArrayImg[0].img+")";
        document.getElementById('picture').style.width = "350px";
        document.getElementById('picture').style.height = "350px";
        document.getElementById('picture').style.backgroundSize = "cover";
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    visualArticles(this.content,this.price, this.title,this.img,this.objectOne,this.objectScnd,this.objectThird,this.arrayImages,this.image,this.propertieDetails,this.ArrayDescript );

    axios.get("http://localhost:3000/api/order/getAllOrder")
    .then( (response) => {
        console.log(response.data)
        console.log(this.ArrayDescript)
        console.log(this.ArrayDescript[0].first)
        console.log(this.ArrayDescript[0].scnd)
        console.log(this.ArrayDescript[0].third)
        for(let i = 0; i < response.data.length; i++) {
        if(typeof(JSON.parse(response.data[i].idArticle)[0]) == 'string') {
          if(JSON.parse(response.data[i].idArticle)[0] == idArticle) {
            console.log(response.data[i].articles.length)
            if(
              JSON.stringify(JSON.parse(JSON.parse(response.data[i].articles))) === JSON.stringify(this.ArrayDescript[0].first) 
            ) {
              this.isAddBefore = true;
              console.log(JSON.parse(JSON.parse(response.data[i].articles)))
              this.ListDescript.push(JSON.parse(JSON.parse(response.data[i].articles)))
            }
            if(
              JSON.stringify(JSON.parse(JSON.parse(response.data[i].articles))) === JSON.stringify(this.ArrayDescript[0].scnd)
            ) {
              this.isAddBefore = true;
              console.log(JSON.parse(JSON.parse(response.data[i].articles)))
              this.ListDescript.push(JSON.parse(JSON.parse(response.data[i].articles)))
            }
            if(
            JSON.stringify(JSON.parse(JSON.parse(response.data[i].articles))) === JSON.stringify(this.ArrayDescript[0].third)
            ) {
              this.isAddBefore = true;
              console.log(JSON.parse(JSON.parse(response.data[i].articles)))
              this.ListDescript.push(JSON.parse(JSON.parse(response.data[i].articles)))
            }
            console.log(this.ListDescript)
          }
        } 
        if(typeof(JSON.parse(response.data[i].idArticle)[0]) !== 'string') {
          if(JSON.parse(response.data[i].idArticle)[0][0] == idArticle) {
            console.log(this.ListDescript.length)
            if(
              JSON.stringify(JSON.parse(JSON.parse(response.data[i].articles))) == JSON.stringify(this.ArrayDescript[0].first) && this.ArrayDescript[0].first 
            ) {
              if(!(this.ListDescript.includes(this.ArrayDescript[0].first))){
                this.isAddBefore = true;
                console.log(this.ListDescript)
                console.log(this.isAddBefore)
                this.ListDescript.push(this.ArrayDescript[0].first)
              }
            }
            if(
              JSON.stringify(JSON.parse(JSON.parse(response.data[i].articles))) == JSON.stringify(this.ArrayDescript[0].scnd) && this.ArrayDescript[0].scnd
            ) {
              if(!(this.ListDescript.includes(this.ArrayDescript[0].scnd))){
                this.isAddBefore = true;
                console.log(this.isAddBefore)
                this.ListDescript.push(this.ArrayDescript[0].scnd)
              }
            }
            if(
            JSON.stringify(JSON.parse(JSON.parse(response.data[i].articles))) == JSON.stringify(this.ArrayDescript[0].third) && this.ArrayDescript[0].third
            ) {
              if(!(this.ListDescript.includes(this.ArrayDescript[0].third))){
                this.isAddBefore = true;
                console.log(this.isAddBefore)
                this.ListDescript.push(this.ArrayDescript[0].third)
              }
            }
          }
          console.log(this.ListDescript)
        }
      }
   })
   .catch(err => console.log(err))
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.userForm = this.formBuilder.group({
      firstObject: {},
      scndObject: {}
    });
  }
  submitForm() {
    const formValue = this.userForm.value;
    const formDevis = [
      formValue['firstObject'],
      formValue['scndObject'],
      formValue['thirdObject']
    ];
    console.log(formValue);
    console.log(formDevis);
    console.log(this.ArrayDescript)
    console.log(this.ArrayDescript[0].first)
    const firstChoice  = {
      'choice' : formDevis[0],
      'details': this.ArrayDescript[0].first
    }
    console.log(this.ArrayDescript[0].scnd)
    const scndChoice = {
      'choice' : formDevis[1],
      'details': this.ArrayDescript[0].scnd
    }
    const thirdChoice = {
      'choice' : formDevis[1],
      'details': this.ArrayDescript[0].third
    }
    var mesDonnees = new URLSearchParams();
    console.log(firstChoice.choice)
    if(firstChoice.choice != false) {
      console.log(firstChoice.details)
      mesDonnees.append("firstObject", JSON.stringify(firstChoice.details));
      mesDonnees.append("idArticle", window.location.href.slice(30))
    }
    console.log(scndChoice.choice)
    if(scndChoice.choice != false) {
      console.log(scndChoice.details)
      mesDonnees.append("scndObject", JSON.stringify(scndChoice.details));
      mesDonnees.append("idArticle", window.location.href.slice(30))
    }
    if(thirdChoice.choice != false) {
      console.log(scndChoice.details)
      mesDonnees.append("thirdChoice", JSON.stringify(thirdChoice.details));
      mesDonnees.append("idArticle", window.location.href.slice(30))
    }
    console.log(mesDonnees);
    const token:any = localStorage.getItem('token');
    const monObjet : any = JSON.parse(token);
    let auth = 'bearer' + " " + monObjet.token;

    axios.post("http://localhost:3000/api/article/commande", mesDonnees, {
          headers: { 
              'Authorization': auth
          }
      })
    .then(function (reponse) {
        console.log(reponse);
    })
    .catch(function (erreur) {
        console.log(erreur);
    });
  }
  checkPicture(event:any, item:any){
    console.log(item)
    var image = item.img;
    document.getElementById('picture').style.backgroundImage = "url("+image+")";
    document.getElementById('picture').style.width = "350px";
    document.getElementById('picture').style.height = "350px";
    document.getElementById('picture').style.backgroundSize = "cover";
  }
}
