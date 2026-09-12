export function price(val) {
  const reverse = val => (val || 0).toString().split('').reverse().join('')

  return reverse(reverse(val).replace(/(\d{3})(?=\d)/g, '$1,'))
}

export function fullName(data) {
  data = data || {}

  return [data.Name, data.Family]
    .filter(n => n)
    .join(' ')
    .trim()
}

export const modifyInputValue = function (input, value) {
  if (input.value === value) return
  let start = input.selectionStart
  let end = input.selectionEnd
  input.value = value
  let event = new Event('input', {
    bubbles: true,
    cancelable: true,
  })
  input.setSelectionRange(start, end)
  input.dispatchEvent(event)
}

export const sanitizeText = (text) => {
  if (typeof text !== 'string') return ''
  return text
    .normalize('NFKC') // Normalize unicode (fix weird invisible chars)
    .replace(/\r\n|\r|\n/g, '\n') // Normalize all line breaks to '\n'
    .replace(/\t+/g, ' ') // Replace all tabs with one space
    .replace(/[•●▪]/g, '-') // Replace bullet points with a simple dash
    .replace(/\u00A0/g, ' ') // Replace non-breaking spaces
    .replace(/\s{2,}/g, ' ') // Collapse multiple spaces into one
    .trim() // Trim extra spaces from start/end
}

export const Validation = (value, type) => {
  if (type === 'email') {
    const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email.test(value)
  } else if (type === 'phone') {
    const phone = /^0?9[0-9]{9}$/
    return phone.test(value)
  }
}
