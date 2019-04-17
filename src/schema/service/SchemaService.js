const SchemaService = {};

SchemaService.getSchemaInfo = async (status="") => {
  const response = await fetch('/schema/info', {
    method: 'GET',
  });
  return response;
};

SchemaService.confirmMatch = async (sid) => {
  const response = await fetch('/schema/confirm/match', {
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

SchemaService.newSchema = async (owl, owlLang, sname) => {
  const response = await fetch('/schema/new', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      owl,
      owlLang,
      sname,
    }),
  });
  return response;
};

SchemaService.editSchema = async (owl, owlLang, sname) => {
  const response = await fetch('/schema/edit', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      owl,
      owlLang,
      sname,
    }),
  });
  return response;
};

SchemaService.getSchemaInOwl = async (sid) => {
  const response = await fetch(`/schema/schemainowl?sid=${sid}`, {
    method: 'GET',
  });
  return response;
};

export default SchemaService;