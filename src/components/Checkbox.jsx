import React, { useState } from "react";
import classnames from "classnames";

const Checkbox = ({ defaultCheckbox }) => {
  const [active, setActive] = useState(defaultCheckbox);
  return (
    <div className={("checkbox", classnames({ active: active }))}>
      <span></span>
    </div>
  );
};

export default Checkbox;
