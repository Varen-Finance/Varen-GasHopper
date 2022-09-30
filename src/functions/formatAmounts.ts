import { BigNumber } from 'bignumber.js'
import { type } from 'os'

export const formatAmount = (amount: number, significant: number = 6): string => {
  if (amount === 0 || typeof amount === 'undefined') return '0.0'
  const precision = amount.toFixed(0).length > significant ? amount.toFixed(0).length + 2 : significant
  const convert = new BigNumber(amount.toString()).toPrecision(precision).replace(/0+$/, '')
  if (String(convert).charAt(String(convert).length - 1) === '.') {
    return convert.replace('.', '')
  } else {
    return convert
  }
}
