const formatStatus = (status: string | undefined) => {
  if (status) {
    const taskStatuses = {
      'TO_DO' : 'To Do',
      'BLOCKED': 'Blocked',
      'COMPLETED': 'Completed',
      'IN_PROGRESS': 'In Progress'
    }
    return taskStatuses[status] || 'Unknown'
  }
}

export default formatStatus;