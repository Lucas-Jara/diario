export interface Post {
    _id:   string;
    author:      Author;
    body:        Body[];
    categories:  Category[];
    description: string;
    mainImage:   Image;
    publishedAt: string;
    slug:        string;
    title:       string;
}

export interface Author {
    _id:   string;
    image: Image;
    name:  string;
    slug:  string;
}

export interface Image {
    _type: MainImageType;
    asset: Asset;
}

export enum MainImageType {
    Block = "block",
    Iframe = "iframe",
    Image = "image",
    Youtube = "youtube",
}

export interface Asset {
    _ref:  string;
    _type: string;
}

export interface Body {
    _key:      string;
    _type:     MainImageType;
    children?: Child[];
    markDefs?: MarkDef[];
    style?:    Style;
    url?:      string;
    asset?:    Asset;
    level?:    number;
    listItem?: string;
}

export interface Child {
    _key:  string;
    _type: ChildType;
    marks: string[];
    text:  string;
}

export enum ChildType {
    Span = "span",
}

export interface MarkDef {
    _key:  string;
    _type: string;
    href:  string;
}

export enum Style {
    Normal = "normal",
}

export interface Category {
    _id:   string;
    slug:  string;
    title: string;
}
