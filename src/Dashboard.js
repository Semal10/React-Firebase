import React, { useEffect } from "react";

const Dashboard = ({
  handleLogout,
  email,
  password,
  date,
  country,
  setEmail,
  setPassword,
  setDate,
  setCountry,
}) => {
  return (
    <section className="dashboard">
      <nav>
        <h2>Welcome</h2>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="info">
        <span class="material-icons">account_circle</span>
        <div className="infos">
          <p>Username : {email}</p>
          <p>Password : {password}</p>
          <p>Date of Birth : {date}</p>
          <p>Country : {country}</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
