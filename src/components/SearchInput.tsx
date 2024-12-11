import React, { memo } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search for a smartphone..."
        style={styles.searchInput}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const styles = {
  searchContainer: {
    width: "100%",
    marginBottom: "1rem",
    borderBottom: "1px solid black",
  },
  searchInput: {
    width: "100%",
    padding: "0.5rem 0",
    fontSize: "1.2rem",
    border: "none",
    borderBottom: "1px solid transparent",
    outline: "none",
    color: "#333",
    backgroundColor: "white",
  },
};

export default memo(SearchInput);
