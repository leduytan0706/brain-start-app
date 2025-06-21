import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

// Dinh nghia schema for Author
export const playlist = defineType({
    name: "playlist",
    title: "Playlist",
    type: "document",
    fields: [
        defineField({
            name: 'title',
            type: 'string'
        }),

        defineField({
            name: 'slug',
            type: 'slug',
            // Tu dong tao slug tu field 'title'
            options: {
                source: 'title'
            }
        }),

        defineField({
            name: 'select',
            type: 'array',
            of: [{type: 'reference', to: [{type: "startup"}]}]
        }),
    ]

});