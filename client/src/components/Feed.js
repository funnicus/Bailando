import React from "react";

const events = [
    {
      name: "Junction 2020 hackathon",
      id: "3d594650-3436-11e9-bc57-8b80ba54c431",
      description: "Hack the world!"
    },
    {
      name: "Flow festival",
      id: '3d599470-3436-11e9-bc57-8b80ba54c431',
      "description": "Rave on!"
    },
    {
      name: "Juhanan kotibileet",
      id: '3d599471-3436-11e9-bc57-8b80ba54c431',
      "description": "Täällä kuunnellaan vain hyvää musiikkia..."
    },
    {
      name: "Juhanan kotibileet",
      id: '3d599471-3436-11e9-bc57-8b80na54c431',
      "description": "Täällä kuunnellaan vain hyvää musiikkia..."
    },
];

const Feed = () => {
  return (
    <div className="Feed">
        {events.map(e => {
            return (
            <div key={e.id}>
                <h3>{e.name}</h3>
                <p>{e.description}</p>
            </div>
            )
        })}
    </div>
  );
}

export default Feed;