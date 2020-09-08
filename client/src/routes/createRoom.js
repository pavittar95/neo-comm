import React, { useCallback } from "react";
import { v1 as uuid } from "uuid";
const CreateRoom = (props) => {
  const create = useCallback(() => {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }, []);

  return <button onClick={create}>Create Room</button>;
};

export default CreateRoom;
