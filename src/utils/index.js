const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const getURLParam = (name) => {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const filingFieldSort = (a, b) => {
  if (!a.order && !b.order) return 0
  if (!a.order) return 1;
  if (!b.order) return -1;
  if (a.order < b.order) return -1;
  if (b.order > a.order) return 1;
  return 0
}

export {
  getURLParam,
  toTitleCase,
  filingFieldSort
}
