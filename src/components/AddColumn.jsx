import axios from "axios";
import React from "react";

const AddColumn = ({ setResData, resData, setOpenAddCol }) => {
  const [colName, setColName] = React.useState("");
  const [colType, setColType] = React.useState("text");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (colType === "text") {
      setResData((prev) => {
        prev.forEach((row) => {
          row[colName] = "";
        });
        return [...prev];
      });

      await axios.put(
        `https://glassball-assignment-default-rtdb.firebaseio.com/sheets.json`,
        resData
      );
    } else if (colType === "singleselect") {
      setResData((prev) => {
        prev.forEach((row) => {
          row[colName] = {
            type: "singleselect",
            value: {
              value: "",
              label: "",
            },
          };
        });
        return [...prev];
      });

      await axios.put(
        `https://glassball-assignment-default-rtdb.firebaseio.com/sheets.json`,
        resData
      );
    } else if (colType === "multiselect") {
      setResData((prev) => {
        prev.forEach((row) => {
          row[colName] = {
            type: "multiselect",
            value: [],
          };
        });
        return [...prev];
      });

      await axios.put(
        `https://glassball-assignment-default-rtdb.firebaseio.com/sheets.json`,
        resData
      );
    }
    setOpenAddCol(false);
    window.location.reload();
  };

  return (
    <div className="addColumn">
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="column">Column Name</label>
        <input
          type="text"
          id="column"
          value={colName}
          onChange={(e) => setColName(e.target.value)}
          placeholder="Enter Column Name"
          required
        />
        <label htmlFor="type">Type: </label>
        <select
          name="type"
          id="type"
          value={colType}
          onChange={(e) => setColType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="singleselect">Single Select</option>
          <option value="multiselect">Multi Select</option>
        </select>
        <div className="addBtnContainer">
          <button className="cancelColBtn" onClick={() => setOpenAddCol(false)}>
            Cancel
          </button>
          <button className="saveDataBtn" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddColumn;
