import { Radio } from "antd";
import React, { useEffect, useState } from "react";

function EachQuestionEvaluation({ data, number, check, userAns }) {
  return (
    <div
      className="border rounded p-3 mb-3 border-secondary-subtle"
      style={{ background: "#eeeeee" }}
    >
      <h4 className="fw-medium">
        Q{number} - {data.name}
      </h4>

      <div className="d-flex flex-column ms-5">
        <Radio.Group>
          {data.data.map((q, i) => (
            <div key={i}>
              <Radio
                disabled={true}
                className="text-capitalize text-dark"
                value={q}
              >
                {q}
              </Radio>
            </div>
          ))}
        </Radio.Group>
      </div>
      <div>
        <p className="mb-0 ">
          Your Ans:
          <span
            className={
              check
                ? "text-success text-capitalize fw-bold"
                : "text-danger text-capitalize fw-bold"
            }
          >
            {" "}
            {userAns}
          </span>
        </p>
        <p className="mb-0 ">
          Right Ans:
          <samp className="text-capitalize text-secondary fw-bold">
            {" "}
            {data.ans}
          </samp>
        </p>
      </div>
    </div>
  );
}

export default EachQuestionEvaluation;
