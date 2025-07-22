// app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/lib/auth"; // Referring to the auth.ts we created
export const { GET, POST } = handlers;
