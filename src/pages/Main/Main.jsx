import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import Masonry from "react-responsive-masonry";
import PinList from "./PinList";
import Filter from "./Filter";
import styled from "styled-components";
import LoadingImage from "../../assets/images/loading.gif";
//const API_KEY = process.env.UNSPLASH_API_KEY;

const Main = () => {
  const [pins, setPins] = useState([]);
  const [page, setPage] = useState(0); //스크롤이 닿았을 때 새롭게 데이터 페이지를 바꿀 state
  //console.log("offset 현재 값:", page);
  const [boardName, setBoardName] = useState([]);
  //console.log(boardName);
  const [isLoading, setIsLoading] = useState(false); //로딩 성공, 실패를 담을 state
  // console.log(isLoading);
  const [isToggle, setIsToggle] = useState(true);
  //console.log(isToggle);
  const [searchParams, setSearchParams] = useSearchParams({});
  const params = new URLSearchParams(searchParams);
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.search.slice(1);
  //const search = location.state;
  //const { state } = useLocation();
  //console.log("필터 url:", query);
  //console.log("검색어 url:", location.state);
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImlhdCI6MTY2NTM2OTA0NX0.3mKfvlwRu0j8xP1lWAAYzDWSnmFPAt3ayw2Q5p9MoIE"
  );

  const handleChange = (name, value) => {
    const values = params.getAll(name);
    //console.log(`필터 값: ${value}`);
    if (values.includes(value)) {
      removeValue(values, name, value);
    } else {
      params.append(name, value);
    }
    return setSearchParams(params);
  };

  const removeValue = (values, key, removeValue) => {
    //console.log("중복값 지우기");
    params.delete(key);
    values.forEach(value => {
      if (value !== removeValue) {
        params.append(key, value);
      }
    });
  };

  const showFilter = () => {
    setIsToggle(!isToggle);
    //console.log("되나연");
  };

  const pageEnd = useRef();

  useEffect(() => {
    //새로고침 시 초기화
    setSearchParams("");
  }, []);

  useEffect(() => {
    fetch(`http://43.201.98.87:8000/main`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(data => setBoardName(data.boards));
  }, [searchParams]);

  useEffect(() => {
    //쿼리문을 통한 API받기
    fetch(`http://43.201.98.87:8000/main?${query}&offset=${page}&limit=20`, {
      //`http://10.58.52.112:8000/main?${query}&offset=${page}&limit=20`
      //`http://localhost:3000/main?${query}&offset=${page}&limit=20`
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(data => {
        setPins(data.pins);
      });
  }, [query]);

  const fetchPins = async page => {
    const res = await fetch(
      `http://43.201.98.87:8000/main?offset=${page}&limit=20`,
      //`https://api.unsplash.com/photos/?client_id=${API_KEY}&page=${page}&per_page=10`, // mockdata용
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      setPins(prev => [...prev, ...data.pins]);
      setIsLoading(true);
      //console.log(data);
    } else {
      navigate(`/interest`);
    }
  };

  useEffect(() => {
    fetchPins(page);
  }, [page]); //페이지 넘버가 바뀔때마다 데이터를 불러와야 하니까 배열 값으로 page 넣음.

  useEffect(() => {
    if (isLoading) {
      //로딩되었을 때만 실행
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      //옵져버 탐색 시작
      observer.observe(pageEnd.current);
    }
  }, [isLoading]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <MainLayout>
      <Toggle active={isToggle} onClick={showFilter}>
        {isToggle ? "접기" : "펴기"}
      </Toggle>
      <Filter isToggle={isToggle} handleChange={handleChange} />
      <PinWrap active={isToggle}>
        <Masonry columnsCount={4} gutter="20px">
          {pins.map((photo, index) => (
            <PinList key={index} photo={photo} boardName={boardName} />
          ))}
        </Masonry>
        <Loading ref={pageEnd} />
      </PinWrap>
    </MainLayout>
  );
};

export default Main;

const Toggle = styled.button`
  position: fixed;
  top: 80px;
  left: ${props => (props.active ? "230px" : "30px")};
  height: 40px;
  padding: 20px 0 0 25px;
  background: #fff url(/images/filter.png) no-repeat left 20px;
  background-size: 18px 18px;
  border: none;
  text-align: left;
  transition: 0.5s;
  z-index: 2;
`;

const MainLayout = styled.div`
  display: flex;
  width: 100%;
  padding: 0 30px;
`;

const PinWrap = styled.section`
  width: 100%;
  padding-top: 100px;
  padding-left: ${props => (props.active ? "300px" : "70px")};
  transition: 0.5s;
`;

const Loading = styled.div`
  width: 90%;
  height: 50px;
  background: url(${LoadingImage}) no-repeat center;
  background-size: 100px;
  margin: 20px 0;
`;
