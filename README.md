# 2차 프로젝트 37-2nd-HAPPIN
<img src="https://user-images.githubusercontent.com/67556491/196029607-e09eb2dc-80c7-404b-99f1-03f4cebf54ae.jpeg" alt="happin" width="200" height="200"/>


## 팀원

- 프론트엔드: 이유진, 안수진, 조재현 
- 백엔드: 조경찬, 김응수 

## 프로젝트명

- ### Happin

## Happin **프로젝트 Front-end소개**

- Pinterest **이미지 공유 SNS**를 참고하여 프로젝트를 진행했습니다.
- 첫번째 보다 더 적은 기간이 주어졌기에 최대한 **기간 내에 구현할 수 있는 기능들을 위주**로 진행했습니다.
- 개발은 초기 세팅부터 전부 직접 구현했으며, 시연영상에서 보이는 부분은 모두 백앤드와 연결하여 실제 사용할 수 있는 서비스 수준으로 개발한 것입니다.

### **개발 인원 및 기간**

- 개발기간 : 2022.10. 04 - 2022.10.13(2주)
- 개발 인원 : 프론트엔드 3명, 백엔드 2명
- [백엔드 github링크](https://github.com/wecode-bootcamp-korea/37-2nd-happin-backend)

### **프로젝트 선정이유**

- 이미지를 업로드하고 마음에 드는 것을 저장하고 삭제하는 등의 CRUD를 이용한 기능구현 뿐만 아니라 외부 라이브러리를 적극 활용해보기 좋은 사이트였기에 핀터레스트를 선택했습니다.

### 사이트 이미지
- [시연영상 보러가기](https://youtu.be/MCibh9Fkcoo)

- #### 소셜 로그인
<img width="663" alt="소셜로그인" src="https://user-images.githubusercontent.com/67556491/196030918-757fb293-64df-4ef2-bafc-c8ac60bb1ac7.png">

- #### 관심사 선택
<img width="663" alt="관심사선택 " src="https://user-images.githubusercontent.com/67556491/196030933-6ccb214e-6c4c-4ccc-abd9-1e5022550ee5.png">

- #### 메인
<img width="663" alt="main" src="https://user-images.githubusercontent.com/67556491/196030912-98de66f2-ece5-400e-93df-0b4d3796f65b.png">

- #### 상세
<img width="663" alt="상세" src="https://user-images.githubusercontent.com/67556491/196031436-7bd56e32-f867-4acf-8a48-64d1dc0cfbeb.png">

- #### 핀생성
<img width="663" alt="핀생성" src="https://user-images.githubusercontent.com/67556491/196030954-80ecdf12-7f18-4ba4-a513-c29ca221037f.png">

- #### 마이페이지 - 저장됨
<img width="663" alt="마이페이지_저장됨" src="https://user-images.githubusercontent.com/67556491/196031439-99a06935-a729-4a53-9bc1-c3ca7dad69a3.png">

- #### 마이페이지 - 생성됨
<img width="900" alt="마이페이지_생성됨" src="https://user-images.githubusercontent.com/67556491/196031443-02108f32-ab58-4a65-824e-5a4453c8bc56.png">



## **적용 기술 및 구현 기능**


### **적용 기술**

> Front-End : React.js, styled-components, RESTful API

### **구현 기능**
#### Nav
- 검색기능 구현

#### 로그인, 회원가입
- 카카오 API로 진행

#### 관심사 페이지 
- 사용자가 회원가입 완료 후 관심사 필수 3개  선택하도록 기능 구현

#### 메인 페이지
- 무한스크롤 
- 다중 필터
- 핀 저장 기능 구현 

#### 상세 페이지
- 핀 이미지 및 정보 노출
- 작성자 프로필, 이름, 이메일 노출
- 핀 저장 기능 구현
- 이미지 링크 복사 기능 구현 
- 이미지 다운로드 기능 구현

#### 핀 생성 페이지
- api호출(유저 정보 가져오기)
- Formdata를 이용한 백엔드로의 이미지 업로드
- 이미지 파일 string data로 인코딩하여 미리보기 구현
- 관심사 선택하여 이미지에 대한 정보 추가
- 원하는 폴더에 생성한 이미지 저장 가능하도록 구현

#### 마이페이지 - 저장됨
- 다른 사람의 핀이 저장되는 곳
- 보드 추가 및 삭제 기능 구현
- 보드 대표 썸네일 노출 되도록 구현
- 보드 선택 시 보드에 담긴 핀들을 볼 수 있도록 기능 구현

#### 마이페이지 - 생성됨
- 내가 생성한 핀이 저장되는 곳
- 핀 저장 및 삭제 기능 구현

## **Reference**

- 이 프로젝트는 핀터레스트(https://www.pinterest.co.kr/)를 참고하여 제작하였습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진은 언스플래쉬(https://unsplash.com/) 소유이므로 무단 사용 시 문제가 될 수 있습니다.



