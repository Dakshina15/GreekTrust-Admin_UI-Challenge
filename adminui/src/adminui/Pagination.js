import React, { useState, useEffect } from "react";
import "./Pagination.css";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);
  const numberOfButtons = Math.ceil(total / showPerPage);
  // console.log(numberOfButtons);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
     // eslint-disable-next-line
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };

  return (
    <div className="page-container">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => onButtonClick("prev")}>
              Previous
            </button>
          </li>

          {new Array(numberOfButtons).fill("").map((el, index) => (
            <li
              key={index}
              className={`page-item ${index + 1 === counter ? "active" : null}`}
            >
              <button
                className="page-link"
                onClick={() => setCounter(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={() => onButtonClick("next")}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
