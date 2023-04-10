import { Directive ,ElementRef, Renderer2 ,} from '@angular/core';

@Directive({
  selector: '[appFocusform]'
})
export class FocusformDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const firstFormField = this.elRef.nativeElement.querySelector('input, select, textarea');
    if (firstFormField) {
      this.renderer.selectRootElement(firstFormField).focus();
    }
  }

}


