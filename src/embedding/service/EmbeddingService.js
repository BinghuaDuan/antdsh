import appconfig from '../../appconfig';
import {message} from "antd";

const defaultUrlPrefix = appconfig['defaultServer']['host'];
const embeddingService = {};

embeddingService.getAvailabelMethods = async () => {
  const response = await fetch(`${defaultUrlPrefix}/embed/availableMethods`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    message.error(JSON.stringify({
      url: response.url,
      status: response.status,
    }));
    return null;
  }
  return await response.json();
};

embeddingService.getAvailableModelsByGid = async (gspaceId) => {
  const response = await fetch(`${defaultUrlPrefix}/embed/gspace/${gspaceId}/models`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    message.error(JSON.stringify({
      url: response.url,
      status: response.status,
    }));
    return null;
  }
  return await response.json();
};

embeddingService.postTrain = async (gid, modelname) => {
  const response = await fetch(`${defaultUrlPrefix}/embed/gspace/${gid}/train/${modelname}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      gid,
      modelname,
    }),
  });
  if (!response.ok) {
    message.error(JSON.stringify({
      url: response.url,
      status: response.status,
    }));
    return null;
  }
  return await response.json();
};

export default embeddingService;