export const getNextActions = () => {
    const data = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/json/actions.json`)
      .then((res) => res.json())
      .then((data) => data);
    return data;
  };
  
  export const getTimeLineData = () => {
    const data = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/json/timeline.json`)
      .then((res) => res.json())
      .then((data) => data);
    return data;
  };
  
  export const getLifeCycleInfo = () => {
    const data = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/json/lifeCycle.json`)
      .then((res) => res.json())
      .then((data) => data);
    return data;
  };
  
  export const getFavorites = () => {
    const data = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/json/favorites.json`)
      .then((res) => res.json())
      .then((data) => data);
    return data;
  };
  

  
let isCatalog: boolean = false

export const setIsCatalog = () => {
  isCatalog = !isCatalog;
}

export const getIsCatalog = () => {
  console.log(isCatalog)
  return isCatalog;
}