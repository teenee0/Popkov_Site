import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BottomNav from './components/BottomNav/BottomNav'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import CatalogCategory from './pages/CatalogCategory/CatalogCategory'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import About from './pages/About/About'
import Contacts from './pages/Contacts/Contacts'
import Delivery from './pages/Delivery/Delivery'
import Payment from './pages/Payment/Payment'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Header />
      <main className="main-content" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/catalog/:id" element={<CatalogCategory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
