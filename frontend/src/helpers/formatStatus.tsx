const formatStatus = (status: string) => {
  if (status) {
    const taskStatuses: Record<string, string> = {
      'TO_DO' : 'To Do',
      'BLOCKED': 'Blocked',
      'COMPLETED': 'Completed',
      'IN_PROGRESS': 'In Progress'
    }
    return taskStatuses[status] || 'Unknown'
  }
}

export default formatStatus;