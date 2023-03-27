import React, {useEffect, useState} from 'react'
import Web3 from 'web3'
import {Container, Navbar, Button, Row, Col, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './logo.svg';
import './App.css';
import SunnySwapIcon from './assets/sunnyswap_icon_small.png'

function App() {

  const [currentAccount, setAccount] = useState()
  const [currentAccountBalance, setCurrentAccountBalance] = useState()
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [nftswapaddress, setNftSwapAddress] = useState();
  const [bidamount, setBidAmount] = useState();
  
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

  const submitBid = async() => {
    var web3 = new Web3(Web3.givenProvider);
    
    web3.eth.sendTransaction({
      to: nftswapaddress,
      from: currentAccount,
      value: web3.utils.toWei(bidamount), 
      gas: 400000,
      gasPrice: 21000000000
    }) 
    .then(txRaw => {
      console.log(txRaw.transactionHash)
      //return response.json( txRaw.transactionHash );
    })
    .catch(function(error) {
      //handleRevert(error);
      console.log("Error: \n" + error);
      //return response.json( 'error' )
    })
  }

  return (
    <div className="App-header">
      <Container className='App-header'>
      <Row>
        <header>
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
                Funds {currentAccountBalance}
              </Navbar.Brand>
            </Navbar>
        </header>
      </Row>
      <Row>
        <Container style={{margin: "0 auto", width: "40%"}}>
        <Form.Group className='mb-3'>
            <Form.Control placeholder='NFT Collection Address' onChange={(e) => {setNftSwapAddress(e.target.value)}}/>
            <Form.Control placeholder='Bid Amount' onChange={(e) => {setBidAmount(e.target.value)}}/>
          </Form.Group>
          <div>
                <Button variant='primary' onClick={submitBid}>Swap NFT Assets</Button>
          </div>
        </Container>
      </Row>
      </Container>
    </div>
  )
    
}

export default App;
