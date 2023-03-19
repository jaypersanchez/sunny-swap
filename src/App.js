import React, {useEffect, useState} from 'react'
import Web3 from 'web3'
import {Container, Navbar, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './logo.svg';
import './App.css';
import SunnySwapIcon from './assets/sunnyswap_icon_small.png'

function App() {

  const [currentAccount, setAccount] = useState()
  const [currentAccountBalance, setCurrentAccountBalance] = useState()
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);


  const loadWeb3 = async() => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      window.ethereum.enable()
      setIsMetaMaskConnected(true);
    }
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      setIsMetaMaskConnected(true);
    }
    else {
      window.alert('Please install metamask')
    }
  }

  const loadWalletData = async() => {
    const web3 = window.web3
    const account = await web3.eth.getAccounts()
    setAccount(account[0])
    let _balance = await web3.eth.getBalance(currentAccount)
    let balance = await web3.utils.fromWei(_balance, 'ether')
    setCurrentAccountBalance(balance)
  }

  useEffect(() => {
    loadWeb3()
    loadWalletData()
  })

  

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Navbar>
            <Navbar.Brand style={{justifyContent: "left"}}>
            <img 
              src={SunnySwapIcon} alt="Sunny Swap" 
              width={50}
              length={50}
              style={{justifyContent: "left"}}
            />
            </Navbar.Brand>
            <Navbar.Brand style={{justifyContent: "center", color:"white"}}>
              {currentAccount}
            </Navbar.Brand>
            <Navbar.Brand style={{justifyContent: "right", color:"white"}}>
              Balance {currentAccountBalance}
            </Navbar.Brand>
          </Navbar>
        </Container>
      </header>
      <div>
          <Button variant='primary'>Swap NFT Assets</Button>
      </div>
    </div>
  )
    
}

export default App;
