import moment from 'moment'

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

const checkForAdmin = (user) => {
  if(user.roles != null && user.roles.indexOf('admin') !== -1) {
    return true
  }
  return false;
}

const compareFilingsByDue = (a, b) => {
  if(!a.due && !b.due) return 0;
  if(!a.due) return -1;
  if(!b.due) return 1;

  const dueA = moment(a.due).unix()
  const dueB = moment(b.due).unix()
  if (dueA > dueB) {
    return 1
  } else if (dueA < dueB) {
    return -1
  }
  return 0
}

export {
  getURLParam,
  toTitleCase,
  filingFieldSort,
  checkForAdmin,
  compareFilingsByDue
}
