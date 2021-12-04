function removeEmptyParams(query) {
  return query.replace(/[^=&]+=(?:&|$)/g, "");
}
export default removeEmptyParams;
