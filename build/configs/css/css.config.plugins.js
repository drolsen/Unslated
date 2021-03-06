/*
  Here lives all of Unslated's custom PostCSS plugins.
  Please note, the majority of plugins have been hand crafted to be ran under postBundle phase to:
  - Overcome community driven plugin limitations or bugs
  - Reduce bundle size for production builds
  - Enhance CSS authoring features and expedite development processes
*/

const postcss = require('postcss');
const nested = require('postcss-nested');
const cssclean = require('clean-css');
const fs = require('fs');
const path = require('path');

const colors = postcss.plugin('postcss-color', (options) => {
  options = options || {};

  const HexToRGB = (color) => {
    color = color.replace('#', '');
    if (color.length < 6) {
      color += color;
    }

    return [
      parseInt(color.substr(0, 2), 16),
      parseInt(color.substr(2, 2), 16),
      parseInt(color.substr(4, 2), 16)
    ];
  };

  const RGB_Linear_Shade = (color, percent) => {
    let intParse = parseInt;
    let intRound = Math.round;

    let R = (intParse(color[0]) === 0) ? 1 : color[0];
    let G = (intParse(color[1]) === 0) ? 1 : color[1];
    let B = (intParse(color[2]) === 0) ? 1 : color[2];
    let A = (intParse(color[3]) === 0) ? 1 : color[3];
    let t = (percent / 100);

    return [
      'rgb',
      (A ? 'a(' : '('),
      intRound(intParse(R) * (1 + t)),
      ',',
      intRound(intParse(G) * (1 + t)),
      ',',
      intRound(intParse(B) * (1 + t)),
      (A ? ',' + A : ')')
    ].join('');
  };

  return (root) => {
    root.walkDecls(decl => {
      if (decl.value.indexOf('color(') !== -1) {
        const colors = decl.value.match(/color\((.*?)\)/g);

        Object.keys(colors).map((index) => {
          const arguments = colors[index].replace(/^color\((.*?)\)$/, '$1').split(',');
          const color = (arguments[0].length < 7) ? (arguments[0] + arguments[0].replace('#', '')) : arguments[0];

          const brightness = parseFloat(arguments[1]);

          decl.value = decl.value.replace(colors[index], RGB_Linear_Shade(HexToRGB(color), brightness));
        });
      }
    });
  };
});

const exporting = postcss.plugin('postcss-colors', (options) => {
  options = options || {};

  return (root) => {
    root.walkRules(':export', (rule) => {
      rule.selector = ':root';
      rule.append('--css-exports: true;');
    });
  };
});

const extend = postcss.plugin('postcss-extend', (options) => {
  options = options || {
    preserve: false
  };

  return (root) => {
    // loop over @extend rules
    root.walkAtRules(atRule => {
      if(atRule.name.indexOf('extend') === -1) { return; }

      const extendStyles = (to, from) => {
        from.walkDecls(decl => {
          const clone = decl.clone();
          to.append(clone);
        });
      };

      const data = {
        type: (atRule.name.indexOf('extend-all') === -1) ? 'extend' : 'extend-all',
        extender: atRule.parent.selector,
        extending: atRule.params.trim()
      };

      // loop over selectors
      root.walkRules(normalRule => {
        // basic extend
        if (normalRule.selector.trim() === atRule.params.trim()) {
          extendStyles(atRule.parent, normalRule);
        }

        // deep extend
        if (data.type === 'extend-all'
          && normalRule.selector.indexOf(data.extending) !== -1
          && normalRule.selector.indexOf(data.extender) === -1
        ) {

          const toSelectors = data.extender.split(',');
          const fromSelectors = normalRule.selector.split(',');

          // Make sure we check for previously extended mathces across both to and from selectors.
          const alreadyExtended = () => {
            let flag = false;
            Object.keys(fromSelectors).map((i) => {
              const selector = fromSelectors[i].replace(/\\n\\n/g, '').trim();
              fromSelectors[i] = selector;
              if (selector.indexOf(atRule.params.trim()) > 0) {
                flag = true;
              }
            });

            Object.keys(toSelectors).map((i) => {
              const selector = toSelectors[i].replace(/\\n\\n/g, '').trim();
              toSelectors[i] = selector;
              if (selector.indexOf(atRule.params.trim()) > 0) {
                flag = true;
              }
            });
            return flag;
          };

          if (alreadyExtended()) { return false; } // prevents matching already extended matches

          let styles = '';
          normalRule.walkDecls(decl => {
            styles += `${decl.prop}: ${decl.value};`;
          });


          // Build new selectors off to and from selectors
          let i = fromSelectors.length;
          let newSelector = '';
          while (i--) {
            let j = toSelectors.length;
            while (j--) {
              newSelector += `${fromSelectors[i]
                .replace(
                  new RegExp(`${
                    atRule.params
                      .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&').trim()
                    }(.*?)`,
                    'g'
                  ),
                ` ${toSelectors[j]}$1`)
              },`;
            }
          }

          // Combine new extended selectors and styles
          newSelector = `
            ${
              newSelector
            } {
              ${styles}
            }
          `.replace(', {', ' {'); // <- little clean up catching

          root.append(newSelector);
        }
      });

      atRule.remove(); // once we are done extending, we already remove the extend rule
    });
  };
});

const media = postcss.plugin('postcss-custom-media', (options) => {
  options = options || {
    preserve: false
  };

  const queries = [];
  const packs = [];

  return (root) => {
    // collect all possible breakpoints
    root.walkDecls(decl => {
      const value = decl.value;
      if (value.indexOf('only screen and') !== -1 ||
        value.indexOf('screen and') !== -1 ||
        value.indexOf('only print and') !== -1 ||
        value.indexOf('print and') !== -1) {
        queries[decl.prop] = value;
        packs[value] = '';
      }
    });

    // replace @mediavariable declirations, with values from collected queries above
    root.walkAtRules('media', (rule) => {
      const variable = rule.params.replace(/\((.*)\)/g, '$1');
      let removeFlag = false;
      Object.keys(queries).map(key => {
        if (key === variable) {
          rule.params = queries[key];

          // gather meida queries inners
          rule.walkRules(innerRules => {
            let stringSelector = `  ${innerRules.selector} {\n`;
            innerRules.walkDecls(innerDecl => {
                stringSelector += `    ${innerDecl.prop}: ${innerDecl.value};\n`;
            });
            stringSelector += '  }\n';

            packs[queries[key]] += stringSelector;
          });

          removeFlag = true;
        }
      });

      if (removeFlag) {
        rule.remove(); // remove this query, to re-append a packed set down below.
      }
    });

    // append compressed media quries to end of sheet
    Object.keys(packs).map((i) => {
      if (packs[i].length) {
        root.append(`@media ${i} {\n${packs[i]}\n}`);
      }
    });
  };
});

const rems = postcss.plugin('postcss-rems', (options) => {
  options = options || {
    baseSize: 16
  };

  return root => {
    root.walkDecls(decls => {
      if (decls.value.indexOf('rem(') !== -1) {
        let occurances = decls.value.match(/rem\(.*?\)/g);
        Object.keys(occurances).map(i => {
          let unit = parseInt(occurances[i].replace(/rem\((.*?)\)/g, '$1'), 10);
          decls.value = decls.value.replace(occurances[i], `${unit / options.baseSize}rem`);
        });
      }
    })
  }
});

const roots = postcss.plugin('postcss-vars', (options) => {
  options = options || {};

  return root => {
    root.walkRules(':root', rule => {
      // we never remove color root for guide purposes
      // if (typeof rule === 'undefined') { return false; }
      // if (rule.parent.source.input.file.indexOf('colors.css') !== -1) { return; }
      rule.remove();
    });
  };
});

const variables = postcss.plugin('postcss-vars', (options) => {
  options = options || {};
  const variables = [];

  return root => {
    const lookup = (value) => {
      if (value.match(/var\((.*?)\)/g)) {
        return value.match(/var\((.*?)\)/g);
      }

      return [];
    };

    const replacer = (value) => {
      const innerVars = lookup(value);
      if (innerVars.length) {
        Object.keys(innerVars).map(index => {
          const varName = innerVars[index].replace(/var\((.*?)\)/g, '$1');
          if (variables[varName]) {
            value = value.replace(innerVars[index], variables[varName]);
          }
        });
      }
      return value;
    };

    // First, build list of variables
    root.walkRules(':root', rule => {
      rule.walkDecls(decl => {
        if (decl.prop.indexOf('--') !== -1) {
          variables[decl.prop] = decl.value;
        }
      });
    });

    // Next loop over list of variables values, and determin if
    // values are back referencing another variable or not.
    // if found to be back referencing another variable, use extractVariable method to
    // reverse loop up variables value in our list and update value
    Object.keys(variables).map(index => {
      variables[index] = replacer(variables[index]);
    });

    // Now that we have a distilled down list of all variables, lets replace all usage of variables across the
    // stylesheets using our clean variables list as a key
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        decl.value = replacer(decl.value);
      });
    });

    // Finally, we allow variable usage in the useage of mixins
    root.walkAtRules(rule => {
      if (rule.name === 'mixin') {
        rule.params = replacer(rule.params);
      }
    });
  };
});

const comments = postcss.plugin('postcss-comments', (options) => {
  options = options || {};
  return root => {
    root.walkComments(comment => {
      comment.remove();
    });
  };
});

const mixins = postcss.plugin('postcss-mixins', (options) => {
  let collection = [];
  const getParts = (string) => string.replace(/ /g, '').replace('(', ' (').split(' ');
  const getParams = (string) => string.replace(/\((.*)\)/g, '$1').split(',');

  return root => {
    // loop mixin definitions and rules, name and params
    root.walkAtRules(atRule => {
      if(atRule.name !== 'define-mixin') { return; }

      const definition = getParts(atRule.params);
      const definitionName = definition[0].trim();
      const definitionParams = getParams(definition[1]);

      if (!collection[definitionName]) {
        collection[definitionName] = {
          rule: atRule,
          params: definitionParams
        };
      }

      // remove definition
      atRule.remove();
    });

    // loop mixin usage
    root.walkAtRules(atRule => {
      if (atRule.name !== 'mixin') { return; }
      const mixin = getParts(atRule.params);
      const mixinName = mixin[0].trim();
      const mixinParams = getParams(mixin[1]);
      if (collection[mixinName]) {
        const definition = collection[mixinName];
        const { rule } = definition;
        const { params } = definition;

        let nodes = rule.nodes.join(';').toString();

        Object.keys(params).map((i) => {
          const reg = new RegExp(params[i], 'g');
          if (mixinParams[i]) {
            nodes = nodes.replace(reg, mixinParams[i]).replace(/var\((.*?)\)/g, '$1');
          }
        });

        atRule.parent.append(`${nodes}`);
        atRule.remove();
      }
    });

    // little clean up help
    root.walkRules(rule => {
      rule.selector = rule.selector.replace(/\\--/g, '--');
    });
  }
});

const percentage = postcss.plugin('postcss-percentage', (options) => {
  return root => {
    root.walkDecls(decls => {
      if (root.name === 'define-mixin') { return; }
      if (decls.value.indexOf('percentage(') !== -1) {
        let occurances = decls.value.match(/percentage\(.*?\)/g);
        Object.keys(occurances).map((i) => {
          let units = occurances[i].replace(/percentage\((.*?)\)/g, '$1');
          decls.value = `${eval(units) * 100}%`;
        });
      }
    })
  }
});

const minify = postcss.plugin('postcss-minify', (options) => {
  return root => {
    const css = root.toString();
    root.removeAll(); // out with the old
    root.append(      // in with the new
      new cssclean({}).minify(css).styles
    );
  }
});

const MetricsCSS = postcss.plugin('postcss-metrics', (options) => {
  /* Removes duplicates from objects */
  const reduceDuplicates = (obj) => Object(obj).filter((n, i) => obj.indexOf(n) === i);

  /* Hoist up a globally accessible metrics reset for CSS object */
  process.cssMetricsReset = () => {
    return {
      rules: 0,
      selectors: 0,
      declarations: 0,
      properties: 0,
      ids: 0,
      classes: 0,
      pseudo: {
        class: 0,
        element: 0
      },
      layout: {
        display: 0,
        float: 0,
        width: 0,
        height: 0,
        maxWidth: 0,
        minWidth: 0,
        maxHeight: 0,
        minHeight: 0
      },
      skin: {
        color: 0,
        backgroundColor: 0,
        borderColor: 0,
        boxShadow: 0
      },
      typography: {
        family: 0,
        size: 0,
        weight: 0,
        alignment: 0,
        lineHeight: 0,
        letterSpace: 0,
        decoration: 0,
        transform: 0,
        shadow: 0
      },
      spacing: {
        padding: {
          all: 0,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        margin: {
          all: 0,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      },
      resets: {
        margin: {
          all: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        padding: {
          all: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      comparison: {
        layout: {
          display: {
            repeated: 0,
            unique: 0
          },
          float: {
            repeated: 0,
            unique: 0
          },
          width: {
            repeated: 0,
            unique: 0
          },
          height: {
            repeated: 0,
            unique: 0
          },
          maxWidth: {
            repeated: 0,
            unique: 0
          },
          minWidth: {
            repeated: 0,
            unique: 0
          },
          maxHeight: {
            repeated: 0,
            unique: 0
          },
          minHeight: {
            repeated: 0,
            unique: 0
          }
        },
        padding: {
          all: {
            repeated: 0,
            unique: 0
          },
          top: {
            repeated: 0,
            unique: 0
          },
          right: {
            repeated: 0,
            unique: 0
          },
          bottom: {
            repeated: 0,
            unique: 0
          },
          left: {
            repeated: 0,
            unique: 0
          }
        },
        margin: {
          all: {
            repeated: 0,
            unique: 0
          },
          top: {
            repeated: 0,
            unique: 0
          },
          right: {
            repeated: 0,
            unique: 0
          },
          bottom: {
            repeated: 0,
            unique: 0
          },
          left: {
            repeated: 0,
            unique: 0
          }
        }
      }
    }
  };

  if (!process.cssMetrics) {
    process.cssMetrics = {};
  }

  return (root) => {
    let ids = [];
    let classes = [];
    let float = [];
    let width = [];
    let height = [];
    let display = [];
    let minWidth = [];
    let maxWidth = [];
    let minHeight = [];
    let maxHeight = [];

    let padding = [];
    let paddingTop = [];
    let paddingBottom = [];
    let paddingLeft = [];
    let paddingRight = [];

    let margin = [];
    let marginTop = [];
    let marginBottom = [];
    let marginLeft = [];
    let marginRight = [];

    if (root.source.input.file.indexOf('guide') === -1) {
      const fileName = path.basename(root.source.input.file).replace('.css', '');
      process.cssMetrics[fileName] = process.cssMetricsReset();
      const metrics = process.cssMetrics[fileName];

      const pseudoClasses = [
        ':active',
        ':checked',
        ':disabled',
        ':empty',
        ':enabled',
        ':first-child',
        ':first-of-type',
        ':focus',
        ':hover',
        ':in-range',
        ':invalid',
        ':lang',
        ':last-child',
        ':last-of-type',
        ':link',
        ':not',
        ':nth-child',
        ':nth-last-child',
        ':nth-last-of-type',
        ':nth-of-type',
        ':only-of-type',
        ':only-child',
        ':optional',
        ':out-of-range',
        ':read-only',
        ':read-write',
        ':required',
        ':root',
        ':target',
        ':valid',
        ':visited'
      ];

      const pseudoElements = [
        ':after',
        ':before',
        ':first-letter',
        ':first-line',
        ':selection'
      ];

      root.walkRules(rule => {
        process.cssMetrics[fileName].rules++;

        if (rule.selector) {
          /* Selectors */
          process.cssMetrics[fileName].selectors++;

          /* Ids */
          if (rule.selector.toString().indexOf('#') !== -1) {
            ids.push(rule.selector.toString());
          }

          process.cssMetrics[fileName].ids = reduceDuplicates(ids).join(' ').split('#').length - 1;

          /* Classes */
          if (rule.selector.toString().indexOf('.') !== -1) {
            classes.push(rule.selector.toString());
          }

          process.cssMetrics[fileName].classes = reduceDuplicates(classes).join(' ').split('.').length - 1;


          /* Pseudo Classes and Elements */
          Object.keys(pseudoClasses).map((i) => {
            if (rule.selector.toString().indexOf(pseudoClasses[i]) !== -1) {
              process.cssMetrics[fileName].pseudo.class++;
            }
          });

          Object.keys(pseudoElements).map((i) => {
            if (rule.selector.toString().indexOf(pseudoElements[i]) !== -1) {
              process.cssMetrics[fileName].pseudo.element++;
            }
          });
        }
      });

      root.walkDecls(decl => {
        if (decl) {
          process.cssMetrics[fileName].declarations++;
        }

        if (decl.prop) {
          process.cssMetrics[fileName].properties++;
        }

        const prop = decl.prop.toString();
        const value = decl.value.toString();

        /* Layout */
        if (prop === 'float') { process.cssMetrics[fileName].layout.float++; float.push(value); }

        if (prop === 'width') { process.cssMetrics[fileName].layout.width++; width.push(value); }

        if (prop === 'height') { process.cssMetrics[fileName].layout.width++; height.push(value); }

        if (prop === 'display') { process.cssMetrics[fileName].layout.display++; display.push(value); }

        if (prop === 'min-width') { process.cssMetrics[fileName].layout.minWidth++; minWidth.push(value); }

        if (prop === 'max-width') { process.cssMetrics[fileName].layout.maxWidth++; maxWidth.push(value); }

        if (prop === 'min-height') { process.cssMetrics[fileName].layout.minHeight++; minHeight.push(value); }

        if (prop === 'max-height') { process.cssMetrics[fileName].layout.maxHeight++; maxHeight.push(value); }

        /* Skins */
        if (prop === 'color') { process.cssMetrics[fileName].skin.color++; }

        if (prop === 'background-color') { process.cssMetrics[fileName].skin.backgroundColor++; }

        if (prop === 'border-color') { process.cssMetrics[fileName].skin.borderColor++; }

        if (prop === 'box-shadow') { process.cssMetrics[fileName].skin.boxShadow++; }

        /* Typography */
        if (prop === 'font-family') { process.cssMetrics[fileName].typography.family++; }

        if (prop === 'font-size') { process.cssMetrics[fileName].typography.size++; }

        if (prop === 'font-weight') { process.cssMetrics[fileName].typography.weight++; }

        if (prop === 'text-align') { process.cssMetrics[fileName].typography.alignment++; }

        if (prop === 'line-height') { process.cssMetrics[fileName].typography.lineHeight++; }

        if (prop === 'letter-spacing') { process.cssMetrics[fileName].typography.letterSpace++; }

        if (prop === 'text-decoration') { process.cssMetrics[fileName].typography.decoration++; }

        if (prop === 'text-transform') { process.cssMetrics[fileName].typography.transform++; }

        if (prop === 'text-shadow') { process.cssMetrics[fileName].typography.textShadow++; }

        /* Spacing */
        if (prop === 'padding') {
          process.cssMetrics[fileName].spacing.padding.all++;
          if (parseInt(value) === 0) { process.cssMetrics[fileName].resets.padding.all++; padding.push(value); }
        }
        if (prop === 'padding-top') {
          process.cssMetrics[fileName].spacing.padding.top++;
          if (parseInt(value) === 0) { process.cssMetrics[fileName].resets.padding.top++; paddingTop.push(value); }
        }
        if (prop === 'padding-right') {
          process.cssMetrics[fileName].spacing.padding.right++;
          if (parseInt(value) === 0) { process.cssMetrics[fileName].resets.padding.right++; paddingRight.push(value); }
        }
        if (prop === 'padding-bottom') {
          process.cssMetrics[fileName].spacing.padding.bottom++;
          if (parseInt(value) === 0) { process.cssMetrics[fileName].resets.padding.bottom++; paddingBottom.push(value); }
        }
        if (prop === 'padding-left') {
          process.cssMetrics[fileName].spacing.padding.left++;
          if (parseInt(value) === 0) { process.cssMetrics[fileName].resets.padding.left++; paddingLeft.push(value); }
        }

        if (prop === 'margin') {
          process.cssMetrics[fileName].spacing.margin.all++;
          if (parseInt(value) === 0) { process.cssMetrics[fileName].resets.margin.all++; margin.push(value); }
        }
        if (prop === 'margin-top') {
          process.cssMetrics[fileName].spacing.margin.top++;
          if (parseInt(value) === 0) { process.cssMetrics[fileName].resets.margin.top++; marginTop.push(value); }
        }
        if (prop === 'margin-right') {
          process.cssMetrics[fileName].spacing.margin.right++;
          if (parseInt(value) === 0) { process.cssMetrics[fileName].resets.margin.right++; marginRight.push(value); }
        }
        if (prop === 'margin-bottom') {
          process.cssMetrics[fileName].spacing.margin.bottom++;
          if (parseInt(value) === 0) { process.cssMetrics[fileName].resets.margin.bottom++; marginBottom.push(value); }
        }
        if (prop === 'margin-left') {
          process.cssMetrics[fileName].spacing.margin.left++;
          if (parseInt(value) === 0) { process.cssMetrics[fileName].resets.margin.left++; marginLeft.push(value); }
        }
      });

      /* Layout Compairson */
      process.cssMetrics[fileName].comparison.layout.display.unique = reduceDuplicates(display).length;
      process.cssMetrics[fileName].comparison.layout.display.repeated = display.length;

      process.cssMetrics[fileName].comparison.layout.float.unique = reduceDuplicates(float).length;
      process.cssMetrics[fileName].comparison.layout.float.repeated = float.length;

      process.cssMetrics[fileName].comparison.layout.width.unique = reduceDuplicates(width).length;
      process.cssMetrics[fileName].comparison.layout.width.repeated = width.length;

      process.cssMetrics[fileName].comparison.layout.height.unique = reduceDuplicates(height).length;
      process.cssMetrics[fileName].comparison.layout.height.repeated = height.length;

      process.cssMetrics[fileName].comparison.layout.maxWidth.unique = reduceDuplicates(maxWidth).length;
      process.cssMetrics[fileName].comparison.layout.maxWidth.repeated = maxWidth.length;

      process.cssMetrics[fileName].comparison.layout.minWidth.unique = reduceDuplicates(minWidth).length;
      process.cssMetrics[fileName].comparison.layout.minWidth.repeated = minWidth.length;

      process.cssMetrics[fileName].comparison.layout.maxHeight.unique = reduceDuplicates(maxHeight).length;
      process.cssMetrics[fileName].comparison.layout.maxHeight.repeated = maxHeight.length;

      process.cssMetrics[fileName].comparison.layout.minHeight.unique = reduceDuplicates(minHeight).length;
      process.cssMetrics[fileName].comparison.layout.minHeight.repeated = minHeight.length;

      /* Padding Compairson */
      process.cssMetrics[fileName].comparison.padding.all.unique = reduceDuplicates(padding).length;
      process.cssMetrics[fileName].comparison.padding.all.repeated = padding.length;

      process.cssMetrics[fileName].comparison.padding.top.unique = reduceDuplicates(paddingTop).length;
      process.cssMetrics[fileName].comparison.padding.top.repeated = paddingTop.length;

      process.cssMetrics[fileName].comparison.padding.right.unique = reduceDuplicates(paddingRight).length;
      process.cssMetrics[fileName].comparison.padding.right.repeated = paddingRight.length;

      process.cssMetrics[fileName].comparison.padding.bottom.unique = reduceDuplicates(paddingBottom).length;
      process.cssMetrics[fileName].comparison.padding.bottom.repeated = paddingBottom.length;

      process.cssMetrics[fileName].comparison.padding.left.unique = reduceDuplicates(paddingLeft).length;
      process.cssMetrics[fileName].comparison.padding.left.repeated = paddingLeft.length;

      /* Margin Compairson */
      process.cssMetrics[fileName].comparison.margin.all.unique = reduceDuplicates(margin).length;
      process.cssMetrics[fileName].comparison.margin.all.repeated = margin.length;

      process.cssMetrics[fileName].comparison.margin.top.unique = reduceDuplicates(marginTop).length;
      process.cssMetrics[fileName].comparison.margin.top.repeated = marginTop.length;

      process.cssMetrics[fileName].comparison.margin.right.unique = reduceDuplicates(marginRight).length;
      process.cssMetrics[fileName].comparison.margin.right.repeated = marginRight.length;

      process.cssMetrics[fileName].comparison.margin.bottom.unique = reduceDuplicates(marginBottom).length;
      process.cssMetrics[fileName].comparison.margin.bottom.repeated = marginBottom.length;

      process.cssMetrics[fileName].comparison.margin.left.unique = reduceDuplicates(marginLeft).length;
      process.cssMetrics[fileName].comparison.margin.left.repeated = marginLeft.length;
    }
  }
});

module.exports = {
  MetricsCSS,
  percentage,
  exporting,
  variables,
  comments,
  mixins,
  extend,
  minify,
  colors,
  media,
  roots,
  rems
};
