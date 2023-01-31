import decamelize from 'decamelize'
import each from 'lodash/forEach'
import isObject from 'lodash/isObject'
import reduce from 'lodash/reduce'

export const compileStyles = styles =>
  reduce(
    styles,
    (stylesStr, ruleSet, selector) => {
      stylesStr += `${selector}{` // eslint-disable-line
      each(ruleSet, (value, property) => {
        if (isObject(value)) {
          const newObject = {}
          newObject[property] = value
          stylesStr += compileStyles(newObject) // eslint-disable-line
        } else {
          let newStyle = `${decamelize(property, '-')}:${value};` // eslint-disable-line
          // If the property is prefixed, add an additional dash at the beginning.
          const prefixes = ['Webkit', 'ms', 'Moz', 'O']
          prefixes.forEach(prefix => {
            if (property.slice(0, prefix.length) === prefix) {
              newStyle = `-${newStyle}`
            }
          })
          stylesStr += newStyle
        }
      })
      stylesStr += '}' // eslint-disable-line
      return stylesStr
    },
    '',
  )
