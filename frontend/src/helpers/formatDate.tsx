const formatDate = (isoDate: string | undefined) => {
  if (isoDate) {
    return (`${new Date(isoDate).toLocaleTimeString()}, ${new Date(isoDate).toLocaleDateString()}`);
  }
  return ''
}

export default formatDate;