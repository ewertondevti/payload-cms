export const getNextActions = () => {
  const data = fetch("../json/actions.json")
    .then((res) => res.json())
    .then((data) => data);
  return data;
};

export const getTimeLineData = () => {
  const data = fetch("../json/timeline.json")
    .then((res) => res.json())
    .then((data) => data);
  return data;
};

export const getLifeCycleInfo = () => {
  const data = fetch("../json/lifeCycle.json")
    .then((res) => res.json())
    .then((data) => data);
  return data;
};

export const getFavorites = () => {
  const data = fetch("../json/favorites.json")
    .then((res) => res.json())
    .then((data) => data);
  return data;
};
