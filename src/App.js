import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Search from './components/Search'
import Domain from './components/Domain'

// ABIs
import ETHDaddy from './abis/ETHDaddy.json'

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const [ethDaddy, setETHDaddy] = useState(null)
  const [domains, setDomains] = useState([])

  const loadBlockchainData = async () =>
  {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()

    const ethDaddy = new ethers.Contract(config[network.chainId].ETHDaddy.address, ETHDaddy, provider)
    setETHDaddy(ethDaddy)

    const maxSupply = await ethDaddy.maxSupply()
    const domains = []

    for(var i = 1; 1 <= maxSupply; i++)
    {
      const domain = await ethDaddy.getDomain(i)
      domains.push(domain)
    }

    setDomains(domains)

    window.ethereum.on('accountsChanged',async() => {
      const accounts = await window.ethereum.request({'method': 'eth_requestAccounts'})
      const account = ethers.utils.getAddress(accounts[0])
      console.log(account)
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>

      <Navigation account={account} setAccount={setAccount} />

      <Search />

      <div className='cards__section'>

        <h2 className='cards__title'>The reason why you need a domain:</h2>

        <p className='cards__description'>
          Have your own custom name, use it across different places around the web and store all your data.
        </p>

        <hr/>

        <div className='cards__list'>
          {domains.map((domain, index) => (
            <Domain domain={domain} ethDaddy={ethDaddy} provider={provider} id={index + 1} key={index}/>
          ))}
        </div>

      </div>

    </div>
  );
}

export default App;