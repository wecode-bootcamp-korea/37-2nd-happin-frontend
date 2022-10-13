import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { API, accessToken } from "../../../config";
//기본으로 저장됨 데이터가 들어와서 state에 저장
// 저장됨 생성됨을 누르면 해당 데이터를 state에 업데이트 함.

function BoardCreateModal(props) {
  const [boardName, setBoardName] = useState("");
  const makeBoard = e => {
    e.preventDefault();
    const postData = async () => {
      const response = await fetch(`${API.BOARD}`, {
        method: "POST",
        headers: {
          authorization: accessToken,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ boardName: boardName }),
      });
      return response;
    };

    postData().then(res => {
      if (res.status === 201) {
        window.location.reload();
      }
    });
  };

  const handleBoardName = e => {
    setBoardName(e.target.value);
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-90w"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          보드 생성하기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input
            type="text"
            placeholder="보드 이름 입력"
            value={boardName}
            onChange={handleBoardName}
          />
          <button onClick={makeBoard}>생성</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const Boards = ({ data }) => {
  const [modalShow, setModalShow] = React.useState(false);
  // const [boards, setBoards] = useState([...data]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("http://10.58.52.214:8000/boards", {
  //       headers: { authorization: token },
  //     });

  //     return response.json();
  //   };
  //   // fetchData().then(res => console.log(res.boards));
  // }, []);

  const deleteBoard = async e => {
    console.log(e.target.name);
    const response = await fetch(`${API.BOARD}/${e.target.name}`, {
      method: "DELETE",
      headers: { authorization: accessToken },
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <BoardContainer>
      <BoardSection>
        {data &&
          data.map(ele => {
            return (
              <Board key={ele.boardId} className="board">
                {ele.thumbnail ? (
                  <>
                    <Link to={`/my-page/${ele.boardId}`}>
                      <img src={ele.thumbnail} alt={ele.boardName} />
                    </Link>
                    <div>
                      <span>{ele.boardName}</span>
                      <span>
                        <button name={ele.boardId} onClick={deleteBoard}>
                          삭제
                        </button>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to={`/my-page/${ele.boardId}`}>
                      <img
                        src="https://images.unsplash.com/photo-1593341832681-6cb2ce1ed053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1536&q=80"
                        alt="이미지없음"
                      />
                    </Link>
                    <div>
                      <span>{ele.boardName}</span>
                      <span>
                        <button name={ele.boardId} onClick={deleteBoard}>
                          삭제
                        </button>
                      </span>
                    </div>
                  </>
                )}
              </Board>
            );
          })}

        <div className="modalBtn">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            보드 추가
          </Button>

          <BoardCreateModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            dialogClassName="modal-90w"
          />
        </div>
      </BoardSection>
    </BoardContainer>
  );
};

const Board = styled.div`
  div {
    display: flex;
    justify-content: space-between;
  }
`;

const BoardSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 20px;
  border-bottom: 1px solid black;

  .modalBtn {
    position: absolute;
    top: -40px;
    right: 0px;
    width: 100px;
  }

  .board {
    width: 236px;
    height: 157px;
    flex: auto;
    margin: 10px 10px 20px 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;

export default Boards;
