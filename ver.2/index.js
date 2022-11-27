class Writer {
  constructor() {
    this.tab = '\u0009';
    this.enter = '\u000A';

    this.input = document.querySelector('.input');
    this.output = document.querySelector('.output');

    this.calcBtn = document.querySelector('.calculate-btn');
    this.copyBtn = document.querySelector('.copy-btn');

    this.items = {
      М: 'Попкорн Малый',
      С: 'Попкорн Средний',
      Б: 'Попкорн Большой',
      Н: 'Напитки',
      Р: 'Разл. напитки',
      Ч: 'Чипсы',
      П: 'Пиво',
      Х: 'Начос',
    };

    this.cashier = {};
  }

  init() {
    this.output.value += `Касса${this.tab}Период времени${this.tab}Товар${this.tab}Количество${this.enter}`;
    this.calcBtn.addEventListener('click', this.calculate.bind(this));
  }

  calculate() {
    let maxLength = 0;

    const input = this.input.value.split(`${this.enter}`).map((x) => {
      const out = x.split(' ');

      if (out.length > maxLength) {
        maxLength = out.length;
      }

      return out;
    });

    let row = 0;
    let column = 0;

    label1: for (let i = 0; i < input.length; i += 1) {
      label2: for (let j = 0; j < input[i].length; j += 1) {

        if (input[i][j].length === 0) {
          this.output.value += this.enter;
          continue label1;
        }

        if (/Кинобар\.\d/.test(input[i][j])) {
          row = 1;
          column = 0;

          this.cashier.box = input[i][0].split('.').join(' ');
          this.cashier.name = input[i][1];
          continue label1;
        }

        if (column === 0) {
          this.cashier.endHour = parseInt(input[i][j]);
          column = 1;
          continue label2;
        }

        if (row === 1) {
          if (column === 1) {
            this.output.value += this.cashier.box;
          } else if (column === 2) {
            this.output.value += this.cashier.name;
          }
        }

        this.output.value += this.tab;

        if (column === 1) {
          const endHour = this.cashier.endHour;

          let startHour = endHour - 1;
          if (startHour < 0) {
            startHour = 23;
          } else if (startHour > 23) {
            startHour = 0;
          }

          this.output.value += `${`0${startHour}`.slice(-2)}:00-${`0${endHour}`.slice(-2)}:00`;
        }

        this.output.value += this.tab;

        const value = input[i][j].match(/(\d+)([а-я]*)/i);
        const count = parseInt(value[1]);
        let item = this.items[value[2]];

        this.output.value += `${item}${this.tab}${count}${this.enter}`;

        column += 1;
      }

      row += 1;
      column = 0;
    }

    this.copy();
  }

  copy() {
    navigator.clipboard.writeText(this.output.value).then(() => {
      alert('Copied to clipboard');
    });;
  }
}

function init() {
  document.querySelector('.main').style.height = `${document.documentElement.clientHeight}px`;

  const writer = new Writer();
  writer.init();
}

document.addEventListener('DOMContentLoaded', init);
