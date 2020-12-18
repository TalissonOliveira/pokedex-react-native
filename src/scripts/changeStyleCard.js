import cardStyles from '../styles/cards'
const styleCard = type => {
    if (type == 'steel') {
        return cardStyles.steel
    } else if (type == 'fire') {
        return cardStyles.fire
    } else if (type == 'grass') {
        return cardStyles.grass
    } else if (type == 'electric') {
        return cardStyles.electric
    } else if (type == 'water') {
        return cardStyles.water
    } else if (type == 'ice') {
        return cardStyles.ice
    } else if (type == 'ground') {
        return cardStyles.ground
    } else if (type == 'rock') {
        return cardStyles.rock
    } else if (type == 'fairy') {
        return cardStyles.fairy
    } else if (type == 'poison') {
        return cardStyles.poison
    } else if (type == 'bug') {
        return cardStyles.bug
    } else if (type == 'dragon') {
        return cardStyles.dragon
    } else if (type == 'pyschic') {
        return cardStyles.pyschic
    } else if (type == 'flying') {
        return cardStyles.fire
    } else if (type == 'fighting') {
        return cardStyles.fire
    } else {
        return cardStyles.normal
    }
}

export default styleCard