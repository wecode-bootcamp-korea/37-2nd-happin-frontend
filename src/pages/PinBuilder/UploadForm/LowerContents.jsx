import React from "react";
import styled from "styled-components";
import InputEmoji from "react-input-emoji";

const LowerContents = ({
  submitPin,
  setSubmitPin,
  imageSrc,
  setImageSrc,
  userData,
  interests,
  selectInt,
  setSelectInt,
}) => {
  const countCheckbox = e => {
    if (e.target.checked) {
      if (selectInt.length === 3) {
        alert("3개까지");
        e.target.checked = false;
        return;
      }

      selectInt.length < 3 && setSelectInt(prev => [...prev, e.target.id]);
    } else if (!e.target.checked) {
      let copy = selectInt;
      copy.splice(copy.indexOf(e.target.id), 1);
      setSelectInt(copy);
    }
  };
  const handleTitle = e => {
    if (e.target.name === "titleInput") {
      setSubmitPin(prev => ({ ...prev, title: e.target.value }));
    }
  };

  const handleDes = e => {
    setSubmitPin(prev => ({ ...prev, description: e }));
  };

  const handleImg = fileBlob => {
    setSubmitPin(prev => ({ ...prev, uploadingImg: fileBlob.target.files[0] }));

    const reader = new FileReader();
    reader.readAsDataURL(fileBlob.target.files[0]);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  };

  return (
    <LowerContent>
      <ImgBox>
        <input type="file" onChange={handleImg} />
        <PreviewBox>
          {imageSrc ? (
            <img src={imageSrc} alt="preview-img" />
          ) : (
            <div>업로드를 위해 사진을 끌어올려주세요</div>
          )}
        </PreviewBox>
      </ImgBox>
      <TextBox>
        <InputBox>
          <input
            name="titleInput"
            placeholder="제목추가"
            type="text"
            value={submitPin.title}
            onChange={handleTitle}
          />
        </InputBox>
        <ProfileDiv>
          <img
            src={
              Object.keys(userData).length !== 0 ? userData.profileImage : "#"
            }
            alt="Profile"
          />
          <span>{Object.keys(userData).length !== 0 && userData.userName}</span>
        </ProfileDiv>
        <InputBox>
          <InputEmoji
            value={submitPin.description}
            onChange={handleDes}
            placeholder="사람들에게 회원님의 핀에 대해 설명해보세요"
            borderRadius={0}
            borderColor="white"
          />
        </InputBox>
        <InterestsWrapper>
          {interests.map((ele, i) => {
            return (
              <InterestsCheckbox key={i}>
                <CheckBox
                  type="checkbox"
                  name={ele.interest}
                  id={ele.interestId}
                  onClick={countCheckbox}
                />
                <Label htmlFor={ele.interestId}>{ele.interest}</Label>
              </InterestsCheckbox>
            );
          })}
        </InterestsWrapper>
      </TextBox>
    </LowerContent>
  );
};

const InterestsWrapper = styled.div`
  ${props => props.theme.variables.flex("", "flex-start", "")}
  flex-flow: wrap;
`;

const Label = styled.label`
  padding: 10px;
  border-radius: 20px;
  background-color: lightgray;

  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const CheckBox = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;

  &:checked + ${Label} {
    border-radius: 20px;
    background-color: red;
    color: white;
  }
`;

const InterestsCheckbox = styled.div`
  flex-basis: 25%;
  margin-top: 30px;
`;

const ProfileDiv = styled.div`
  width: 380px;
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    border-radius: 50%;
    background-color: white;
  }
`;

const LowerContent = styled.div`
  ${props => props.theme.variables.flex("", "space-between", "center")}
`;

const InputBox = styled.div`
  margin: 30px 0;
  border-bottom: 1px solid black;

  .react-input-emoji--container {
    margin: 0;
  }

  input {
    width: 100%;
    height: 50px;
    border: 0px;
    font-size: 15px;
  }
`;

const TextBox = styled.div`
  width: 420px;
  height: 500px;
  padding: 0px 20px;
`;

const PreviewBox = styled.div`
  position: absolute;
  ${props => props.theme.variables.flex()}
  width: 350px;
  height: 490px;
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ImgBox = styled.div`
  position: relative;
  width: 380px;
  height: 500px;
  ${props => props.theme.variables.flex()}
  padding: 0px 20px;
  background-color: ${props => props.theme.style.lightGrey};
  border-radius: 10px;

  input {
    width: 350px;
    height: 490px;
    font-size: 15px;
    border: 1px dashed gray;
    padding: 100px;
    z-index: 1;
    opacity: 0;
    border-radius: 10px;
    background-color: ${props => props.theme.style.lightGrey};
    cursor: pointer;
  }
`;

export default LowerContents;
