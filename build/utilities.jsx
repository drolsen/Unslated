/*
  Utilities: reduces code bloat by opening up space for developers to sum up repeated code into reusable methods instead.

  All methods crafted here can be accessed from anywhere in the project by calling the "Utils" alias.
  Because utils has its own alias namespace, you do not need to ever import this file into your JS or JSX files.

  IMPORTANT NOTE: Never remove any methods marked "CORE:" as they are dependencies for the framework.
*/

/*
  Helper: Little method to help reuse a component examples instead of re-crafting the element across pages and templates.
*/
const getExample = (examples, id) => examples[0].examples[id].component;

/*
  Helper: Traverses up the dom to a given parent element
*/
const parents = (obj, parent) => {
  let el = obj;
  if (parent.indexOf('.') === 0) {
    while (el.parentNode) {
      el = el.parentNode;
      const classNAME = el.className;
      if (classNAME && typeof classNAME.match === 'function') {
        const classes = classNAME.split(' ');
        let j = classes.length;
        const hunted = parent.toLowerCase().replace('.', '');
        while (j--) {
          if (classes[j] === hunted) {
            return el;
          }
        }
      }
    }
  } else if (parent.indexOf('#') === 0) {
    while (el.parentNode) {
      el = el.parentNode;
      const ID = el.id;
      if (ID && typeof ID.match === 'function') {
        if (ID.match(parent.toLowerCase().replace('#', ''))) {
          return el;
        }
      }
    }
  } else {
    while (el.parentNode) {
      el = el.parentNode;
      if (el.tagName) {
        if (typeof parent !== 'undefined') {
          if (el.tagName.toLowerCase() === parent.toLowerCase()) {
            return el;
          }
        }
      }
    }
  }

  return null;
};

/*
  Helper: Used to toggle between classes on elements
  Note: Use this over native classList.toggleClass due to no IE support
*/
const toggleClass = (element, classString) => {
  if (!element) {
    console.log('First param of toggleClass needs to be the element.'); // eslint-disable-line
  }

  if (!classString || typeof classString === 'object') {
    console.log('Second param of toggleClass needs to be a string.'); // eslint-disable-line
  }

  if (typeof classString === 'object') {
    console.log('Perhaps you want Utils.replaceClass() instead?'); // eslint-disable-line
  }

  if (element.classList.contains(classString)) {
    element.classList.remove(classString);
  } else {
    element.classList.add(classString);
  }
};

/*
  Helper: Used to replace a class
  Note: Use this over native classList.replace due to no IE support
*/
const replaceClass = (element, classArray) => {
  if (!element) {
    console.log('First param of toggleClass needs to be the element.'); // eslint-disable-line
  }

  if (!classArray || !Array.isArray(classArray)) {
    console.log('Second param of toggleClass needs to be an array of strings (from, to).'); // eslint-disable-line
  }

  if (typeof classArray === 'string') {
    console.log('Perhaps you want Utils.toggleClass() instead?'); // eslint-disable-line
  }

  element.classList.remove(classArray[0]);
  element.classList.add(classArray[1]);
};

/*
  Helper: Used to serialize a form element's fields into JSON object. Useful for XHR.
*/
const serialize = (elm, type) => {
  const jsonToQueryString = (json) => (
    Object.keys(json).map((key) => [encodeURIComponent(key), '=', encodeURIComponent(json[key])].join('')).join('&')
  );
  if (typeof type === 'undefined') { type = 'json'; }

  const obj = {};
  const elements = elm.querySelectorAll('input, select, textarea');
  for (let i = 0; i < elements.length; ++i) {
    const element = elements[i];
    const { name } = element;
    const { value } = element;

    if (name) {
      obj[name] = value;
    }
  }

  if (type === 'urlencode') {
    return jsonToQueryString(obj);
  }

  if (type === 'json') {
    return JSON.stringify(obj);
  }

  return false;
};

/*
  CORE: Creating a nice className from an array of unknown values
*/
const createClassStack = (classList) => (
  classList
    .map((className) => {
      if (Array.isArray(className)) {
        return createClassStack(className);
      }

      return className;
    })
    .filter((a) => a)
    .join(' ')
);

/*
  CORE: Installing an atomic element's Container.js class based on elements found on page
*/
const initComponent = (name, selector, Component, callback) => {
  const createComponent = (el) => new Component(el);

  // init maching elements
  const elms = document.querySelectorAll(selector.toLowerCase().toString());
  Object.keys(elms).map((index) => createComponent(elms[index]));

  if (typeof callback === 'function') {
    callback();
  }
};


module.exports = {
  parents,
  getExample,
  createClassStack,
  initComponent,
  toggleClass,
  replaceClass,
  serialize
};
