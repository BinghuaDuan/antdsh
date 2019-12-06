import appconfig from '../../appconfig';

const defaultUrlPrefix = appconfig['defaultServer']['host'];
const SchemaService = {};

SchemaService.getSchemaInfo = async (gspaceId) => {
  const response = await fetch(`${defaultUrlPrefix}/schema/info?gid=${gspaceId}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};

SchemaService.confirmMatch = async (sid) => {
  const response = await fetch(`${defaultUrlPrefix}/schema/confirm/match`, {
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

SchemaService.newSchema = async (gid, owl, owlLang, sname) => {
  const response = await fetch(`${defaultUrlPrefix}/schema/new`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      gid,
      owl,
      owlLang,
      sname,
    }),
  });
  return response;
};

SchemaService.editSchema = async (gid, owl, owlLang, sname) => {
  const response = await fetch(`${defaultUrlPrefix}/schema/edit`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      gid,
      owl,
      owlLang,
      sname,
    }),
  });
  return response;
};

SchemaService.getSchemaInOwl = async (sid, gid) => {
  const response = await fetch(`${defaultUrlPrefix}/schema/schemainowl?sid=${sid}&gid=${gid}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};

export default SchemaService;