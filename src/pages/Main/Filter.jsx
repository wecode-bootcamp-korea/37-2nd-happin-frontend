import React from "react";
import styled from "styled-components";
import { FILTER_LIST } from "./filterData.js";

const Filter = ({ handleChange, isToggle }) => {
  return (
    <FilterArea active={isToggle}>
      <FilterWrap>
        {FILTER_LIST.map(({ id, title, content }) => (
          <FilterList key={id}>
            <Title>{title}</Title>
            <CheckBoxWrap>
              {content.map(({ id, text, category, query }) => (
                <CheckBoxList key={id}>
                  <StyledInput
                    id={query}
                    name={category}
                    onClick={() => handleChange(category, query)}
                  />
                  <StyledLabel htmlFor={query}>{text}</StyledLabel>
                </CheckBoxList>
              ))}
            </CheckBoxWrap>
          </FilterList>
        ))}
      </FilterWrap>
    </FilterArea>
  );
};

export default Filter;

const FilterArea = styled.section`
  position: fixed;
  left: ${props => (props.active ? "30px" : "-260px")};
  top: 80px;
  width: 260px;
  height: 100%;
  padding-bottom: 100px;
  overflow-y: auto;
  transition: 0.5s;
`;

const FilterWrap = styled.ul`
  padding: 30px 0 0 0;
`;

const FilterList = styled.li`
  padding: 30px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.style.lightGrey};
  &:last-of-type {
    border-bottom: none;
  }
`;

const Title = styled.p`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.style.deepGrey};
`;

const CheckBoxWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;
`;

const CheckBoxList = styled.li`
  padding: 0 10px 10px 0;
`;

const StyledLabel = styled.label`
  position: relative;
  padding: 10px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.style.lightGrey};
  color: ${({ theme }) => theme.style.middleGrey};
  border-radius: 10px;
  background-color: #fff;
`;

const StyledInput = styled.input.attrs({
  type: "checkbox",
})`
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;

  &:checked + ${StyledLabel} {
    color: #fff;
    background: ${({ theme }) => theme.style.pinterRed};
    border: 1px solid ${({ theme }) => theme.style.pinterRed};
  }
`;
