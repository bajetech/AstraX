import { isConnected } from "@bajetech/astrax-api";
import React, { useState } from "react";
import { PlaygroundInput } from "./basics/inputs";

export const IsConnectedDemo = () => {
  const [isConnectedState, setIsConnectedState] = useState(" ");
  const btnHandler = () => {
    setIsConnectedState(isConnected().toString());
  };
  return (
    <section>
      <div>
        Is AstraX currently connected to your browser?
        <PlaygroundInput readOnly value={isConnectedState} />
      </div>
      <button type="button" onClick={btnHandler}>
        Check Connection
      </button>
    </section>
  );
};
