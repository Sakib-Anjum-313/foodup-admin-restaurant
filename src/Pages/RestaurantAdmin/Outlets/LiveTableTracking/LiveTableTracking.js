import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import './LivetableTracking.css';

const LiveTableTracking = () => {
  const { user } = useContext(AuthContext);
  const [tableInformation, setTableInformation] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/restaurantAdmin/allTableInfo/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTableInformation(data);
        console.log(data);
      });
  }, [user?.email]);

  const handleDisable = () => {};
  const handleAvailable = () => {};

  return (
    <div className="flex justify-center mt-12 border border-2 ">
      <div className=" shadow-xl border border-2 w-11/12 h-fit p-4">
        <div className="flex flex-col">
          {tableInformation?.Tables?.map((tablesInRow, index1) => (
            <div
              className={`p-4 border border-2 flex justify-${tablesInRow.alignment}`}
              key={index1}
            >
              {tablesInRow.tableInfo.map((table, index2) => (
                <div>
                  <div className={`dropdown dropdown-bottom `}>
                    <label
                      tabIndex={0}
                      className={`btn table-${table.Person} ${
                        table.Availability === "Available" &&
                        `border-none mx-1 bg-lime-300 text-lime-700 hover:bg-lime-400 `
                      }  ${
                        table.Availability === "Booked" &&
                        `border-none mx-1 bg-red-300 text-red-800 hover:bg-red-400`
                      } ${
                        table.Availability === "Disable" &&
                        `border-none mx-1 bg-gray-300 text-gray-800 hover:bg-gray-400 `
                      }`}
                    >
                      {`${table.TableId}__${table.Person}P`}
                    </label>
                    <ul
                      tabIndex={0}
                      className={`dropdown-content menu  shadow rounded-box bg-slate-100 w-52 `}
                    >
                      <li>
                        <button onClick={handleAvailable}>Available</button>
                      </li>
                      <li>
                        <button onClick={handleDisable}>Disable</button>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTableTracking;
