const UserService = {};

UserService.login = async (username, password) => {
  const response = await fetch('/user/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  return response;
};

UserService.getUserInfo = async () => {
  const response = await fetch('/user/info', {
    method: 'GET',
  });
  return response;
};

UserService.register = async (username, password) => {
  const response = await fetch('/user/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  return response;
};

UserService.logout = async () => {
  const response = await fetch('/user/logout', {
    method: 'GET',
  });
  return response;
};

export default UserService;