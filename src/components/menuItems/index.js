import React from 'react';
import { Menu } from 'antd';
import propTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { NavLink, useRouteMatch } from 'react-router-dom';

function MenuItems({ toggleCollapsed }) {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  const [openKeys, setOpenKeys] = React.useState(
    [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`]
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode="inline"
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        [
          `${
            mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
          }`,
        ]
      }
      defaultOpenKeys={[`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`]}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to="">
            <FeatherIcon icon="home" />
          </NavLink>
        }
        key="home"
      >
        <NavLink onClick={toggleCollapsed} to="">
          Dashboard
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to="">
            <FeatherIcon icon="truck" />
          </NavLink>
        }
        key="truck"
      >
        <NavLink onClick={toggleCollapsed} to="">
          Recolectores
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to="">
            <FeatherIcon icon="users" />
          </NavLink>
        }
        key="user"
      >
        <NavLink onClick={toggleCollapsed} to="">
          Usuarios
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to="">
            <FeatherIcon icon="layers" />
          </NavLink>
        }
        key="level"
      >
        <NavLink onClick={toggleCollapsed} to="">
          Niveles
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to="">
            <FeatherIcon icon="shopping-cart" />
          </NavLink>
        }
        key="shopping"
      >
        <NavLink onClick={toggleCollapsed} to="">
          Ordenes
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to="">
            <FeatherIcon icon="trash-2" />
          </NavLink>
        }
        key="trash"
      >
        <NavLink onClick={toggleCollapsed} to="">
          Residuos
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to="">
            <FeatherIcon icon="layout" />
          </NavLink>
        }
        key="layout"
      >
        <NavLink onClick={toggleCollapsed} to="">
          Blogs
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to="">
            <FeatherIcon icon="folder" />
          </NavLink>
        }
        key="folder"
      >
        <NavLink onClick={toggleCollapsed} to="">
          Tips
        </NavLink>
      </Menu.Item>
      {/*
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/main/chat/private/rofiq@gmail.com`}>
              <FeatherIcon icon="message-square" />
            </NavLink>
          )
        }
        key="chat"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/main/chat/private/rofiq@gmail.com`}>
          Chat
        </NavLink>
      </Menu.Item>
      */}
    </Menu>
  );
}

MenuItems.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
