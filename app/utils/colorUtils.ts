export function addHashtagToHexCode(hexCode: string) {
    if (hexCode === '') return ''
    if (hexCode.charAt(0) === '#') return hexCode

    return `#${hexCode}`
}
