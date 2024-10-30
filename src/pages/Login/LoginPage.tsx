import FormGeneric from "../../components/Form/FormGeneric";
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { Row, Col, Button, message } from 'antd';
import './LoginPage.css';
import { useState } from "react";
import * as UseCases from "../../core/use-cases/users"
import { hrApiFetcher } from "../../config/adapters/hrApiAdapter";
import { AxiosError } from "axios";

type LoginFields = {
  email: string;
  password: string;
  remember: boolean;
  confirmPassword?: string;  
};

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false); 
  const [userLogin, setUserLogin] = useState<UseCases.UserLogin>({ email: '', password: ''});

  const onFinish = async (values: LoginFields) => {
    setUserLogin({ email: values.email, password: values.password });
    
    try {
      if (isRegister) {
        await registerUsersPromise(userLogin);
        message.success('Registration successful');
        setIsRegister(false);  
      } else {
        await loginUserPromise(userLogin);
        message.success('Login successful');
      }
    } catch (error) {
      message.error('Error: ' + error.message);
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<LoginFields>) => {
    console.log('Failed:', errorInfo);
  };

  const registerUsersPromise = async (user: UseCases.UserLogin) => {
    return await UseCases.registerUserUseCase(hrApiFetcher)(user);
  };

  const loginUserPromise = async (user: UseCases.UserLogin) => {
    return await UseCases.loginUserUseCase(hrApiFetcher, user);
  };

  return (
    <Row justify="center" align="middle" className="login_container">
      <Col xs={6} sm={8} md={12} lg={18} xl={24} className="login_col">
        <h1>{isRegister ? 'Register' : 'Login'}</h1>
        <FormGeneric<LoginFields>
          fields={[
            { label: 'Email', name: 'email', type: 'text', rules: [{ required: true, message: 'Please input your email!' }] },
            { label: 'Password', name: 'password', type: 'password', rules: [{ required: true, message: 'Please input your password!' }] },
            ...(isRegister
              ? [{ label: 'Confirm Password', name: 'confirmPassword' as keyof LoginFields, type: 'password', rules: [{ required: true, message: 'Please confirm your password!' }] }]
              : []
            )
          ]}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          submitLabel={isRegister ? "Register" : "Login"}  
        />

        <Button type="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : 'Don’t have an account? Register'}
        </Button>
      </Col>
    </Row>
  );
};

export default LoginPage;
