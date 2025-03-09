import { Page } from 'src/app/types/page.types';
import { LinkService } from './../../services/link.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  links: Page[] = [];
  constructor(private linkService: LinkService) { }

  ngOnInit(): void {
    this.linkService.getLinks().then((links: Page[]) => {
      this.links = links.filter(link => link.isVisible);
    }).catch((error) => {
      console.error('Erro ao obter os links:', error);
    });
  }

}
