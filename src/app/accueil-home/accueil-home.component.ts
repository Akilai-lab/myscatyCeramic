import { Component, OnInit } from '@angular/core';
import axios from "axios";
@Component({
  selector: 'app-accueil-home',
  templateUrl: './accueil-home.component.html',
  styleUrls: ['./accueil-home.component.css']
})
export class AccueilHomeComponent implements OnInit {
  title = 'myscaty-Ceramic';
  articles : any;
  arrayPictures : any;
  statusUser : any;
  moreArticles :any;

  //tous les articles
  ContentArticles : any;
  NewArrayNextArticles : any;
  constructor() {
    this.moreArticles = false;
    this.statusUser = localStorage.getItem('status');
    this.ContentArticles = [];
    this.arrayPictures = [];
    this.NewArrayNextArticles = [];
    this.articles = [
     {
       'title' : "Bols d'automne",
       'price' : '30,00',
       'description' : 'Bols Automne ( H 6 cm Ø13 / H 6,5 cm Ø13,5 ) 15 € / unité!!BOL au premier plan VENDU!!',
       'images' : ['./../assets/assets/article-29/814b9f_8353320312244c599c59e37a67561e1e_mv2.webp','./../assets/assets/article-29/814b9f_bc0fe2365db347389f769ef0042410ca_mv2.webp','./../assets/assets/article-29/814b9f_13cebc3f2bb44f37b20358b14de356d0_mv2.webp']
     },
     {
       'title' : "Tasses hautes avec passoires bleues",
       'price' : '40,00',
       'description' : 'Tasses hautes avec passoires bleues Tasse graphismes horizontaux + passoire ( 7,5 cm / Ø6,5 // 4,5 cm /Ø 5,5 ) 20 €Tasse graphismes verticaux + passoire ( 7 cm / Ø7 // 5 cm /Ø 4,5 ) 20 €',
       'images' : ['./../assets/assets/article-28/814b9f_7e5e3ee19c0b496097a7b4dc73327e83_mv2.webp','./../assets/assets/article-28/814b9f_852de672785f410395b8eefe7daf08e4_mv2.webp','./../assets/assets/article-28/814b9f_e73e748cc25f4e798f146f2976f66d12_mv2.webp']
     },
     {
       'title' : "Tasses et coupelle décorées en grès",
       'price' : '30,00',
       'description' : 'Tasses et coupelle décorées en grès :tasse dentelée ( 5 cm - Ø6 ) 10 €tasse ( 6 cm - Ø6,5 ) 15 €coupelle (2,5 cm - Ø8 ) 5 €',
       'images' : ['./../assets/assets/article-27/814b9f_6a171d94527e4ac59c0f0636e35d561c_mv2.webp','./../assets/assets/article-27/814b9f_9339d94d270348d69ad3639446db4a49_mv2.webp','./../assets/assets/article-27/814b9f_b42a1e9417174e3bb1c65aef91b6a478_mv2.webp',,'./../assets/assets/article-27/814b9f_ddc90b62f03a4b4fa424b61a39dd785a_mv2.webp']
     },
     {
       'title' : "Plats design",
       'price' : '40,00',
       'description' : 'Plat  paysage ( 6 cm / Ø18 ) 20 € Plat graphisme (6 cm / Ø17 ) 20 €',
       'images' : ['./../assets/assets/article-26/814b9f_3560697095d04a23947ce8e94d03f846_mv2.webp','./../assets/assets/article-26/814b9f_ec17afc799214d70abf0211cf1b18a64_mv2 (1).webp','./../assets/assets/article-26/814b9f_ee0d78bd649f4d038ad62a396e2a9e3b_mv2.webp']
     },
     {
       'title' : "Bol Fleur orangé",
       'price' : '15,00',
       'description' : 'Bol Fleuri orangé ( 7 cm / Ø11,5 ) 15 €',
       'images' : ['./../assets/assets/article-25/814b9f_81cc80ab0e9947e7af8e0815c542e403_mv2.webp','./../assets/assets/article-25/814b9f_f4b64ccf752c454c919971a081e0f3ae_mv2.webp']
     },
     {
       'title' : "Bol en grès rose lissé",
       'price' : '20,00',
       'description' : 'Bol en grès rose lissé ( H 9 cm Ø16 cm ) 20 €',
       'images' : ['./../assets/assets/article-24/814b9f_3e3b6dafcd7542fb96c8664afaac4970_mv2.webp','./../assets/assets/article-24/814b9f_6e213d32c31c41289be2299cc714a180_mv2.webp','./../assets/assets/article-24/814b9f_79769ecd40f5441c82a17a6928c1b419_mv2.webp']
     },
     {
       'title' : "Vase et coupelle en grès rose",
       'price' : '20,00',
       'description' : 'Vase et coupelle en grès rose ( H 9 cm Ø6 cm / H 4,5 cm Ø10 cm ) 10 € / unité',
       'images' : ['./../assets/assets/article-23/814b9f_471a2e80178447d2a19c889aee37ff12_mv2.webp','./../assets/assets/article-23/814b9f_8570ec8d7f0a4dc1ae50f7d5e741675d_mv2.webp','./../assets/assets/article-23/814b9f_c3431c06b562475ab6aad87f30d54f42_mv2.webp']
     },
     {
       'title' : "Bols évasés en grès rose",
       'price' : '30,00',
       'description' : 'Bols évasés en grès rose ( H 5 cm Ø16 cm / H 6 cm Ø16 cm ) 15 € / unité',
       'images' : ['./../assets/assets/article-22/814b9f_90aa8925eb164ae5822bcc31cb93a823_mv2.webp','./../assets/assets/article-22/814b9f_bc3e6c9123cb4100abed31fa3f909bed_mv2.webp']
     },
     {
       'title' : "Bol en faience noire",
       'price' : '10,00',
       'description' : 'Bol en faience noire ( H 8 cm Ø11 ) 10 €',
       'images' : ['./../assets/assets/article-21/814b9f_3ff19704765040e9b074bd40f4333108_mv2.webp','./../assets/assets/article-21/814b9f_185f26f77a984941abcc2c68aa3cb117_mv2.webp','./../assets/assets/article-21/814b9f_966b2c5609dc48038f33c2db8a1937a5_mv2.webp']
     },
     {
       'title' : "Bol et Saladier en grès rose",
       'price' : '30,00',
       'description' : 'Bol et Saladier en grès rose ( H 8 cm Ø13 cm / H 11 cm Ø17,5 cm ) 15 € / unité',
       'images' : ['./../assets/assets/article-20/814b9f_b0ddfe8bc8524e5eb0e30568266b361d_mv2.webp','./../assets/assets/article-20/814b9f_3ec1431c4d6b4708a753fa0dde4e37d1_mv2.webp','./../assets/assets/article-20/814b9f_393dd32c65eb4e7a8a8c3b19bbbd5377_mv2.webp']
     },
     {
       'title' : "Tasses en grès mélangé",
       'price' : '30,00',
       'description' : 'Tasses en grès mélangé ( 5 cm / Ø8 ; 6 cm / Ø9 ) 10 € /unité Tasse en grès blanc ( 7 cm / Ø6 ) 10 € Coupelle ( 6 cm x 6 cm ) 5 €',
       'images' : ['./../assets/assets/article-19/814b9f_9b5f517e9e234b37bcf285d21be29955_mv2.webp','./../assets/assets/article-19/814b9f_a3d3bdca3cbc4ff9bc873950d2a566e5_mv2.webp']
     },
     {
       'title' : "Tasses en grès mélangé et passoire",
       'price' : '20,00',
       'description' : 'Tasse en grès mélangé ( 4,5 cm / Ø9,5 ) 10 € Passoire ( 11 cm x 5,5 cm ) 5 € Support ( 8 cm x 5 cm ) 5 €',
       'images' : ['./../assets/assets/article-18/814b9f_17221c006868452e9de198a4096f7442_mv2.webp','./../assets/assets/article-18/814b9f_1e558eea38a14ca886f3611637356840_mv2.webp']
     },
     {
       'title' : "Plats en grès mélangé",
       'price' : '40,00',
       'description' : 'Plats en grès mélangé Bol ( 6 cm / Ø 12,5 ) 20 € Écuelle ( 4,5 cm / Ø13 ) 20 €',
       'images' : ['./../assets/assets/article-17/814b9f_9cdaad5a0f5644bf8b3ead711c528aa2_mv2.webp','./../assets/assets/article-17/814b9f_380cba7220404d1da81fb0ff1d3b9b9e_mv2.webp']
     },
     {
       'title' : "Tasses à café et passoire",
       'price' : '35,00',
       'description' : 'Tasse blanche ( 7 cm / Ø7 ) 15 € Tasse bleue ( 7 cm / Ø7 ) 15 € Passoire ( 5 cm x 5 cm ) 5 €',
       'images' : ['./../assets/assets/article-16/814b9f_0fe9101263044195b3a4bfa18d4b0a4a_mv2.webp','./../assets/assets/article-16/814b9f_c60ad06adc3d41bab57da8cc99f0ae9b_mv2.webp','./../assets/assets/article-16/814b9f_f0afaefdb27946bd902e72930bbbd4aa_mv2.webp']
     },
     {
       'title' : "Bol Fleuri Rouge(Motifs coeur)",
       'price' : '20,00',
       'description' : 'Bol Fleuri Rouge ( Motif coeur ) ( 8,5 cm / Ø11,5 ) 20 €',
       'images' : ['./../assets/assets/article-15/814b9f_9af7b8711df648598cd02a31a771d111_mv2.webp','./../assets/assets/article-15/814b9f_3504dae7d45445c19987524c353d8fc4_mv2.webp','./../assets/assets/article-15/814b9f_a7b680bec8c34b99ae28f36e4a38dd34_mv2.webp','./../assets/assets/article-15/814b9f_bcb464c215374b30aeae8cf8dd5a7b4e_mv2.webp']
     },
     {
       'title' : "Tasse à café fleurie blanche",
       'price' : '15,00',
       'description' : 'Tasse à café fleurie blanche ( 8 cm / Ø8 ) 15 €',
       'images' : ['./../assets/assets/article-14/814b9f_41d07250b7ab45d09016a278d0681a8d_mv2.webp','./../assets/assets/article-14/814b9f_685587524cb54af1922b9967e8d6f24b_mv2.webp','./../assets/assets/article-14/814b9f_a4833a2734a74388aed1d60f7ddfae12_mv2.webp','./../assets/assets/article-14/814b9f_e5991df0c615405591a1a8db2bd1b752_mv2.webp']
     },
     {
       'title' : "Bols fleuris et coupelles bleues",
       'price' : '40,00',
       'description' : 'Bols ( 5,5 cm  / Ø11,5 ; 4 cm / Ø11 ) 15 € / unité Coupelle ( 4 cm / Ø6 ) 10 €',
       'images' : ['./../assets/assets/article-13/814b9f_848beafa1dee4e8c9870c10d63fcaf67_mv2.webp','./../assets/assets/article-13/814b9f_97e65e0499c841a597398a6a9e1285c6_mv2.webp','./../assets/assets/article-13/814b9f_97fe87f9fce04d9e9ea24da17eae04e6_mv2.webp']
     },
     {
       'title' : "Bols fleuris violets",
       'price' : '30,00',
       'description' : 'Bols fleuris violets ( 7 cm / Ø9,5 ; 6,5 cm / Ø9,5 ) 15 €  / unité',
       'images' : ['./../assets/assets/article-12/814b9f_7e9fafd524994567a8df4c9c7a519c84_mv2.webp','./../assets/assets/article-12/814b9f_50d4bf15c4564b22a7aea2db9a6639f0_mv2.webp','./../assets/assets/article-12/814b9f_d1ca4b1373c041c9bb6baf5612f8ae20_mv2.webp','./../assets/assets/article-12/814b9f_efa4b10641864a7094aa72eae531961f_mv2.webp']
     },
     {
       'title' : "Bols et vase en grès",
       'price' : '40,00',
       'description' : 'Bol intérieur nacré ( 6,5 cm / Ø10 ) 10 € Vase en grès ( 10 cm / Ø9 ; Ø5,5 au goulot ) 15 € Tasse haute ( 7,5 cm / Ø5,5 ) 10 € Coupelle ( 3,5 cm / Ø9 ) 5 €',
       'images' : ['./../assets/assets/article-11/814b9f_54a759533bc84c3e92cdc849805813ea_mv2.webp','./../assets/assets/article-11/814b9f_e72a3971aef545cb8c5981d1632d22dc_mv2.webp','./../assets/assets/article-11/814b9f_f02ec10c90294d41bcd82b622d06cc1b_mv2.webp']
     },
     {
       'title' : "Bols en grès noirs et bleus",
       'price' : '30,00',
       'description' : 'Bol liseré bleu ( 5 cm / Ø8,5 ) 10 € Bol intérieur bleu ( 4 cm / Ø9,5 ) 10 € Bol intérieur bleu ( 4,5 cm / Ø10 ) 10 €',
       'images' : ['./../assets/assets/article-10/814b9f_84164f34513849489491d4d96e912150_mv2.webp','./../assets/assets/article-10/814b9f_5e0b3cdd0d8c49208523fb24fe58d76d_mv2.webp','./../assets/assets/article-10/814b9f_2674a72aed864e8ba60bdfdaac758c0c_mv2.webp']
     },
     {
       'title' : "Bols en grès noirs (effet noix de coco)",
       'price' : '35,00',
       'description' : 'Petit bol nacré ( 5,5 cm / Ø7,5 ) 10 € Bol découpé ( 4 cm / Ø10 ) 10 € Bol intérieur blanc ( 5,5 cm / Ø13 ) 15 €',
       'images' : ['./../assets/assets/article-9/814b9f_63b4c0059f4d44da8d7b94999a47dde6_mv2.webp','./../assets/assets/article-9/814b9f_4e2c9d709049498c9d29c1ab7ac82c28_mv2.webp','./../assets/assets/article-9/814b9f_72e26d8898ba4223958c62ce52b9a6d6_mv2.webp']
     },
     {
       'title' : "Tasses à café bleues",
       'price' : '20,00',
       'description' : 'Tasses à café bleues ( 7cm - Ø6,5 / 6cm - Ø6 ) 10 € /unité',
       'images' : ['./../assets/assets/article-8/814b9f_85e17e2597dd4780a88df1f6f26d61a2_mv2.webp','./../assets/assets/article-8/814b9f_dbb6c7092d2f46c194df3cc7d6b01f7f_mv2.webp','./../assets/assets/article-8/814b9f_8d0cbfd969264e7cbfc18589d5ec4af8_mv2.webp','./../assets/assets/article-8/814b9f_01ebe51b466441249e6da7c1283343cf_mv2.webp']
     },
     {
       'title' : "Tasses à café turquoise",
       'price' : '25,00',
       'description' : 'Tasses à café turquoise ( 7cm - Ø7,5 / 6cm - Ø6,5 ) Tasse blanche 10 € Tasse bleue 15 €',
       'images' : ['./../assets/assets/article-7/814b9f_4034d066a9424d1db0c20cb177e8177b_mv2.webp','./../assets/assets/article-7/814b9f_44a1df236c2548079f4ff804b5869c16_mv2.webp','./../assets/assets/article-7/814b9f_168da10f740245f29249f9d41714c625_mv2.webp']
     },
     {
       'title' : "Tasses à café rose",
       'price' : '30,00',
       'description' : 'Tasses à café rose ( 8cm - Ø11 / 9cm - Ø11 ) 15 € / unité',
       'images' : ['./../assets/assets/article-6/814b9f_3b20ea52c89d4cd48b8fc97192aaef6d_mv2.webp','./../assets/assets/article-6/814b9f_77e2bb549dab4e8c8a3c1888f6f930c7_mv2.webp','./../assets/assets/article-6/814b9f_59584c7a45004ca682c406f6d1032aa2_mv2.webp','./../assets/assets/article-6/814b9f_880420ba24a04538aca947e2c7bb9e6f_mv2.webp']
     },
     {
       'title' : "Bols Rose",
       'price' : '35,00',
       'description' : 'Bols Rose ( 6cm - Ø11,5 / 7cm - Ø11 / 8cm - Ø15 ) Grand bol 15 € Bols 10 €',
       'images' : ['./../assets/assets/article-5/814b9f_c07d83ad1a8045cbb5e16207f764c96f_mv2.webp','./../assets/assets/article-5/814b9f_7ba03c7aa30e4bd4ba71a9f2361b17e1_mv2.webp','./../assets/assets/article-5/814b9f_ada49314e80b4beb88d2735c1c88f535_mv2.webp']
     },
     {
       'title' : "Plat décoré en grès(feuilles)",
       'price' : '15,00',
       'description' : 'Plat décoré en grès ( feuille ) ( 11 x 24 cm ) 15 €',
       'images' : ['./../assets/assets/article-4/814b9f_e537f5d59cc1416db7e89676912787d4_mv2.webp','./../assets/assets/article-4/814b9f_a8e8e63d52314eb49c002f926d516b27_mv2.webp','./../assets/assets/article-4/814b9f_449d9ba18bcd4bc0a0c427a53c1c1085_mv2.webp']
     },
     {
       'title' : "Plat décoré en grès (soleil)",
       'price' : '20,00',
       'description' : 'Plat décoré en grès ( soleil ) ( 22,5 x 15 cm ) 20 €',
       'images' : ['./../assets/assets/article-3/814b9f_4ae0f9a8d54d4900be3120481247f8f0_mv2.webp','./../assets/assets/article-3/814b9f_da5522dc2832498c917d0dd98443ba28_mv2.webp','./../assets/assets/article-3/814b9f_ccc13eacde3d41f88a5e957b524157e1_mv2.webp']
     },
     {
       'title' : "Petite passoire décorée en grès",
       'price' : '20,00',
       'description' : 'Petite passoire décorée en grès ( Ø 18,5 ) 20 €',
       'images' : ['./../assets/assets/article-2/814b9f_7b16702d90a44b28a92c5324102b10db_mv2.webp','./../assets/assets/article-2/814b9f_50de215b8cf2436799bed0f9a24f9b23_mv2.webp','./../assets/assets/article-2/814b9f_e06e3323ad5743548ebd368fe0a2fd4d_mv2.webp']
     },
     {
       'title' : "Tasses pastel décorées en faience",
       'price' : '45,00',
       'description' : 'Tasses pastel décorées en faience (4 cm - Ø7,5 / 5 cm -  Ø8,5 / 6 cm - Ø6,5 ) 15 € / unité',
       'images' : ['./../assets/assets/article-1/article1_1.jpg','./../assets/assets/article-1/article1_2.jpg','./../assets/assets/article-1/article1_3.jpg','./../assets/assets/article-1/article1_4.jpg']
     },
     {
       'title' : "Ornements créatifs",
       'price' : '2,00',
       'description' : 'Ornements créatifs pour différentes occasions : sachet de dragées, invitations, cartes et autres ! Réalisables sur commande.',
       'images' : ['./../assets/assets/article-0/814b9f_720a51b7b4144e9bace3f5340f1ac9ef_mv2.webp']
     }
   ];
   console.log(this.articles)
   
   const visualArticles =  (donnees:any,newArrayImages:any,content:any, arrayArticls:any) => {
      for(let i = 0; i < donnees.length; i++) {
        const tabImg = {
          img : donnees[i].images[0],
          title : donnees[i].title,
          price : donnees[i].price,
          description : donnees[i].description
        }
        newArrayImages.push(tabImg);
        console.log(newArrayImages)
        }
        if(newArrayImages.length > 9){
          newArrayImages.length = 9;
        }
        content = [];
        axios.get("http://localhost:3000/api/article/allProject")
        .then(function (response) {
          content = response.data;
          console.log(content)
        })
        .then(() => {
          for (let j = 0; j < content.length; j++) {
            console.log(content[j])
            console.log(content[j].img)
            var image ;
            const arrayImages = JSON.parse("["+content[j].img+"]")
            for(let obj of arrayImages){
              image = obj[0]
              console.log(image)
              const nextabImg = {
                img : image, 
                title : content[j].title,
                price : content[j].price,
                id : content[j].id
              }
              arrayArticls.push(nextabImg);
            }
          }
          console.log(arrayArticls)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  visualArticles(this.articles,this.arrayPictures,this.ContentArticles,this.NewArrayNextArticles);
  }
  ngOnInit(): void {
  }
  ShowMore() {
    this.moreArticles = true;
    for(let i = 0; i < this.articles.length; i++) {
      console.log(this.articles[i].images[0])
      const tabImg = {
        id : this.articles[i].id,
        img : this.articles[i].images[0],
        title : this.articles[i].title,
        price : this.articles[i].price,
        description : this.articles[i].description
      }
      this.arrayPictures.push(tabImg);
      console.log(this.arrayPictures)
    }
    console.log(this.arrayPictures)
    this.arrayPictures.splice(0,9)
  }
  ShowLess() {
    window.document.location.replace('/**');
  }
}
