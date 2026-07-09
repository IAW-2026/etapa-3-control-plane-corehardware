import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";


const isProtectedRoute = createRouteMatcher([
    "/home(.*)",
    "/buyer(.*)",
    "/seller(.*)",
    "/payments(.*)",
    "/shipping(.*)",
]);


function isRole(value: unknown): value is string {
    return typeof value === "string";
}


function canAccess(role: string): boolean {
    return role === "admin";
}


async function getUserRole(userId: string): Promise<unknown> {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return user.publicMetadata?.role;
}


async function authorizeUser(userId: string, req: Request): Promise<NextResponse> {
    const rawRole = await getUserRole(userId);

    if (!isRole(rawRole) || !canAccess(rawRole)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
}


export default clerkMiddleware(async (auth, req) => {
        const { userId } = await auth();

    if (req.nextUrl.pathname === "/unauthorized") {
        if (!userId) return NextResponse.redirect(new URL("/", req.url));

        const rawRole = await getUserRole(userId);

        if (isRole(rawRole) && canAccess(rawRole)) {
            return NextResponse.redirect(new URL("/home", req.url));
        }

        return NextResponse.next();
    }

    if (isProtectedRoute(req)) {
        if (!userId) {
            const signInUrl = new URL("/sign-in", req.url);
            signInUrl.searchParams.set("redirect_url", req.url);
            return NextResponse.redirect(signInUrl);
        }

        return authorizeUser(userId, req);
    }

    if (userId) {
        const rawRole = await getUserRole(userId);

        if (isRole(rawRole) && canAccess(rawRole)) {
            return NextResponse.redirect(new URL("/home", req.url));
        }

        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
});


export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for Clerk's auto-proxy path
        '/__clerk/(.*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};