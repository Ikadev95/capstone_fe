import { Observable } from 'rxjs';
import { ClassificaSvcService } from './../../services/classifica-svc.service';
import { iCategoriaResponse } from '../../interfaces/i-categoria-response';
import { iFotografiaClassifica } from '../../interfaces/i-fotografia-classifica';
import { iPoesiaClassifica } from '../../interfaces/i-poesia-classifica';
import { CategoriaSrvService } from './../../services/categoria-srv.service';
import { ComponimentiSvcService } from './../../services/componimenti-svc.service';
import { Component, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-classifica',
  standalone: false,

  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.scss'
})
export class ClassificaComponent {

  Categorie: iCategoriaResponse[] = []
  Poesie$!:Observable<iPoesiaClassifica[]>
  Foto$!:Observable<iFotografiaClassifica[]>
  pages$: Observable<number[]> = new Observable;
  currentPage: number = 1;
  total$!: Observable<number>;
  sblocco: boolean = false
  poesiaSelezionata!: iPoesiaClassifica
  fotoSelezionata!: iFotografiaClassifica;
  @ViewChild('fotoModal', { static: true }) fotoModal: any;
  @ViewChild('poesiaModal', { static: true }) poesiaModal: any;
  baseUrl:string = environment.baseUrl;
  testoPoesiaSelezionata: string = ''


  constructor(private ComponimentiSvcService : ComponimentiSvcService, private CategoriaSrvService: CategoriaSrvService, public service: ClassificaSvcService, private modalService: NgbModal) {

    this.CategoriaSrvService.getAllCategorie().subscribe(data => {
      this.Categorie = data

    })

    this.total$ = this.service.total$;
    this.updatePagination();
    this.service._search$.next();
    this.pages$ = this.service._pages$;
    this.Foto$ = this.service._foto$;
    this.Poesie$ = this.service._poesie$
   }

   apriModale(poesia: any) {
    this.service.getPoesia(poesia.id).subscribe(data => {
      this.testoPoesiaSelezionata = data.testo
    })
    console.log('poesia.id:', poesia.id);
    this.poesiaSelezionata = poesia;
    this.modalService.open(this.poesiaModal, { centered: true, size: 'lg' });
  }

  apriModaleFoto(foto: any) {
    this.fotoSelezionata = foto;
    this.modalService.open(this.fotoModal, { centered: true, size: 'lg' });
  }


   updatePagination(): void {
    this.total$.subscribe(total => {
      const totalPages = Math.ceil(total / this.service.pageSize);
      this.service._pages$.next(Array.from({ length: totalPages }, (_, i) => i + 1));
    });
  }

  changePage(page: number): void {
   // console.log("Cambiando pagina a:", page);
    let pages = this.service._pages$.getValue();
    if (page >= 1 && page <= pages.length) {
      this.service.page = page;
      this.updatePagination();
      this.service._search$.next();
    //  console.log("Pagina impostata:", this.service.page);
    }
  }


  changePageSize(event: any): void {
    const pageSize = event.target.value;
    this.service.pageSize = pageSize;
    this.service.page = 1;
    this.updatePagination();
    this.service._search$.next();
  }

  onCategoriaChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue.includes("Poesia")) {
    this.service.switch = "poesia"
    this.sblocco = false
  } else{
    this.service.switch = "fotografia"
    this.sblocco = true
  }
    this.service.categoria = selectedValue;
    this.service._search$.next();
  }

  scaricaPDF() {
    const data = document.getElementById('classifica')!;
    html2canvas(data).then((canvas) => {
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('classifica.pdf');
    });
  }



}

