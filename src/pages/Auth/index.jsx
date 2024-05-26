import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Auth/Login'
import Register from '../Auth/Register'


export default function Index() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    )
}
