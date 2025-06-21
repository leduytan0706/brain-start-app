import { defineQuery } from "next-sanity";

// dinh nghia GROG query lay du lieu startup
export const STARTUPS_QUERY = 
    // Lay cac document co _type la 'startup' && co slug && (ko co $search || co title chua $search ||co category chua $search || co ten author chua $search)
    // sap xep giam dan theo ngay tao
    // chi lay mot so truong du lieu can thiet
    defineQuery(`
    *[_type == 'startup' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc){
        _id, 
        title, 
        slug, 
        description, 
        image, 
        _createdAt, 
        author -> {
            _id, 
            name, 
            image,
            bio
        }, 
        views,
        pitch, 
        category
    }`
);

export const STARTUP_BY_ID_QUERY = 
    defineQuery(`
    *[_type == 'startup' && _id == $id][0]{
        _id, 
        title, 
        slug, 
        description, 
        image, 
        _createdAt, 
        author -> {
            _id, 
            name, 
            username,
            image,
            bio
        }, 
        views, 
        category,
        pitch
    }`
);

export const STARTUPS_BY_AUTHOR_QUERY = 
    // Lấy startups qua _id của author
    defineQuery(`
    *[_type == 'startup' && author._ref == $id] | order(_createdAt desc){
        _id, 
        title, 
        slug, 
        description, 
        image, 
        _createdAt, 
        author -> {
            _id, 
            name, 
            username,
            image,
            bio
        }, 
        views, 
        category,
        pitch
    }`
);

export const PLAYLIST_BY_SLUG_QUERY = 
    // Lấy startups bằng playlist slug
    defineQuery(`
    *[_type == 'playlist' && slug.current == $slug][0]{
        _id, 
        title, 
        slug, 
        select[] -> {
            _id, 
            title, 
            slug, 
            description, 
            image, 
            _createdAt, 
            author -> {
                _id, 
                name, 
                username,
                image,
                bio
            }, 
            views, 
            category,
            pitch
        }
    }`
);

export const STARTUP_VIEWS_QUERY = 
    // Lay cac document co _type la 'startup' && co _id trung voi tham so id
    // Chỉ láy trường _id và views
    defineQuery(`
    *[_type == 'startup' && _id == $id][0]{
        _id,
        views
    }`
);

export const AUTHOR_BY_GITHUB_ID_QUERY = 
    // Lay cac document co _type la 'startup' && co slug && (ko co $search || co title chua $search ||co category chua $search || co ten author chua $search)
    // sap xep giam dan theo ngay tao
    // chi lay mot so truong du lieu can thiet
    defineQuery(`
    *[_type == 'author' && id == $id][0]{
        _id,
        id, 
        image,
        email,
        name,
        username,
        bio
    }`
);

export const AUTHOR_BY_ID_QUERY = 
    // Lay cac document co _type la 'startup' && co slug && (ko co $search || co title chua $search ||co category chua $search || co ten author chua $search)
    // sap xep giam dan theo ngay tao
    // chi lay mot so truong du lieu can thiet
    defineQuery(`
    *[_type == 'author' && _id == $id][0]{
        _id,
        id, 
        image,
        email,
        name,
        username,
        bio
    }`
);