import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/contact">Contact</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/about">About</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;