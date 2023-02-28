import React, { useState, useEffect } from "react";
import data from './data.json';
/*
fetch('https://api.example.com/users', {
  headers: {
    'Authorization': 'Bearer ' + authToken,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error(error);
});*/

const MatrixDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showOffline, setShowOffline] = useState(true);
  const [showOnline, setShowOnline] = useState(true);

  useEffect(() => {
    setUsers(data);
  }, []);

  const renderMatrix = () => {
    
    const matrix = [];
    
    const getBgColor = (offline,temporarilyOffline) => {
      if (temporarilyOffline === true) {
        return 'yellow';
      } else if (offline === false) {
        return 'green';
      } else {
        return 'red';
      }
      }
    for (let i = 0; i < 26; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        const userIndex = i * 5 + j;
        
        if (data[userIndex]) {
          row.push(<td style={{
            backgroundColor: getBgColor(
              data[userIndex].offline,
              data[userIndex].temporarilyOffline
            ),
          }} key={userIndex}>{data[userIndex].displayName}</td>);
        } else {
          row.push(<td key={userIndex}></td>);
        }
      }
      matrix.push(<tr key={i}>{row}</tr>);
    }
    return matrix;
  };

  return (
    <>
    <h4 >Jenkins Server-Health</h4>
        <label className="custom-checkbox" >
        <input  type="checkbox"  checked={showOffline} onChange={() => setShowOffline(!showOffline)} />
        offline
        </label>
        <label className="custom-checkbox">
        <input type="checkbox" checked={showOnline} onChange={() => setShowOnline(!showOnline)} />
        online
        </label>
         <table className="user-table" >
  <thead>
    <tr>
      <th>Nodes</th>
    </tr>
  </thead>
  <tbody>
    {users.map(data => {
      if ((data.offline === true && showOffline) || (data.offline === false && showOnline)) {
        return (
          <tr key={data.displayName}>
            <td className="user-table">{data.displayName}</td>
          </tr>
        );
      } else {
        return null;
      }
    })}
  </tbody>
</table>
    <div className="container">
      <table className="status-table">
        <tbody>{renderMatrix()}</tbody>
      </table>
    </div>
    </>
  );
};

export default MatrixDashboard;
