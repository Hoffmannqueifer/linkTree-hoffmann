import { Page } from './../types/page.types';
import { Injectable } from '@angular/core';
import {defineOneEntry} from 'oneentry';

const ONEENTRY_URL = 'https://oneentry.com/api';
const ONEENTRY_TOKEN = 'meu token'

let { Pages} = defineOneEntry(
  ONEENTRY_URL,{
    token: ONEENTRY_TOKEN,
    langCode: 'en_US'
})
@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }

  async getLinks(): Promise<Page[]> {
    try{
      let pages = await Pages.getPages();
      return pages.map((page: any) =>{
      const pageExistsOutside = page.attributeValues?.['pages-exists-outside']?.value || false;
      let extractedUrl = page.pageUrl;
      if(pageExistsOutside){
        const urlFormatted = page.localizeInfos?.['htmlContent']?.replace(/^<p>|<\/p>$/g, '') || '';
      const extractedUrl = urlFormatted.match(/https?:\/\/[^\s"<>]+/)[0];
      }


      return{
        title: page.localizeInfos?.['title'] || '',
        isVisible: page.isVisible || true,
        url: pageExistsOutside ? extractedUrl : page.pageUrl,
        isExternal: pageExistsOutside
      }
    })
    }catch(error){
      console.log("Erro ao buscar links")
      return []
    }

  }
}
