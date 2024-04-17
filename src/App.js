import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import OrderOnline from "./pages/OrderOnline";
import Contact from "./pages/Contact";
import Calendar from "./pages/Calendar";
import SingleItem from "./pages/SingleItem";
import MemberOrder from "./pages/MemberOrder";
import Menu from "./pages/Menu";
import { items } from "./data";
import './scss/style.css';
import { useGlobalContext } from './context'
import { useLocation } from 'react-router-dom'

const allCategories = ['All', ...new Set(items.map((item) => item.category))];

function App() {
  const { clearOrder, clearError } = useGlobalContext()
  const { pathname } = useLocation()

  useEffect(() => {
    clearOrder()
    clearError()
  }, [pathname])

  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  const filterMenu = (category) => {
    if (category === 'All') {
      setMenuItems(items);
      return;
    }

    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems)
  }

  const searchFilter = (searchedValue) => {
    const searchedItems = items.filter((item) => item.name.includes(searchedValue));
    setMenuItems(searchedItems)
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu items={menuItems} categories={categories} filterAllItems={filterMenu} searchFilter={searchFilter} />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/reservations' element={<Calendar />} />
        <Route path='/memberorder' element={<MemberOrder />} />
        <Route path='/onlineorder' element={<OrderOnline />} />
        <Route path='oneitem/:id' element={<SingleItem items={menuItems} />} />
      </Routes>
    </div>
  );
}

export default App;
