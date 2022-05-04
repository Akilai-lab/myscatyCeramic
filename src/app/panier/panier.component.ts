
import { Component, OnInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
arrayPanier : any;
status : any;
Actuallstatus:boolean;
totalPrice : any;
defaultValueCount:any;
indexArticleToDelete:any;
statusUser:any;
listObjCommande:any;
recapsCommande:any;
arraybyMail:any;
mailUser:any;
mail : any;
  constructor() { 
    this.statusUser = localStorage.getItem('status');
    this.arrayPanier = [];
    this.Actuallstatus = true;
    this.defaultValueCount = 0;
    this.arraybyMail = [];
    this.listObjCommande = [];
    this.recapsCommande = [];
    const token:any = localStorage.getItem('token');
    const monObjet : any = JSON.parse(token);

    let auth = 'bearer' + " " + monObjet.token;

    axios.get("http://localhost:3000/api/confirmation/getAllsOrders") 
    .then((response)=>{
      console.log('res 1')
      console.log(response.data)
      response.data.forEach((element:any) => {
        console.log(JSON.parse(element.articles))
        this.recapsCommande.push(JSON.parse(element.articles))
        console.log('test')
        console.log(typeof(JSON.parse(element.articles)))
        console.log(this.recapsCommande)
      });
      console.log(this.recapsCommande)
      console.log('res')
    })
    .catch(err =>{console.log(err)
    })

    axios.get("http://localhost:3000/api/order/getOrder",{
      headers: {
        'Authorization': auth
      }
    }) 
    .then((response) => {
      this.totalPrice = 0;
      var price:any = []
      var numberPrice;
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i])
        console.log(JSON.parse(response.data[i].articles))
        console.log(typeof(JSON.parse(response.data[i].articles)))

        if(typeof(JSON.parse(response.data[i].articles)) === 'string') {
          var data = JSON.parse(response.data[i].articles);
          var arr = JSON.parse("[" + data + "]");
          console.log( arr)
          var details = {
            'details' : arr[0],
            'image' : JSON.parse(JSON.parse(response.data[i].imgArticle)[0])[0],
            'id': response.data[i].id,
            'quantity': 1
          };
          this.arrayPanier.push(details)
          numberPrice = Number(arr[0].price);
          console.log(this.arrayPanier)
        }
        if(typeof(JSON.parse(response.data[i].articles)) !== 'string'){
          var details = {
            'details' : JSON.parse(JSON.parse(response.data[i].articles)[0]),
            'image' : JSON.parse(JSON.parse(response.data[i].imgArticle)[0])[0],
            'id': response.data[i].id,
            'quantity': 1
          };
          this.arrayPanier.push(details)
          numberPrice =  Number(JSON.parse(JSON.parse(response.data[i].articles)[0]).price)
          console.log(this.arrayPanier)
        }
        console.log(this.arrayPanier)
        this.totalPrice += numberPrice
        console.log(this.totalPrice)
      }
      console.log(this.arrayPanier)
      console.log(this.totalPrice)
      document.getElementById("sum").innerHTML=this.totalPrice + '€';
    })
    .catch(error=>{
      console.log(error)
    })
  }
  ngOnInit(): void {
  }
  
  OpenPopUp(index:any) {
    this.indexArticleToDelete = index;
    console.log(index) 
    document.getElementById('ConfirmDelete').style.display='flex'
    document.getElementById('ConfirmDelete').style.position='absolute'
    document.getElementById('ConfirmDelete').style.top='33%'
    return this.indexArticleToDelete
  }
  closePopUp() {
    console.log("test")
    document.getElementById('ConfirmDelete').style.display='none'
  }
  deleteArticle() {
    var index = this.indexArticleToDelete
    console.log(this.indexArticleToDelete)
    console.log(index)
    document.getElementById('ConfirmDelete').style.display='none'
      for(let i = 0; i < this.arrayPanier.length; i++) {
        if(this.arrayPanier[i].id === index) {
          document.getElementById('qtte').style.display='none';
          document.getElementById('ModifyOrRedirect').style.display='none';
            const token:any = localStorage.getItem('token');
            const monObjet : any = JSON.parse(token);
            var donnees = this.arrayPanier[i];
            let auth = 'bearer' + " " + monObjet.token;
            axios.delete("http://localhost:3000/api/order/deleteOrder" ,{
              data: {
                donnees : donnees
              },
              headers: {
                'Authorization': auth
              }
            }) 
            .then(response=> {
              console.log(response)
              index = '';
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
      document.location.replace('/toPanier')
  }

  AddForConfirmation() {
    var donnees = this.arrayPanier;
    const token:any = localStorage.getItem('token');
    const monObjet : any = JSON.parse(token);
    let auth = 'bearer' + " " + monObjet.token;
    axios.post("http://localhost:3000/api/order/CheckOrder", donnees, {
      headers: {
        'Authorization': auth
      }
    }) 
    .then(response=> {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }
  deleteCommande(id: any, obj:any) {
    console.log(id)
    console.log(obj)
    const token:any = localStorage.getItem('token');
    const monObjet : any = JSON.parse(token);
    let auth = 'bearer' + " " + monObjet.token;
    axios.delete("http://localhost:3000/api/confirmation/deleteAnOrder",{
        headers: { 
            "Authorization": auth
        },
        data: {
            order: obj,
            
        }
    })
    .then((res)=> console.log(res))
    .catch(err => console.log(err))
  }
}