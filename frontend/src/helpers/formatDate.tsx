const formatDate = (isoDate: string | undefined) => {
  if (isoDate) {
    return (`${new Date(isoDate).toLocaleDateString()}`);
  }
  return ''
}

export default formatDate;