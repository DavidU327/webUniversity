import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { SendEmail } from './components/SendEmail';
import { ResetPassword } from './components/ResetPassword';
import { ValidateToken } from './components/ValidateToken';
import { AuthWrapper } from './style';
import Heading from '../../components/heading';
import { changePassword, sendEmail, validateCode } from '../../redux/authentication/actionCreator';
import { openNotification } from '../../utility/notification';

function ForgotPassword() {

  const dispatch = useDispatch();
  const history = useHistory();

  const { screen, loading, message, email, code } = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  const handleChange = useCallback((values) => {
    if (screen === 'forgot') {
      dispatch(sendEmail(values))
    } else if (screen === 'validate') {
      dispatch(validateCode(values))
    } else if (screen === 'reset') {
      const body = {
        email,
        code,
        password: values.password,
        password_confirmation: values.password_confirmation,
      }
      dispatch(changePassword(body))
    }
  }, [dispatch, screen, email, code]);

  useEffect(() => {
    if(message !== '') openNotification('success', '¡Enhorabuena!', message);
    if (message === 'Contraseña cambiada ya puede iniciar sesión.') history.push('/');
  }, [message]);

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="forgot"
              form={form}
              onFinish={handleChange}
              layout="vertical">
          <Heading as="h3" className="mt-30">
            Recuperar contraseña
          </Heading>
          {screen === 'forgot' && (
            <SendEmail loading={loading} />
          )}
          {screen === 'validate' && (
            <ValidateToken loading={loading} />
          )}
          {screen === 'reset' && (
            <ResetPassword loading={loading} />
          )}
        </Form>
      </div>
    </AuthWrapper>
  )
}

export default ForgotPassword
