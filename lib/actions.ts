'use server';

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify';
import { writeClient } from "@/sanity/lib/write-client";


export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();

    // check if user is authenticated
    if (!session) {
        return parseServerActionResponse({
            error: "You need to sign in to perform this action.",
            status: "ERROR"
        });
    }

    // Grab the input values that are not of name "pitch"
    const {title, description, category, link} = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch')
    );

    // Generate slug for the startup
    const slug = slugify(title as string, {lower: true, strict: true});

    try {
        // Create new startup
        const newStartup = {
            title,
            description,
            category,
            image: link,
            pitch,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id
            }
        };

        // using writeClient to create a new document
        const result = await writeClient.create({
            _type: "startup",
            ...newStartup
        });

        return parseServerActionResponse(
            {
                ...result,
                error: '',
                status: "SUCCESS"
            }
        )
        
    } catch (error) {
        console.log(error);
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR"
        }); 
    }
};