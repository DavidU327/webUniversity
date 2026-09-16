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

  const currentKey =
    mainPathSplit.length === 1 || mainPathSplit[1] === 'dashboard'
      ? 'home'
      : mainPathSplit[1];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode="inline"
      // // eslint-disable-next-line no-nested-ternary
      selectedKeys={[currentKey]}
      defaultOpenKeys={[`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'home'}`]}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to={`${path}/dashboard`}>
            <FeatherIcon icon="home" />
          </NavLink>
        }
        key="home"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/dashboard`}>
          Dashboard
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to={`${path}/assignment`}>
            <FeatherIcon icon="map" />
          </NavLink>
        }
        key="assignment"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/assignment`}>
          Asignar órdenes
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to={`${path}/collectors`}>
            <FeatherIcon icon="truck" />
          </NavLink>
        }
        key="collectors"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/collectors`}>
          Recolectores
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to={`${path}/users`}>
            <FeatherIcon icon="users" />
          </NavLink>
        }
        key="users"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/users`}>
          Usuarios
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to={`${path}/levels`}>
            <FeatherIcon icon="layers" />
          </NavLink>
        }
        key="levels"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/levels`}>
          Niveles
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to={`${path}/orders`}>
            <FeatherIcon icon="shopping-cart" />
          </NavLink>
        }
        key="orders"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/orders`}>
          Ordenes
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to={`${path}/wastes`}>
            <FeatherIcon icon="trash-2" />
          </NavLink>
        }
        key="wastes"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/wastes`}>
          Residuos
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to={`${path}/blogs`}>
            <FeatherIcon icon="layout" />
          </NavLink>
        }
        key="blogs"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/blogs`}>
          Blogs
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <NavLink className="menuItem-iocn" to={`${path}/tips`}>
            <FeatherIcon icon="folder" />
          </NavLink>
        }
        key="tips"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/tips`}>
          Tips
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

MenuItems.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
