import { Quote } from '../1inch/models'
import { CalculatedFee, SimpleFee } from '../ren/feesUtils'

export type SwapFees = {
  mintCalculatedFee: CalculatedFee
  mintSimpleFee: SimpleFee
  burnCalculatedFee: CalculatedFee
  burnSimpleFee: SimpleFee
  estAmountAfterFees: string
}

// export class SwapFee {
//   constructor(
//     readonly mintCalculatedFee: CalculatedFee,
//     readonly mintSimpleFee: SimpleFee,
//     readonly burnCalculatedFee: CalculatedFee,
//     readonly burnSimpleFee: SimpleFee,
//     readonly quote: Quote
//   ) {

//   }
// }
