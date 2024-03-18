import React from "react";
import Cookies from "js-cookie";
import TableContent from "../Components/TableContent";
import Header from "../Components/Header";
const Home = () => {
  const token = Cookies.get("token");

  return (
    <>
      <header className="bg-indigo-600">
        <Header/>
      </header>
      <main className="mt-5">
      {token && <TableContent/>}
      </main>
    </>
  );
};

export default Home;
