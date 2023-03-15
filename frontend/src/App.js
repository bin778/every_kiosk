import { Route, BrowserRouter, Routes, Link } from "react-router-dom";

import Home from "./view/Home.jsx";
import Order from "./view/Order.jsx";
import MenuSelect from "./view/MenuSelect";
import Check from "./view/Check.jsx";
import PaymentSelect from "./view/PaymentSelect";
import PaymentProgress from "./view/PaymentProgress";
import Number from "./view/Number.jsx";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/"></Link>
        <Link to="/order"></Link>
        <Link to="/menu_select"></Link>
        <Link to="/check"></Link>
        <Link to="/payment_select"></Link>
        <Link to="/payment_progress"></Link>
        <Link to="/number"></Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/menu_select" element={<MenuSelect />} />
          <Route path="/check" element={<Check />} />
          <Route path="/payment_select" element={<PaymentSelect />} />
          <Route path="/payment_progress" element={<PaymentProgress />} />
          <Route path="/number" element={<Number />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
