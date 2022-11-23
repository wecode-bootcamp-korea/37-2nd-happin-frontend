import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchValue = e => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/main?search=${searchValue}`);
  };

  const resetSearchValue = e => {
    e.preventDefault();
    navigate(`/main`);
    setSearchValue("");
  };

  return (
    <SearchArea onSubmit={handleSubmit}>
      <SearchBox onChange={handleSearchValue} value={searchValue} />
      <SearchResetButton onClick={resetSearchValue}>초기화</SearchResetButton>
    </SearchArea>
  );
};

export default Search;

const SearchArea = styled.form`
  position: relative;
  width: calc(100% - 270px);
  margin: 0 0 0 10px;
`;

const SearchBox = styled.input.attrs({ placeholder: "검색" })`
  width: 100%;
  padding: 10px 20px 10px 45px;
  border: none;
  font-size: 16px;
  background-color: #e9e9e9;
  background-image: url(/images/search_icon.svg);
  background-repeat: no-repeat;
  background-position: 20px center;
  background-size: 15px 15px;
  border-radius: 20px;

  &::placehoder {
    color: ${({ theme }) => theme.style.deepGrey};
  }

  &:focus {
    padding-left: 20px;
    background-image: none;
  }
`;

const SearchResetButton = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  font-size: 0;
  background: url(/images/delete.png) no-repeat center;
  background-size: 100% auto;
  cursor: pointer;
`;
