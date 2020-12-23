import React from "react";
import { Link } from "react-router-dom"

import "./Feed.css";

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
    {
        name: "Lorem ipsum",
        "id": "kkkö-0224-asd",
        "description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name: "Lorem ipsum",
        "id": "kkkö-0224-asdbb",
        "description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
];

const Feed = () => {
  return (
    <div className="Feed">
        {events.map(e => {
            return (
            <Link to="/events/id"><div className="event-card" key={e.id}>
                <h3>{e.name}</h3>
                <p>{e.description}</p>
            </div></Link>
            )
        })}
    </div>
  );
}

export default Feed;