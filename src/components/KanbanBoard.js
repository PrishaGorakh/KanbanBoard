import React, { useEffect, useState } from "react";
import { fetchTickets } from "../services/api";
import TicketCard from "./TicketCard";
import Dropdown from "./Dropdown";
import "./KanbanBoard.css"; // Add styles here

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data.tickets || []);
      } catch (error) {
        console.error("Error loading tickets:", error);
      }
    };
    loadTickets();
  }, []);

  const groupTickets = () => {
    switch (grouping) {
      case "status":
        return tickets.reduce((groups, ticket) => {
          const group = ticket.status || "No Status";
          groups[group] = groups[group] || [];
          groups[group].push(ticket);
          return groups;
        }, {});
      case "user":
        return tickets.reduce((groups, ticket) => {
          const group = ticket.assigned_user || "Unassigned";
          groups[group] = groups[group] || [];
          groups[group].push(ticket);
          return groups;
        }, {});
      case "priority":
        return tickets.reduce((groups, ticket) => {
          const group = ticket.priority || "No Priority";
          groups[group] = groups[group] || [];
          groups[group].push(ticket);
          return groups;
        }, {});
      default:
        return {};
    }
  };

  const sortedTickets = (group) => {
    return [...group].sort((a, b) => {
      if (ordering === "priority") {
        return b.priority - a.priority;
      } else if (ordering === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      <Dropdown setGrouping={setGrouping} setOrdering={setOrdering} />
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <h3>{group}</h3>
            {sortedTickets(groupedTickets[group]).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
