import { BorderLinearProgress } from "./BorderLinearProgress"
const RestBonusBar = (props) => {
    return (
        <BorderLinearProgress variant="determinate" value={props.value} />
    )
}

export default RestBonusBar