import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  value: string = '0';
  isInitialState: boolean = true;

  constructor() {}

  onBtnClick(event: Event): void {
    try {
      const target = event.target as HTMLInputElement;
      const operators: Array<string> = ['+', '-', '*', '/', '%'];
      const prefixBlockedOperators: Array<string> = ['+', '*', '/', '%'];
      const lastChar = this.value.charAt(this.value.length - 1);

      if (this.isInitialState && prefixBlockedOperators.includes(target.innerHTML)) {
        return;
      }

      if (operators.includes(lastChar) && operators.includes(target.innerHTML)) {
        return;
      }

      if (operators.includes(lastChar) && target.innerHTML === '=') {
        return;
      }

      if (lastChar === '.' && target.innerHTML === '.') {
        return;
      }

      const numbers: Array<string> = this.value.split(/\+|\-|\*|\/|\%/);

      switch (target.innerHTML) {
        case 'AC':
          this.value = '0';
          this.isInitialState = true;
          break;

        case 'DEL':
          if (this.value.charAt(this.value.length - 1) === 'y') {
            this.value = this.value.slice(0, this.value.length - 8);
          } else {
            this.value = this.value.substring(0, this.value.length - 1);
          }

          if (!this.value.length) {
            this.value = '0';
            this.isInitialState = true;
          }
          break;

        case '=':
          if (this.isInitialState) {
            return;
          }

          const secondLastChar = this.value.charAt(this.value.length - 2);

          if (lastChar === '.' && operators.includes(secondLastChar)) {
            return;
          }

          for (let number of numbers) {
            if (number) {
              const num = Number(number);
              this.value = this.value.replaceAll(number, String(num));
            }
          }

          let calVal = eval(this.value);
          calVal = Math.round(calVal * 100) / 100;
          this.value = String(calVal);
          break;

        default:
          if (this.isInitialState) {
            this.value = '';
            this.isInitialState = false;
          }

          const lastNum = numbers[numbers.length - 1];
          if (lastNum && lastNum.indexOf('.') !== -1) {
            const [interger, decimal] = lastNum.split('.');
            if (decimal && target.innerHTML === '.') {
              return;
            }
          }

          this.value += target.innerHTML;

          break;
      }
    } catch (err) {
      console.log((err as Error).message);
    }
  }
}
