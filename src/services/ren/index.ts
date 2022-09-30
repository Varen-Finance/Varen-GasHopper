import { getAddress } from '@ethersproject/address'
import BigNumber from 'bignumber.js'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function getLowestDenomination(amount: number, decimals: number): string {
  return String(amount * Math.pow(10, decimals))
}

export function getLowestDenom(amount: number, decimals: number): BigNumber {
  return new BigNumber(amount * Math.pow(10, decimals))
}

export function getLowestDenomRounded(amount: number, decimals: number): string {
  const convert = new BigNumber(amount * Math.pow(10, decimals)).decimalPlaces(0, BigNumber.ROUND_FLOOR).toString()
  const n = convert.toString()
  const parts = n.split('e+')
  let first = parts[0].replace('.', '')
  const zeroes = parseInt(parts[1], 10) - (first.length - 1)
  for (var i = 0; i < zeroes; i++) {
    first += '0'
  }

  return first.toString()
}
