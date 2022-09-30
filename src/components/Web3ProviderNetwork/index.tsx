import { NetworkContextName } from '../../constants'
import { createWeb3ReactRoot } from 'web3-react-core'

const Web3ReactRoot = createWeb3ReactRoot(NetworkContextName)

interface Props {
  children: any
  getLibrary: any
}

function Web3ProviderNetwork({ children, getLibrary }: Props) {
  return <Web3ReactRoot getLibrary={getLibrary}>{children}</Web3ReactRoot>
}

export default Web3ProviderNetwork
