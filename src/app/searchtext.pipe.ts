import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchtext'
})
export class SearchtextPipe implements PipeTransform {

  transform(value: any[], searchText: string): any{
    //return null;
    if(!value) return [];
    if(!searchText) return value;
	searchText = searchText.toLowerCase();
	return value.filter( it => {
	return	(<any>Object).values(it).indexOf(searchText) > -1
	//		return it;
	//	}
      //return it.toLowerCase().includes(searchText);
    });
  }
}
