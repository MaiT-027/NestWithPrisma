## NestJS를 사용한 실습 프로젝트

해당 프로젝트는 NestJS와 Prisma 연동 시험을 위한 프로젝트입니다.

테스트를 진행하기 위해서, 로컬에 MySQL을 설치해주시고, 원하시는 포트에 DB 인스턴스를 열어주십시오.
해당 DB 인스턴스 안에 test라는 이름의 DB, 그 안에 test라는 Table을 만들어주십시오.
.env 파일에 Prisma 규칙을 적용한 환경변수 DATABASE_URL을 작성해주시면 됩니다.
그 후, yarn / yarn prisma db push / yarn prisma generate / yarn run test:watch 순으로 실행하시면 됩니다.

해당 프로젝트는 더미데이터를 Prisma를 사용하여 CRUD해 보는 간단한 프로젝트입니다.
CRUD 자체보다 테스트 코드에 신경을 더 많이 썼으니 그 쪽을 참고해주십시오.
테스트는 AppController와 E2E 이외에는 없습니다.
