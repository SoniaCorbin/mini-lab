"use server";

import { redirect } from "next/navigation";
import { stripe } from "@lib/stripe";
import prisma from '@/lib/prisma';
import { z } from 'zod';

const createCheckoutSessionSchema = z.object({
    cartId: z.string().min(1, 'cartId est obligatoire'), 
});

type createCheckoutSessionInput = z.infer<typeof createCheckoutSessionSchema>;

export async function createCheckoutSession(
    input: createCheckoutSessionInput    
): Promise<void> {
    
}
