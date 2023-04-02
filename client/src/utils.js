

export const sortTags = function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  export const sortByDate = function(a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return d-c;
  }