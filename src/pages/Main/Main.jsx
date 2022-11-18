import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import Masonry from "react-responsive-masonry";
import PinList from "./PinList";
import Filter from "./Filter";
import styled from "styled-components";
import LoadingImage from "../../assets/images/loading.gif";
import { API, accessToken } from "../../config";
const Main = () => {
  const [pins, setPins] = useState([]);
  const [page, setPage] = useState(0);
  const [boardName, setBoardName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isToggle, setIsToggle] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({});

  const params = new URLSearchParams(searchParams);
  const location = useLocation();
  const navigate = useNavigate();
  const pageEnd = useRef();
  const query = location.search.slice(1);

  const handleChange = (name, value) => {
    const values = params.getAll(name);

    if (values.includes(value)) {
      removeValue(values, name, value);
    } else {
      params.append(name, value);
    }
    return setSearchParams(params);
  };

  const removeValue = (values, key, removeValue) => {
    params.delete(key);
    values.forEach(value => {
      if (value !== removeValue) {
        params.append(key, value);
      }
    });
  };

  const showFilter = () => {
    setIsToggle(!isToggle);
  };

  useEffect(() => {
    setSearchParams("");
  }, []);

  useEffect(() => {
    fetch(`${API.MAIN}`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: accessToken,
      },
    })
      .then(res => res.json())
      .then(data => setBoardName(data.boards));
  }, [searchParams]);

  useEffect(() => {
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

  const fetchPins = async page => {
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
    fetchPins(page);
  }, [page]);

  useEffect(() => {
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
