import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Starter from './pages/Starter'
import China from './pages/china/China'
import Layout from './utils/Layout'
import Uzbek from './pages/uzbek/Uzbek'
import Login from './pages/Login'
import GiveCode from './pages/give_code/GiveCode'
import Party from './pages/party/Party'
import Teacher from './pages/teacher/Teacher'
import Connected from './pages/connected/Connected'
import Search from './pages/search/Search'
import News from './pages/news/News'
import Chat from './pages/chat/Chat'
import Hisobotlar from './pages/hisobotlar/Hisobotlar'
import Qarzim from './pages/qarzim/Qarzim'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Starter />} />
      <Route path='/xitoy_baza' element={<Layout> <China /></Layout>} />
      <Route path='/uzbek_baza' element={<Layout> <Uzbek /></Layout>} />
      <Route path='/kod_berish' element={<Layout> <GiveCode /></Layout>} />
      <Route path='/partiyalar' element={<Layout> <Party /></Layout>} />
      <Route path='/ustozlar' element={<Layout> <Teacher /></Layout>} />
      <Route path='/boglanganlar' element={<Layout> <Connected /></Layout>} />
      <Route path='/qidiruv' element={<Layout> <Search /></Layout>} />
      <Route path='/yangiliklar' element={<Layout> <News /></Layout>} />
      <Route path='/chat' element={<Layout> <Chat /></Layout>} />
      <Route path='/chats/:telegramId' element={<Layout> <Chat /></Layout>} />
      <Route path='/hisobotlar' element={<Layout> <Hisobotlar /></Layout>} />
      <Route path='/qarzlarim' element={<Layout> <Qarzim /></Layout>} />
    </Routes>
  )
}

export default App