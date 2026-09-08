import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Produto from './componentes/Produto'
import ListarProdutos from './componentes/ListarProdutos'

function App() {

  return (
    <div>
         <div>
           <Produto />
           <ListarProdutos/>
        </div>
    </div>


  )
}

export default App
