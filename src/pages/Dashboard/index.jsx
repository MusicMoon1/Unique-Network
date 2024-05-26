import React from 'react'
import { Route, Routes, } from 'react-router-dom'
import Home from '../Fontend/Home'
import Dao from '../Dashboard/Dao'
import MarketPlace from '../Dashboard/MarketPlace'
import MyLibrary from '../Dashboard/MyLibrary'
import NoPage from './NoPage'
import DetailsPage from './DetailsPage'
import Profile from './Profile'
import CreateNFT from './CreateNFT'
import CreateDao from './CreateDao'

export default function Index() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='library' element={<MyLibrary />} />
        <Route path='dao' element={<Dao />} />
        <Route path='marketplace/*' element={<MarketPlace />} />
        <Route path='profile/*' element={<Profile />} />
        <Route path='details' element={<DetailsPage />} />
        <Route path='createNFT' element={<CreateNFT />} />
        <Route path='createDAO' element={<CreateDao />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </>

  )
}
