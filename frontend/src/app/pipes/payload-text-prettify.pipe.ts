import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payloadTextPrettify'
})
export class PayloadTextPrettifyPipe implements PipeTransform {
  private jsonClassSelector = '.failed-request, .failed-response';

  transform(htmlString: string) {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlString, 'text/html');
    parsedHtml.querySelectorAll(this.jsonClassSelector).forEach( element => {
      const node = parsedHtml.createElement('PRE');
      node.appendChild(parsedHtml.createTextNode(JSON.stringify(JSON.parse(element.textContent), null, 2)));
      element.appendChild(node);
      element.firstChild.remove();
    });
    return parsedHtml.body.innerHTML;
  }
}
