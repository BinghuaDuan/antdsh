const AdminSchemaService = {};

AdminSchemaService.getSchemaInfo = async (status="") => {
  const response = await fetch('/admin/schema/info', {
    method: 'GET',
  });
  return response;
};

AdminSchemaService.getMatchTable = async (sid) => {
  const response = await fetch(`/admin/schema/matchtable?sid=${sid}`, {
    method: 'GET',
  });
  return response;
};

AdminSchemaService.confirmMerge = async (sid) => {
  const response = await fetch('/admin/schema/confirm/merge', {
    method: 'POST',
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
  const response = await fetch('/admin/schema/matchtable', {
    method: 'PUT',
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
