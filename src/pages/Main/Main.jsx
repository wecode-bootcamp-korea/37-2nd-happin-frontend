import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import Masonry from "react-responsive-masonry";
import PinList from "./PinList";
import Filter from "./Filter";
import styled from "styled-components";
import LoadingImage from "../../assets/images/loading.gif";
import { API, accessToken } from "../../config";

const Main = () => {
  const [pins, setPins] = useState([]); // pin 정보
  const [page, setPage] = useState(0); // page count
  const [boardName, setBoardName] = useState([]); // board 정보
  const [isLoading, setIsLoading] = useState(false); // 무한 스크롤
  const [isToggle, setIsToggle] = useState(true); // 필터 토글
  const [searchParams, setSearchParams] = useSearchParams({}); // 쿼리스트링

  const params = new URLSearchParams(searchParams);
  const location = useLocation();
  const navigate = useNavigate();
  const pageEnd = useRef();
  const query = location.search.slice(1);

  const loadMore = () => {
    // page 증가 함수
    setPage(prev => prev + 1);
  };

  const showFilter = () => {
    // 필터 토글 함수
    setIsToggle(!isToggle);
  };

  const handleQueryString = (name, value) => {
    //url에 팔터 쿼리스트링으로 올리는 함수
    const values = params.getAll(name);

    if (values.includes(value)) {
      removeValue(values, name, value);
    } else {
      params.append(name, value);
    }
    return setSearchParams(params);
  };

  const removeValue = (values, key, removeValue) => {
    //url에 팔터 쿼리스트링 삭제하는 함수
    params.delete(key);
    values.forEach(value => {
      if (value !== removeValue) {
        params.append(key, value);
      }
    });
  };

  useEffect(() => {
    // 각각의 핀에 해당하는 보드 정보 가져옴
    fetch(`${API.MAIN}`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: accessToken,
      },
    })
      .then(res => res.json())
      .then(data => setBoardName(data.boards));
  }, []);

  useEffect(() => {
    // 쿼리스트링으로 올라간 필터에 맞는 핀들 보여줌
    fetch(`${API.MAIN}?${query}&offset=${page}&limit=20`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: accessToken,
      },
    })
      .then(res => res.json())
      .then(data => {
        setPins(data.pins);
      });
  }, [query]);

  useEffect(() => {
    // 무한 스크롤 구현, 정해진 타켓에 도달하면 page가 증가하면서 핀들을 불러옴
    if (isLoading) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [isLoading]);

  const fetchPins = async page => {
    // 처음 메인 진입시 핀 정보 GET
    const res = await fetch(`${API.MAIN}?offset=${page}&limit=20`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: accessToken,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      setPins(prev => [...prev, ...data.pins]);
      setIsLoading(true);
    } else {
      navigate(`/interest`);
    }
  };

  useEffect(() => {
    // GET
    fetchPins(page);
  }, [page]);

  useEffect(() => {
    // 새로고침 시 쿼리스트링 초기화
    setSearchParams("");
  }, []);

  return (
    <MainLayout>
      <Toggle active={isToggle} onClick={showFilter}>
        {isToggle ? "접기" : "펴기"}
      </Toggle>
      <Filter isToggle={isToggle} handleQueryString={handleQueryString} />
      <PinWrap active={isToggle}>
        <Masonry columnsCount={4} gutter="20px">
          {pins &&
            pins.map((photo, index) => (
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
