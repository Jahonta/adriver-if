import type { TEntityStatus } from '../../types/entity-status'

import { EntityStatus } from '../../constants'

const statusMap = {
  [EntityStatus.Done]: '✅',
  [EntityStatus.New]: '🆕',
  [EntityStatus.Working]: '🚧',
  [EntityStatus.Error]: '❌',
}

type StatusProps = {
  value: TEntityStatus;
}

const Status = ({ value }: StatusProps) => {
  return <div>{statusMap[value]}</div>
}

export default Status
