import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";

const EditTableInfo = () => {
  const { user } = useContext(AuthContext);
  const [row, setRow] = useState(0);
  const [tableList, setTableList] = useState([]);

  // const [addBtnState, setAddBtnState] = useState(true);

  // downloading previous table
  //  useEffect(() => {
  //    fetch(`http://localhost:5000/restaurantAdmin/allTableInfo/${user?.email}`)
  //      .then((res) => res.json())
  //      .then((data) => {
  //        setTableList(data.Tables);
  //        console.log(data);
  //      });
  //  }, [user?.email]);

  // downloading previous table info
  const handleDownload = () => {
    fetch(`http://localhost:5000/restaurantAdmin/allTableInfo/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRow(data.Tables.length);
        setTableList(data.Tables);
        console.log(data);
      });
  };

  // uploading to db
  const handleUploadToDb = () => {
    fetch(
      `http://localhost:5000/restaurantAdmin/editTableInfo/${user?.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(tableList),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  // adding new table by clicking button
  const addingNewTable = () => {
    let prevTableList = [...tableList];
    let newTableList = [...prevTableList];
    let newTableRow = {
      col: 1,
      Row: row + 1,
      alignment: "start",
      tableInfo: [
        {
          TableId: `T${row + 1}`,
          Row: row + 1,
          Person: 2,
          Availability: "Available",
        },
      ],
    };
    newTableList.push(newTableRow);
    setTableList(newTableList);
    // setAddBtnState(false);
    console.log(tableList);
  };

  // deleting new table
  const deletingATable = () => {
    let prevTableList = [...tableList];
    prevTableList.length = row - 1;
    const updatedTableList = [...prevTableList];
    setTableList(updatedTableList);
    // setAddBtnState(true);
  };

  // handle  table column

  const handleCol = (colInputValue, tablesInRow) => {
    // setAddBtnState(true);
    let col = parseInt(colInputValue);
    tablesInRow.col = col;
    tablesInRow.tableInfo.length = col;

    for (let i = 0; i < col; i++) {
      tablesInRow.tableInfo[i] = {
        TableId: `T${tablesInRow.Row}${i + 1}`,
        Row: tablesInRow.Row,
        Person: 2,
        Availability: "Available",
      };
    }
    const beforeTableList = tableList.filter(
      (table) => table.Row < tablesInRow.Row
    );
    const afterTableList = tableList.filter(
      (table) => table.Row > tablesInRow.Row
    );
    // console.log(tablesInRow);
    // console.log(beforeTableList);
    // console.log(afterTableList);

    let newTableList = [...beforeTableList, tablesInRow, ...afterTableList];
    // let previousTableList = [...tableList];
    // previousTableList.pop();
    // let newUpdatedTableList = [...previousTableList, tablesInRow];
    console.log(tablesInRow);
    setTableList(newTableList);
  };

  // handle table algnment
  const handleAlgn = (algn, tablesInRow) => {
    tablesInRow.alignment = algn;
    const beforeTableList = tableList.filter(
      (table) => table.Row < tablesInRow.Row
    );
    const afterTableList = tableList.filter(
      (table) => table.Row > tablesInRow.Row
    );

    let newTableList = [...beforeTableList, tablesInRow, ...afterTableList];
    setTableList(newTableList);
  };

  //handle table person

  const handlePerson = (newPersonInputValue, tableId, tablesInRow) => {
    const newPerson = parseInt(newPersonInputValue);
    let newTableInfo = [];
    tablesInRow.tableInfo.forEach((Table) => {
      if (Table.TableId === tableId) {
        Table.Person = newPerson;
        newTableInfo.push(Table);
      } else {
        newTableInfo.push(Table);
      }
    });

    tablesInRow.tableInfo = newTableInfo;

    const beforeTableList = tableList.filter(
      (table) => table.Row < tablesInRow.Row
    );
    const afterTableList = tableList.filter(
      (table) => table.Row > tablesInRow.Row
    );
    let newTableList = [...beforeTableList, tablesInRow, ...afterTableList];
    setTableList(newTableList);
  };

  return (
    <div className="mt-12 ml-12">
      <div className="flex items-center">
        <h1 className="font-semibold">Table Row:</h1>

        <button
          onClick={() => {
            if (row > 0) {
              setRow(row - 1);
              deletingATable();
            }
          }}
          className="btn btn-sm bg-red-600 font-bold ml-3 border-none px-5 text-white hover:bg-red-700"
        >
          -
        </button>
        <div className="ml-3 font-semibold">{row}</div>
        <button
          onClick={() => {
            setRow(row + 1);
            addingNewTable();
          }}
          className="btn btn-sm bg-green-600 font-bold ml-3 px-5 border-none text-white hover:bg-green-700"
          // disabled={!addBtnState}
        >
          +
        </button>
        <button
          onClick={handleUploadToDb}
          disabled={!(row > 0)}
          className="btn btn-active btn-secondary ml-6"
        >
          Save
        </button>
        <button
          onClick={handleDownload}
          className="btn btn-active btn-accent ml-6"
        >
          Reload Previous Table Info
        </button>
      </div>

      {/*displaying table */}

      {tableList.map((tablesInRow, index) => (
        <div key={index} className="mt-6 w-full border border-2 p-4">
          <div className="flex items-center">
            <div>
              <label>Column No: </label>
              <input
                onChange={(e) => {
                  handleCol(e.target.value, tablesInRow);
                }}
                className="input input-bordered input-md "
                type="number"
                value={tablesInRow.col}
              />
            </div>
            <div className="ml-4 flex items-center">
              <label>Alignment:</label>
              <select
                defaultValue={tablesInRow?.alignment}
                onChange={(e) => {
                  handleAlgn(e.target.value, tablesInRow);
                }}
                className="select select-bordered ml-2 w-full max-w-xs"
              >
                <option value="start">Start</option>
                <option value="between">Between</option>
                <option value="evenly">Evenly</option>
                {/* <option value="around">Around</option> */}
                <option value="center">Center</option>
                <option value="end">End</option>
              </select>
            </div>
          </div>
          {/* //${tablesInRow.alignment} */}
          <div>
            <div className={`flex justify-${tablesInRow.alignment}`}>
              {tablesInRow?.tableInfo?.map((tableInRow, index2) => (
                <div
                  key={index2}
                  className="my-3 flex flex-col w-48 border border-1 border-zinc-300 p-3 mx-0.5"
                >
                  <button className="input input-bordered  input-md  ">
                    {tableInRow.TableId}
                  </button>

                  {/* <input
                  onChange={(e) => {
                    handleCol(e.target.value, tablesInRow);
                  }}
                  className="input input-bordered input-md  "
                  type="number"
                  value={tableInRow.TableId}
                /> */}
                  <div className="flex items-center">
                    <p className="mr-1">Capacity:</p>
                    <select
                      onChange={(e) => {
                        handlePerson(
                          e.target.value,
                          tableInRow.TableId,
                          tablesInRow
                        );
                      }}
                      className="select select-bordered mt-2 w-24"
                    >
                      <option value={"2"} defaultValue={"2"}>
                        2
                      </option>
                      <option value={"4"}>4</option>
                      <option value={"6"}>6</option>
                      <option value={"8"}>8</option>
                    </select>
                    {/* <input
                      onChange={(e) => {
                        handlePerson(
                          e.target.value,
                          tableInRow.TableId,
                          tablesInRow
                        );
                      }}
                      className="input input-bordered input-md mt-2 w-24"
                      type="number"
                      placeholder="Person Capacity"
                      defaultValue={tableInRow.Person}
                    /> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditTableInfo;
