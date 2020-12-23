import { useState } from 'context/Context'
import Contribute from './Contribute'


export const ContributeContainer = props => {
  const { isContributeVisible } = useState()

  return <Contribute
    isContributeVisible={isContributeVisible}
    {...props}
  />
}

export default ContributeContainer
