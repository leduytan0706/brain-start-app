import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

// Dinh nghia schema for Author
export const startup = defineType({
    name: "startup",
    title: "Startup",
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
            name: 'author',
            // tham chieu toi schema Author
            type: 'reference',
            to: {
                type: 'author'
            }
        }),

        defineField({
            name: 'views',
            type: 'number'
        }),

        defineField({
            name: 'description',
            type: 'text'
        }),

        defineField({
            name: 'category',
            type: 'string',
            validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category."),
        }),

        defineField({
            name: 'image',
            type: 'url',
            validation: (Rule) => Rule.required().error("Please provide an image.")
        }),

        defineField({
            name: 'pitch',
            type: 'markdown'
        }),
    ],
    preview: {
        select: {
            title: 'title'
        }
    }
});