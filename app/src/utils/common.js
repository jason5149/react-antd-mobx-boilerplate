export const generateTableColumns = rawData => {
  const result = []

  /* eslint-disable-next-line */
  for (let i in rawData) {
    const item = {
      key:       i,
      title:     rawData[i],
      dataIndex: i,
    }
    
    result.push(item)
  }

  return result
}

export const convertValidateCallback2Promise = func => {
  /* eslint-disable-next-line */
  return new Promise(resolve => {
    func((errors, values) => {
      resolve({ errors, values })
    })
  })
}