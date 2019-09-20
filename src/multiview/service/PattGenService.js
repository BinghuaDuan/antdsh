import appconfig from '../../appconfig';

const defaultUrlPrefix = appconfig['defaultServer']['host'];
const PattGenService = {};

PattGenService.getState = async () => {
  const response = await fetch(`${defaultUrlPrefix}/pattgen/state`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};

PattGenService.clean = async () => {
  const response = await fetch(`${defaultUrlPrefix}/pattgen/clean`, {
    method: 'POST',
    credentials: 'include',
  });
  return response;
};

PattGenService.create = async (config) => {
  const response = await fetch(`${defaultUrlPrefix}/pattgen/create`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      data: config,
    }),
  });
  return response;
};

PattGenService.createPruning = async (config, pruningLevel) => {
  const response = await fetch(`${defaultUrlPrefix}/pattgen/create/pruning`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      data: config,
      pruning: pruningLevel,
    }),
  });
  return response;
};

PattGenService.combine = async () => {
  const response = await fetch(`${defaultUrlPrefix}/pattgen/combine`, {
    method: 'POST',
    credentials: 'include',
  });
  return response;
};

PattGenService.filterAndLabel = async (data) => {
  const response = await fetch(`${defaultUrlPrefix}/pattgen/filterAndLabel`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  });
  return response;
};

PattGenService.getCurrPattConfig = async () => {
  const response = await fetch(`${defaultUrlPrefix}/pattgen/currpattconfig`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};

// SchemaService.getSchemaInfo = async (status="") => {
//   const response = await fetch(`${defaultUrlPrefix}/schema/info`, {
//     method: 'GET',
//     credentials: 'include',
//   });
//   return response;
// };
//
// SchemaService.confirmMatch = async (sid) => {
//   const response = await fetch(`${defaultUrlPrefix}/schema/confirm/match`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       sid,
//     }),
//   });
//   return response;
// };
//
// SchemaService.newSchema = async (owl, owlLang, sname) => {
//   const response = await fetch(`${defaultUrlPrefix}/schema/new`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       owl,
//       owlLang,
//       sname,
//     }),
//   });
//   return response;
// };
//
// SchemaService.editSchema = async (owl, owlLang, sname) => {
//   const response = await fetch(`${defaultUrlPrefix}/schema/edit`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       owl,
//       owlLang,
//       sname,
//     }),
//   });
//   return response;
// };
//
// SchemaService.getSchemaInOwl = async (sid) => {
//   const response = await fetch(`${defaultUrlPrefix}/schema/schemainowl?sid=${sid}`, {
//     method: 'GET',
//     credentials: 'include',
//   });
//   return response;
// };

export default PattGenService;