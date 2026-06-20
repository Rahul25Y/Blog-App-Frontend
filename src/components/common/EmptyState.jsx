import React from 'react';
import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ title = "No Data Found", subtitle = "There is nothing to display here yet.", icon: Icon = FiInbox }) => {
  return (
    <div className="empty-state-card custom-card h-100 d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: "300px" }}>
      <Icon className="empty-state-icon" style={{ fontSize: "3rem", marginBottom: "1rem", color: "var(--text-secondary)", opacity: 0.5 }} />
      <h5 className="fw-bold text-color">{title}</h5>
      <p className="text-muted-custom mb-0">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
