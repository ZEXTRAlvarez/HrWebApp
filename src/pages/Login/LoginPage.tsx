import { Suspense, lazy } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Login = lazy(() => import("../../features/loginFeature/Login"));

const LoginPage = () => {
  return (
    <Suspense fallback={<LoadingOutlined />}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
