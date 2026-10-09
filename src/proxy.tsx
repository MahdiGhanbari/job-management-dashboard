import { NextRequest, NextResponse } from "next/server";
export function proxy(request: NextRequest) {
    if(request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if(request.nextUrl.pathname === '/jobs' && !request.nextUrl.searchParams.get('limit')) {
        return NextResponse.redirect(new URL('/jobs?page=1&limit=5', request.url))
    }
    return NextResponse.next()
}

export const config = {
    mattcher: [
        '/',
        '/jobs'
    ]
}