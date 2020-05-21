const pathCache: { [key: string]: (string | number)[] } = {}
const splitRegExp = /[.[\]]/
const intRegExp = /\d+/
export default function parsePath(path: string) {
    if (!(path in pathCache)) {
        pathCache[path] = path.split(splitRegExp).map(v => (v.match(intRegExp) ? parseInt(v) : v))
    }
    return pathCache[path]
}
