import { notification } from 'antd';
import PropTypes from 'prop-types';

const openNotification = (type, title, description) => {
  notification[type]({
    message: title,
    description,
  });
};

openNotification.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};


export {openNotification}
