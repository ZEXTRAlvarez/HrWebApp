import FormGeneric from "../../components/Form/FormGeneric";
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { Row, Col, Button, message } from 'antd';
import './Login.css';
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useAuthStore } from "../../zustand/store";
import { useNavigate } from "react-router";
import { loginUserPromise, registerUsersPromise } from "./service";

type LoginFields = {
    email: string;
    password: string;
    remember: boolean;
    confirmPassword?: string;  
};


const Login = () => {
    const [isRegister, setIsRegister] = useState<boolean>(false); 
  const setToken = useAuthStore((state) => state.setToken);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [navigate, token]);

  const onFinish = async (values: LoginFields) => {    
    try {
      if (isRegister) {
        await registerUsersPromise(values);
        message.success('Registration successful');
        setIsRegister(false);  
      } else {
        await loginUserPromise(values, setToken);
        message.success('Login successful');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error('Error: ' + error.message);
      } else {
        message.error('An unknown error occurred');
      }
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<LoginFields>) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row justify="center" align="middle" className="login_container">
      <Col xs={6} sm={8} md={12} lg={18} xl={24} className="login_col">
        <h1>{isRegister ? 'Register' : 'Login'}</h1>
        <FormGeneric<LoginFields>
          fields={[
            { label: 'Email', name: 'email', type: 'text' as const, rules: [{ required: true, message: 'Please input your email!' }] },
            { label: 'Password', name: 'password', type: 'password' as const, rules: [{ required: true, message: 'Please input your password!' }] },
            ...(isRegister
              ? [{ label: 'Confirm Password', name: 'confirmPassword' as keyof LoginFields, type: 'password' as const, rules: [{ required: true, message: 'Please confirm your password!' }] }]
              : []
            )
          ]}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          submitLabel={isRegister ? "Register" : "Login"}  
        />
        <Row justify="center" align="middle" className="login_row">
            <Button type="link" onClick={() => setIsRegister(!isRegister)} className="btnLogin">
              {isRegister ? 'Already have an account? Login' : 'Don’t have an account? Register'}
            </Button>
        </Row>
      </Col>
    </Row>
  )
}

export default Login
