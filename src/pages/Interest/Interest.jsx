import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API } from "../../config";
import InterestBackgroundImg from "../../assets/images/background05.jpg";
import HelloImg from "../../assets/images/hello.gif";

const IntereststModal = () => {
  const accessToken = localStorage.getItem("token");
  const [interests, setInterests] = useState([]);
  const [selectedInterestList, setSelectedInterestList] = useState([]);
  const navigate = useNavigate();

  const getInterests = async function () {
    let response = await axios({
      method: "GET",
      url: `${API.GET_INTEREST}`,
    });
    if (response.status === 200) {
      setInterests(response.data);
    } else {
      throw new Error("자료를 받아오지 못했습니다");
    }
  };

  useEffect(() => {
    getInterests();
  }, []);

  const isdisabled = selectedInterestList.length === 0;

  const onSelectedInterest = (checked, interest) => {
    if (checked) {
      if (selectedInterestList.length === 3)
        return alert("최대 3개까지 선택할 수 있습니다");
      setSelectedInterestList([...selectedInterestList, interest]);
    } else if (!checked) {
      setSelectedInterestList(
        selectedInterestList.filter(ele => ele !== interest)
      );
    }
  };

  function postInterstInfo() {
    axios
      .post(
        `${API.POST_INTEREST}`,
        { interest: selectedInterestList },
        {
          headers: {
            Authorization: accessToken,
          },
        }
        //console.log(response)
      )
      .then(() => navigate(`/main`));
  }

  return (
    <InterestBackground>
      <InterestsOverlay>
        <InterestWrapper>
          <Title>
            반갑습니다! 핀추천 등의 맞춤 서비스를 위해 정보를 받고있습니다.
          </Title>
          <Des>정보를 받고 싶은 관심사를 3개까지만 골라주세요!</Des>
          <InterestDes>
            <InterestList>
              {interests &&
                interests.map(obj => {
                  return (
                    <div key={obj.id}>
                      <InterestItem
                        type="checkbox"
                        value={obj.interest}
                        id={obj.interest}
                        onChange={e =>
                          onSelectedInterest(e.target.checked, e.target.value)
                        }
                        checked={
                          selectedInterestList.includes(obj.interest)
                            ? true
                            : false
                        }
                      />
                      <InterestName htmlFor={obj.interest}>
                        <span> {obj.interest} </span>
                      </InterestName>
                    </div>
                  );
                })}
              <InterestBtn
                type="button"
                disabled={isdisabled}
                onClick={postInterstInfo}
              >
                선택
              </InterestBtn>
            </InterestList>
            <Hello src={HelloImg} alt="안녕하세요" />
          </InterestDes>
        </InterestWrapper>
      </InterestsOverlay>
    </InterestBackground>
  );
};

const InterestBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100vh;
  width: 100vw;
  background-image: url(${InterestBackgroundImg});
  background-size: cover;
`;

const InterestsOverlay = styled.div`
  ${props => props.theme.variables.flex("column", "center", "center")};
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
`;

const InterestWrapper = styled.div`
  /* display: flex; */
  padding: 80px 55px;
  background-color: ${props => props.theme.style.backgroundWhite};
  border-radius: 10px;
  text-align: center;
  position: relative;
`;

const InterestDes = styled.div`
  ${props => props.theme.variables.flex("row", "", "center")};
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: ${props => props.theme.style.fontWeightSemibold};
`;

const Des = styled.span`
  font-size: ${props => props.theme.style.fontSizeLg};
`;

const InterestList = styled.form`
  display: grid;
  grid-template-columns: 250px 250px;
  justify-content: center;
  margin: 20px;
  font-size: 17px;
`;

const InterestName = styled.label`
  width: 230px;
  padding: 20px 30px;
  margin: 10px;
  background-color: ${props => props.theme.style.hoverGrey};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.style.middleGrey};
    color: white;
  }
`;

const InterestItem = styled.input`
  display: none;

  &:checked + ${InterestName} {
    background: ${props => props.theme.style.pinterRed};
    color: white;
  }
`;

const InterestBtn = styled.button`
  width: 480px;
  margin-left: 10px;
  padding: 1em 0;
  border-style: none;
  background-color: ${props => props.theme.style.black};
  color: white;
  font-size: 20px;
`;

const Hello = styled.img`
  margin-top: 70px;
  height: 400px;
`;
export default IntereststModal;
