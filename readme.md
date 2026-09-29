npm init
npm install zod
npm install express
npm install --save-dev @types/express
npm install --save-dev prisma
npm install winston
npm install bcrypt
npm install --save-dev @types/bcrypt
npm install uuid 
npm install --save-dev @types/uuid
npm install --save-dev jest @types/jest
npm install --save-dev babel-jest @babel/preset-env --legacy-peer-deps

setup babel di https://babeljs.io/setup#jest

npm install --save-dev @babel/preset-typescript --legacy-peer-deps

setup typescript via babel di https://jestjs.io/docs/getting-started#using-typescript

npm install --save-dev @jest/globals --legacy-peer-deps
npm install --save-dev supertest @types/supertest --legacy-peer-deps
npm install --save-dev typescript --legacy-peer-deps

setup typescript project
npx tsc --init

ubah "module" menjadi commonjs
ubah "moduleResolution" menjadi Node
tambahkan include src/**/*
ubah outDir menjadi "./dist"