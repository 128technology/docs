import React from 'react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    window.location.href = `https://www.juniper.net/search/cps/?source=tech_docs&keyword=${encodeURIComponent(
      searchTerm,
    )}`;
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Documentation"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </form>
  );
}