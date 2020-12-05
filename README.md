# RecipesFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

- Run `ng serve` or `npm start` for a dev server without admin functions.
- If admin functions needed run `ng serve --configuration admin` or `npm run start:admin`.  
- Navigate to `http://localhost:4200/`. 

## Configuration

1. Add `environment.ts`, `environment.admin.ts` and `environment.prod.ts` files to `src/environments` folder.
2. Fill `configuration.ts` like this:  
```typescript
    export const environment = {  
        production: false,
        isAdminApp: false,  
        apiUrl: 'http://localhost:3001'  
    };
```
3. Fill `environment.admin.ts` like this:
```typescript
    export const environment = {  
        production: false,
        isAdminApp: true,  
        apiUrl: 'http://localhost:3001'
    };
```
4. Fill `environment.prod.ts` like this:
```typescript
    export const environment = {  
        production: true,
        isAdminApp: false,  
        apiUrl: 'your api production url'
    };
```
