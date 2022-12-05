import {queries as tlQueries} from '@testing-library/dom'

import {waitForCondition} from '@jneander/utils-async'

export const queries = {}

const attributes = ['AltText', 'LabelText', 'Role', 'Text', 'Title']

const queryTypes = ['query', 'queryAll', 'get', 'getAll', 'find']

attributes.forEach(attribute => {
  queryTypes.forEach(queryType => {
    const name = `${queryType}By${attribute}`
    queries[name] = tlQueries[name]
  })

  const getBy = tlQueries[`getBy${attribute}`]
  queries[`findBy${attribute}`] = ($container, text, findOptions, waitOptions) =>
    waitForCondition(() => getBy($container, text, findOptions), waitOptions)
})
