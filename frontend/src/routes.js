
import NotFound from './NotFound.js';
import RegisterForm from './AuthenticationForms/Register.js';
import LoginForm from './AuthenticationForms/Login.js';

export const routes=[
    {
        path:"/",
        element:
        <div>
          <RegisterForm />
        </div>
      },
    {
      path:"/register",
      element:
      <div>
        
        <RegisterForm />
      </div>
    },
    {
      path:"/login",
      element:
      <div>
        <LoginForm />
      </div>
    },
    {     path:"*",
          element:
          <div>
            <NotFound />
          </div>
    }
  ]