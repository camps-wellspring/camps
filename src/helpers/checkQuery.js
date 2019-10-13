import convertQuery from "@/utils/buildQuery";

const checkThereIsQuery = query => {
  if (Object.keys(query).length > 0) {
    return `?${convertQuery(query)}`;
  } else {
    return "";
  }
};

export default checkThereIsQuery;
