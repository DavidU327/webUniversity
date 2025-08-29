import React from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, UserDropDwon } from './style';
import { Popover } from '../popover';

function AuthInfo() {

  const SignOut = e => {
    e.preventDefault();
  };

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Cerrar sesión
        </Link>
      </div>
    </UserDropDwon>
  );

  return (
    <InfoWraper>
      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
}

export default AuthInfo;
