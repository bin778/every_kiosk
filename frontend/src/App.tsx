import React from 'react';
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";

import Home from "./view/Home";
import Order from "./view/Order";
import OptionSelect from "./view/OptionSelect";
import Check from "./view/Check";
import PaymentSelect from "./view/PaymentSelect";
import PaymentProgress from "./view/PaymentProgress";
import Number from "./view/Number";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link to="/"></Link>
          <Link to="/order"></Link>
          <Link to="/search"></Link>
          <Link to="/option_select"></Link>
          <Link to="/check"></Link>
          <Link to="/payment_select"></Link>
          <Link to="/payment_progress"></Link>
          <Link to="/number"></Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/option_select" element={<OptionSelect />} />
          <Route path="/check" element={<Check />} />
          <Route path="/payment_select" element={<PaymentSelect />} />
          <Route path="/payment_progress" element={<PaymentProgress />} />
          <Route path="/number" element={<Number />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
