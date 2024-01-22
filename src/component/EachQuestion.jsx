import React from "react";
import { Radio } from "antd";
function EachQuestion({ data, number, manageAns }) {
  //   console.log(data);
  return (
    <div
      className="border rounded  p-3 mb-3 border-secondary-subtle"
      style={{ background: "#eeeeee" }}
    >
      <h4 className="fw-medium">
        Q{number} - {data.name}
      </h4>

      <div className="d-flex flex-column ms-5">
        <Radio.Group onChange={(e) => manageAns(e.target.value, data._id)}>
          {data.data.map((q, i) => (
            <div key={i}>
              <Radio className="text-capitalize" value={q}>
                {q}
              </Radio>
            </div>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
}

export default EachQuestion;
