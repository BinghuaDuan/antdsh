import appconfig from '../../appconfig';

const defaultUrlPrefix = appconfig['defaultServer']['host'];
const AdminSchemaService = {};

AdminSchemaService.getSchemaInfo = async (status="") => {
  const response = await fetch(`${defaultUrlPrefix}/admin/schema/info`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};

AdminSchemaService.getMatchTable = async (sid) => {
  const response = await fetch(`${defaultUrlPrefix}/admin/schema/matchtable?sid=${sid}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};

AdminSchemaService.confirmMerge = async (sid) => {
  const response = await fetch(`${defaultUrlPrefix}/admin/schema/confirm/merge`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sid,
    }),
  });
  return response;
};

AdminSchemaService.updateMatchTable = async (matchtable) => {
  const response = await fetch(`${defaultUrlPrefix}/admin/schema/matchtable`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      matchtable,
    })
  });
  return response;
};

export default AdminSchemaService;
