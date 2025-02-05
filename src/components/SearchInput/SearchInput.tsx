import React, { memo } from "react";

import styles from "./SearchInput.module.css";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search for a smartphone..."
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(SearchInput);
