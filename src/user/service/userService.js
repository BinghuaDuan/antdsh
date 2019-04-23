import appconfig from '../../appconfig';

const defaultUrlPrefix = appconfig['defaultServer']['host'];
const UserService = {};


UserService.login = async (username, password) => {

  const response = await fetch(`${defaultUrlPrefix}/user/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      username,
      password
    })
  });
  return response;
};

UserService.getUserInfo = async () => {
  const response = await fetch(`${defaultUrlPrefix}/user/info`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};

UserService.register = async (username, password) => {
  const response = await fetch(`${defaultUrlPrefix}/user/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      username,
      password
    })
  });
  return response;
};

UserService.logout = async () => {
  const response = await fetch(`${defaultUrlPrefix}/user/logout`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};

export default UserService;