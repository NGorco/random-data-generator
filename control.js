function randomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function randomNumberString(length) {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function randomInteger(max) {
  return Math.floor(Math.random() * max);
}

class Control extends Easy {
  input;
  output;

  constructor(item) {
    super(item);
  }

  generate() {
    let input = eval(`(${this.input})`);
    console.log(this.processObject(input))
  }

  processItem(input) {
    if (typeof input === 'string') {
      return randomString(16);
    }

    if (typeof input === 'number') {
      const num = randomNumberString(randomInteger(6));
      return parseInt(num.replace(/^0+/, '') || '0');
    }

    if (Object.prototype.toString.call(input) === '[object Object]') {
      return this.processObject(input);
    }

    if (Array.isArray(input)) {
      return input.map(i => this.processItem(i));
    }

    return input;
  }

  processObject(input) {
    const newObj = {};
    Object.keys(input).forEach(key => {
      if (typeof input[key] === 'string') {
        newObj[key] = randomString(16);
        return;
      }

      if (typeof input[key] === 'number') {
        const num = randomNumberString(randomInteger(6));
        newObj[key] = parseInt(num.replace(/^0+/, '') || '0');
        return;
      }

      if (Object.prototype.toString.call(input[key]) === '[object Object]') {
        newObj[key] = this.processObject(input[key]);
        return;
      }

      if (Array.isArray(input[key])) {
        newObj[key] = input[key].map(i => this.processItem(i));
        return;
      }

      newObj[key] = input[key];
    });

    return newObj;
  }
}

new Control(window.container)