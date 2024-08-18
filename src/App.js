import React from 'react';


import { Search } from './components/Search';
import { Table } from './components/Table';
import { Modal } from './components/Modal';

function App() {
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'none' });
  const [selectedUser, setSelectedUser] = React.useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`);
      const data = await response.json();
      setUsers(data.users);
      console.log(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'none';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = () => {
    let sortableUsers = [...users];
    if (sortConfig.key && sortConfig.direction !== 'none') {
      sortableUsers.sort((a, b) => {
        const aKey = getKey(a, sortConfig.key);
        const bKey = getKey(b, sortConfig.key);
        if (aKey < bKey) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aKey > bKey) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  };

  const getKey = (obj, key) => {
    return key.split('.').reduce((o, k) => (o && o[k] ? o[k] : ''), obj);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="App">
      <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      <Table
        users={sortedUsers()}
        handleSort={handleSort}
        sortConfig={sortConfig}
        onClickUser={handleUserClick}
      />
      {selectedUser && <Modal user={selectedUser} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
