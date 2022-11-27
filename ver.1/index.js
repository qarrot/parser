class Writer {
  constructor() {
    this.tab = '\u0009';
    this.enter = '\u000A';

    this.input = document.querySelector('.input');
    this.output = document.querySelector('.output');

    this.calcBtn = document.querySelector('.calculate-btn');
    this.copyBtn = document.querySelector('.copy-btn');
  }

  init() {
    this.output.value += `Касса${this.tab}Период времени${this.tab}Товар${this.tab}Количество${this.enter}`;

    this.calcBtn.addEventListener('click', () => {
      let maxLength = 0;

      const input = this.input.value.split(`${this.enter}`).map((x) => {
        const out = x.split(' ');

        if (out.length > maxLength) {
          maxLength = out.length;
        }

        return out;
      });

      for (let i = 1; i < input.length; i += 1) {
        for (let j = 1; j < input[i].length; j += 1) {
          if (i === 1) {
            if (j < input[0].length + 1) {
              if (j === 1) {
                this.output.value += input[0][j - 1].split('.').join(' ');
              } else {
                this.output.value += input[0][j - 1];
              }
            }
          }

          this.output.value += this.tab;

          if (j === 1) {
            const hF = parseInt(input[i][0]);

            let hS = hF - 1;
            if (hS < 0) {
              hS = 23;
            } else if (hS > 23) {
              hS = 0;
            }

            this.output.value += `${`0${hS}`.slice(-2)}:00-${`0${hF}`.slice(-2)}:00`;
          }

          this.output.value += this.tab;

          const count = parseInt(input[i][j]);
          let item = '';

          switch (input[i][j].slice(-1)) {
            case 'М':
              item = 'Попкорн Малый';
              break;
            case 'С':
              item = 'Попкорн Средний';
              break;
            case 'Б':
              item = 'Попкорн Большой';
              break;
            case 'Н':
              item = 'Напитки';
              break;
            case 'Р':
              item = 'Разл. напитки';
              break;
            case 'Ч':
              item = 'Чипсы';
              break;
            case 'П':
              item = 'Пиво';
              break;
            case 'Х':
              item = 'Начос';
              break;
            default:
              break;
          }

          this.output.value += `${item}${this.tab}${count}${this.enter}`;
        }
      }
    });

    this.copyBtn.addEventListener('click', () => {
      this.output.select();
      this.output.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(this.output.value);
    });
  }
}

function init() {
  const writer = new Writer();
  writer.init();
}

document.addEventListener('DOMContentLoaded', init);
