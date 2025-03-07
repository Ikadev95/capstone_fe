import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagamento-contanti',
  standalone: false,

  templateUrl: './pagamento-contanti.component.html',
  styleUrl: './pagamento-contanti.component.scss'
})
export class PagamentoContantiComponent {

  id: number = 0
  username : string = ""

  constructor(private route: ActivatedRoute){
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.username = this.route.snapshot.paramMap.get('username') || ""
  }

}
