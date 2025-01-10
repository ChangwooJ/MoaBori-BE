# 사이드 프로젝트: 자취생 소비 분석 서비스 (MoaBori)

## 프로젝트 소개
  * 자취생의 소비내역을 분석하고 이를 통해 자취생에게 다양하고 유용한 정보를 제공하고 제안하는 서비스입니다.

<br>

## 프로젝트 계획서
  * https://docs.google.com/document/d/1iJtKregnoIj0L4APVrQaUvZpUXoncTuwQAjRWuhBF3U/edit?tab=t.0#heading=h.af80tl7prv5v

<br>

## 개발 기간
  * 2025.01.10 ~

<br>

## 기술 스택
### FE
  * <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  * ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
  * ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  * ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
  * ![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)


  <br>

### BE
  * <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  * <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>
  * <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>
  * [![axios](https://img.shields.io/badge/axios-^1.4.0-blue)](https://axios-http.com)


<br>


## 패키지 구조

```
project-root/
└── backend/
    ├── config/
    |   └── db.js               # db연결정보
    ├── models/
    |   └── userModel.js        # mongoose DB 모델
    ├── controllers/
    |   └── userController.js   # 컨트롤러러
    ├── router/
    |   └── userRoutes.js       # 라우트 파일
    └── server.js                # 서버 시작 파일
```

<br>

## ERD

```mermaid
erDiagram
    USER {
        INT _id
        STRING name
        STRING email
        STRING password
    }