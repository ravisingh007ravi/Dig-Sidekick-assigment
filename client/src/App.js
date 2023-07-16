import React, { useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import {
  LogIn, SignUp, Home, DataProvider, UpdateBlogs, NotFoundPage,
  Navbar, About, Contact, CreatePost, DetailsViewPost, DeletedPost
} from './components/AllComponents';



const PriveRoute = ({ isAuthentication, ...props }) => {
  return isAuthentication ?
    <> <Navbar />
      <Outlet />
    </>
    :
    <Navigate replace to='/LogIn' />
}

function App() {

  const [isAuthentication, isUserAuthentication] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>

          <Route path='SignUp' element={<SignUp />} />
          <Route path='LogIn' element={<LogIn isUserAuthentication={isUserAuthentication} />} />

          <Route path='/' element={<PriveRoute isAuthentication={isAuthentication} />}>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/DetailsViewPost/:id' element={<DetailsViewPost />} />
            <Route path='/UpdateBlogs/:id' element={<UpdateBlogs />} />
            <Route path='/DeletedPost/:id' element={<DeletedPost />} />
          </Route>

          <Route path='/SignUp' element={<SignUp />} />
          <Route path='LogIn' element={<LogIn />} />
          <Route path='/*' element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
