export { cn } from "cn"

export async function interval(delay: number) {
    await new Promise((resolve)=> setTimeout(resolve, delay))
}
