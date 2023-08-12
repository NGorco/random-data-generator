class Easy {
  constructor(rootElem) {
    rootElem.querySelectorAll(`[e-change]`).forEach(el => {
      try {
        const model = el.getAttribute(`e-change`);

        el.addEventListener('change', () => {
          try {
            if (el.type === 'number') {
              this[model] = parseInt(el.value);
            } else {
              this[model] = el.value;
            }
          } catch (error) {
            throw new Error(`Error listener e-change: ${model}`);
          }

        });
        if (el.type === 'number') {
          this[model] = parseInt(el.value);
        } else {
          this[model] = el.value;
        }
      } catch (error) {
        console.error(`Error setting e-change: ${model}`);
        throw new Error(error);
      }
    });

    rootElem.querySelectorAll(`[e-click]`).forEach(el => {
      const methodName = el.getAttribute(`e-click`);

      el.addEventListener('click', (e) => {
        if (!this[methodName]) {
          throw "e-click not installed:" + methodName;
        }

        this[methodName](e, el);
      });
    });
  }
}