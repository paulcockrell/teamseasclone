import { format } from 'date-fns'

const formatDate = (time?: string | number | Date) => {
  if (!time) {
    return
  }

  return format(new Date(time), 'dd/mm/yyyy hh:mm a')
}

export default formatDate
