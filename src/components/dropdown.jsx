import React, { useEffect, useState } from "react";
import classnames from "classnames";

const Dropdown = ({
  drops,
  label,
  sendDropActive,
  curClass,
  sendSearchStatus,
  obj,
}) => {
  let [activeDrop, setactiveDrop] = useState(curClass ? curClass : drops[0]);
  let [dropActive, setdropActive] = useState(false);
  const handleDrop = (drop) => {
    setactiveDrop(drop);
    setdropActive(false);
    sendSearchStatus(drop);
  };
  const handleDropOpen = () => {
    setactiveDrop = !setactiveDrop;
  };

  return (
    <div
      className={`filter-select ${curClass}`}
      tabIndex="1"
      onBlur={() => setdropActive(false)}
    >
      <div
        className="active-status"
        onClick={() => {
          setdropActive(!dropActive);
        }}
      >
        {label ? <span className="label">status:</span> : ""}
        <span className="acST" onClick={handleDropOpen}>
          {activeDrop}
        </span>
      </div>
      <ul className={classnames("drop", { active: dropActive })}>
        {drops.map((drop, index) => (
          <li
            className="drop-li"
            onClick={() => {
              handleDrop(drop);
            }}
            key={`${drop}_${index}`}
          >
            {drop}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
