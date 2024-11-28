import React from "react";
import "./TicketCard.css";

const TicketCard = ({ ticket }) => {
  const priorityLevels = ["No Priority", "Low", "Medium", "High", "Urgent"];
  return (
    <div className="ticket-card">
      <h4>{ticket.title}</h4>
      <p>ID: {ticket.id}</p>
      <p>Status: {ticket.status || "No Status"}</p>
      <p>Assigned User: {ticket.assigned_user || "Unassigned"}</p>
      <p>Priority: {priorityLevels[ticket.priority]}</p>
    </div>
  );
};

export default TicketCard;
